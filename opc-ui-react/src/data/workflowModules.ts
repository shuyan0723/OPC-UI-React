/**
 * 工作流模块数据
 */

export interface WorkflowModule {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  inputs?: string[];
  outputs?: string[];
}

export interface CanvasNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
  };
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// 工作流模块数据
export const workflowModules: WorkflowModule[] = [
  // 内容创作类
  {
    id: 'content-create',
    name: '内容创作',
    icon: '📝',
    category: 'content',
    description: '策划、创作、编辑和发布内容',
    inputs: ['选题', '素材'],
    outputs: ['内容稿件', '发布链接'],
  },
  {
    id: 'ai-copywrite',
    name: 'AI文案生成',
    icon: '🤖',
    category: 'content',
    description: '使用AI自动生成营销文案',
    inputs: ['产品信息', '目标受众'],
    outputs: ['营销文案', '广告语'],
  },
  {
    id: 'content-calendar',
    name: '内容日历',
    icon: '📅',
    category: 'content',
    description: '规划和管理内容发布计划',
    inputs: ['内容列表', '发布时间'],
    outputs: ['发布计划', '排期表'],
  },

  // 数据分析类
  {
    id: 'data-analysis',
    name: '数据分析',
    icon: '📊',
    category: 'analysis',
    description: '分析运营数据和用户行为',
    inputs: ['原始数据', '分析维度'],
    outputs: ['分析报告', '优化建议'],
  },
  {
    id: 'user-portrait',
    name: '用户画像',
    icon: '👤',
    category: 'analysis',
    description: '构建和分析用户画像',
    inputs: ['用户数据', '行为数据'],
    outputs: ['画像标签', '分群结果'],
  },
  {
    id: 'performance-monitor',
    name: '效果监控',
    icon: '📈',
    category: 'analysis',
    description: '实时监控内容效果指标',
    inputs: ['发布内容', '平台数据'],
    outputs: ['效果报告', '趋势预警'],
  },

  // 变现管理类
  {
    id: 'ad-monetization',
    name: '广告变现',
    icon: '💰',
    category: 'monetization',
    description: '管理广告投放和收益',
    inputs: ['广告位', '投放计划'],
    outputs: ['广告收入', 'ROI报告'],
  },
  {
    id: 'content-payment',
    name: '内容付费',
    icon: '💳',
    category: 'monetization',
    description: '设置付费内容和会员体系',
    inputs: ['付费内容', '价格策略'],
    outputs: ['付费用户', '订阅收入'],
  },
  {
    id: 'live-commerce',
    name: '直播带货',
    icon: '🛒',
    category: 'monetization',
    description: '直播销售和转化管理',
    inputs: ['商品信息', '直播脚本'],
    outputs: ['销售订单', '转化数据'],
  },

  // 粉丝运营类
  {
    id: 'community-ops',
    name: '社群运营',
    icon: '👥',
    category: 'operation',
    description: '管理粉丝社群和用户互动',
    inputs: ['粉丝列表', '运营计划'],
    outputs: ['活跃粉丝', '互动数据'],
  },
  {
    id: 'activity-plan',
    name: '活动策划',
    icon: '🎯',
    category: 'operation',
    description: '策划和执行营销活动',
    inputs: ['活动目标', '预算'],
    outputs: ['活动方案', '参与数据'],
  },
  {
    id: 'customer-service',
    name: '客户服务',
    icon: '💬',
    category: 'operation',
    description: '处理用户咨询和售后服务',
    inputs: ['用户咨询', '问题反馈'],
    outputs: ['解决方案', '满意度数据'],
  },

  // 流程管理类
  {
    id: 'workflow-trigger',
    name: '触发器',
    icon: '⚡',
    category: 'process',
    description: '设置工作流自动触发条件',
    inputs: [],
    outputs: ['触发信号'],
  },
  {
    id: 'condition-branch',
    name: '条件分支',
    icon: '🔀',
    category: 'process',
    description: '根据条件执行不同流程',
    inputs: ['条件规则', '分支选项'],
    outputs: ['分支结果'],
  },
  {
    id: 'notification',
    name: '消息通知',
    icon: '🔔',
    category: 'process',
    description: '发送各类消息通知',
    inputs: ['通知内容', '接收对象'],
    outputs: ['通知记录'],
  },
];

// 模块分类
export const moduleCategories = [
  { id: 'content', name: '内容创作', color: '#1677ff' },
  { id: 'analysis', name: '数据分析', color: '#52c41a' },
  { id: 'monetization', name: '变现管理', color: '#ff9800' },
  { id: 'operation', name: '粉丝运营', color: '#722ed1' },
  { id: 'process', name: '流程管理', color: '#eb2f96' },
];
