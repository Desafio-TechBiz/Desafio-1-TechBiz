import ForceGraph3D from "3d-force-graph";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import fraudData from "../../data/fraud";
import colors from "../../styles/variables";
import valueColor from "../../utils/valueColor";

import * as THREE from "three";
import {
  CSS2DRenderer, CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer';

import "./Graph3D.css"; // Adicione aqui seu CSS personalizado para estilizar o modal
import SpriteText from "three-spritetext";
import InfoBoard from "../InfoBoard";

function generateInvestigationReport(fraudData, selectedNodeIds) {
  const { nodes, links } = fraudData;

  // Inicializar o relatório
  let report = "Relatório de Investigação:\n";

  // Mapa para acessar informações dos nós pelo ID
  const nodesMap = new Map(nodes.map((node) => [node.id, node]));

  // Adicionar informações sobre os nós selecionados
  report +=
    "O caminho de investigação selecionado inclui os seguintes elementos:\n";
  selectedNodeIds.forEach((id) => {
    if (nodesMap.has(id)) {
      const node = nodesMap.get(id);
      report += `- ${node.name} (${node.role}): Tipo - ${node.type}\n`;
    }
  });

  // Adicionar informações sobre as conexões entre os nós selecionados
  report += "\nConexões entre os elementos selecionados:\n";
  links.forEach((link) => {
    const { source, target, relationship } = link;
    if (selectedNodeIds.includes(source) && selectedNodeIds.includes(target)) {
      const sourceNode = nodesMap.get(source);
      const targetNode = nodesMap.get(target);
      report += `- ${sourceNode.name} está ${relationship} ${targetNode.name}\n`;
    }
  });

  // Conclusão do relatório
  report += "\nConclusão:\n";
  report +=
    "Este caminho de investigação mostra uma série de conexões e interações entre os elementos selecionados, indicando possíveis relações de interesse para a investigação.\n";

  return report;
}


function filterNodesByLinkValueRange(data, minValue, malue) {
  const filteredLinks = data.links.filter(
    (link) => link.value >= minValue && link.value <= 10
  );

  const filteredNodeIds = new Set();
  filteredLinks.forEach((link) => {
    filteredNodeIds.add(link.source);
    filteredNodeIds.add(link.target);
  });

  return {
    nodes: Array.from(filteredNodeIds),
    links: filteredLinks,
  };
}



const handleSaveToLocalStorage = (nodes) => {
  const data = fraudData.nodes.filter((node) => nodes.includes(node.id));
  const filteredNodes = data.map((node) => {
    return { id: node.id, role: node.role, type: node.type, name: node.name };
  });


  const links = fraudData.links.filter(
    (link) => (nodes.includes(link.target.id) || nodes.includes(link.source.id))
  ).map(link => {return {id: link.id, relationship: link.relationship, source: link.source.id, target: link.target.id }});

  localStorage.setItem(
    "relatorio",
    JSON.stringify({ nodes: filteredNodes, links })
  ); // Salva o estado no localStorage
};



const PathSelectGraph = ({ nodeMode, filterPiso }) => {
  const graphRef = useRef();
  const [hoverNode, setHoverNode] = useState(null);
  const [clickNode, setClickNode] = useState(null);

  useEffect(() => {
    const gData = filterNodesByLinkValueRange(fraudData, filterPiso);
    let selectedNodes = new Set();

    const Graph = ForceGraph3D()(graphRef.current)
      .graphData(gData)
      .nodeColor((node) =>
        selectedNodes.has(node) ? colors.pink : colors.comment
      )
      .linkColor((link) =>
        selectedNodes.has(link.source) && selectedNodes.has(link.target)
          ? colors.purple
          : valueColor(link)
      ) // Highlight links
      .linkOpacity(0.6)
      .onNodeHover((node) => setHoverNode(node))
      .onNodeClick((node, event) => {
        setHoverNode(false);
        if (event.ctrlKey || event.shiftKey || event.altKey) {
          // multi-selection
          selectedNodes.has(node)
            ? selectedNodes.delete(node)
            : selectedNodes.add(node);

          handleSaveToLocalStorage(
            Array.from(selectedNodes).map((node) => node.id)
          );
        } else {
          // single-selection
          const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
          selectedNodes.clear();
          !untoggle && selectedNodes.add(node);
        }

        Graph.nodeColor(Graph.nodeColor()); // Update color of selected nodes
        Graph.linkColor(Graph.linkColor());
        Graph.linkWidth(Graph.linkWidth()); // Update color of links
        Graph.nodeThreeObject(Graph.nodeThreeObject()); // Update sprites on selection
      })
      .linkWidth((link) =>
        selectedNodes.has(link.source) && selectedNodes.has(link.target) ? 2 : 1
      )
      .linkDirectionalParticles((link) =>
        selectedNodes.has(link.source) && selectedNodes.has(link.target) ? 2 : 0
      )
      .linkDirectionalParticleWidth(4)
      .linkThreeObjectExtend(true)
      .linkThreeObject((link) => {
        // extend link with text sprite
        const sprite = new SpriteText(link.relationship);
        sprite.color = "lightgrey";
        sprite.textHeight = 1.5;
        return sprite;
      })
      .linkPositionUpdate((sprite, { start, end }) => {
        const middlePos = Object.assign(
          ...["x", "y", "z"].map((c) => ({
            [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
          }))
        );

        // Position sprite
        Object.assign(sprite.position, middlePos);
      })
      .onNodeDrag((node, translate) => {
        if (selectedNodes.has(node)) {
          // moving a selected node
          [...selectedNodes]
            .filter((selNode) => selNode !== node) // don't touch node being dragged
            .forEach((node) =>
              ["x", "y", "z"].forEach(
                (coord) => (node[`f${coord}`] = node[coord] + translate[coord])
              )
            ); // translate other nodes by same amount
        }
      })
      .onNodeDragEnd((node) => {
        if (selectedNodes.has(node)) {
          // finished moving a selected node
          [...selectedNodes]
            .filter((selNode) => selNode !== node) // don't touch node being dragged
            .forEach((node) =>
              ["x", "y", "z"].forEach(
                (coord) => (node[`f${coord}`] = undefined)
              )
            ); // unfix controlled nodes
        }
      });

    if (nodeMode === "basic") {
      Graph.nodeThreeObject((node) => {
        const nodeEl = document.createElement("div");
        nodeEl.textContent = node.name;
        nodeEl.style.color = "black";
        nodeEl.className = "node-label";
        nodeEl.style.fontSize = "12px";
        nodeEl.style.padding = "1px 4px";
        nodeEl.style.borderRadius = "4px";
        nodeEl.style.userSelect = "none";
        nodeEl.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        return new CSS2DObject(nodeEl);
      })
        .nodeThreeObjectExtend(true)
        .nodeColor((node) =>
          selectedNodes.has(node) ? colors.pink : colors.comment
        );
    }

    if (nodeMode === "img") {
      Graph.nodeThreeObject((node) => {
        const imgTexture = new THREE.TextureLoader().load(
          node.img_path ? node.img_path : "no_img.png"
        );
        imgTexture.colorSpace = THREE.SRGBColorSpace;

        // Sprite for the image
        const material = new THREE.SpriteMaterial({ map: imgTexture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(12, 12);

        if (selectedNodes.has(node)) {
          // Sprite for the border
          const borderMaterial = new THREE.SpriteMaterial({
            color: colors.purple, // Yellow border
          });
          const borderSprite = new THREE.Sprite(borderMaterial);
          borderSprite.scale.set(14, 14); // Slightly larger than the image

          // Ensure the border renders behind the image
          borderSprite.renderOrder = 1;
          sprite.renderOrder = 2;

          const group = new THREE.Group();
          group.add(borderSprite); // Add the border first
          group.add(sprite); // Add the image on top of the border

          return group;
        }

        return sprite;
      });
    }

    return () => {
      // Clean up the graph instance when the component is unmounted
      Graph._destructor();
    };
  }, [filterPiso]);

  return (
    <div ref={graphRef} style={{ width: "100vw", height: "100vh", margin: 0 }}>
      {" "}
      {hoverNode && !clickNode && (
        <div
          className="modal"
          style={{
            position: "absolute",
            left: "68vw",
            top: "20vh",
            zIndex: 1000,
            pointerEvents: "none", // Permite que o mouse passe por cima do modal
          }}
        >
          <InfoBoard />
        </div>
      )}
    </div>
  );
};

export default PathSelectGraph;
