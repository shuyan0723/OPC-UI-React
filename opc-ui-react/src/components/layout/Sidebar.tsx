import { NavLink, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { navigationGroups } from '@utils/navigationConfig';
import { useLocalStorage } from '../../hooks';

interface PersonalizationItem {
  href: string;
  label: string;
  section: string;
}

/**
 * Sidebar - 侧边导航栏组件
 * 支持个性化定制的悬停子菜单（纯 CSS 实现）
 */
export function Sidebar() {
  const location = useLocation();
  const [groupState, setGroupState] = useLocalStorage<Record<string, boolean>>('opc_nav_group_state', {});
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number; left: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 个性化定制子菜单项
  const personalizationItems: PersonalizationItem[] = [
    { href: '/personalization#industry', label: '行业定制', section: 'industry' },
    { href: '/personalization#role', label: '角色定制', section: 'role' },
    { href: '/personalization#stage', label: '阶段定制', section: 'stage' },
  ];

  // 获取当前激活的路径
  const getCurrentPath = (): string => {
    const path = location.pathname;
    if (path === '/') return 'index.html';
    return path.replace(/^\//, '').replace(/\.html$/, '') || 'index.html';
  };

  const currentPath = getCurrentPath();

  // 判断分组是否应该展开（有激活项时自动展开）
  const isGroupExpanded = (group: typeof navigationGroups[0]): boolean => {
    if (groupState[group.key] !== undefined) {
      return groupState[group.key];
    }
    const hasActive = group.children.some((child) => child.href === currentPath);
    return hasActive || currentPath === 'index.html';
  };

  const toggleGroup = (key: string) => {
    setGroupState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 检查是否在个性化定制页面
  const isPersonalizationActive = currentPath === 'personalization';

  // 处理悬停时动态定位子菜单
  const handleMouseEnter = () => {
    // 清除延迟隐藏的定时器
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    // 计算并显示子菜单
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 8,
      });
    }
  };

  // 处理子菜单项点击，滚动到对应区域
  const handleSubmenuClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    // 隐藏子菜单
    setSubmenuPosition(null);
    // 跳转到页面
    window.location.href = `/personalization#${section}`;
  };

  // 全局鼠标追踪：检测鼠标是否在区域内
  useEffect(() => {
    if (!submenuPosition) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const target = e.target as Node;

      // 检查鼠标是否在父按钮内
      const isInParent = wrapperRef.current?.contains(target);

      // 检查鼠标是否在子菜单内
      const isInSubmenu = submenuRef.current?.contains(target);

      if (isInParent || isInSubmenu) {
        // 鼠标在区域内，取消隐藏定时器
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = null;
        }
      } else {
        // 鼠标在区域外，启动延迟隐藏
        if (!hoverTimerRef.current) {
          hoverTimerRef.current = setTimeout(() => {
            setSubmenuPosition(null);
          }, 300);
        }
      }
    };

    // 监听全局鼠标移动
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      // 清理定时器
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [submenuPosition]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="nav-group-title">主功能</div>
      <NavLink className="nav-item" to="/" end>
        总览首页
      </NavLink>

      {navigationGroups.map((group) => {
        const expanded = isGroupExpanded(group);

        return (
          <div key={group.key} className="nav-group-container">
            <button
              className="nav-group-toggle"
              aria-expanded={expanded}
              onClick={() => toggleGroup(group.key)}
            >
              {group.title}
              <span>{expanded ? '▾' : '▸'}</span>
            </button>
            <div className={`nav-sub ${expanded ? 'open' : ''}`} data-nav-sub={group.key}>
              {group.children.map((item) => {
                const isPersonalization = item.href === 'personalization';

                if (isPersonalization) {
                  return (
                    <div
                      key={item.href}
                      ref={wrapperRef}
                      className="nav-personalization-wrapper"
                      onMouseEnter={handleMouseEnter}
                    >
                      <NavLink
                        to={`/${item.href}`}
                        className={({ isActive }) =>
                          `nav-item nav-sub-item ${isActive ? 'active' : ''}`
                        }
                      >
                        {item.label}
                        <span className="submenu-arrow">▸</span>
                      </NavLink>
                      {submenuPosition && (
                        <>
                          {/* 透明桥：连接父按钮和子菜单，消除间隙 */}
                          <div
                            className="submenu-bridge"
                            style={{
                              position: 'fixed',
                              top: `${submenuPosition.top + 8}px`,
                              left: `${submenuPosition.left - 8}px`,
                              width: '8px',
                              height: 'calc(100% - 16px)',
                              pointerEvents: 'auto',
                            }}
                          />
                          <div
                            ref={submenuRef}
                            className="personalization-submenu"
                            style={{
                              top: `${submenuPosition.top}px`,
                              left: `${submenuPosition.left}px`,
                            }}
                          >
                            {personalizationItems.map((subItem) => (
                            <a
                              key={subItem.section}
                              href={subItem.href}
                              className="personalization-submenu-item"
                              onClick={(e) => handleSubmenuClick(e, subItem.section)}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              }

                return (
                  <NavLink
                    key={item.href}
                    className={({ isActive }) =>
                      `nav-item nav-sub-item ${isActive ? 'active' : ''}`
                    }
                    to={`/${item.href}`}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
