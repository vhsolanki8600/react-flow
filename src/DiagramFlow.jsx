/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, MarkerType, Position, ReactFlowProvider } from 'reactflow';
import CustomNode from './CustomNode';
import TableNode from './TableNode';

import 'reactflow/dist/style.css';
import './overview.css';

const nodeTypes = {
  // custom: CustomNode,
  CustomTable: TableNode
};

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'custom',
  //   position: { x: 100, y: 200 },
  //   data: {
  //     selects: {
  //       'handle-0': 'smoothstep',
  //       'handle-1': 'smoothstep',
  //     },
  //   },
  // },
  {
    id: '1',
    type: 'CustomTable',
    position: { x: 100, y: 200 },
    data: {
      "Users": [
          {
              "slug": "name",
              "title": "Name",
              "type": "Text"
          },
          {
              "slug": "email",
              "title": "Email",
              "type": "Email"
          },
          {
              "slug": "field_39",
              "title": "Profile Picture",
              "type": "Files"
          },
          {
              "slug": "status",
              "title": "Status",
              "type": "Select"
          },
          {
              "slug": "role",
              "title": "Role",
              "type": "Join"
          },
          {
              "slug": "stripe_customer_id",
              "title": "Stripe Customer ID",
              "type": "Text"
          }
      ],
      records: 5
    },
  },
  {
    id: '2',
    type: 'output',
    data: {
      label: 'custom style',
    },
    className: 'circle',
    style: {
      background: '#2B6CB0',
      color: 'white',
    },
    position: { x: 800, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: 'Node',
    },
    position: { x: 800, y: 500 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  // {
  //   id: '4',
  //   type: 'default',
  //   className: 'annotation',
  //   data: {
  //     label: (
  //       <>
  //         On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
  //         <strong>MiniMap</strong>. This is also just a node 🥳
  //       </>
  //     ),
  //   },
  //   draggable: false,
  //   selectable: false,
  //   position: { x: 150, y: 400 },
  // },
];

const initialEdges = [
  // { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  // { id: 'e1-3', source: '1', target: '3', animated: true },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'default',
    sourceHandle: 'field_39',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    label: 'edge label'
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'default',
    sourceHandle: 'role',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];



export default function DiagramFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const handleNodeClick = (e, data) => {
    setEdges([
      ...edges.map(edge => ({ ...edge, animated: edge.source === data.id }))
    ])
  }

  const handleEdgeClick = (e, cEdge) => {
    setEdges([
      ...edges.map(edge => ({ ...edge, animated: edge.id === cEdge.id }))
    ])
  }

  const handlePanelClick = (e) => {
    setEdges([
      ...edges.map(edge => ({ ...edge, animated: false }))
    ])
  }

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edges={edges}
        nodesConnectable={false}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePanelClick}
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
