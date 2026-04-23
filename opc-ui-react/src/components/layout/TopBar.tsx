import { Link } from 'react-router-dom';

/**
 * TopBar - 顶部导航栏组件
 */
export function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-badge">OP</span> AI运营官
      </div>
      <div className="top-actions">
        <input placeholder="全局搜索" />
        <button>消息</button>
        <Link className="btn-outline" to="/personalization">
          个性化定制
        </Link>
        <button>用户中心</button>
      </div>
    </header>
  );
}
