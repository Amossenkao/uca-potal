import type { LucideIcon } from "lucide-react";


export interface NavItem {
  name: string;
  icon: LucideIcon;
  roles?: string[];
  excludeRoles?: string[];
  href?: string;
  disabled?: boolean;
  subItems?: { name: string; href: string; icon?: LucideIcon; roles?: string[], excludeRoles?: string[]}[];
}
