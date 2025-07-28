import type { LucideIcon } from "lucide-react";

interface SchoolNavItem {
  name: string;
  icon?: LucideIcon;
  href?: string;
  subItems?: { name: string; href: string; icon?: LucideIcon }[]

}

export type UserRole = 'student' | 'teacher' | 'administrator' | 'system_admin';
export type ClassLevel = "Self Contained" | "Elementry" | "Junior High" | "Senior High"
export type ClassId = "nusury" | "kOne" | "kTwo" | "one" | "two" | "three" | "four" | "five" |
  "six" | "seven" | "eight" | "nine" | "thenOne" | "tenTwo" |
  "elevenOne" | "elevenTwo" | "twelveOne" | "twelveTwo"

export interface School {
  id: string;
  name: string;
  homePage?: boolean;
  logos: string[];
  navItems?: SchoolNavItem[];
  administrators: [];
}

export interface ClassSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string;
  endTime: string;
  subject: string;
}

export interface Class {
  classId: ClassId;
  name: string;
  level: ClassLevel;
  sponsorId: string;
  schedule: ClassSchedule;
}

export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: string;
  isActive: boolean;
  mustChangePassowrd: boolean;
  requiresOtp: boolean;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  avatar?: string;
  messages: Message[];

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

export interface Student extends User {
  role: 'student';
  studentId: string;
  classId: ClassId;
  requiresOtp: false;
  guardian: {
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  phone: string;
  address: string;
  
  },

  grades: any[]
}

export interface TeacherSubject {
  subject: string;
  level: ClassLevel
}

export interface TeacherGrade {
  subject: string;
  academicYear: string;
  class: ClassId;
}

export interface Teacher extends User {
  role: 'teacher';
  teacherId: string;
  requiresOtp: false;
  subjects: TeacherSubject[];
  sponsorClass: ClassId | null;
  grades: TeacherGrade[];

}

export interface Admin extends User {
  role: 'admin';
  adminId: string;
  department: string;
  permissions: string[];
}

export interface SystemAdmin extends User {
  role: 'system_admin';
  permissions: string[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionDate: string;
  content: string;
  attachments?: string[];
  marks?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  target: 'all' | 'students' | 'teachers' | 'admins' | string;
}

export interface Attendance {
  id: string;
  date: string;
  courseId: string;
  records: AttendanceRecord[];
}

export interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remark?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId?: string;
  examId?: string;
  score: number;
  outOf: number;
  type: 'assignment' | 'exam' | 'quiz' | 'project' | 'other';
  date: string;
  feedback?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  courseId: string;
  date: string;
  duration: number; // in minutes
  totalMarks: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  organizer: string;
  participants: 'all' | 'students' | 'teachers' | 'parents' | string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}