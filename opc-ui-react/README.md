# OPC UI React

OPC AI运营官系统 - React 版本

从纯静态 HTML 项目迁移到 React + Vite 架构。

## 项目信息

- **创建时间**: 2026-04-17
- **技术栈**: React 18 + Vite 5 + React Router 6
- **开发服务器**: http://localhost:3001

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 组件
│   ├── layout/         # 布局组件（TopBar, Sidebar, AppShell）
│   ├── ui/             # UI 组件
│   └── features/       # 功能组件
├── pages/              # 页面组件
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── assets/             # 静态资源
└── types/              # TypeScript 类型定义
```

## 主要功能

- ✅ 响应式布局（TopBar + Sidebar）
- ✅ 路由管理（13个页面）
- ✅ 状态持久化（localStorage）
- ✅ 客户关系管理（CRM）
- ✅ 财务分析
- ⏳ 其他页面（开发中）

## 开发指南

### 路径别名

已配置以下路径别名，可直接使用：

```javascript
import { TopBar } from '@components/layout';
import { Home } from '@pages';
import { useLocalStorage } from '@hooks';
```

### 新增页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/App.jsx` 添加路由
3. 如需导航，在 `src/utils/navigationConfig.js` 添加配置

### 使用自定义 Hook

```javascript
import { useLocalStorage } from '@hooks';

const [state, setState] = useLocalStorage('key', defaultValue);
```

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 |
| 构建工具 | Vite 5 |
| 路由 | React Router 6 |
| 状态管理 | React Context + useState |
| 工具库 | dayjs, clsx, nanoid |
| 样式 | CSS (原项目迁移) |

## 相关文档

- [迁移计划](../MIGRATION_PLAN.md)
- [技术栈说明](../TECH_STACK.md)
- [搭建完成报告](./SETUP_SUMMARY.md)

## 后端开发

当前版本使用 localStorage 存储，无需后端。

如需添加后端，参考 [TECH_STACK.md](../TECH_STACK.md) 第三章后端技术栈。

## 许可证

Copyright © 2026
