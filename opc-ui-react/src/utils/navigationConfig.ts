import type { NavGroup } from '@types';

/**
 * 导航配置（来自原 app.js）
 */
export const navigationGroups: NavGroup[] = [
  {
    key: 'decision',
    title: '智能决策支持',
    children: [
      { href: 'market-trend', label: '行业工作流驾驶舱' },
      { href: 'competitor', label: '竞争情报监控' },
      { href: 'risk-warning', label: '风险预警中心' },
    ],
  },
  {
    key: 'ops',
    title: '运营管理',
    children: [
      { href: 'crm', label: '客户关系管理' },
      { href: 'content-ops', label: '内容运营管理' },
      { href: 'project', label: '项目管理' },
    ],
  },
  {
    key: 'finance',
    title: '财务管理',
    children: [
      { href: 'auto-bookkeeping', label: '自动记账' },
      { href: 'finance-analysis', label: '财务分析' },
      { href: 'cashflow', label: '现金流管理' },
    ],
  },
  {
    key: 'resource',
    title: '资源对接',
    children: [
      { href: 'investment', label: '投融资对接' },
      { href: 'policy', label: '政策申报' },
    ],
  },
  {
    key: 'config',
    title: '配置中心',
    children: [
      { href: 'personalization', label: '个性化设置' },
      { href: 'ai-chat', label: '行业AI助手' },
    ],
  },
];
