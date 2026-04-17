/**
 * Investment - 投融资对接页面
 */
export default function Investment() {
  const investors = [
    {
      id: 1,
      name: '红杉资本',
      stage: 'A轮',
      field: '科技、消费',
      matchRate: '85%',
    },
    {
      id: 2,
      name: '启明星创投',
      stage: 'Pre-A',
      field: 'AI、SaaS',
      matchRate: '79%',
    },
  ];

  return (
    <>
      <div className="breadcrumb">资源对接 / 投融资对接</div>
      <h1 className="page-title">投融资对接</h1>

      <section className="card">
        {investors.map((investor) => (
          <div key={investor.id} className="list-card">
            <strong>{investor.name}</strong>
            <p>
              投资阶段：{investor.stage} | 关注领域：{investor.field} | 匹配度：{investor.matchRate}
            </p>
            <button>查看详细</button>
            <button className="btn-primary">联系对接</button>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>融资进度跟踪</h3>
        <div className="chart-placeholder">时间线：初筛 -> 面谈 -> 尽调 -> TS -> 交割</div>
      </section>
    </>
  );
}
