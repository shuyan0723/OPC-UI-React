import { useState } from 'react';
import { ModuleLibrary } from './ModuleLibrary';
import { WorkflowCanvas } from './WorkflowCanvas';
import type { CanvasNode, CanvasEdge } from '@data/workflowModules';

interface WorkflowBuilderProps {
  onSave?: (nodes: CanvasNode[], edges: CanvasEdge[]) => void;
}

/**
 * WorkflowBuilder - 工作流构建器主组件
 * 包含左侧模块库和右侧画布
 */
export function WorkflowBuilder({ onSave }: WorkflowBuilderProps) {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);

  const handleSave = () => {
    if (onSave) {
      onSave(nodes, edges);
    }
    alert('工作流已保存！');
  };

  const handleClear = () => {
    if (confirm('确定要清空画布吗？')) {
      setNodes([]);
      setEdges([]);
    }
  };

  return (
    <div className="workflow-builder">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>工作流配置</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-outline" onClick={handleClear} style={{ padding: '8px 16px', fontSize: '13px' }}>
            清空画布
          </button>
          <button className="btn-primary" onClick={handleSave} style={{ padding: '8px 16px', fontSize: '13px' }}>
            保存工作流
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px', height: '600px' }}>
        {/* 左侧模块库 */}
        <div style={{ overflowY: 'auto' }}>
          <ModuleLibrary />
        </div>

        {/* 右侧画布 */}
        <WorkflowCanvas
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
        />
      </div>
    </div>
  );
}
