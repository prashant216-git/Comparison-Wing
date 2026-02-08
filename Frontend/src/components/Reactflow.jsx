import { useCallback, useState } from "react";
import { ReactFlow, Background, Controls ,MiniMap} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { addEdge } from '@xyflow/react';

import {applyEdgeChanges, applyNodeChanges } from '@xyflow/react';


const initialNodes = [
  {
    id: "1",
    position: { x: 250, y: 150 },
    data: { label: "Start Point" },
  },
];

export default function FlowCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
const onNodesChange = useCallback(
  (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  [],
);
const onEdgesChange = useCallback(
  (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  [],
);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = () => {
    const id = (nodes.length + 1).toString();

    setNodes((nds) => [
      ...nds,
      {
        id,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: `Node ${id}` },
      },
    ]);
  };

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <button
        onClick={addNode}
        style={{ position: "absolute", zIndex: 10, top: 10, left: 10 }}
      >
        Add Node
      </button>

      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
