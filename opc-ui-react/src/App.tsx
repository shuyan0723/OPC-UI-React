import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@components/layout';
import { Home, Placeholder } from '@pages';

// 懒加载页面组件
const CRM = lazy(() => import('@pages/crm'));
const FinanceAnalysis = lazy(() => import('@pages/finance-analysis'));
const AIChat = lazy(() => import('@pages/ai-chat'));
const AutoBookkeeping = lazy(() => import('@pages/auto-bookkeeping'));
const Cashflow = lazy(() => import('@pages/cashflow'));
const MarketTrend = lazy(() => import('@pages/market-trend'));
const Competitor = lazy(() => import('@pages/competitor'));
const RiskWarning = lazy(() => import('@pages/risk-warning'));
const ContentOps = lazy(() => import('@pages/content-ops'));
const Project = lazy(() => import('@pages/project'));
const Investment = lazy(() => import('@pages/investment'));
const Policy = lazy(() => import('@pages/policy'));
const Personalization = lazy(() => import('@pages/personalization'));
const TrackingTest = lazy(() => import('@pages/tracking-test'));

/**
 * App - 应用主组件
 * 配置所有路由
 */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

/**
 * LoadingFallback - 懒加载时的加载占位组件
 */
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f5f5f5'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #e8ebf0',
        borderTopColor: '#1677ff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ marginTop: '16px', color: '#666' }}>加载中...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
