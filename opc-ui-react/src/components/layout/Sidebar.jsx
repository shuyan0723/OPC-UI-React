import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigationGroups } from '@utils/navigationConfig';
import { useLocalStorage } from '@hooks';

/**
 * Sidebar - 侧边导航栏组件
 */
export function Sidebar() {
  const location = useLocation();
  const [groupState, setGroupState] = useLocalStorage('opc_nav_group_state', {});

  // 获取当前激活的路径
  const getCurrentPath = () => {
    const path = location.pathname;
    if (path === '/') return 'index.html';
    return path.replace(/^\//, '').replace(/\.html$/, '') || 'index.html';
  };

  const currentPath = getCurrentPath();

  // 判断分组是否应该展开（有激活项时自动展开）
  const isGroupExpanded = (group) => {
    if (groupState[group.key] !== undefined) {
      return groupState[group.key];
    }
    const hasActive = group.children.some((child) => child.href === currentPath);
    return hasActive || currentPath === 'index.html';
  };

  const toggleGroup = (key) => {
    setGroupState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <aside className="sidebar">
      <div className="nav-group-title">主功能</div>
      <NavLink className="nav-item" to="/" end>
        总览首页
      </NavLink>

      {navigationGroups.map((group) => {
        const expanded = isGroupExpanded(group);

        return (
          <div key={group.key}>
            <button
              className="nav-group-toggle"
              aria-expanded={expanded}
              onClick={() => toggleGroup(group.key)}
            >
              {group.title}
              <span>{expanded ? '▾' : '▸'}</span>
            </button>
            <div className={`nav-sub ${expanded ? 'open' : ''}`} data-nav-sub={group.key}>
              {group.children.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    `nav-item nav-sub-item ${isActive ? 'active' : ''}`
                  }
                  to={`/${item.href}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
