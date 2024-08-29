import ForceGraph3D from "3d-force-graph";
import React, { useEffect, useRef } from "react";
import fraudData from "../../data/fraud";
import colors from "../../styles/variables";
import valueColor from "../../utils/valueColor";

import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import "./Graph3D.css"; // Adicione aqui seu CSS personalizado para estilizar o modal

const PathSelectGraph = ({ nodeMode }) => {
  const graphRef = useRef();

  useEffect(() => {
    const gData = fraudData;
    let selectedNodes = new Set();

    const Graph = ForceGraph3D()(graphRef.current)
      .graphData(gData)
      .nodeRelSize(9)
      .nodeColor((node) => (selectedNodes.has(node) ? "yellow" : "grey"))
      .linkColor((link) =>
        selectedNodes.has(link.source) && selectedNodes.has(link.target)
          ? colors.purple
          : valueColor(link)
      ) // Highlight links
      .linkOpacity(0.9)
      .onNodeClick((node, event) => {
        if (event.ctrlKey || event.shiftKey || event.altKey) {
          // multi-selection
          selectedNodes.has(node)
            ? selectedNodes.delete(node)
            : selectedNodes.add(node);
        } else {
          // single-selection
          const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
          selectedNodes.clear();
          !untoggle && selectedNodes.add(node);
        }

        Graph.nodeColor(Graph.nodeColor()); // Update color of selected nodes
        Graph.linkColor(Graph.linkColor());
        Graph.linkWidth(Graph.linkWidth()); // Update color of links
      })
      .linkWidth((link) =>
        selectedNodes.has(link.source) && selectedNodes.has(link.target) ? 4 : 2
      )
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

    return () => {
      // Clean up the graph instance when the component is unmounted
      Graph._destructor();
    };
  }, []);

  return (
    <div
      ref={graphRef}
      style={{ width: "100vw", height: "100vh", margin: 0 }}
    />
  );
};

export default PathSelectGraph;
