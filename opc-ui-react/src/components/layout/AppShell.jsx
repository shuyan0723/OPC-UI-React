import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

/**
 * AppShell - 应用外壳布局组件
 * 包含顶部栏、侧边栏和内容区域
 */
export function AppShell() {
  return (
    <div className="app-shell">
      <TopBar />
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
