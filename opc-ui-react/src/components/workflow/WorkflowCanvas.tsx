import { useState, useRef } from 'react';
import type { CanvasNode, CanvasEdge, WorkflowModule } from '../../data/workflowModules';

interface WorkflowCanvasProps {
  onNodesChange?: (nodes: CanvasNode[]) => void;
  onEdgesChange?: (edges: CanvasEdge[]) => void;
}

/**
 * WorkflowCanvas - 右侧工作流画布组件
 * 支持拖拽放置、连线、删除等操作
 */
export function WorkflowCanvas({ onNodesChange, onEdgesChange }: WorkflowCanvasProps) {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // 处理拖拽放置
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dataStr = e.dataTransfer.getData('workflow-module');
    const moduleData = JSON.parse(dataStr) as WorkflowModule;

    // 计算放置位置
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 创建新节点
    const newNode: CanvasNode = {
      id: `${moduleData.id}-${Date.now()}`,
      type: moduleData.id,
      position: { x, y },
      data: {
        label: moduleData.name,
        description: moduleData.description,
      },
    };

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    if (onNodesChange) {
      onNodesChange(updatedNodes);
    }
  };

  // 删除节点
  const handleDeleteNode = (nodeId: string) => {
    const updatedNodes = nodes.filter(n => n.id !== nodeId);
    const updatedEdges = edges.filter(e => e.source !== nodeId && e.target !== nodeId);

    setNodes(updatedNodes);
    setEdges(updatedEdges);

    if (onNodesChange) onNodesChange(updatedNodes);
    if (onEdgesChange) onEdgesChange(updatedEdges);
  };

  // 选中节点
  const handleSelectNode = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  // 点击画布空白处取消选中
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedNode(null);
    }
  };

  return (
    <div className="workflow-canvas" ref={canvasRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>工作流画布</h3>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          模块数: {nodes.length} | 连接数: {edges.length}
        </div>
      </div>

      {/* 画布区域 */}
      <div
        className="canvas-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
        style={{
          flex: 1,
          minHeight: '400px',
          border: '2px dashed #d9dee8',
          borderRadius: '8px',
          background: '#fafafa',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {nodes.length === 0 ? (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
            <p>从左侧拖拽模块到此处</p>
            <p style={{ fontSize: '12px' }}>开始构建您的工作流</p>
          </div>
        ) : (
          nodes.map((node) => (
            <div
              key={node.id}
              className={`canvas-node ${selectedNode === node.id ? 'selected' : ''}`}
              onClick={() => handleSelectNode(node.id)}
              style={{
                position: 'absolute',
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                padding: '12px',
                background: '#fff',
                border: `2px solid ${selectedNode === node.id ? 'var(--primary)' : '#e8ebf0'}`,
                borderRadius: '8px',
                minWidth: '150px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{node.data.label}</div>
              {node.data.description && (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{node.data.description}</div>
              )}
              {selectedNode === node.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(node.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#ff4d4f',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* 操作提示 */}
      <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        💡 提示：拖拽模块到画布 | 点击选中 | 点击 × 删除
      </div>
    </div>
  );
}
