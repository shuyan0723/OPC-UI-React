import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from '@components/charts/LineChart';
import { BarChart } from '@components/charts/BarChart';

/**
 * MarketTrend - 行业工作流驾驶舱页面
 */
export default function MarketTrend() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('自媒体运营');
  const [timeRange, setTimeRange] = useState<string>('近30天');
  const [dimension, setDimension] = useState<string>('营收');

  // 折线图数据 - 市场趋势变化
  const trendChartData = [
    {
      label: selectedIndustry,
      values: [65, 72, 68, 85, 92, 88, 95],
    },
    {
      label: '行业平均',
      values: [55, 58, 62, 65, 68, 72, 75],
    },
  ];

  const trendLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // 柱状图数据 - 细分领域表现
  const segmentData = [
    { label: '内容创作', value: 88 },
    { label: '用户运营', value: 75 },
    { label: '商业变现', value: 82 },
    { label: '品牌合作', value: 68 },
  ];

  // 可选行业列表（与个性化定制页面保持一致）
  const industryOptions = [
    '自媒体运营',
    '跨境电商',
    '知识付费',
    '本地生活',
    'SaaS软件',
    '智能制造',
    '智慧物流',
    '金融服务',
    '医疗健康',
    '在线教育',
    '新零售连锁',
    '餐饮连锁',
    '美业连锁',
    '健身运动',
    '旅游出行',
    '房地产经纪',
  ];

  const trendData = [
    { id: 1, industry: '跨境电商', period: 'Q1 2026', growth: '+15.2%', insight: '持续增长，美国市场表现强劲' },
    { id: 2, industry: '本地生活', period: 'Q1 2026', growth: '+8.7%', insight: '稳步增长，三四线城市潜力大' },
    { id: 3, industry: '知识付费', period: 'Q1 2026', growth: '+22.5%', insight: '快速增长，AI 课程受欢迎' },
    { id: 4, industry: 'SaaS 软件', period: 'Q1 2026', growth: '+18.3%', insight: '企业数字化转型需求旺盛' },
  ];

  return (
    <>
      <div className="breadcrumb">智能决策支持 / 行业工作流驾驶舱</div>
      <h1 className="page-title">行业工作流驾驶舱</h1>

      <section className="card">
        <div className="toolbar">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            {industryOptions.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option>近30天</option>
            <option>近90天</option>
          </select>
          <select value={dimension} onChange={(e) => setDimension(e.target.value)}>
            <option value="营收">营收</option>
            <option value="增速">增速</option>
            <option value="热度">热度</option>
          </select>
          <button className="btn-primary">生成报告</button>
          <Link to={`/personalization?template=${encodeURIComponent(selectedIndustry)}#workflow`} className="btn-outline">
            去配置
          </Link>
          <Link to="/personalization#industry" className="btn-outline">模板市场</Link>
        </div>
      </section>

      <section className="card">
        <div className="grid cols-2">
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>折线图：市场趋势变化</h4>
            <LineChart data={trendChartData} labels={trendLabels} />
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>柱状图：细分领域表现</h4>
            <BarChart data={segmentData} />
          </div>
        </div>
      </section>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>行业</th>
              <th>周期</th>
              <th>增长率</th>
              <th>解读</th>
            </tr>
          </thead>
          <tbody>
            {trendData.map((item) => (
              <tr key={item.id}>
                <td>{item.industry}</td>
                <td>{item.period}</td>
                <td>{item.growth}</td>
                <td>{item.insight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
