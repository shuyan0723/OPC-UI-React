import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { AIAssistant } from '../features';

/**
 * AppShell - 应用外壳布局组件
 * 包含顶部栏、侧边栏、内容区域和全局 AI 助手
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
      <AIAssistant />
    </div>
  );
}
