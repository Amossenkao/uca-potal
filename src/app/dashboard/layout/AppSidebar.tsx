"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../../context/SidebarContext";
import { getNavItems } from "@/utils/utils";
import { ChevronDown } from "lucide-react";
import useAuth from "@/store/useAuth";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import {useDashboardNavigator} from "@/store/useDashboardNavigator"

const NavigationSkeleton: React.FC<{ isExpanded: boolean; isHovered: boolean; isMobileOpen: boolean }> = ({ 
  isExpanded, 
  isHovered, 
  isMobileOpen 
}) => (
  <ul className="flex flex-col gap-4">
    {[1, 2, 3, 4, 5].map((index) => (
      <li key={index} className="animate-pulse">
        <div className={`menu-item ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}>
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <div className="ml-3 h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1 max-w-[120px]"></div>
          )}
        </div>
      </li>
    ))}
  </ul>
);

const AppSidebar: React.FC = () => {
  const router = useRouter()
  const { isLoggedIn, user, isLoading, loadFromStorage, logout } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  const { currentView, setView } = useDashboardNavigator()
  
  
  useEffect(() => {
    const initializeAuth = async () => {
      loadFromStorage();
      setIsInitializing(false);
    };

    initializeAuth();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!isInitializing && !isLoading && (!isLoggedIn || !user)) {
      router.push("/login");
    }
  }, [isInitializing, isLoading, isLoggedIn, user, router]);

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((href: string) => href === pathname, [pathname]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev?.index === index ? null : { type: "main", index }));
  };

  // Only get navItems when not loading
  const navItems = (isInitializing || isLoading || !isLoggedIn || !user) 
    ? [] 
    : getNavItems(user.role);

  const role = (isInitializing || isLoading || !isLoggedIn || !user) 
    ? 'default' 
    : user.role;

  useEffect(() => {
    if (navItems.length > 0) {
      navItems.forEach((nav, index) => {
        nav.subItems?.forEach((subItem) => {
          if (isActive(subItem.href)) {
            setOpenSubmenu({ type: "main", index });
          }
        });
      });
    }
  }, [pathname, isActive, navItems]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `main-${openSubmenu.index}`;
      const ref = subMenuRefs.current[key];
      if (ref) {
        setSubMenuHeight((prev) => ({ ...prev, [key]: ref.scrollHeight }));
      }
    }
  }, [openSubmenu]);

const renderMenuItems = (items: NavItem[]) => (
  <ul className="flex flex-col gap-4">
    {items
      .filter((item) => {
        if (item.excludeRoles?.includes(role)) return false;

        if (item.roles && !item.roles.includes(role)) return false;

        return true;
      })
      .map((item, index) => {

        const subItems = item.subItems?.filter((sub) => {
          if (sub.excludeRoles?.includes(role)) return false;
          if (sub.roles && !sub.roles.includes(role)) return false;
          return true;
        });

        if (item.subItems && (!subItems || subItems.length === 0)) {
          return null;
        }

        return (
          <li key={item.name} className={item.disabled ? "hidden" : undefined}
            onClick={subItems ? undefined : async (e) => {
              e.preventDefault();
              setView(item.id);
              if (item.name.toLowerCase() === "logout") {
                await logout();
              }
              
           }}>
            {subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index)}
                className={`menu-item group ${
                  openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"
                } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              >
                <span
                  className={`${
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{item.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDown
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""
                    }`}
                  />
                )}
              </button>
            ) : item.href ? (
              <Link
                href={item.href}
                className={`menu-item group ${
                  isActive(item.href) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(item.href) ? "menu-item-icon-active" : "menu-item-icon-inactive"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{item.name}</span>
                )}
              </Link>
            ) : null}

            {subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`main-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.index === index
                      ? `${subMenuHeight[`main-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {subItems.map((sub) => (
                    <li key={sub.name}>

                      <Link
                        href={sub.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setView(sub.id);
                          
                        }}
                        className={`menu-dropdown-item flex items-center gap-2 ${
                          currentView == sub.id
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {sub.icon && <sub.icon className="w-4 h-4" />}
                        <span>{sub.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
  </ul>
);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 ${
        isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <Logo/>
          ) : (
            <img src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" alt="Logo" width={70} height={70} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          {(isInitializing || isLoading) ? (
            <NavigationSkeleton 
              isExpanded={isExpanded} 
              isHovered={isHovered} 
              isMobileOpen={isMobileOpen} 
            />
          ) : (
            renderMenuItems(navItems)
          )}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;