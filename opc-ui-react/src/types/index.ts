/**
 * 通用类型定义
 */

// 客户相关类型
export interface Customer {
  id: number | string;
  company: string;
  contact: string;
  phone?: string;
  email?: string;
  stage: 'potential' | 'following' | 'deal';
  lastContact?: string;
}

// 导航相关类型
export interface NavItem {
  href: string;
  label: string;
}

export interface NavGroup {
  key: string;
  title: string;
  children: NavItem[];
}

// 聊天消息类型
export interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
  time: string;
}

// 财务记录类型
export interface FinanceRecord {
  id: number;
  date: string;
  project: string;
  amount: string;
  type: 'income' | 'expense';
}

// 投资机构类型
export interface Investor {
  id: number;
  name: string;
  stage: string;
  field: string;
  matchRate: string;
}

// 政策类型
export interface Policy {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  amount: string;
  condition: string;
}

// 任务类型
export interface Task {
  id: number;
  name: string;
  owner: string;
  deadline: string;
  progress: number;
}

// 风险类型
export interface Risk {
  id: number;
  level: 'high' | 'mid' | 'low';
  label: string;
  title: string;
  suggestion: string;
  action: string;
}

// 组件 Props 类型
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
