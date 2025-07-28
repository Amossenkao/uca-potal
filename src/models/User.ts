import mongoose, { Schema, Document } from 'mongoose';

// Enums and Types
export type UserRole = 'student' | 'teacher' | 'administrator' | 'system_admin';
export type ClassLevel = "Self Contained" | "Elementry" | "Junior High" | "Senior High";
export type ClassId = "nusury" | "kOne" | "kTwo" | "one" | "two" | "three" | "four" | "five" |
  "six" | "seven" | "eight" | "nine" | "thenOne" | "tenTwo" |
  "elevenOne" | "elevenTwo" | "twelveOne" | "twelveTwo";

const MessageSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const GuardianSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});

const TeacherSubjectSchema = new Schema({
  subject: { type: String, required: true },
  level: { 
    type: String, 
    enum: ["Self Contained", "Elementry", "Junior High", "Senior High"],
    required: true 
  }
});

const GradeEntrySchema = new Schema({
  studentId: { type: String },
  student: { type: String },
  teacherId: { type: String },
  teacher: { type: String },
  grade: { type: Number, min: 60, max: 100 }
});

const StudentGradeSchema = new Schema({
  academicYear: { type: String, required: true },
  firstPeriod: [GradeEntrySchema],
  secondPeriod: [GradeEntrySchema],
  thirdPeriod: [GradeEntrySchema],
  ThirdPeriodExam: [GradeEntrySchema],
  firstSemesterAverage: [GradeEntrySchema],
  fourthPeriod: [GradeEntrySchema],
  fifthPeriod: [GradeEntrySchema],
  sixthPeriod: [GradeEntrySchema],
  secondSemesterExam: [GradeEntrySchema],
  secondSemesterAverage: [GradeEntrySchema],
  yearlyAverage: [GradeEntrySchema]
});

const TeacherGradeSchema = new Schema({
  subject: { type: String, required: true },
  academicYear: { type: String, required: true },
  class: { 
    type: String, 
    enum: ["nusury", "kOne", "kTwo", "one", "two", "three", "four", "five",
           "six", "seven", "eight", "nine", "thenOne", "tenTwo",
           "elevenOne", "elevenTwo", "twelveOne", "twelveTwo"],
    required: true 
  },
  className: { type: String, required: true },
  firstPeriod: [GradeEntrySchema],
  secondPeriod: [GradeEntrySchema],
  thirdPeriod: [GradeEntrySchema],
  ThirdPeriodExam: [GradeEntrySchema],
  firstSemesterAverage: [GradeEntrySchema],
  fourthPeriod: [GradeEntrySchema],
  fifthPeriod: [GradeEntrySchema],
  sixthPeriod: [GradeEntrySchema],
  secondSemesterExam: [GradeEntrySchema],
  secondSemesterAverage: [GradeEntrySchema],
  yearlyAverage: [GradeEntrySchema]
});

// Base User Schema
const BaseUserSchema = new Schema({
  userId: { type: String, unique: true, required: true }, // Custom user ID
  role: { 
    type: String, 
    enum: ['student', 'teacher', 'administrator', 'system_admin'],
    required: true 
  },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  gender: { type: String, require: true},
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nickName: { type: String },
  dateOfBirth: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  mustChangePassword: { type: Boolean, default: true },
  requiresOtp: { type: Boolean, default: false },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },
  avatar: { type: String },
  messages: [MessageSchema],
  lockedUntil: { type: Date }
}, {
  timestamps: true,
  discriminatorKey: 'role'
});

const User = mongoose.model('User', BaseUserSchema);

// Student Schema
const StudentSchema = new Schema({
  studentId: { type: String, unique: true, required: true },
  classId: { 
    type: String, 
    enum: ["nusury", "kOne", "kTwo", "one", "two", "three", "four", "five",
           "six", "seven", "eight", "nine", "thenOne", "tenTwo",
           "elevenOne", "elevenTwo", "twelveOne", "twelveTwo"],
    required: true 
  },
  currentClass: { type: String },
  grade: { type: String },
  status: { type: String, enum: ["enrolled", "dropped", "transfered", "graduated"], default: 'enrolled' },
  guardian: { type: GuardianSchema, required: true },
  grades: [StudentGradeSchema]
});

// Teacher Schema
const TeacherSchema = new Schema({
  teacherId: { type: String, unique: true, required: true },
  subjects: [TeacherSubjectSchema],
  isSponsor: { type: Boolean, default: false },
  sponsorClass: { 
    type: String, 
    enum: ["nusury", "kOne", "kTwo", "one", "two", "three", "four", "five",
           "six", "seven", "eight", "nine", "thenOne", "tenTwo",
           "elevenOne", "elevenTwo", "twelveOne", "twelveTwo"],
    default: null 
  },
  grades: [TeacherGradeSchema]
});

const AdministratorSchema = new Schema({
  adminId: { type: String, unique: true, required: true },
  position: { type: String, required: true },
});

// System Admin Schema
const SystemAdminSchema = new Schema({
  systemAdminId: { type: String, unique: true, required: true },
  lastLogin: { type: Date },
  loginAttempts: { type: Number, default: 0 },
});

// Set requiresOtp defaults based on role
StudentSchema.add({ requiresOtp: { type: Boolean, default: false } });
TeacherSchema.add({ requiresOtp: { type: Boolean, default: false } });
AdministratorSchema.add({ requiresOtp: { type: Boolean, default: false } });
SystemAdminSchema.add({ requiresOtp: { type: Boolean, default: true } });

// Create discriminator models
const Student = User.discriminator('student', StudentSchema);
const Teacher = User.discriminator('teacher', TeacherSchema);
const Administrator = User.discriminator('administrator', AdministratorSchema);
const SystemAdmin = User.discriminator('system_admin', SystemAdminSchema);

// Interfaces for TypeScript
export interface IStudent extends Document {
  userId: string;
  role: 'student';
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: Date;
  isActive: boolean;
  mustChangePassword: boolean;
  requiresOtp: boolean;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  avatar?: string;
  messages: any[];
  studentId: string;
  classId: ClassId;
  currentClass?: string;
  grade?: string;
  status: string;
  guardian: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    phone: string;
    address: string;
  };
  grades: any[];
}

export interface ITeacher extends Document {
  userId: string;
  role: 'teacher';
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: Date;
  isActive: boolean;
  mustChangePassword: boolean;
  requiresOtp: boolean;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  avatar?: string;
  messages: any[];
  teacherId: string;
  subjects: { subject: string; level: ClassLevel }[];
  isSponsor: boolean;
  sponsorClass: ClassId | null;
  department?: string;
  qualification?: string;
  experience?: number;
  employmentStatus: string;
  grades: any[];
}

export interface IAdministrator extends Document {
  userId: string;
  role: 'administrator';
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: Date;
  isActive: boolean;
  mustChangePassword: boolean;
  requiresOtp: boolean;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  avatar?: string;
  messages: any[];
  adminId: string;
  employeeId: string;
  position: string;
  permissions: string[];
  department?: string;
  qualification?: string;
  experience?: number;
  employmentStatus: string;
}

export interface ISystemAdmin extends Document {
  userId: string;
  role: 'system_admin';
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: Date;
  isActive: boolean;
  mustChangePassword: boolean;
  requiresOtp: boolean;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  avatar?: string;
  messages: any[];
  systemAdminId: string;
  employeeId: string;
  permissions: string[];
  department: string;
  qualification?: string;
  experience?: number;
  employmentStatus: string;
  lastLogin?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}

// Pre-save middleware to generate IDs
StudentSchema.pre('save', async function(next) {
  if (!this.studentId) {
    const count = await Student.countDocuments();
    this.studentId = `STU${String(count + 1).padStart(6, '0')}`;
  }
  if (!this.userId) {
    this.userId = this.studentId;
  }
  next();
});

TeacherSchema.pre('save', async function(next) {
  if (!this.teacherId) {
    const count = await Teacher.countDocuments();
    this.teacherId = `TEA${String(count + 1).padStart(6, '0')}`;
  }
  if (!this.userId) {
    this.userId = this.teacherId;
  }
  next();
});

AdministratorSchema.pre('save', async function(next) {
  if (!this.adminId) {
    const count = await Administrator.countDocuments();
    this.adminId = `ADM${String(count + 1).padStart(6, '0')}`;
  }
  if (!this.employeeId) {
    this.employeeId = this.adminId;
  }
  if (!this.userId) {
    this.userId = this.adminId;
  }
  next();
});

SystemAdminSchema.pre('save', async function(next) {
  if (!this.systemAdminId) {
    const count = await SystemAdmin.countDocuments();
    this.systemAdminId = `SYS${String(count + 1).padStart(6, '0')}`;
  }
  if (!this.employeeId) {
    this.employeeId = this.systemAdminId;
  }
  if (!this.userId) {
    this.userId = this.systemAdminId;
  }
  next();
});

// Indexes for better performance
BaseUserSchema.index({ username: 1 });
BaseUserSchema.index({ email: 1 });
BaseUserSchema.index({ role: 1 });
BaseUserSchema.index({ isActive: 1 });

StudentSchema.index({ studentId: 1 });
StudentSchema.index({ classId: 1 });

TeacherSchema.index({ teacherId: 1 });
TeacherSchema.index({ 'subjects.subject': 1 });
TeacherSchema.index({ sponsorClass: 1 });

AdministratorSchema.index({ adminId: 1 });
AdministratorSchema.index({ employeeId: 1 });
AdministratorSchema.index({ position: 1 });

SystemAdminSchema.index({ systemAdminId: 1 });
SystemAdminSchema.index({ employeeId: 1 });

export { User, Student, Teacher, Administrator, SystemAdmin };