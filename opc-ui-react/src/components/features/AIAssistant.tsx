import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface IndustryPrompt {
  id: number;
  label: string;
  prompt: string;
}

interface Position {
  x: number;
  y: number;
}

/**
 * AIAssistant - 全局 AI 助手浮窗组件
 * 在 ai-chat 页面不显示（该页面有自己的完整面板）
 * 支持拖拽移动，位置会保存到本地存储
 */
export function AIAssistant() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const hasMoved = useRef(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const fabRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // 保存位置到本地存储（已禁用，确保每次刷新都回到初始位置）
  const savePosition = useCallback((_pos: Position) => {
    // 暂不保存位置，确保每次刷新都回到初始位置
    // localStorage.setItem('opc_ai_fab_position', JSON.stringify(_pos));
  }, []);

  // 开始拖拽
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    hasMoved.current = false;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // right/bottom 定位：记录鼠标位置和当前位置的和
    dragOffset.current = {
      x: clientX + position.x,
      y: clientY + position.y,
    };
  }, [position]);

  // 拖拽中
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    hasMoved.current = true;

    // right/bottom 定位：反转计算
    const newPosition = {
      x: dragOffset.current.x - clientX,
      y: dragOffset.current.y - clientY,
    };

    // 限制在合理范围内（right/bottom 定位）
    const maxRight = window.innerWidth - 60;
    const maxBottom = window.innerHeight - 60;

    const boundedPosition = {
      x: Math.max(10, Math.min(newPosition.x, maxRight)),
      y: Math.max(10, Math.min(newPosition.y, maxBottom)),
    };

    setPosition(boundedPosition);
  }, [isDragging]);

  // 结束拖拽
  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (hasMoved.current) {
        savePosition(position);
      }
      // 不重置 hasMoved，防止 onClick 事件触发
      // hasMoved.current 将在下次 handleDragStart 时重置
    }
  }, [isDragging, position, savePosition]);

  // 注册拖拽事件监听器
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsPanelOpen(false);
      }
    };

    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isPanelOpen]);

  // 在 AI 聊天页面不显示全局助手（因为页面有自己的完整面板）
  if (location.pathname === '/ai-chat') {
    return null;
  }

  const industryPrompts: IndustryPrompt[] = [
    { id: 1, label: '跨境电商爆品趋势', prompt: '跨境电商：帮我分析最近7天美国站点的爆品趋势' },
    { id: 2, label: '美国站关键词洞察', prompt: '跨境电商：分析最近7天美国站点高转化关键词与投放建议' },
    { id: 3, label: '本地生活拉新建议', prompt: '本地生活：给我一份本周门店拉新活动优化建议' },
    { id: 4, label: '知识付费完课率分析', prompt: '知识付费：分析最近30天课程完课率变化并给出改进方案' },
  ];

  const handlePromptClick = (prompt: string) => {
    window.location.href = '/ai-chat?prompt=' + encodeURIComponent(prompt);
  };

  // 处理按钮点击（只有在没有拖拽时才触发）
  const handleClick = useCallback(() => {
    if (!hasMoved.current) {
      setIsPanelOpen(!isPanelOpen);
    }
  }, [isPanelOpen]);

  return (
    <div
      ref={wrapperRef}
      className="assistant-wrap"
      style={{
        position: 'fixed',
        right: `${position.x}px`,
        bottom: `${position.y}px`,
        zIndex: 1000,
      }}
    >
      <button
        ref={fabRef}
        className="chat-fab"
        aria-label="打开行业AI助手"
        onClick={handleClick}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        AI
      </button>
      {isPanelOpen && (
        <section className="assistant-panel" style={{ display: 'block' }}>
          <div className="toolbar" style={{ marginBottom: '8px' }}>
            <strong>行业AI助手</strong>
            <button onClick={() => setIsPanelOpen(false)}>收起</button>
          </div>
          <div className="industry-prompt-list">
            {industryPrompts.map((prompt) => (
              <button
                key={prompt.id}
                className="prompt-chip"
                onClick={() => handlePromptClick(prompt.prompt)}
              >
                {prompt.label}
              </button>
            ))}
          </div>
          <div style={{ padding: '12px', textAlign: 'center' }}>
            <a
              href="/ai-chat"
              style={{
                color: 'var(--primary)',
                textDecoration: 'none',
                fontSize: '13px',
              }}
            >
              进入完整助手 →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
