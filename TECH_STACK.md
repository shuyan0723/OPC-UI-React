# OPC UI 2.0 技术栈文档

> 文档版本：v1.0
> 创建日期：2026-04-17
> 项目类型：内部运营管理系统

---

## 一、技术栈概览

```
┌─────────────────────────────────────────────────────────────────┐
│                        OPC UI 2.0 技术栈                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │   前端框架      │    │   状态管理      │    │   UI 样式    │  │
│  │   React 18      │───▶│   Zustand /     │───▶│   CSS        │  │
│  │                 │    │   React Context │    │   Modules    │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│           │                                            │         │
│           ▼                                            ▼         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │   构建工具      │    │   路由管理      │    │   HTTP 客户端 │  │
│  │   Vite 5        │───▶│   React Router  │───▶│   Axios /    │  │
│  │                 │    │   v6            │    │   Fetch API  │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│           │                                            │         │
│           ▼                                            ▼         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │   后端（可选）  │    │   数据库（可选）│    │   部署方案   │  │
│  │   Node.js +     │───▶│   PostgreSQL /  │───▶│   Vercel /  │  │
│  │   Express       │    │   MongoDB       │    │   Nginx     │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、前端技术栈

### 2.1 核心框架

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **React** | 18.3.x | UI 框架 | 生态成熟、社区活跃、学习资源丰富 |
| **Vite** | 5.x | 构建工具 | 开发体验好、启动快、HMR 即时更新 |

**安装命令：**
```bash
npm create vite@latest opc-ui-react -- --template react
```

---

### 2.2 TypeScript（可选但推荐）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **TypeScript** | 5.x | 类型系统 | 减少运行时错误、提升开发体验、IDE 支持更好 |

**安装命令：**
```bash
# 如果选择 TypeScript 模板
npm create vite@latest opc-ui-react -- --template react-ts
```

**类型定义示例：**
```typescript
// types/customer.ts
export interface Customer {
  id: string;
  company: string;
  contact: string;
  stage: 'potential' | 'following' | 'deal';
  lastContact: string;
}

// types/navigation.ts
export interface NavGroup {
  key: string;
  title: string;
  children: NavItem[];
}

export interface NavItem {
  href: string;
  label: string;
}
```

---

### 2.3 路由管理

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **React Router** | 6.22.x | 页面路由 | 官方推荐、API 简洁、嵌套路由支持好 |

**安装命令：**
```bash
npm install react-router-dom
```

**路由配置示例：**
```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="crm" element={<CRM />} />
          <Route path="finance/*">
            <Route path="analysis" element={<FinanceAnalysis />} />
            <Route path="cashflow" element={<Cashflow />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 2.4 状态管理

#### 方案一：轻量级（推荐用于当前项目）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **React Context** | 内置 | 全局状态 | 无需额外依赖、适合小型应用 |
| **useState** | 内置 | 组件状态 | React 内置、简单直接 |
| **useLocalStorage** | 自定义 Hook | 本地持久化 | 替代原项目的 localStorage |

**自定义 Hook 示例：**
```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 使用
const [navState, setNavState] = useLocalStorage('opc_nav_state', {});
```

#### 方案二：进阶版（未来扩展）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **Zustand** | 4.x | 全局状态 | 轻量、API 简单、无需 Provider 包裹 |
| **React Query** | 5.x | 服务端状态 | 自动缓存、重新验证、乐观更新 |

**安装命令：**
```bash
npm install zustand @tanstack/react-query
```

---

### 2.5 UI 组件库

#### 方案一：迁移阶段（保留原样式）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **CSS Modules** | Vite 内置 | 组件样式 | 隔离样式、避免冲突 |
| **SASS/SCSS** | 可选 | CSS 预处理器 | 变量、嵌套、混合 |

#### 方案二：加速开发（推荐后期引入）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **Ant Design** | 5.x | 企业级 UI | 组件丰富、中文友好 |
| **Headless UI** | 最新 | 无样式组件 | 可访问性好、样式自由 |
| **Radix UI** | 最新 | 无样式组件 | 原子化设计、高度可定制 |

**安装命令：**
```bash
# Ant Design
npm install antd

# 或使用 Tailwind + Headless UI
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react
```

---

### 2.6 表单处理

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **React Hook Form** | 7.x | 表单管理 | 性能好、API 简洁、验证方便 |
| **Zod** | 3.x | 表单验证 | TypeScript 原生支持、类型推导 |

**安装命令：**
```bash
npm install react-hook-form zod
```

**使用示例：**
```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const customerSchema = z.object({
  company: z.string().min(1, '公司名称不能为空'),
  contact: z.string().email('请输入有效邮箱'),
  stage: z.enum(['potential', 'following', 'deal']),
});

function NewCustomerModal() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('company')} />
      {errors.company && <span>{errors.company.message}</span>}
      {/* ... */}
    </form>
  );
}
```

---

### 2.7 数据可视化

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **Recharts** | 2.x | 图表库 | React 原生、API 简单、易于定制 |
| **ECharts** | 5.x | 图表库 | 功能强大、图表类型丰富 |
| **Chart.js** | 4.x | 图表库 | 轻量、文档清晰 |

**安装命令：**
```bash
# Recharts（推荐）
npm install recharts

# 或 ECharts
npm install echarts echarts-for-react
```

**使用示例：**
```javascript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { month: '1月', revenue: 100, cost: 60 },
  { month: '2月', revenue: 120, cost: 70 },
  { month: '3月', revenue: 150, cost: 80 },
];

function RevenueChart() {
  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      <Line type="monotone" dataKey="cost" stroke="#82ca9d" />
    </LineChart>
  );
}
```

---

### 2.8 工具库

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **dayjs** | 1.x | 日期处理 | 轻量、API 类似 Moment.js |
| **lodash-es** | 4.x | 工具函数 | 性能优化、按需引入 |
| **clsx** | 2.x | 类名拼接 | 条件类名、简洁语法 |
| **nanoid** | 5.x | ID 生成 | 唯一 ID、短小精悍 |

**安装命令：**
```bash
npm install dayjs lodash-es clsx nanoid
```

---

## 三、后端技术栈（可选，按需启用）

### 3.1 为什么当前阶段不需要后端？

当前项目使用 `localStorage` 存储数据，以下场景**不需要后端**：
- 单用户使用
- 数据不需要跨设备同步
- 无需权限管理
- 原型/演示阶段

### 3.2 何时需要添加后端？

| 需求场景 | 后端必要性 |
|----------|-----------|
| 多用户登录/权限管理 | ✅ 必需 |
| 数据云端同步 | ✅ 必需 |
| 团队协作 | ✅ 必需 |
| 复杂业务逻辑/报表生成 | ✅ 推荐 |
| AI 对话历史持久化 | ✅ 推荐 |

### 3.3 后端技术栈

#### 方案一：Next.js API Routes（推荐）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **Next.js** | 14.x (App Router) | 全栈框架 | 前后端统一、部署简单 |
| **Next.js API Routes** | 内置 | API 服务 | 无需额外服务器、Serverless |
| **Prisma** | 5.x | ORM | 类型安全、迁移管理 |
| **PostgreSQL** | 16.x | 关系型数据库 | 可靠、功能强大 |

**API Route 示例：**
```javascript
// app/api/customers/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/customers
export async function GET(request) {
  const customers = await prisma.customer.findMany();
  return NextResponse.json(customers);
}

// POST /api/customers
export async function POST(request) {
  const data = await request.json();
  const customer = await prisma.customer.create({ data });
  return NextResponse.json(customer, { status: 201 });
}
```

#### 方案二：独立 Node.js 后端（推荐用于微服务架构）

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **Node.js** | 20.x LTS | 运行时 | JavaScript 全栈 |
| **Express** | 4.x | Web 框架 | 灵活、中间件丰富 |
| **Prisma** | 5.x | ORM | 类型安全、易于使用 |
| **PostgreSQL** | 16.x | 关系型数据库 | 企业级、可靠 |
| **Redis** | 7.x | 缓存/会话 | 性能优化 |
| **JWT** | - | 认证 | 无状态认证 |

**项目结构：**
```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.js          # 认证相关
│   │   ├── customers.js     # 客户管理
│   │   ├── finance.js       # 财务数据
│   │   └── ai-chat.js       # AI 对话
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   │   ├── auth.js          # JWT 验证
│   │   └── errorHandler.js
│   ├── lib/
│   │   ├── db.js            # 数据库连接
│   │   └── prisma.js
│   └── index.js
├── prisma/
│   └── schema.prisma
├── package.json
└── .env
```

**Express API 示例：**
```javascript
// src/index.js
import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customers.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

app.use(errorHandler);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
```

**Prisma Schema 示例：**
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Customer {
  id          String   @id @default(uuid())
  company     String
  contact     String
  phone       String?
  email       String?
  stage       String   // potential, following, deal
  lastContact DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model FinanceRecord {
  id          String   @id @default(uuid())
  type        String   // income, expense
  category    String
  amount      Decimal
  date        DateTime
  description String?
  createdAt   DateTime @default(now())
}
```

#### 方案三：Serverless / BaaS（快速启动）

| 技术 | 用途 | 选型理由 |
|------|------|----------|
| **Supabase** | 后端服务 | 开源 Firebase 替代、PostgreSQL |
| **Firebase** | BaaS 平台 | Google 官方、功能全面 |
| **PlanetScale** | 无服务器数据库 | MySQL 兼容、自动扩展 |

**Supabase 示例：**
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 查询客户
const { data, error } = await supabase
  .from('customers')
  .select('*');

// 新增客户
const { data, error } = await supabase
  .from('customers')
  .insert([{ company: 'ABC科技', contact: '张经理' }]);
```

---

## 四、AI 集成技术栈

### 4.1 AI 对话功能

| 技术 | 用途 | 选型理由 |
|------|------|----------|
| **Vercel AI SDK** | AI 集成 | React 原生、流式响应 |
| **OpenAI API** | LLM 服务 | 功能强大、模型丰富 |
| **Anthropic API** | LLM 服务 | Claude 系列、长上下文 |

**安装命令：**
```bash
npm install ai openai
```

**使用示例：**
```javascript
import { useChat } from 'ai/react';

function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <form onSubmit={handleSubmit}>
      {messages.map(m => (
        <div key={m.id}>{m.role === 'user' ? 'User: ' : 'AI: '}{m.content}</div>
      ))}
      <input value={input} onChange={handleInputChange} />
    </form>
  );
}
```

---

## 五、开发工具

### 5.1 代码质量

| 工具 | 版本 | 用途 |
|------|------|------|
| **ESLint** | 9.x | 代码检查 |
| **Prettier** | 3.x | 代码格式化 |
| **Husky** | 9.x | Git Hooks |
| **lint-staged** | 15.x | 提交前检查 |

**安装命令：**
```bash
npm install -D eslint prettier husky lint-staged
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**配置示例：**
```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: { react: { version: '18' } },
};
```

### 5.2 测试工具

| 工具 | 版本 | 用途 |
|------|------|------|
| **Vitest** | 1.x | 单元测试 |
| **Testing Library** | 14.x | 组件测试 |
| **Playwright** | 1.x | E2E 测试 |

**安装命令：**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

### 5.3 调试工具

| 工具 | 用途 |
|------|------|
| **React DevTools** | React 组件调试 |
| **Redux DevTools** | 状态调试（如用 Redux） |

---

## 六、部署方案

### 6.1 前端部署

| 平台 | 优势 | 推荐场景 |
|------|------|----------|
| **Vercel** | 零配置、自动 HTTPS | React/Next.js 项目首选 |
| **Netlify** | 简单易用、表单处理 | 静态站点 |
| **Nginx** | 自主可控 | 企业内部部署 |
| **Docker** | 环境一致性 | 容器化部署 |

**Vercel 部署命令：**
```bash
npm install -g vercel
vercel
```

**Dockerfile 示例：**
```dockerfile
# 多阶段构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 6.2 后端部署

| 平台 | 优势 | 推荐场景 |
|------|------|----------|
| **Vercel** | 与前端一体 | Next.js API Routes |
| **Railway** | 简单、支持多种语言 | Express/Koa 后端 |
| **Render** | 免费层、自动部署 | 小型项目 |
| **自建服务器** | 完全控制 | 企业内部 |

---

## 七、环境配置

### 7.1 环境变量

```bash
# .env.example
VITE_API_BASE_URL=http://localhost:3001/api
VITE_AI_API_KEY=your_ai_api_key_here

# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_AI_API_KEY=your_production_ai_api_key
```

### 7.2 路径别名（Vite 配置）

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
```

---

## 八、技术栈决策树

```
是否需要后端？
├── 否（单用户、本地存储）
│   └── React + Vite + localStorage
│       └── 部署：Vercel / Netlify / Nginx
│
└── 是（多用户、云端同步）
    ├── 是否需要 SSR/SEO？
    │   ├── 是 → Next.js
    │   │   └── API Routes + Prisma + PostgreSQL
    │   └── 否 → React + 独立后端
    │       └── Express + Prisma + PostgreSQL
    │
    └── 后端部署：Railway / Render / 自建服务器
```

---

## 九、总结建议

### 9.1 当前项目推荐配置（Phase 1）

```json
{
  "frontend": {
    "framework": "React 18",
    "buildTool": "Vite 5",
    "router": "React Router 6",
    "state": "React Context + useState",
    "styling": "CSS Modules",
    "language": "JavaScript (可选 TypeScript)"
  },
  "backend": null,
  "deployment": "Vercel / Nginx"
}
```

### 9.2 未来扩展配置（Phase 2+）

```json
{
  "frontend": {
    "framework": "React 18 + TypeScript",
    "uiLibrary": "Ant Design",
    "charts": "Recharts",
    "forms": "React Hook Form + Zod"
  },
  "backend": {
    "runtime": "Node.js 20",
    "framework": "Express",
    "orm": "Prisma",
    "database": "PostgreSQL"
  },
  "ai": {
    "sdk": "Vercel AI SDK",
    "provider": "OpenAI / Anthropic"
  }
}
```

---

*文档生成时间：2026-04-17*
*维护者：开发团队*
