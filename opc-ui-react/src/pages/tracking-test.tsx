import { useState } from 'react';
import { tracker } from '@utils/tracking';
import { useTracking } from '@hooks/useTracking';

/**
 * TrackingTest - 埋点测试页面
 * 用于验证埋点功能是否正常工作
 */
export default function TrackingTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);

  // 页面埋点
  useTracking('埋点测试页面');

  const addResult = (message: string, success: boolean) => {
    const icon = success ? '✅' : '❌';
    setTestResults(prev => [...prev, `${icon} ${message}`]);
  };

  // 测试1: 基础埋点
  const testBasicTracking = () => {
    try {
      tracker.track('test_event', { test: '基础埋点测试' });
      addResult('基础埋点：成功触发', true);
    } catch (error) {
      addResult(`基础埋点：失败 - ${error}`, false);
    }
  };

  // 测试2: 点击埋点
  const testClickTracking = () => {
    try {
      tracker.trackClick('test_button', { page: '测试页面' });
      addResult('点击埋点：成功触发', true);
    } catch (error) {
      addResult(`点击埋点：失败 - ${error}`, false);
    }
  };

  // 测试3: 表单提交埋点
  const testSubmitTracking = () => {
    try {
      tracker.trackSubmit('test_form', { field1: 'value1' });
      addResult('表单埋点：成功触发', true);
    } catch (error) {
      addResult(`表单埋点：失败 - ${error}`, false);
    }
  };

  // 测试4: 页面浏览埋点
  const testPageViewTracking = () => {
    try {
      tracker.trackPageView('测试页面', { referrer: '测试来源' });
      addResult('页面浏览埋点：成功触发', true);
    } catch (error) {
      addResult(`页面浏览埋点：失败 - ${error}`, false);
    }
  };

  // 测试5: 批量埋点
  const testBatchTracking = () => {
    try {
      for (let i = 0; i < 5; i++) {
        tracker.track(`batch_test_${i}`, { index: i });
      }
      addResult('批量埋点：5个事件成功触发', true);
    } catch (error) {
      addResult(`批量埋点：失败 - ${error}`, false);
    }
  };

  // 测试6: 工作流埋点
  const testWorkflowTracking = () => {
    try {
      tracker.trackWorkflow('add_node', { nodeName: '测试节点' });
      addResult('工作流埋点：成功触发', true);
    } catch (error) {
      addResult(`工作流埋点：失败 - ${error}`, false);
    }
  };

  // 测试7: AI 助手埋点
  const testAITracking = () => {
    try {
      tracker.trackAI('send_message', { messageLength: 100 });
      addResult('AI 助手埋点：成功触发', true);
    } catch (error) {
      addResult(`AI 助手埋点：失败 - ${error}`, false);
    }
  };

  // 检查埋点状态
  const checkTrackingStatus = () => {
    const status = tracker && typeof tracker.track === 'function';
    addResult(`埋点系统状态：${status ? '正常运行' : '未加载'}`, status);
  };

  // 切换埋点开关
  const toggleTracking = () => {
    const newState = !isTrackingEnabled;
    setIsTrackingEnabled(newState);
    if (newState) {
      tracker['config'].enabled = true;
      addResult('埋点已启用', true);
    } else {
      tracker['config'].enabled = false;
      addResult('埋点已禁用', true);
    }
  };

  // 清空测试结果
  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <>
      <div className="breadcrumb">测试 / 埋点测试</div>
      <h1 className="page-title">埋点功能测试</h1>

      <section className="card">
        <h3>埋点状态</h3>
        <div style={{ marginBottom: '16px' }}>
          <button className={isTrackingEnabled ? 'btn-primary' : 'btn-outline'} onClick={toggleTracking}>
            {isTrackingEnabled ? '埋点已启用' : '埋点已禁用'}
          </button>
          <button onClick={checkTrackingStatus} style={{ marginLeft: '8px' }}>
            检查状态
          </button>
          <button onClick={clearResults} style={{ marginLeft: '8px' }}>
            清空结果
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
          💡 提示：打开浏览器控制台查看详细的埋点日志
        </p>
      </section>

      <section className="card">
        <h3>埋点测试</h3>
        <div className="grid cols-3" style={{ marginBottom: '16px' }}>
          <button onClick={testBasicTracking}>
            测试基础埋点
          </button>
          <button onClick={testClickTracking}>
            测试点击埋点
          </button>
          <button onClick={testSubmitTracking}>
            测试表单埋点
          </button>
          <button onClick={testPageViewTracking}>
            测试页面浏览埋点
          </button>
          <button onClick={testBatchTracking}>
            测试批量埋点
          </button>
          <button onClick={testWorkflowTracking}>
            测试工作流埋点
          </button>
          <button onClick={testAITracking}>
            测试 AI 助手埋点
          </button>
        </div>

        {testResults.length > 0 && (
          <div style={{
            padding: '12px',
            background: '#f5f5f5',
            borderRadius: '8px',
            marginTop: '16px'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>测试结果：</h4>
            {testResults.map((result, index) => (
              <div key={index} style={{ padding: '4px 0', fontSize: '13px' }}>
                {result}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h3>测试说明</h3>
        <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
          <p><strong>如何验证埋点：</strong></p>
          <ol style={{ margin: '8px 0' }}>
            <li>点击上方测试按钮触发埋点</li>
            <li>打开浏览器控制台（F12）</li>
            <li>查看 Console 中的 <code style={{ background: '#f0f0f0', padding: '2px 6px' }}>[埋点上报]</code> 日志</li>
            <li>查看 Network 面板中的 <code style={{ background: '#f0f0f0', padding: '2px 6px' }}>/api/tracking</code> 请求</li>
          </ol>

          <p style={{ marginTop: '16px' }}><strong>安全性说明：</strong></p>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>✅ 埋点失败不会影响业务功能</li>
            <li>✅ 所有埋点调用都有错误捕获</li>
            <li>✅ 可以随时禁用埋点</li>
            <li>✅ 开发环境会打印详细日志</li>
          </ul>
        </div>
      </section>
    </>
  );
}
