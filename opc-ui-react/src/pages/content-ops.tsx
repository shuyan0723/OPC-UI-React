import { useState } from 'react';
import { CalendarChart } from '@components/charts/CalendarChart';
import { LineChart } from '@components/charts/LineChart';
import { BarChart } from '@components/charts/BarChart';

/**
 * ContentOps - 内容运营管理页面
 */
export default function ContentOps() {
  const [activePlatform, setActivePlatform] = useState<string>('小红书');
  const [calendarView, setCalendarView] = useState<string>('月');

  const platforms = ['小红书', '抖音', '微信'];
  const calendarViews = ['月', '周', '日'];

  // 日历发布计划数据
  const calendarEvents = [
    { date: 3, title: '春季新品发布', status: 'published' as const, platform: '小红书' },
    { date: 3, title: '产品测评视频', status: 'published' as const, platform: '抖音' },
    { date: 5, title: '用户故事征集', status: 'published' as const, platform: '微信' },
    { date: 7, title: 'KOL合作推广', status: 'scheduled' as const, platform: '小红书' },
    { date: 8, title: '直播带货预告', status: 'scheduled' as const, platform: '抖音' },
    { date: 10, title: '品牌故事系列', status: 'scheduled' as const, platform: '微信' },
    { date: 12, title: '节日营销活动', status: 'draft' as const, platform: '小红书' },
    { date: 15, title: '产品使用教程', status: 'draft' as const, platform: '抖音' },
    { date: 18, title: '用户互动活动', status: 'draft' as const, platform: '微信' },
    { date: 20, title: '新品预热', status: 'draft' as const, platform: '小红书' },
    { date: 22, title: '直播间福利', status: 'draft' as const, platform: '抖音' },
    { date: 25, title: '会员专享内容', status: 'draft' as const, platform: '微信' },
    { date: 28, title: '月度总结', status: 'draft' as const, platform: '小红书' },
  ];

  // 折线图数据 - 各平台流量变化
  const trafficData = [
    {
      label: '小红书',
      values: [12000, 15000, 18000, 22000, 25000, 28000, 32000],
    },
    {
      label: '抖音',
      values: [8000, 12000, 15000, 19000, 23000, 26000, 30000],
    },
    {
      label: '微信',
      values: [5000, 6000, 7500, 9000, 11000, 13000, 15000],
    },
  ];

  const trafficLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // 柱状图数据 - 内容互动率对比
  const engagementData = [
    { label: '小红书', value: 8.5 },
    { label: '抖音', value: 6.2 },
    { label: '微信', value: 4.8 },
  ];

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
        <CalendarChart events={calendarEvents} month={4} year={2026} />
      </section>

      <section className="card">
        <div className="grid cols-2">
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>折线图：各平台流量变化趋势</h4>
            <LineChart data={trafficData} labels={trafficLabels} />
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>柱状图：内容互动率对比</h4>
            <BarChart data={engagementData} />
          </div>
        </div>
      </section>
    </>
  );
}
