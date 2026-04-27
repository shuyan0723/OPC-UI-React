import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@components/layout';
import { Home, Placeholder } from '@pages';

// 已迁移的页面组件
import CRM from '@pages/crm';
import FinanceAnalysis from '@pages/finance-analysis';
import AIChat from '@pages/ai-chat';
import AutoBookkeeping from '@pages/auto-bookkeeping';
import Cashflow from '@pages/cashflow';
import MarketTrend from '@pages/market-trend';
import Competitor from '@pages/competitor';
import RiskWarning from '@pages/risk-warning';
import ContentOps from '@pages/content-ops';
import Project from '@pages/project';
import Investment from '@pages/investment';
import Policy from '@pages/policy';
import Personalization from '@pages/personalization';
import TrackingTest from '@pages/tracking-test';

/**
 * App - 应用主组件
 * 配置所有路由
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />

          {/* 智能决策支持 */}
          <Route path="market-trend" element={<MarketTrend />} />
          <Route path="competitor" element={<Competitor />} />
          <Route path="risk-warning" element={<RiskWarning />} />

          {/* 运营管理 */}
          <Route path="crm" element={<CRM />} />
          <Route path="content-ops" element={<ContentOps />} />
          <Route path="project" element={<Project />} />

          {/* 财务管理 */}
          <Route path="auto-bookkeeping" element={<AutoBookkeeping />} />
          <Route path="finance-analysis" element={<FinanceAnalysis />} />
          <Route path="cashflow" element={<Cashflow />} />

          {/* 资源对接 */}
          <Route path="investment" element={<Investment />} />
          <Route path="policy" element={<Policy />} />

          {/* 配置中心 */}
          <Route path="personalization" element={<Personalization />} />
          <Route path="ai-chat" element={<AIChat />} />

          {/* 测试页面（开发环境） */}
          {import.meta.env.DEV && (
            <Route path="tracking-test" element={<TrackingTest />} />
          )}

          {/* 404 页面 */}
          <Route path="*" element={<Placeholder title="页面未找到" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
