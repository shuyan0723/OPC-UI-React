import { useState, useRef, useCallback, useEffect, useMemo, memo } from 'react';
import type { CanvasNode, CanvasEdge, WorkflowModule } from '../../data/workflowModules';
import { tracker } from '@utils/tracking';

interface WorkflowCanvasProps {
  onNodesChange?: (nodes: CanvasNode[]) => void;
  onEdgesChange?: (edges: CanvasEdge[]) => void;
}

// 节点组件 - 使用 memo 优化，只在 props 变化时重新渲染
interface CanvasNodeComponentProps {
  node: CanvasNode;
  isSelected: boolean;
  isConnecting: boolean;
  isDragging: boolean;
  onSelect: (nodeId: string) => void;
  onDelete: (nodeId: string) => void;
  onNodeMouseDown: (e: React.MouseEvent, nodeId: string) => void;
  onConnectionPointClick: (e: React.MouseEvent, nodeId: string) => void;
}

const CanvasNodeComponent = memo<CanvasNodeComponentProps>(({
  node,
  isSelected,
  isConnecting,
  isDragging,
  onSelect,
  onDelete,
  onNodeMouseDown,
  onConnectionPointClick
}) => {
  return (
    <div
      className={`canvas-node ${isSelected ? 'selected' : ''}`}
      onMouseDown={(e) => onNodeMouseDown(e, node.id)}
      onClick={() => onSelect(node.id)}
      style={{
        position: 'absolute',
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        padding: '12px',
        background: '#fff',
        border: `2px solid ${isSelected ? 'var(--primary)' : isConnecting ? '#52c41a' : '#e8ebf0'}`,
        borderRadius: '8px',
        minWidth: '150px',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        userSelect: 'none',
        zIndex: 2
      }}
    >
      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{node.data.label}</div>
      {node.data.description && (
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{node.data.description}</div>
      )}

      {/* 输入连接点 (左侧) */}
      <div
        className="connection-point"
        onClick={(e) => onConnectionPointClick(e, node.id)}
        title="点击连接其他组件"
        style={{
          position: 'absolute',
          left: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: isConnecting ? '#52c41a' : '#1677ff',
          border: '2px solid #fff',
          cursor: 'crosshair',
          zIndex: 3
        }}
      />

      {/* 输出连接点 (右侧) */}
      <div
        className="connection-point"
        onClick={(e) => onConnectionPointClick(e, node.id)}
        title="点击连接其他组件"
        style={{
          position: 'absolute',
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: isConnecting ? '#52c41a' : '#1677ff',
          border: '2px solid #fff',
          cursor: 'crosshair',
          zIndex: 3
        }}
      />

      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
          style={{
            position: 'absolute',
            top: '-11px',
            right: '-8px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: 'none',
            background: '#ff4d4f',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // 自定义比较函数：只有当关键 props 变化时才重新渲染
  return (
    prevProps.node.id === nextProps.node.id &&
    prevProps.node.position.x === nextProps.node.position.x &&
    prevProps.node.position.y === nextProps.node.position.y &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isConnecting === nextProps.isConnecting &&
    prevProps.isDragging === nextProps.isDragging
  );
});

CanvasNodeComponent.displayName = 'CanvasNodeComponent';

/**
 * WorkflowCanvas - 右侧工作流画布组件
 * 支持拖拽放置、节点拖动、连线、删除等操作
 */
export function WorkflowCanvas({ onNodesChange, onEdgesChange }: WorkflowCanvasProps) {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<CanvasNode[]>([]);
  const rafRef = useRef<number>();

  // 同步 nodes 到 ref
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  // 缓存连线计算结果 - 避免每次重渲染都重新计算
  const edgePaths = useMemo(() => {
    return edges.map((edge) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return null;

      const sourceX = sourceNode.position.x + 150;
      const sourceY = sourceNode.position.y + 30;
      const targetX = targetNode.position.x;
      const targetY = targetNode.position.y + 30;

      const controlOffset = Math.abs(targetX - sourceX) * 0.5;
      const control1X = sourceX + controlOffset;
      const control1Y = sourceY;
      const control2X = targetX - controlOffset;
      const control2Y = targetY;

      return {
        ...edge,
        sourceX,
        sourceY,
        targetX,
        targetY,
        control1X,
        control1Y,
        control2X,
        control2Y,
        pathD: `M ${sourceX} ${sourceY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${targetX} ${targetY}`,
        arrowPoints: `${targetX},${targetY} ${targetX - 8},${targetY - 4} ${targetX - 8},${targetY + 4}`
      };
    }).filter(Boolean);
  }, [edges, nodes]);

  // 处理拖拽放置
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dataStr = e.dataTransfer.getData('workflow-module');
    const moduleData = JSON.parse(dataStr) as WorkflowModule;

    // 计算放置位置
    const canvasArea = e.currentTarget as HTMLElement;
    const rect = canvasArea.getBoundingClientRect();

    if (!rect) return;

    // 获取边框宽度
    const computedStyle = window.getComputedStyle(canvasArea);
    const borderLeft = parseFloat(computedStyle.borderLeftWidth) || 0;
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;

    // 节点预估尺寸（用于中心对齐）
    const nodeWidth = 150;  // minWidth
    const nodeHeight = 80;   // 预估高度（内容 + padding）

    // 计算节点左上角位置，使中心对齐鼠标
    const x = e.clientX - rect.left - borderLeft - nodeWidth / 2;
    const y = e.clientY - rect.top - borderTop - nodeHeight / 2;

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

    // 埋点：记录组件添加
    tracker.trackWorkflow('add_node', {
      nodeId: newNode.id,
      nodeName: moduleData.name,
      position: { x, y },
      totalNodes: updatedNodes.length,
    });
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
      setConnectingFrom(null);
    }
  };

  // 节点拖动开始
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    // 如果点击的是连接点，不触发节点拖动
    if ((e.target as HTMLElement).classList.contains('connection-point')) {
      return;
    }
    // 如果点击的是删除按钮，不触发节点拖动
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }

    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggingNode(nodeId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // 节点拖动中
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingNode || !canvasRef.current) return;

    // 使用 requestAnimationFrame 优化性能
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      setNodes(prevNodes =>
        prevNodes.map(node =>
          node.id === draggingNode
            ? { ...node, position: { x, y } }
            : node
        )
      );
    });
  }, [draggingNode, dragOffset]);

  // 节点拖动结束
  const handleMouseUp = useCallback(() => {
    if (draggingNode) {
      setDraggingNode(null);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
      if (onNodesChange) {
        onNodesChange(nodesRef.current);
      }
    }
  }, [draggingNode, onNodesChange]);

  // 连接点点击开始连线
  const handleConnectionPointClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();

    if (connectingFrom === null) {
      // 开始连线
      setConnectingFrom(nodeId);
    } else if (connectingFrom === nodeId) {
      // 点击同一个点，取消连线
      setConnectingFrom(null);
    } else {
      // 完成连线
      const newEdge: CanvasEdge = {
        id: `edge-${connectingFrom}-${nodeId}-${Date.now()}`,
        source: connectingFrom,
        target: nodeId
      };
      const updatedEdges = [...edges, newEdge];
      setEdges(updatedEdges);
      if (onEdgesChange) {
        onEdgesChange(updatedEdges);
      }

      // 埋点：记录连线创建
      tracker.trackWorkflow('create_edge', {
        edgeId: newEdge.id,
        sourceNode: connectingFrom,
        targetNode: nodeId,
        totalEdges: updatedEdges.length,
      });

      setConnectingFrom(null);
    }
  };

  return (
    <div className="workflow-canvas" ref={canvasRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>工作流画布</h3>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          组件数: {nodes.length} | 连接数: {edges.length}
        </div>
      </div>

      {/* 画布区域 */}
      <div
        className="canvas-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
            <p>从左侧拖拽组件到此处</p>
            <p style={{ fontSize: '12px' }}>开始构建您的工作流</p>
          </div>
        ) : (
          <>
            {/* SVG 连线层 */}
            <svg style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}>
              {/* 渲染已建立的连线 - 使用缓存的 edgePaths */}
              {edgePaths.map((edge) => (
                <g key={edge.id}>
                  <path
                    d={edge.pathD}
                    stroke="#1677ff"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* 箭头 */}
                  <polygon
                    points={edge.arrowPoints}
                    fill="#1677ff"
                  />
                </g>
              ))}

              {/* 正在创建的连线 */}
              {connectingFrom && (() => {
                const node = nodes.find(n => n.id === connectingFrom);
                if (!node) return null;
                const startX = node.position.x + 150;
                const startY = node.position.y + 30;
                return (
                  <path
                    d={`M ${startX} ${startY} L 0 0`}
                    stroke="#1677ff"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                    style={{ opacity: 0.5 }}
                  />
                );
              })()}
            </svg>

            {/* 节点层 - 使用 memo 组件优化渲染 */}
            {nodes.map((node) => (
              <CanvasNodeComponent
                key={node.id}
                node={node}
                isSelected={selectedNode === node.id}
                isConnecting={connectingFrom === node.id}
                isDragging={draggingNode === node.id}
                onSelect={handleSelectNode}
                onDelete={handleDeleteNode}
                onNodeMouseDown={handleNodeMouseDown}
                onConnectionPointClick={handleConnectionPointClick}
              />
            ))}
          </>
        )}
      </div>

      {/* 操作提示 */}
      <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        💡 提示：拖拽组件到画布 | 拖动组件调整位置 | 点击连接点连线 | 点击选中 | 点击 × 删除
      </div>
    </div>
  );
}
