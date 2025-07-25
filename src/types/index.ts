import type { LucideIcon } from "lucide-react";



interface SchoolNavItem {
  name: string;
  icon?: LucideIcon;
  href?: string;
  subItems?: { name: string; href: string; icon?: LucideIcon }[]

}

interface SchoolHomepageSection {
  
}

export interface School {
  id: string;
  name: string;
  homePage?: boolean;
  navItems?: SchoolNavItem[];
}

export interface UserInfo {
  id: string;
  role: string;
  subRole?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: string;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  guardian?: {
    firstName: string;
    middleName: string;
    lastName: string;
    email?: string;
    phone: string;
    address: string;
    photo?: string;
  }

}

interface UserNavItem {
  name: string;
  icon: LucideIcon;
  roles?: string[];
  excludeRoles?: string[];
  href?: string;
  disabled?: boolean;
  subItems?: { name: string; href: string; icon?: LucideIcon; roles?: string[], excludeRoles?: string[]}[];
}
