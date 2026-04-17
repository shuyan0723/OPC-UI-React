/**
 * Policy - 政策申报页面
 */
export default function Policy() {
  const policies = [
    {
      id: 1,
      name: '科技创新补贴',
      startDate: '2026-05-01',
      endDate: '2026-05-31',
      amount: '最高100万元',
      condition: '高新技术企业、研发投入>=5%',
    },
  ];

  return (
    <>
      <div className="breadcrumb">资源对接 / 政策申报</div>
      <h1 className="page-title">政策申报</h1>

      <section className="card">
        {policies.map((policy) => (
          <div key={policy.id} className="list-card">
            <strong>政策名称：{policy.name}</strong>
            <p>
              申报时间：{policy.startDate} 至 {policy.endDate}
            </p>
            <p>
              金额：{policy.amount} | 条件：{policy.condition}
            </p>
            <button className="btn-primary">立即申报</button>
            <button>收藏</button>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>申报进度跟踪</h3>
        <div className="chart-placeholder">材料准备 → 提交申请 → 审核中 → 结果公布</div>
      </section>
    </>
  );
}
