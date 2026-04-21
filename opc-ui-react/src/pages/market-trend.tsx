import { useState } from 'react';

/**
 * MarketTrend - 行业工作流驾驶舱页面
 */
export default function MarketTrend() {
  const [industry, setIndustry] = useState<string>('全部行业');
  const [timeRange, setTimeRange] = useState<string>('近30天');
  const [dimension, setDimension] = useState<string>('营收');

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
          <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option>全部行业</option>
            <option>科技</option>
            <option>消费</option>
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
        </div>
      </section>

      <section className="card">
        <div className="grid cols-2">
          <div className="chart-placeholder">
            <strong>折线图：市场趋势变化</strong>
            <div className="chart-bars">
              <span className="h-20"></span>
              <span className="h-38"></span>
              <span className="h-55"></span>
              <span className="h-72"></span>
              <span className="h-62"></span>
            </div>
          </div>
          <div className="chart-placeholder">
            <strong>柱状图：细分领域表现</strong>
            <div className="chart-bars">
              <span className="h-65"></span>
              <span className="h-38"></span>
              <span className="h-48"></span>
              <span className="h-58"></span>
            </div>
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
