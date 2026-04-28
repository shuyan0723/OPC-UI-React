import { useState, useRef } from 'react';
import type { ChatMessage } from '@types';
import { LineChart } from '@components/charts/LineChart';
import { useTracking } from '@hooks/useTracking';
import { tracker } from '@utils/tracking';

interface IndustryPrompt {
  id: number;
  label: string;
  prompt: string;
}

/**
 * AIChat - 行业AI助手页面
 */
export default function AIChat() {
  // 页面埋点
  useTracking('行业AI助手');
  // 销售趋势数据
  const salesTrendData = [
    {
      label: '销售额',
      values: [42000, 48000, 45000, 52000, 58000, 55000, 62000],
    },
    {
      label: '订单数',
      values: [280, 320, 300, 350, 390, 370, 410],
    },
  ];

  const salesTrendLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'ai', content: '你好！ 我是您的AI运营官，有什么可以帮助您的吗？', time: '10:00' },
  ]);
  const [input, setInput] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const industryPrompts: IndustryPrompt[] = [
    { id: 1, label: '跨境电商爆品趋势', prompt: '跨境电商：帮我分析最近7天美国站点的爆品趋势' },
    { id: 2, label: '美国站关键词洞察', prompt: '跨境电商：分析最近7天美国站点高转化关键词与投放建议' },
    { id: 3, label: '本地生活拉新建议', prompt: '本地生活：给我一份本周门店拉新活动优化建议' },
    { id: 4, label: '知识付费完课率分析', prompt: '知识付费：分析最近30天课程完课率变化并给出改进方案' },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    // 埋点：记录用户提问
    tracker.trackAI('send_message', {
      messageLength: input.length,
      hasHistory: messages.length > 1,
    });

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newUserMessage]);
    setInput('');
    setCharCount(0);

    // 模拟 AI 响应
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        role: 'ai',
        content: '收到您的问题，正在分析中...',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setActiveStep(2);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    // 埋点：记录提示词点击
    tracker.trackAI('prompt_click', { prompt });

    setInput(prompt);
    setCharCount(prompt.length);
    chatInputRef.current?.focus();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    if (type === 'down') {
      setShowFeedback(true);
    }
  };

  return (
    <>
      <div className="breadcrumb">配置中心 / 行业AI助手</div>
      <h1 className="page-title">行业AI助手</h1>

      {/* 聊天预览卡片 */}
      <section className="card chat-preview-card">
        <div className="mock-status-row">
          <span className={`mock-status-pill ${activeStep >= 1 ? 'active' : ''}`}>1 问题提出</span>
          <span className={`mock-status-pill ${activeStep >= 2 ? 'active' : ''}`}>2 数据分析</span>
          <span className={`mock-status-pill ${activeStep >= 3 ? 'active' : ''}`}>3 结果呈现</span>
        </div>
        <div className="mock-chat-canvas">
          {messages.map((msg) => (
            <div key={msg.id} className="mock-message">
              <div className="mock-message-bubble">{msg.content}</div>
              <div className="mock-time">{msg.time}</div>
            </div>
          ))}
        </div>
        <div className="mock-input-wrap">
          <div className="mock-tools">
            <button className="tool-btn">@提及</button>
            <button className="tool-btn">表情</button>
            <button className="tool-btn">格式</button>
            <button className="tool-btn">快捷指令 Ctrl+K</button>
            <button className="tool-btn">上传文件</button>
            <button className="tool-btn">按住说话</button>
          </div>
          <div className="mock-input-line">{input || '输入您的问题或指令...'}</div>
          <div className="mock-input-footer">
            <span className="footer-note">{charCount} 字</span>
            <button className="btn-primary" onClick={handleSend} disabled={!input.trim()}>
              发送
            </button>
          </div>
        </div>
      </section>

      {/* AI 助手浮窗面板 - 页面专属的完整版本 */}
      <div className="assistant-wrap">
        <button
          className="chat-fab"
          aria-label="打开行业AI助手"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          style={{ padding: 0 }}
        >
          <img src="/src/assets/AI.png" alt="AI" style={{ width: '54px', height: '54px', borderRadius: '50%' }} />
        </button>
        {isPanelOpen && (
          <section className="assistant-panel d-block">
            <div className="toolbar mb-8">
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
            <section className="card mb-0">
              <div className="status-row">
                <div className={`status-item ${activeStep >= 1 ? 'active' : ''}`}>1 问题提出</div>
                <div className={`status-item ${activeStep >= 2 ? 'active' : ''}`}>2 数据分析</div>
                <div className={`status-item ${activeStep >= 3 ? 'active' : ''}`}>3 结果呈现</div>
              </div>
              <div className="chat-history">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.role}`}>
                    <div className="message-content">
                      <div className="message-text">{msg.content}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <div className="input-toolbar">
                  <button className="toolbar-btn">@提及</button>
                  <button className="toolbar-btn">表情</button>
                  <button className="toolbar-btn">格式</button>
                  <button className="tool-btn">快捷指令 Ctrl+K</button>
                  <label className="tool-btn">
                    上传文件
                    <input type="file" multiple accept="image/*,application/pdf,.doc,.docx" hidden onChange={handleFileChange} />
                  </label>
                  <button className="tool-btn">按住说话</button>
                </div>
                <textarea
                  ref={chatInputRef}
                  className="rich-textarea"
                  rows={1}
                  placeholder="输入您的问题或指令..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setCharCount(e.target.value.length);
                  }}
                  onKeyDown={handleKeyDown}
                />
                {selectedFile && (
                  <div className="file-preview d-flex">
                    <span>{selectedFile.name}</span>
                    <button onClick={handleRemoveFile}>移除</button>
                  </div>
                )}
                <div className="chat-input-footer">
                  <span className="footer-note">{charCount} 字</span>
                  <button className="btn-primary" onClick={handleSend} disabled={!input.trim()}>
                    发送
                  </button>
                </div>
              </div>
            </section>
          </section>
        )}
      </div>

      {/* 结构化响应示例 */}
      <section className="card">
        <h3>结构化响应示例</h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
          {/* 左侧指标 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="metric">
              <div className="metric-label">总销售额</div>
              <div className="metric-value">¥128,000</div>
            </div>
            <div className="metric">
              <div className="metric-label">订单数量</div>
              <div className="metric-value">320</div>
            </div>
          </div>
          {/* 右侧图表 */}
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>销售趋势图</h4>
            <LineChart data={salesTrendData} labels={salesTrendLabels} />
          </div>
        </div>
        <div className="mt-10">
          <button className="btn-primary">导出PDF</button>
          <button>分享报告</button>
          <button>修改分析</button>
        </div>
        <div className="mt-10">
          这个回答有帮助吗？
          <button className="tool-btn" onClick={() => handleFeedback('up')}>
            👍
          </button>
          <button className="tool-btn" onClick={() => handleFeedback('down')}>
            👎
          </button>
          {showFeedback && (
            <div className="feedback-comment d-block">
              <textarea placeholder="请告诉我们如何改进..." className="w-100 mt-8" />
              <button className="mt-6">提交</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
