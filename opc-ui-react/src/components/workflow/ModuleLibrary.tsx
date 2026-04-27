import { workflowModules, moduleCategories, type WorkflowModule } from '../../data/workflowModules';

interface ModuleLibraryProps {
  onModuleDragStart?: (module: WorkflowModule) => void;
}

/**
 * ModuleLibrary - 左侧模块库组件
 * 展示可拖拽的工作流模块
 */
export function ModuleLibrary({ onModuleDragStart }: ModuleLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredModules = selectedCategory === 'all'
    ? workflowModules
    : workflowModules.filter(m => m.category === selectedCategory);

  const handleDragStart = (e: React.DragEvent, module: WorkflowModule) => {
    e.dataTransfer.setData('workflow-module', JSON.stringify(module));
    if (onModuleDragStart) {
      onModuleDragStart(module);
    }
  };

  return (
    <div className="module-library">
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>组件库</h3>

      {/* 分类筛选 */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          className={`module-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
          style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '6px', border: '1px solid #d9dee8', background: selectedCategory === 'all' ? 'var(--primary)' : '#fff', color: selectedCategory === 'all' ? '#fff' : 'var(--text)' }}
        >
          全部
        </button>
        {moduleCategories.map((cat) => (
          <button
            key={cat.id}
            className={`module-category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              borderRadius: '6px',
              border: '1px solid #d9dee8',
              background: selectedCategory === cat.id ? cat.color : '#fff',
              color: selectedCategory === cat.id ? '#fff' : 'var(--text)'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 模块列表 */}
      <div className="module-list">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            draggable
            onDragStart={(e) => handleDragStart(e, module)}
            style={{
              padding: '12px',
              marginBottom: '8px',
              border: '1px solid #e8ebf0',
              borderRadius: '8px',
              cursor: 'grab',
              background: '#fff',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>{module.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', marginBottom: '2px' }}>{module.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{module.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 补充导入
import { useState } from 'react';
