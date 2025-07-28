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
  studentIds: string[];
  teacherIds: string[];
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

export interface StudentGrade {
  academicYear: string;
  firstPeriod: {teacherId: string; teacher: string; grade: number }[],
  secondPeriod: {teacherId: string; teacher: string; grade: number }[],
  thirdPeriod: {teacherId: string; teacher: string; grade: number }[],
  ThirdPeriodExam: {teacherId: string; teacher: string; grade: number }[],
  firstSemesterAverage: {teacherId: string; teacher: string; grade: number }[],
  fourthPeriod: {teacherId: string; teacher: string; grade: number }[],
  fifthPeriod: {teacherId: string; teacher: string; grade: number }[],
  sixthPeriod: {teacherId: string; teacher: string; grade: number }[],
  secondSemesterExam: {teacherId: string; teacher: string; grade: number }[],
  secondSemesterAverage: {teacherId: string; teacher: string; grade: number }[],
  yearlyAverage: {studentId: string; student: string; grade: number }[],

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
  grades: StudentGrade[]
}

export interface TeacherSubject {
  subject: string;
  level: ClassLevel
}

export interface TeacherGrade {
  subject: string;
  academicYear: string;
  class: ClassId;
  className: string;
  firstPeriod: {studentId: string; student: string; grade: number }[],
  secondPeriod: {studentId: string; student: string; grade: number }[],
  thirdPeriod: {studentId: string; student: string; grade: number }[],
  ThirdPeriodExam: {studentId: string; student: string; grade: number }[],
  firstSemesterAverage: {studentId: string; student: string; grade: number }[],
  fourthPeriod: {studentId: string; student: string; grade: number }[],
  fifthPeriod: {studentId: string; student: string; grade: number }[],
  sixthPeriod: {studentId: string; student: string; grade: number }[],
  secondSemesterExam: {studentId: string; student: string; grade: number }[],
  secondSemesterAverage: {studentId: string; student: string; grade: number }[],
  yearlyAverage: {studentId: string; student: string; grade: number }[],
  
}

export interface Teacher extends User {
  role: 'teacher';
  teacherId: string;
  requiresOtp: false;
  subjects: TeacherSubject[];
  sponsorClass: ClassId | null;
  grades: TeacherGrade[];

}

export interface Administrator extends User {
  role: 'administrator';
  adminId: string;
  position: string;
  permissions: string[];
  requiresOtp: false;
}

export interface SystemAdmin extends User {
  role: 'system_admin';
  requiresOtp: true;
}

export interface GradeSubmission {
  id: string;
  teacherId: string;
  submissionDate: string;
  grades: TeacherGrade[];
  status: 'pending' | 'submitted' | 'approved' | "rejected";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  participants: 'all' | 'students' | 'teachers' | 'parents' | "administrators" | string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}