
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


export const NAV_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },

  {
    name: "Users",
    icon: Users,
    roles: ["vpi"],
    subItems: [
      { name: "Student", href: "/Student", icon: GraduationCap},
      { name: "Teacher", href: "/teachers", icon: BookOpen},
      { name: "Administrator", href: "/administrators", icon: Shield},
    ],
  },

    {
    name: "Admissions",
    icon: Users,
    roles: ["registrar"],
    subItems: [
      { name: "View Applications", href: "/Student", icon: GraduationCap},
      { name: "Admit New Student", href: "/teachers", icon: BookOpen},
    ],
  },

      {
    name: "Financial Reports",
    icon: Users,
     roles: ["administration"],
    positions: ["cashir"], 
    href: "/financial-reports"
  },

    {
    name: "Fees Payment",
      icon: Wallet,
    roles: ["student"],
    subItems: [
      { name: "Pay fees", href: "/grades/add", icon: FilePen },
      { name: "View Financial Profile", href: "/grades/submit", icon: FilePen },

    ],
  },

  {
    name: "Grading",
    icon: CheckSquare,
    roles: ['vpi', 'teacher', 'student', ],
    subItems: [
      { name: "Add Grades", href: "/grades/add", icon: FilePen, roles: ['teacher'] },
      { name: "Submit Grades", href: "/grades/submit", icon: FilePen, roles: ['teacher'] },
      { name: "View Grades", href: "/grades/view", icon: FileText },
      { name: "Approve or Reject Grades", href: "/grades/approve", icon: FileText, roles: ['vpi'] },
    ],
  },
  {
    name: "Lesson Plans",
    icon: FileText,
    roles: ['teacher', 'vpi'],
    subItems: [
      { name: "Submit Lesson Plan", href: "/lesson-plans/submit", icon: FilePen, roles: ['teacher'] },
      { name: "Submit Scheme of Work", href: "/lesson-plans/scheme", icon: ClipboardList, roles: ['teacher'] },
      { name: "Manage Lesson Plans", href: "/lesson-plans/view", icon: FileText, roles: ['teacher'] },
      { name: "View Lesson Plans", href: "/lesson-plans/view", icon: FileText, roles: ['vpi'] },
      { name: "View Scheme of Work", href: "/scheme-of-work/view", icon: FileText, roles: ['vpi'] },
    ],
  },
  {
    name: "Classes",
    icon: ClipboardList,
    roles: ["vpi"],
    subItems: [
      { name: "Overview", href: "/classes/overview", icon: ClipboardList },
      { name: "Manage Classes", href: "/classes/manage", icon: FilePen },
      { name: "Master Grade Sheets", href: "/classes/master-sheets", icon: FileText },
    ],
  },
  {
    name: "Scholarships & Wards",
    icon: Medal,
    roles: ["registrar"],
    subItems: [
      { name: "Manage Scholarships", href: "/scholarships/manage", icon: Medal },
      { name: "Ward Student", href: "/scholarships/recipients", icon: Users },
    ],
  },
  {
    name: "Academic Reports",
    icon: FileText,
    roles: ["vpi"],
    subItems: [
      { name: "Periodic Reports", href: "/reports/periodic", icon: FileText },
      { name: "Yearly Reports", href: "/reports/yearly", icon: FileText },
      { name: "Other Reports", href: "/reports/other", icon:FileText },
    ],
  },
  {
    name: "Salary",
    icon: Wallet,
    excludeRoles: ["student", "supervisor", "proprietor"],
    subItems: [
      { name: "Request Salary Advance", href: "/salary/advance", icon: Wallet },
      { name: "Sign for Salary", href: "/salary/sign", icon: FilePen },
    ],
  },

    {
    name: "Salary Payments",
    icon: Wallet,
    roles: ['proprietor'],
    subItems: [
      { name: "Pay Salaries", href: "/salary/advance", icon: Wallet },
      { name: "Salary Requests", href: "/salary/sign", icon: FilePen },
    ],
  },

  {
    name: "Employees",
    icon: Wallet,
    roles: ['proprietor'],
    subItems: [
      { name: "Teachers", href: "/salary/advance", icon: Wallet },
      { name: "Administrative Staff", href: "/salary/sign", icon: FilePen },
      { name: "Other Employees", href: "/salary/sign", icon: FilePen },
    ],
  },

  {
    name: "Student",
    icon: Wallet,
      roles: ['proprietor'],
    href: "/Student"
  },
  
  
  {
    name: "Calendar & Schedules",
    icon: CalendarDays,
    subItems: [
    { name: "Add Event to Calendar", href: "/calendar/academic", icon: CalendarDays, roles: ['vpi'] },
      { name: "Academic Calendar", href: "/calendar/academic", icon: CalendarDays },
      { name: "Class Schedule", href: "/calendar/classes", icon: CalendarDays },
      { name: "Exam Schedule", href: "/calendar/exams", icon: CalendarDays },
    ],
  },
  {
    name: "Academic Resources",
    icon: Library,
    subItems: [
      { name: "View Resources", href: "/resources/add", icon: FilePen },
      { name: "Add a Resource", href: "/resources/add", icon: FilePen, roles: ["vpi", "vpa", "teacher"]},
      { name: "Manage Resources", href: "/resources/manage", icon: FileText, roles: ["vpi", "vpa", "teacher"]},
    ],
  },
  {
    name: "School Profile",
    icon: School,
    roles: ["supervisor", "proprietor"],
    subItems: [
      { name: "Edit Profile", href: "/school/edit", icon: FilePen },
      { name: "Manage Info", href: "/school/info", icon: FileText },
    ],
  },
  {
    name: "Messages",
    icon: MessageCircle,
    href: "/messages",
  },
  {
    name: "User Profile",
    icon: UserCircle,
    href: "/profile",
  },
  {
    name: "Logout",
    icon: LogOut,
    href: "/logout",
  },
];
