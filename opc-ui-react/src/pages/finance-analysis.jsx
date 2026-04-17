import { useState } from 'react';

/**
 * FinanceAnalysis - 财务分析页面
 */
export default function FinanceAnalysis() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <>
      <div className="breadcrumb">财务管理 / 财务分析</div>
      <h1 className="page-title">财务分析</h1>

      <section className="card">
        <div className="grid cols-4">
          <div className="metric">
            <div className="metric-label">收入</div>
            <div className="metric-value">100万</div>
          </div>
          <div className="metric">
            <div className="metric-label">成本</div>
            <div className="metric-value">60万</div>
          </div>
          <div className="metric">
            <div className="metric-label">利润</div>
            <div className="metric-value">40万</div>
          </div>
          <div className="metric">
            <div className="metric-label">现金流</div>
            <div className="metric-value">50万</div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="toolbar">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="month">月</option>
            <option value="quarter">季度</option>
            <option value="year">年</option>
          </select>
          <button className="btn-primary">生成财务报告</button>
        </div>
        <div className="grid cols-3">
          <div className="chart-placeholder">折线图：月度收入成本趋势</div>
          <div className="chart-placeholder">饼图：成本结构分布</div>
          <div className="chart-placeholder">柱状图：业务线盈利能力</div>
        </div>
      </section>
    </>
  );
}
