import { useState } from 'react';
import { LineChart } from '@components/charts/LineChart';
import { PieChart } from '@components/charts/PieChart';
import { BarChart } from '@components/charts/BarChart';

/**
 * FinanceAnalysis - 财务分析页面
 */
export default function FinanceAnalysis() {
  const [timeRange, setTimeRange] = useState<string>('month');

  // 折线图数据 - 月度收入成本趋势
  const trendData = [
    {
      label: '收入',
      values: [85, 92, 88, 95, 102, 98, 100],
    },
    {
      label: '成本',
      values: [55, 58, 56, 60, 62, 61, 60],
    },
  ];

  const trendLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];

  // 饼图数据 - 成本结构分布
  const costData = [
    { label: '人力成本', value: 35 },
    { label: '营销费用', value: 25 },
    { label: '研发投入', value: 20 },
    { label: '运营成本', value: 12 },
    { label: '其他', value: 8 },
  ];

  // 柱状图数据 - 业务线盈利能力
  const profitData = [
    { label: '业务线A', value: 28 },
    { label: '业务线B', value: 22 },
    { label: '业务线C', value: 18 },
    { label: '业务线D', value: 15 },
    { label: '业务线E', value: 12 },
  ];

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
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>折线图：月度收入成本趋势</h4>
            <LineChart data={trendData} labels={trendLabels} height={180} />
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>饼图：成本结构分布</h4>
            <PieChart data={costData} width={280} height={220} />
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>柱状图：业务线盈利能力</h4>
            <BarChart data={profitData} height={180} />
          </div>
        </div>
      </section>
    </>
  );
}
