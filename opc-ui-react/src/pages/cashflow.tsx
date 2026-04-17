interface CashflowData {
  id: number;
  date: string;
  project: string;
  amount: string;
  type: string;
}

/**
 * Cashflow - 现金流管理页面
 */
export default function Cashflow() {
  const cashflowData: CashflowData[] = [
    { id: 1, date: '2026-04-20', project: '客户回款', amount: '+50,000', type: '收入' },
    { id: 2, date: '2026-04-24', project: '房租支付', amount: '-10,000', type: '支出' },
  ];

  return (
    <>
      <div className="breadcrumb">财务管理 / 现金流管理</div>
      <h1 className="page-title">现金流管理</h1>

      <section className="card">
        <div className="chart-placeholder">
          <strong>未来30天现金流预测</strong>
          <div className="chart-bars">
            <span style={{ height: '80%' }}></span>
            <span style={{ height: '70%' }}></span>
            <span style={{ height: '55%' }}></span>
            <span style={{ height: '30%' }}></span>
            <span style={{ height: '45%' }}></span>
          </div>
        </div>
      </section>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>日期</th>
              <th>项目</th>
              <th>金额</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            {cashflowData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.project}</td>
                <td>{item.amount}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
