import { useState } from 'react';

/**
 * ContentOps - 内容运营管理页面
 */
export default function ContentOps() {
  const [activePlatform, setActivePlatform] = useState<string>('小红书');
  const [calendarView, setCalendarView] = useState<string>('月');

  const platforms = ['小红书', '抖音', '微信'];
  const calendarViews = ['月', '周', '日'];

  return (
    <>
      <div className="breadcrumb">运营管理 / 内容运营管理</div>
      <h1 className="page-title">内容运营管理</h1>

      <section className="card">
        <div className="tabs">
          {platforms.map((platform) => (
            <button
              key={platform}
              className={`tab ${activePlatform === platform ? 'active' : ''}`}
              onClick={() => setActivePlatform(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="tabs">
          {calendarViews.map((view) => (
            <button
              key={view}
              className={`tab ${calendarView === view ? 'active' : ''}`}
              onClick={() => setCalendarView(view)}
            >
              {view}
            </button>
          ))}
        </div>
        <h3>内容日历（{calendarView}视图）</h3>
        <div className="chart-placeholder">可视化发布计划（支持拖拽调整）</div>
      </section>

      <section className="card">
        <div className="grid cols-2">
          <div className="chart-placeholder">折线图：各平台流量变化趋势</div>
          <div className="chart-placeholder">柱状图：内容互动率对比</div>
        </div>
      </section>
    </>
  );
}
