import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface IndustryPrompt {
  id: number;
  label: string;
  prompt: string;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
  time: string;
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
  const location = useLocation();

  // 在 AI 聊天页面不显示全局助手（因为页面有自己的完整面板）
  if (location.pathname === '/ai-chat') {
    return null;
  }

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const hasMoved = useRef(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const fabRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 聊天相关状态
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'ai', content: '你好！我是您的AI运营官，有什么可以帮助您的吗？', time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

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

  const industryPrompts: IndustryPrompt[] = [
    { id: 1, label: '跨境电商爆品趋势', prompt: '跨境电商：帮我分析最近7天美国站点的爆品趋势' },
    { id: 2, label: '美国站关键词洞察', prompt: '跨境电商：分析最近7天美国站点高转化关键词与投放建议' },
    { id: 3, label: '本地生活拉新建议', prompt: '本地生活：给我一份本周门店拉新活动优化建议' },
    { id: 4, label: '知识付费完课率分析', prompt: '知识付费：分析最近30天课程完课率变化并给出改进方案' },
  ];

  const handlePromptClick = (prompt: string) => {
    // 直接在弹窗中设置输入值
    setInputValue(prompt);
    setCharCount(prompt.length);
    chatInputRef.current?.focus();
  };

  // 发送消息
  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setCharCount(0);
    setIsLoading(true);

    // 模拟 AI 响应（实际应该调用 API）
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        role: 'ai',
        content: '收到您的问题，正在分析中...（实际使用时需要连接 AI API）',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  }, [inputValue, isLoading, messages.length]);

  // 键盘事件处理
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // 自动滚动到底部
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

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
          padding: 0,
        }}
      >
        <img src="/src/assets/AI.png" alt="AI" style={{ width: '54px', height: '54px', borderRadius: '50%' }} />
      </button>
      {isPanelOpen && (
        <section className="assistant-panel" style={{ display: 'block', width: '380px' }}>
          <div className="toolbar" style={{ marginBottom: '8px' }}>
            <strong>行业AI助手</strong>
            <button onClick={() => setIsPanelOpen(false)}>收起</button>
          </div>

          {/* 提示词快捷按钮 */}
          <div className="industry-prompt-list" style={{ marginBottom: '12px' }}>
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

          {/* 聊天消息区域 */}
          <div
            ref={chatHistoryRef}
            className="chat-history"
            style={{
              maxHeight: '300px',
              overflowY: 'auto',
              marginBottom: '12px',
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e8ebf0'
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="message-content">
                  <div className="message-text">{msg.content}</div>
                  <div className="message-time" style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai">
                <div className="message-content">
                  <div className="message-text" style={{ color: '#999' }}>正在思考...</div>
                </div>
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div style={{ padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #e8ebf0' }}>
            <textarea
              ref={chatInputRef}
              rows={2}
              placeholder="输入您的问题或指令..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setCharCount(e.target.value.length);
              }}
              onKeyDown={handleKeyDown}
              style={{
                width: '100%',
                border: '1px solid #d9dee8',
                borderRadius: '6px',
                padding: '8px',
                fontSize: '13px',
                resize: 'none',
                fontFamily: 'inherit',
                marginBottom: '8px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#999' }}>{charCount} 字</span>
              <button
                className="btn-primary"
                onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
                style={{ padding: '6px 16px', fontSize: '13px' }}
              >
                发送
              </button>
            </div>
          </div>

          {/* 底部链接 */}
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
