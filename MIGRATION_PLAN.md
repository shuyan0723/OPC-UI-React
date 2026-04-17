# OPC UI 2.0 迁移计划文档

## 一、项目现状分析

### 1.1 当前项目结构
```
opc-ui-2.0/
└── opc-ui/
    ├── index.html           # 首页总览
    ├── pages/               # 13个功能页面
    │   ├── ai-chat.html         # 行业AI助手 (最复杂 ~7.5KB)
    │   ├── personalization.html # 个性化设置 (~6.4KB)
    │   ├── crm.html             # 客户关系管理 (~2.5KB)
    │   ├── market-trend.html    # 行业工作流驾驶舱
    │   ├── competitor.html      # 竞争情报监控
    │   ├── risk-warning.html    # 风险预警中心
    │   ├── content-ops.html     # 内容运营管理
    │   ├── project.html         # 项目管理
    │   ├── auto-bookkeeping.html # 自动记账
    │   ├── finance-analysis.html # 财务分析
    │   ├── cashflow.html        # 现金流管理
    │   ├── investment.html      # 投融资对接
    │   └── policy.html          # 政策申报
    └── assets/
        ├── app.js            # ~24KB 核心逻辑
        ├── styles.css        # ~12.6KB 样式
        └── mock-data.js      # 模拟数据
```

### 1.2 技术特点
- **纯静态 HTML**，无服务端渲染
- **原生 JavaScript**，无框架依赖
- **共享组件**：全局侧边栏、全局 AI 助手浮窗、模态框、抽屉组件
- **数据持久化**：使用 localStorage 存储导航状态
- **代码规模**：小型项目，总代码量约 50KB

---

## 二、React vs Next.js 技术选型建议

### 2.1 推荐方案：**React (Vite)**

#### 选择 React 的理由：

| 维度 | React | Next.js |
|------|-------|---------|
| **学习曲线** | 较低，团队容易上手 | 较高，需要理解 SSR/路由等概念 |
| **项目规模** | 适合中小型项目 | 适合大型、企业级应用 |
| **SEO 需求** | 当前项目无 SEO 需求 | 如需 SEO 可考虑 |
| **部署复杂度** | 简单，静态部署即可 | 需要 Node.js 服务器 |
| **迁移成本** | 较低 | 较高，需要改造路由结构 |

**结论**：根据当前项目特点（小型、内部系统、无 SEO 需求），**推荐使用 React + Vite**。

#### 何时考虑 Next.js：
- 未来需要 SEO 优化
- 需要服务端渲染提升首屏速度
- 需要复杂的路由功能
- 计划扩展为大型企业应用

---

## 三、是否需要先合并 HTML 文件？

### 3.1 答案：**不需要，也不建议合并**

### 3.2 理由：
1. **现有结构已经是模块化的**：每个 HTML 文件对应一个独立功能模块
2. **合并反而增加工作量**：合并后还需要再拆分成组件
3. **直接转换更高效**：每个 HTML 文件 → 一个 React 页面组件

### 3.3 迁移策略：
```
原 HTML 文件                →  React 组件路径
─────────────────────────────────────────────────
index.html                →  src/pages/Home.jsx
pages/crm.html            →  src/pages/CRM.jsx
pages/finance-analysis.html → src/pages/FinanceAnalysis.jsx
...以此类推
```

---

## 四、详细迁移步骤

### 阶段一：环境准备（预计 1-2 天）

#### 1.1 创建新项目
```bash
npm create vite@latest opc-ui-react -- --template react
cd opc-ui-react
npm install
```

#### 1.2 安装必要依赖
```bash
# 路由
npm install react-router-dom

# UI 组件库（可选，加速开发）
npm install antd  # 或其他组件库

# 样式方案选择
# 选项A：保留原 CSS（推荐快速迁移）
# 选项B：使用 CSS Modules
# 选项C：使用 Tailwind CSS
```

#### 1.3 配置项目结构
```
src/
├── components/          # 可复用组件
│   ├── layout/
│   │   ├── TopBar.jsx
│   │   ├── Sidebar.jsx
│   │   └── AppShell.jsx
│   ├── ui/
│   │   ├── Modal.jsx
│   │   ├── Drawer.jsx
│   │   ├── Tabs.jsx
│   │   └── Card.jsx
│   └── features/
│       └── AIAssistant.jsx
├── pages/              # 页面组件
│   ├── Home.jsx
│   ├── CRM.jsx
│   ├── FinanceAnalysis.jsx
│   └── ...
├── hooks/              # 自定义 Hooks
│   ├── useLocalStorage.js
│   └── useModal.js
├── utils/              # 工具函数
│   └── navigationConfig.js
├── assets/
│   └── styles.css      # 迁移原样式
└── App.jsx
```

---

### 阶段二：核心组件抽取（预计 2-3 天）

#### 2.1 布局组件（优先级：高）

**需要抽取的共享部分：**
1. **TopBar** - 顶部导航栏
   ```jsx
   // components/layout/TopBar.jsx
   - 品牌标识
   - 全局搜索
   - 用户操作按钮
   - 返回首页链接
   ```

2. **Sidebar** - 侧边导航栏
   ```jsx
   // components/layout/Sidebar.jsx
   - 导航分组（5个主分组）
   - 折叠/展开状态
   - 激活状态高亮
   - localStorage 持久化
   ```

3. **AppShell** - 应用外壳
   ```jsx
   // components/layout/AppShell.jsx
   - 统一的页面布局容器
   - 包含 TopBar + Sidebar + MainContent
   ```

#### 2.2 UI 组件（优先级：中）

| 组件 | 来源文件 | 功能 |
|------|----------|------|
| Modal | crm.html | 新建客户弹窗 |
| Drawer | crm.html | 客户详情抽屉 |
| Tabs | crm.html | 客户状态切换 |
| Card | 多个文件 | 卡片容器 |
| Metric | index.html | 指标展示卡片 |
| ChartPlaceholder | 多个文件 | 图表占位符 |

#### 2.3 功能组件（优先级：高）

**AIAssistant** - 全局 AI 助手浮窗
```jsx
// components/features/AIAssistant.jsx
- 浮动按钮
- 展开面板
- 预设 Prompt
- 聊天输入
- 与 ai-chat.html 页面的联动
```

---

### 阶段三：页面迁移（预计 5-7 天）

#### 3.1 页面迁移优先级

**第一批（核心功能）：**
1. Home.jsx (index.html) - 首页总览
2. CRM.jsx (pages/crm.html) - 最复杂的业务页面
3. AIChat.jsx (pages/ai-chat.html) - AI 助手完整页面

**第二批（财务管理）：**
4. FinanceAnalysis.jsx
5. AutoBookkeeping.jsx
6. Cashflow.jsx

**第三批（其他页面）：**
7-13. 其余 7 个页面

#### 3.2 单个页面迁移流程

```
Step 1: 创建页面组件
  ├── 复制 HTML 的 <main> 内容
  └── 转换为 JSX 语法

Step 2: 抽取页面数据
  ├── 提取硬编码数据为 state
  └── 保留 mock 数据或创建独立文件

Step 3: 添加交互逻辑
  ├── 事件处理函数
  ├── 状态管理
  └── 组件间通信

Step 4: 样式迁移
  └── 复制对应 CSS 规则

Step 5: 测试验证
  ├── 功能完整性
  └── 样式一致性
```

#### 3.3 页面迁移示例（CRM 页面）

**原 HTML 结构：**
```html
<main class="main">
  <div class="breadcrumb">运营管理 / 客户关系管理</div>
  <h1 class="page-title">客户关系管理</h1>
  <!-- Tabs + 客户列表 + 模态框 + 抽屉 -->
</main>
```

**迁移后 React 组件：**
```jsx
// pages/CRM.jsx
import { useState } from 'react';
import { TopBar, Sidebar } from '@/components/layout';
import { Tabs, Card, Modal, Drawer } from '@/components/ui';

export default function CRM() {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // 客户数据（原 HTML 硬编码内容）
  const [customers] = useState([
    { id: 1, company: 'ABC科技', contact: '张经理', stage: '需求沟通', lastContact: '2026-04-15' },
    // ...
  ]);

  return (
    <div className="app-shell">
      <TopBar />
      <div className="layout">
        <Sidebar />
        <main className="main">
          {/* 页面内容 */}
        </main>
      </div>
    </div>
  );
}
```

---

### 阶段四：路由配置（预计 0.5-1 天）

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import Home from '@/pages/Home';
import CRM from '@/pages/CRM';
import FinanceAnalysis from '@/pages/FinanceAnalysis';
// ... 其他页面

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="crm" element={<CRM />} />
          <Route path="finance-analysis" element={<FinanceAnalysis />} />
          {/* ... 其他路由 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 阶段五：样式迁移（预计 1-2 天）

#### 5.1 样式迁移策略

**推荐方案：保留原 CSS + CSS Modules**

```
迁移步骤：
1. 复制 styles.css 到 src/assets/styles.css
2. 在 index.js 全局引入
3. 对于组件特定样式，使用 CSS Modules
```

#### 5.2 需要注意的 CSS 问题

| 问题 | 解决方案 |
|------|----------|
| class → className | 全局替换 |
| 自闭合标签 | <img /> <input /> |
| 内联 style 对象 | style={{ margin: 10 }} |
| for 属性 | htmlFor |
| 注释语法 | {/* */} |

---

### 阶段六：JavaScript 逻辑迁移（预计 2-3 天）

#### 6.1 原有 JS 功能清单

| 功能模块 | 位置 | 迁移方案 |
|----------|------|----------|
| 侧边栏导航 | initGlobalSidebar() | Sidebar 组件内部状态 |
| Tab 切换 | initTabs() | Tabs 组件 state |
| 模态框 | initModal() | Modal 组件 + useModal hook |
| 抽屉 | initDrawer() | Drawer 组件 + useDrawer hook |
| AI 助手 | initGlobalFloatingAssistant() | AIAssistant 组件 |
| localStorage 状态 | 多处使用 | useLocalStorage hook |

#### 6.2 自定义 Hooks 示例

```jsx
// hooks/useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// 使用：侧边栏折叠状态
const [groupState, setGroupState] = useLocalStorage('opc_nav_group_state', {});
```

---

### 阶段七：测试与优化（预计 2-3 天）

#### 7.1 测试清单

- [ ] 所有页面路由正常跳转
- [ ] 侧边栏导航状态正确持久化
- [ ] Tab 切换功能正常
- [ ] 模态框/抽屉打开关闭正常
- [ ] AI 助手浮窗功能正常
- [ ] 各页面数据展示正常
- [ ] 样式与原版本一致

#### 7.2 性能优化建议

1. **代码分割**：使用 React.lazy() 按需加载页面
2. **Memo 优化**：对大列表使用虚拟滚动
3. **CSS 优化**：移除未使用的样式

---

## 五、时间估算

| 阶段 | 任务 | 预计时间 |
|------|------|----------|
| 1 | 环境准备 | 1-2 天 |
| 2 | 核心组件抽取 | 2-3 天 |
| 3 | 页面迁移（13个页面） | 5-7 天 |
| 4 | 路由配置 | 0.5-1 天 |
| 5 | 样式迁移 | 1-2 天 |
| 6 | JS 逻辑迁移 | 2-3 天 |
| 7 | 测试与优化 | 2-3 天 |
| **总计** | | **14-22 天** |

*注：此估算基于一名开发者全职工作，团队开发可相应缩短*

---

## 六、风险与注意事项

### 6.1 技术风险

| 风险点 | 影响 | 缓解措施 |
|--------|------|----------|
| React 学习曲线 | 中 | 先做原型验证 |
| 状态管理复杂度 | 低 | 当前项目状态简单，useState 足够 |
| 样式兼容性 | 低 | 保留原 CSS，逐步迁移 |

### 6.2 功能缺失风险

- 确保所有交互功能都有对应的 React 实现
- 逐个页面对比验证，不遗漏任何功能

### 6.3 建议

1. **分阶段验证**：每完成一个页面就测试，避免最后累积问题
2. **保留原项目**：作为参考，随时对比
3. **组件优先**：先完成可复用组件，再迁移页面
4. **渐进式迁移**：可以考虑先迁移核心页面，再迁移次要页面

---

## 七、后续扩展建议

### 7.1 短期优化（迁移后）

1. 引入 TypeScript 增强类型安全
2. 添加单元测试
3. 优化构建产物体积

### 7.2 长期规划

1. 考虑迁移到 Next.js（如需要 SSR/SEO）
2. 引入状态管理库（如项目规模增长）
3. 引入 UI 设计系统/组件库

---

## 八、总结

### 核心建议：
1. **技术选型**：React + Vite（轻量、快速、够用）
2. **迁移策略**：直接转换，无需预先合并
3. **实施顺序**：组件 → 核心页面 → 其他页面
4. **时间预算**：约 2-3 周完成全部迁移

### 关键成功因素：
- 保持原有功能和样式的一致性
- 建立清晰的组件复用机制
- 分阶段验证，及时发现问题

---

*文档生成时间：2026-04-17*
*项目版本：opc-ui-2.0*
