import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AIAssistant - 全局 AI 助手浮窗组件
 * 在 ai-chat 页面不显示（该页面有自己的完整面板）
 */
export function AIAssistant() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const location = useLocation();

  // 在 AI 聊天页面不显示全局助手（因为页面有自己的完整面板）
  if (location.pathname === '/ai-chat') {
    return null;
  }

  const industryPrompts = [
    { id: 1, label: '跨境电商爆品趋势', prompt: '跨境电商：帮我分析最近7天美国站点的爆品趋势' },
    { id: 2, label: '美国站关键词洞察', prompt: '跨境电商：分析最近7天美国站点高转化关键词与投放建议' },
    { id: 3, label: '本地生活拉新建议', prompt: '本地生活：给我一份本周门店拉新活动优化建议' },
    { id: 4, label: '知识付费完课率分析', prompt: '知识付费：分析最近30天课程完课率变化并给出改进方案' },
  ];

  const handlePromptClick = (prompt) => {
    window.location.href = '/ai-chat?prompt=' + encodeURIComponent(prompt);
  };

  return (
    <div className="assistant-wrap">
      <button
        className="chat-fab"
        aria-label="打开行业AI助手"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
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
