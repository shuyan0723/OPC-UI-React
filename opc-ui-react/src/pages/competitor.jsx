import { useState } from 'react';

/**
 * Competitor - 竞争情报监控页面
 */
export default function Competitor() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('a');

  const competitors = [
    { id: 'a', name: '竞品A', marketShare: '30%' },
    { id: 'b', name: '竞品B', marketShare: '25%' },
    { id: 'c', name: '竞品C', marketShare: '20%' },
  ];

  return (
    <>
      <div className="breadcrumb">智能决策支持 / 竞争情报监控</div>
      <h1 className="page-title">竞争情报监控</h1>

      <section className="card">
        <div className="grid cols-3">
          {competitors.map((comp) => (
            <div
              key={comp.id}
              className={`list-card ${selectedCompetitor === comp.id ? 'active' : ''}`}
              onClick={() => setSelectedCompetitor(comp.id)}
              style={{ cursor: 'pointer' }}
            >
              {comp.name} | 市场份额{comp.marketShare}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="grid cols-2">
          <div className="chart-placeholder">
            <strong>雷达图：产品力对比</strong>
          </div>
          <div className="chart-placeholder">
            <strong>折线图：价格变化趋势</strong>
          </div>
        </div>
        <div className="list-card">
          <strong>AI策略建议：</strong>
          <span>
            竞品A在产品成熟度和渠道覆盖上领先，建议差异化定价与私域复购策略。
          </span>
          <div style={{ marginTop: '10px' }}>
            <button className="btn-primary">一键生成竞争策略</button>
          </div>
        </div>
      </section>
    </>
  );
}
