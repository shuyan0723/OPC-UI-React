/**
 * RiskWarning - 风险预警中心页面
 */
export default function RiskWarning() {
  const risks = [
    {
      id: 1,
      level: 'high',
      label: '高风险',
      title: '现金流预计3天后枯竭',
      suggestion: '建议：立即启动融资计划或削减非必要开支',
      action: '立即处理',
    },
    {
      id: 2,
      level: 'mid',
      label: '中风险',
      title: '某供应商信用评级下降',
      suggestion: '建议：寻找备选供应商',
      action: '查看详情',
    },
  ];

  return (
    <>
      <div className="breadcrumb">智能决策支持 / 风险预警中心</div>
      <h1 className="page-title">风险预警中心</h1>

      <section className="card">
        <div className="grid cols-4">
          <div className="metric">
            <div>财务</div>
            <div className="metric-value">2项</div>
          </div>
          <div className="metric">
            <div>合规</div>
            <div className="metric-value">1项</div>
          </div>
          <div className="metric">
            <div>运营</div>
            <div className="metric-value">0项</div>
          </div>
          <div className="metric">
            <div>市场</div>
            <div className="metric-value">1项</div>
          </div>
        </div>
      </section>

      <section className="card">
        {risks.map((risk) => (
          <div key={risk.id} className="list-card">
            <span className={`pill risk-${risk.level}`}>{risk.label}</span> {risk.title}
            <p>{risk.suggestion}</p>
            <button className={risk.level === 'high' ? 'btn-danger' : ''}>
              {risk.action}
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
