import {
  MessageCircle,
  Users,
  GraduationCap,
  BookOpen,
  Shield,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  UserCircle,
  CalendarDays,
  FilePen,
  Wallet,
  ClipboardList,
  FileText,
  Medal,
  CheckSquare,
  Library,
  School,
} from "lucide-react";

// Utility to convert name to id
const toId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export const NAV_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    id: toId("Dashboard"),
    href: "#",
  },
  {
    name: "Manage Users",
    icon: Users,
    roles: ["system_admin"],
    href: "#",
    id: toId("Manage Users")
  },
  {
    name: "Admissions",
    icon: Users,
    roles: ["registrar"],
    href: "/",
    subItems: [
      { name: "View Applications", id: toId("View Applications"), icon: GraduationCap, href: "/" },
      { name: "Admit New Student", id: toId("Admit New Student"), icon: BookOpen, href: "/" },
    ],
  },
  {
    name: "Financial Reports",
    icon: Users,
    roles: ["administration"],
    positions: ["cashir"],
    id: toId("Financial Reports"),
    href: "/",
  },
  {
    name: "Fees Payment",
    icon: Wallet,
    roles: ["student"],
    href: "/",
    subItems: [
      { name: "Pay fees", id: toId("Pay fees"), icon: FilePen, href: "/" },
      { name: "View Financial Profile", id: toId("View Financial Profile"), icon: FilePen, href: "/" },
    ],
  },

  {
    name: "Grading",
    icon: CheckSquare,
    roles: ["system_admin", "teacher", "student"],
    href: "/",
    subItems: [
      { name: "Add Grades", id: toId("Add Grades"), icon: FilePen, roles: ["teacher"], href: "/" },
      { name: "Submit Grades", id: toId("Submit Grades"), icon: FilePen, roles: ["teacher"], href: "/" },
      { name: "View Grades", id: toId("View Grades"), icon: FileText, href: "/" },
      { name: "Approve or Reject Grades", id: toId("Approve or Reject Grades"), icon: FileText, roles: ["system_admin"], href: "/" },
    ],
  },
  {
    name: "Lesson Plans",
    icon: FileText,
    roles: ["teacher", "system_admin"],
    href: "/",
    subItems: [
      { name: "Submit Lesson Plan", id: toId("Submit Lesson Plan"), icon: FilePen, roles: ["teacher"], href: "/" },
      { name: "Submit Scheme of Work", id: toId("Submit Scheme of Work"), icon: ClipboardList, roles: ["teacher"], href: "/" },
      { name: "Manage Lesson Plans", id: toId("Manage Lesson Plans"), icon: FileText, roles: ["teacher"], href: "/" },
      { name: "View Lesson Plans", id: toId("View Lesson Plans"), icon: FileText, roles: ["system_admin"], href: "/" },
      { name: "View Scheme of Work", id: toId("View Scheme of Work"), icon: FileText, roles: ["system_admin"], href: "/" },
    ],
  },
  {
    name: "Classes",
    icon: ClipboardList,
    roles: ["system_admin"],
    href: "/",
    subItems: [
      { name: "Overview", id: toId("Overview"), icon: ClipboardList, href: "/" },
      { name: "Manage Classes", id: toId("Manage Classes"), icon: FilePen, href: "/" },
      { name: "Master Grade Sheets", id: toId("Master Grade Sheets"), icon: FileText, href: "/" },
    ],
  },
  {
    name: "Scholarships & Wards",
    icon: Medal,
    roles: ["registrar"],
    href: "/",
    subItems: [
      { name: "Manage Scholarships", id: toId("Manage Scholarships"), icon: Medal, href: "/" },
      { name: "Ward Student", id: toId("Ward Student"), icon: Users, href: "/" },
    ],
  },
  {
    name: "Academic Reports",
    icon: FileText,
    roles: ["system_admin"],
    href: "/",
    subItems: [
      { name: "Periodic Reports", id: toId("Periodic Reports"), icon: FileText, href: "/" },
      { name: "Yearly Reports", id: toId("Yearly Reports"), icon: FileText, href: "/" },
      { name: "Other Reports", id: toId("Other Reports"), icon: FileText, href: "/" },
    ],
  },
  {
    name: "Salary",
    icon: Wallet,
    excludeRoles: ["student", "supervisor", "proprietor"],
    href: "/",
    subItems: [
      { name: "Request Salary Advance", id: toId("Request Salary Advance"), icon: Wallet, href: "/" },
      { name: "Sign for Salary", id: toId("Sign for Salary"), icon: FilePen, href: "/" },
    ],
  },
  {
    name: "Salary Payments",
    icon: Wallet,
    roles: ["proprietor"],
    href: "/",
    subItems: [
      { name: "Pay Salaries", id: toId("Pay Salaries"), icon: Wallet, href: "/" },
      { name: "Salary Requests", id: toId("Salary Requests"), icon: FilePen, href: "/" },
    ],
  },
  {
    name: "Employees",
    icon: Wallet,
    roles: ["proprietor"],
    href: "/",
    subItems: [
      { name: "Teachers", id: toId("Teachers"), icon: Wallet, href: "/" },
      { name: "Administrative Staff", id: toId("Administrative Staff"), icon: FilePen, href: "/" },
      { name: "Other Employees", id: toId("Other Employees"), icon: FilePen, href: "/" },
    ],
  },
  {
    name: "Student",
    icon: Wallet,
    roles: ["proprietor"],
    id: toId("Student"),
    href: "/",
  },
  {
    name: "Calendar & Schedules",
    icon: CalendarDays,
    href: "/",
    subItems: [
      { name: "Add Event to Calendar", id: toId("Add Event to Calendar"), icon: CalendarDays, roles: ["system_admin"], href: "/" },
      { name: "Academic Calendar", id: toId("Academic Calendar"), icon: CalendarDays, href: "/" },
      { name: "Class Schedule", id: toId("Class Schedule"), icon: CalendarDays, href: "/" },
      { name: "Exam Schedule", id: toId("Exam Schedule"), icon: CalendarDays, href: "/" },
    ],
  },
  {
    name: "Academic Resources",
    icon: Library,
    href: "/",
    subItems: [
      { name: "View Resources", id: toId("View Resources"), icon: FilePen, href: "/" },
      { name: "Add a Resource", id: toId("Add a Resource"), icon: FilePen, roles: ["system_admin", "vpa", "teacher"], href: "/" },
      { name: "Manage Resources", id: toId("Manage Resources"), icon: FileText, roles: ["system_admin", "vpa", "teacher"], href: "/" },
    ],
  },
  {
    name: "School Profile",
    icon: School,
    roles: ["supervisor", "proprietor"],
    href: "/",
    subItems: [
      { name: "Edit Profile", id: toId("Edit Profile"), icon: FilePen, href: "/" },
      { name: "Manage Info", id: toId("Manage Info"), icon: FileText, href: "/" },
    ],
  },
  {
    name: "Messages",
    icon: MessageCircle,
    id: toId("Messages"),
    href: "/",
    roles: ["system_admin"]
  },
  {
    name: "User Profile",
    icon: UserCircle,
    id: toId("User Profile"),
    href: "/",
  },
  {
    name: "Logout",
    icon: LogOut,
    id: toId("Logout"),
    href: "/",
  },
];
