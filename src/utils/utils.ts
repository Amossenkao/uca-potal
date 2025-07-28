import { NAV_ITEMS } from "./navItems";

export function getNavItems(role: string) {

  
  return NAV_ITEMS
    .filter((navItem) => {
      if (navItem.excludeRoles?.includes(role)) return false;

      if (navItem.roles && !navItem.roles.includes(role)) return false;

      return true;
    })
    .map((item) => {
      if (item.subItems) {
        const visibleSubItems = item.subItems.filter((sub) => {
          if (sub.excludeRoles?.includes(role)) return false;
          if (sub.roles && !sub.roles.includes(role)) return false;
          return true;
        });

        if (visibleSubItems.length === 0) {
          return null;
        }

        return {
          ...item,
          subItems: visibleSubItems,
        };
      }

      return item;
    })
    .filter(Boolean);
}