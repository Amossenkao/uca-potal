import { NAV_ITEMS } from "./navItems";
import { NavItem } from "@/types";



export function getNavItems(role: string): NavItem[] {
  return NAV_ITEMS
    .filter((NAV_ITEMS) => {
      if (NAV_ITEMS.excludeRoles?.includes(role)) return false;

      if (NAV_ITEMS.roles && !NAV_ITEMS.roles.includes(role)) return false;

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
    .filter(Boolean) as NavItem[];
}

export function getUserDetails(id: string){}
