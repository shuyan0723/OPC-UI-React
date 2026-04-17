import { Link } from 'react-router-dom';

/**
 * Home - 首页总览组件
 */
export function Home() {
  return (
    <>
      <div className="breadcrumb">首页 / 总览</div>
      <h1 className="page-title">OPC场景 AI运营官总览</h1>

      <section className="card">
        <div className="grid cols-4">
          <div className="metric">
            <div className="metric-label">今日预警</div>
            <div className="metric-value">4</div>
          </div>
          <div className="metric">
            <div className="metric-label">新增线索</div>
            <div className="metric-value">18</div>
          </div>
          <div className="metric">
            <div className="metric-label">本月利润</div>
            <div className="metric-value">40万</div>
          </div>
          <div className="metric">
            <div className="metric-label">融资匹配</div>
            <div className="metric-value">12家</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3>模块快捷入口</h3>
        <div className="grid cols-3">
          <Link className="list-card" to="/market-trend">
            智能决策支持：行业工作流驾驶舱
          </Link>
          <Link className="list-card" to="/crm">
            运营管理：客户关系管理
          </Link>
          <Link className="list-card" to="/finance-analysis">
            财务管理：财务分析
          </Link>
          <Link className="list-card" to="/competitor">
            智能决策支持：竞争情报监控
          </Link>
          <Link className="list-card" to="/content-ops">
            运营管理：内容运营
          </Link>
          <Link className="list-card" to="/investment">
            资源对接：投融资对接
          </Link>
          <Link className="list-card" to="/personalization">
            配置中心：个性化定制
          </Link>
          <Link className="list-card" to="/ai-chat">
            配置中心：行业AI助手
          </Link>
        </div>
      </section>

      <p className="footer-note">本原型为评审版，图表区域采用轻量占位与模拟数据。</p>
    </>
  );
}
