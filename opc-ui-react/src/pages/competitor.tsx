import { useState } from 'react';
import { RadarChart } from '@components/charts/RadarChart';
import { LineChart } from '@components/charts/LineChart';

/**
 * Competitor - 竞争情报监控页面
 */
export default function Competitor() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('a');

  const competitors = [
    { id: 'a', name: '竞品A', marketShare: '30%' },
    { id: 'b', name: '竞品B', marketShare: '25%' },
    { id: 'c', name: '竞品C', marketShare: '20%' },
  ];

  // 雷达图数据 - 产品力对比
  const radarData = [
    {
      label: '我方',
      values: [75, 68, 82, 70, 88, 65],
    },
    {
      label: '竞品A',
      values: [85, 75, 90, 80, 78, 70],
    },
  ];

  const radarCategories = ['产品成熟度', '渠道覆盖', '用户口碑', '价格竞争力', '创新能力', '服务质量'];

  // 折线图数据 - 价格变化趋势
  const lineData = [
    {
      label: '我方',
      values: [299, 299, 279, 279, 259, 259, 239],
    },
    {
      label: '竞品A',
      values: [349, 329, 329, 299, 299, 279, 279],
    },
    {
      label: '竞品B',
      values: [259, 259, 239, 239, 219, 219, 199],
    },
  ];

  const lineLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];

  return (
    <>
      <div className="breadcrumb">智能决策支持 / 竞争情报监控</div>
      <h1 className="page-title">竞争情报监控</h1>

      <section className="card">
        <div className="grid cols-3">
          {competitors.map((comp) => (
            <div
              key={comp.id}
              className={`list-card ${selectedCompetitor === comp.id ? 'active' : ''} cursor-pointer`}
            >
              {comp.name} | 市场份额{comp.marketShare}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="grid cols-2">
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>雷达图：产品力对比</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart data={radarData} categories={radarCategories} />
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>折线图：价格变化趋势</h4>
            <LineChart data={lineData} labels={lineLabels} />
          </div>
        </div>
        <div className="list-card">
          <strong>AI策略建议：</strong>
          <span>
            竞品A在产品成熟度和渠道覆盖上领先，建议差异化定价与私域复购策略。
          </span>
          <div className="mt-10">
            <button className="btn-primary">一键生成竞争策略</button>
          </div>
        </div>
      </section>
    </>
  );
}
