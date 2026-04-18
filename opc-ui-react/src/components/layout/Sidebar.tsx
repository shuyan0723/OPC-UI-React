import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { navigationGroups } from '@utils/navigationConfig';
import { useLocalStorage } from '@hooks';

interface PersonalizationItem {
  href: string;
  label: string;
  section: string;
}

/**
 * Sidebar - 侧边导航栏组件
 * 支持个性化设置的悬停子菜单
 */
export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [groupState, setGroupState] = useLocalStorage<Record<string, boolean>>('opc_nav_group_state', {});
  const [personalizationHover, setPersonalizationHover] = useState<boolean>(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  // 个性化设置子菜单项
  const personalizationItems: PersonalizationItem[] = [
    { href: '/personalization?section=industry', label: '行业定制', section: 'industry' },
    { href: '/personalization?section=role', label: '角色定制', section: 'role' },
    { href: '/personalization?section=stage', label: '阶段定制', section: 'stage' },
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

  // 处理个性化设置悬停
  const handlePersonalizationMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setPersonalizationHover(true);
  };

  const handlePersonalizationMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // 延迟隐藏，允许用户移动到子菜单
    hoverTimeoutRef.current = setTimeout(() => {
      setPersonalizationHover(false);
    }, 200);
  };

  const handleSubmenuMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setPersonalizationHover(true);
  };

  const handleSubmenuMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setPersonalizationHover(false);
    }, 200);
  };

  // 处理个性化子菜单点击（只有点击才导航）
  const handlePersonalizationClick = (e: React.MouseEvent, item: PersonalizationItem) => {
    e.preventDefault();
    e.stopPropagation();
    setPersonalizationHover(false);
    navigate(item.href);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // 检查是否在个性化设置页面
  const isPersonalizationActive = currentPath === 'personalization';

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
                      className="nav-personalization-wrapper"
                      onMouseEnter={handlePersonalizationMouseEnter}
                      onMouseLeave={handlePersonalizationMouseLeave}
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
                      {personalizationHover && (
                        <div
                          ref={submenuRef}
                          className="personalization-submenu"
                          onMouseEnter={handleSubmenuMouseEnter}
                          onMouseLeave={handleSubmenuMouseLeave}
                        >
                          {personalizationItems.map((subItem) => (
                            <button
                              key={subItem.section}
                              className="personalization-submenu-item"
                              onClick={(e) => handlePersonalizationClick(e, subItem)}
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
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
