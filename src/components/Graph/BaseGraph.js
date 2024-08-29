import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import "./Graph3D.css"; // Adicione aqui seu CSS personalizado para estilizar o modal
import fraudData from "../../data/fraud";
import colors from "../../styles/variables";
import TransformBoard from "../TransformBoard";
import InfoBoard from "../InfoBoard";
import CreateEntitiesBoard from "../CreateEntitiesBoard"

const BaseGraph = ({ createNodeValue }) => {
  const graphRef = useRef();
  const [hoverNode, setHoverNode] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [clickNode, setClickNode] = useState(null);
  const [createNode, setCreateNode] = useState(null);
  const [links, setLinks] = useState([]);

  const handleMouseMove = (event) => {
    if (hoverNode && !clickNode) {
      setModalPosition({
        x: event.clientX + 10,
        y: event.clientY + 10,
      });
    }
  };

  const handleResetClickNode = () => {
    setClickNode(null);
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

      const Graph = ForceGraph3D()(graphRef.current)
        .graphData(gData)
        .backgroundColor('#282A36')
        .onNodeClick((node) => {
          if (clickNode && clickNode.id === node.id) {
            setClickNode(null);
          } else {
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

            setHoverNode(false);
            setTimeout(() => {
              setClickNode(node);
            }, 2500);
          }
        })
        .nodeColor((node) =>
          highlightNodes.has(node)
            ? node === hoverNode
              ? "rgb(255,0,0,1)"
              : "rgba(255,160,0,0.8)"
            : "rgba(0,255,255,0.6)"
        )
        .linkWidth((link) => (highlightLinks.has(link) ? 4 : 1))
        .linkDirectionalParticles((link) => (highlightLinks.has(link) ? 4 : 0))
        .linkDirectionalParticleWidth(4)
        .onNodeHover((node) => {
          if (!clickNode) {
            // Update hover state
            if (node) {
              highlightNodes.clear();
              highlightLinks.clear();
              highlightNodes.add(node);
              node.neighbors.forEach((neighbor) =>
                highlightNodes.add(neighbor)
              );
              node.links.forEach((link) => highlightLinks.add(link));
            }
            setHoverNode(node);
            updateHighlight();
          }
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
        .onBackgroundClick(() => {
          setCreateNode(true)
          // addNode()
        })
        .onNodeRightClick(removeNode);

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
      <div
        ref={graphRef}
        style={{
          height: "100vh",
          width: "100%",
          left: 0,
          pointerEvents: clickNode ? "none" : "auto",
          
        }}
      />
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
      {clickNode && (
        <div
          className="modal"
          style={{
            position: "absolute",
            left: "68vw",
            top: "30vh",
            zIndex: 1000,
            pointerEvents: "auto",
          }}
        >
          <TransformBoard resetClickNode={handleResetClickNode} />
        </div>
      )}
      {createNode && (
        <div
          className="modal"
          style={{
            position: "absolute",
            left: "68vw",
            top: "30vh",
            zIndex: 1000,
            pointerEvents: "auto",
          }}
        >
          <CreateEntitiesBoard/>
        </div>
      )}
    </div>
  );
};

export default BaseGraph;
