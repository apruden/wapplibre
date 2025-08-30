import { useTheme } from '@mui/material/styles'
import { Container, Card, CardHeader, CardContent, Box } from '@mui/material'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// Place node: shown as a circle with a label
function PlaceNode({ data, selected }) {
  const theme = useTheme()
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: selected ? `3px solid ${theme.palette.primary.main}` : '2px solid #333',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
        title={data.label}
      >
        {/* Optional: token count display */}
        {typeof data.tokens === 'number' && (
          <div style={{ fontWeight: 700 }}>{data.tokens}</div>
        )}
      </div>
      <div style={{ marginTop: 6, fontSize: 12, fontWeight: 600 }}>{data.label}</div>
      <Handle type="target" position={Position.Left} style={{ background: '#777' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#777' }} />
    </div>
  )
}

// Transition node: a vertical bar with a label under it
function TransitionNode({ data, selected }) {
  const theme = useTheme()
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 16,
          height: 80,
          borderRadius: 2,
          background: selected ? theme.palette.primary.main : '#333',
          margin: '0 auto',
        }}
        title={data.label}
      />
      <div style={{ marginTop: 6, fontSize: 12 }}>{data.label}</div>
      <Handle type="target" position={Position.Left} style={{ background: '#777', top: '50%' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#777', top: '50%' }} />
    </div>
  )
}

const nodeTypes = {
  place: PlaceNode,
  transition: TransitionNode,
}

const initialNodes = [
  // Places
  { id: 'p-CREATED', type: 'place', position: { x: 60, y: 120 }, data: { label: 'CREATED', tokens: 1 } },
  { id: 'p-IN_PROGRESS', type: 'place', position: { x: 360, y: 120 }, data: { label: 'IN_PROGRESS', tokens: 0 } },
  { id: 'p-COMPLETED', type: 'place', position: { x: 660, y: 120 }, data: { label: 'COMPLETED', tokens: 0 } },
  // Transitions
  { id: 't-START', type: 'transition', position: { x: 230, y: 120 }, data: { label: 'START' } },
  { id: 't-FINISH', type: 'transition', position: { x: 530, y: 120 }, data: { label: 'FINISH' } },
]

const initialEdges = [
  // CREATED -> START
  { id: 'e1', source: 'p-CREATED', target: 't-START', markerEnd: { type: MarkerType.ArrowClosed } },
  // START -> IN_PROGRESS
  { id: 'e2', source: 't-START', target: 'p-IN_PROGRESS', markerEnd: { type: MarkerType.ArrowClosed } },
  // IN_PROGRESS -> FINISH
  { id: 'e3', source: 'p-IN_PROGRESS', target: 't-FINISH', markerEnd: { type: MarkerType.ArrowClosed } },
  // FINISH -> COMPLETED
  { id: 'e4', source: 't-FINISH', target: 'p-COMPLETED', markerEnd: { type: MarkerType.ArrowClosed } },
]

export default function WorkflowEditor() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <Card>
        <CardHeader title="Workflow Editor" />
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ height: '70vh' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
            >
              <MiniMap zoomable pannable />
              <Controls />
              <Background gap={16} />
            </ReactFlow>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
