import ForceGraph3D from "3d-force-graph";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SpriteText from 'three-spritetext';
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import fraudData from "../../data/fraud";
import valueColor from "../../utils/valueColor";
import "./Graph3D.css"; // Adicione aqui seu CSS personalizado para estilizar o modal


const BaseGraph = ({ createNode, nodeMode }) => {
  const graphRef = useRef();
  const [hoverNode, setHoverNode] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [clickNode, setClickNode] = useState(false);

  const handleMouseMove = (event) => {
    if (hoverNode) {
      setModalPosition({
        x: event.clientX + 10,
        y: event.clientY + 10,
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const addNode = async (bg) => {
        const { nodes, links } = Graph.graphData();
        const id = nodes.length;
        // const { newNodeId, newLinks } = await createNode();
        Graph.graphData({
          nodes: [...nodes, { id }],
          links: [
            ...links,
            { source: id, target: Math.round(Math.random() * (id - 1)) },
          ],
        });
      };

      const removeNode = (node) => {
        let { nodes, links } = Graph.graphData();
        links = links.filter((l) => l.source !== node && l.target !== node); // Remove links attached to node
        nodes.splice(node.id, 1); // Remove node
        nodes.forEach((n, idx) => {
          n.id = idx;
        }); // Reset node ids to array index
        Graph.graphData({ nodes, links });
      };

      const highlightNodes = new Set();
      const highlightLinks = new Set();
      const gData = fraudData;

      // cross-link node objects
      gData.links.forEach((link) => {
        const nodeMap = new Map(gData.nodes.map((node) => [node.id, node]));

        const sourceNode = nodeMap.get(link.source);
        const targetNode = nodeMap.get(link.target);
        // Inicializa o atributo neighbors para cada nó
        gData.nodes.forEach((node) => {
          node.links = [];
          node.neighbors = [];
        });

        if (sourceNode && targetNode) {
          sourceNode.neighbors.push(targetNode);
          targetNode.neighbors.push(sourceNode);
          sourceNode.links.push(targetNode);
          targetNode.links.push(sourceNode);
        }
      });

      const Graph = ForceGraph3D({
        extraRenderers: [new CSS2DRenderer()],
      })(graphRef.current)
        .graphData(gData)
        .onNodeClick((node) => {
          // Aim at node from outside it

          const distance = 40;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

          const newPos =
            node.x || node.y || node.z
              ? {
                  x: node.x * distRatio,
                  y: node.y * distRatio,
                  z: node.z * distRatio,
                }
              : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

          Graph.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            3000 // ms transition duration
          );
          setTimeout(() => {
            setHoverNode(false);
            setClickNode(node);
          }, 2500);
        })
        .nodeColor((node) =>
          highlightNodes.has(node)
            ? node === hoverNode
              ? "rgb(255,0,0,1)"
              : "rgba(255,160,0,0.8)"
            : "rgba(0,255,255,0.6)"
        )
        .linkColor(valueColor)
        .linkOpacity(0.6)
        .linkWidth((link) => (highlightLinks.has(link) ? 4 : 1))
        .linkDirectionalParticles((link) => (highlightLinks.has(link) ? 4 : 0))
        .linkDirectionalParticleWidth(4)
        .onNodeHover((node) => {
          // Update hover state

          if (node) {
            highlightNodes.clear();
            highlightLinks.clear();
            highlightNodes.add(node);
            console.log(node);
            node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
            node.links.forEach((link) => highlightLinks.add(link));

            // Update modal position
            //   setModalPosition({
            //     x: window.event.clientX + 10,
            //     y: window.event.clientY + 10,
            //   });
          }

          setHoverNode(node);

          updateHighlight();
        })
        .onLinkHover((link) => {
          highlightNodes.clear();
          highlightLinks.clear();

          if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
          }

          updateHighlight();
        })
        .onBackgroundClick(addNode)
        .onNodeRightClick(removeNode)
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
        });

      if (nodeMode === "basic") {
        Graph.nodeThreeObject((node) => {
          const nodeEl = document.createElement("div");
          nodeEl.textContent = node.id;
          nodeEl.style.color = "black";
          nodeEl.className = "node-label";
          nodeEl.style.fontSize = "12px";
          nodeEl.style.padding = "1px 4px";
          nodeEl.style.borderRadius = "4px";
          nodeEl.style.userSelect = "none";
          nodeEl.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
          return new CSS2DObject(nodeEl);
        }).nodeThreeObjectExtend(true);
      }

      if (nodeMode === "img") {
        Graph.nodeThreeObject((node) => {
          const imgTexture = new THREE.TextureLoader().load(
            node.img_path ? node.img_path : "no_img.png"
          );
          imgTexture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12);

          return sprite;
        });
      }

      function updateHighlight() {
        Graph.nodeColor(Graph.nodeColor())
          .linkWidth(Graph.linkWidth())
          .linkDirectionalParticles(Graph.linkDirectionalParticles());
      }

      return () => {
        Graph._destructor();
      };
    };

    getData();
  }, []);

  return (
    <div onMouseMove={handleMouseMove}>
      <div ref={graphRef} style={{ height: "100vh", width: "100%", left: 0 }} />
      {hoverNode && (
        <div
          className="modal"
          style={{
            position: "absolute",
            left: modalPosition.x,
            top: modalPosition.y,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            pointerEvents: "none", // Permite que o mouse passe por cima do modal
          }}
        >
          <h4>Nó: {hoverNode.id}</h4>
          <p>Detalhes do nó...</p>
        </div>
      )}
      {clickNode && (
        <div
          className="modal"
          style={{
            position: "absolute",
            left: "75vw",
            top: "50vh",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            pointerEvents: "none", // Permite que o mouse passe por cima do modal
          }}
        >
          <h4>Transforms</h4>
        </div>
      )}
    </div>
  );
};

export default BaseGraph;
