import mongoose, { Schema, Document, Model } from 'mongoose';

// Common interfaces and schemas
interface BaseUser {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female';
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: Date;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const defaultAcademicYear = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const dayOfMonth = date.getDate();
  const month = date.getMonth()

  if ((month == 9 && dayOfMonth >= 15) || month > 9) {
    return `${currentYear}/${currentYear + 1}`
  } else {
    return  `${currentYear - 1}/${currentYear}`
  }
}

// Guardian Schema (used for students)
const GuardianSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
}, { _id: false });

// Grade interfaces for students
interface PeriodGrade {
  subject: string;
  grade: number;
  teacherId: string;
  dateRecorded: Date;
}

interface StudentGrades {
  academicYear: string;
  firstPeriod?: PeriodGrade[];
  secondPeriod?: PeriodGrade[];
  thirdPeriod?: PeriodGrade[];
  firstSemesterExam?: PeriodGrade[];
  firstSemesterAverage?: PeriodGrade[];
  fourthPeriod?: PeriodGrade[];
  fifthPeriod?: PeriodGrade[];
  sixthPeriod?: PeriodGrade[];
  secondSemesterExam?: PeriodGrade[];
  secondSemesterAverage?: PeriodGrade[];
  yearlyAverage?: PeriodGrade[];
}

const PeriodGradeSchema = new Schema({
  subject: { type: String, required: true },
  grade: { type: Number, required: true, min: 0, max: 100 },
  teacherId: { type: String, required: true },
  dateRecorded: { type: Date, default: Date.now }
}, { _id: false });

const StudentGradesSchema = new Schema({
  academicYear: { type: String, required: true, default: defaultAcademicYear() },
  firstPeriod: [PeriodGradeSchema],
  secondPeriod: [PeriodGradeSchema],
  thirdPeriod: [PeriodGradeSchema],
  firstSemesterExam: [PeriodGradeSchema],
  firstSemesterAverage: [PeriodGradeSchema],
  fourthPeriod: [PeriodGradeSchema],
  fifthPeriod: [PeriodGradeSchema],
  sixthPeriod: [PeriodGradeSchema],
  secondSemesterExam: [PeriodGradeSchema],
  secondSemesterAverage: [PeriodGradeSchema],
  yearlyAverage: [PeriodGradeSchema]
}, { _id: false });

// ===============================
// STUDENT SCHEMA
// ===============================
export interface IStudent extends Document, BaseUser {
  role: 'student';
  studentId: string;
  grade: string;
  currentClass: string;
  guardian: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    phone: string;
    address: string;
  };
  academicRecords: StudentGrades[];
  enrollmentDate: Date;
  graduationDate?: Date;
  status: 'enrolled' | 'graduated' | 'transferred' | 'dropped';
}

const StudentSchema: Schema<IStudent> = new Schema({
  role: { type: String, required: true, default: 'student' },
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickName: { type: String },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  bio: { type: String },
  currentClass: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  academicRecords: [StudentGradesSchema],
  enrollmentDate: { type: Date, default: Date.now },
  graduationDate: { type: Date },
  status: { 
    type: String, 
    required: true, 
    enum: ['enrolled', 'graduated', 'transferred', 'dropped'],
    default: 'enrolled'
  },
  isActive: { type: Boolean, default: true },
  mustChangePassword: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  collection: 'students'
});

// ===============================================================
//                      TEACHER SCHEMA
// ===============================================================

interface TeacherSubject {
  subject: string;
  level: string; 
  classes: string[];
}

interface TeacherGradeEntry {
  studentId: string;
  studentName: string;
  grade: number;
  dateRecorded: Date;
  comments?: string;
}

interface TeacherGrades {
  academicYear: string;
  subject: string;
  class: string;
  firstPeriod?: TeacherGradeEntry[];
  secondPeriod?: TeacherGradeEntry[];
  thirdPeriod?: TeacherGradeEntry[];
  firstSemesterExam?: TeacherGradeEntry[];
  firstSemesterAverage?: TeacherGradeEntry[];
  fourthPeriod?: TeacherGradeEntry[];
  fifthPeriod?: TeacherGradeEntry[];
  sixthPeriod?: TeacherGradeEntry[];
  secondSemesterExam?: TeacherGradeEntry[];
  secondSemesterAverage?: TeacherGradeEntry[];
  yearlyAverage?: TeacherGradeEntry[];
}

export interface ITeacher extends Document, BaseUser {
  role: 'teacher';
  subjects: TeacherSubject[];
  isSponsor: boolean;
  sponsorClass?: string;
  gradeBooks: TeacherGrades[];
  hireDate: Date;
  department?: string;
  qualification: string;
  experience: number; // years of experience
  salary?: number;
  employmentStatus: 'active' | 'on_leave' | 'terminated' | 'retired';
}

const TeacherSubjectSchema = new Schema({
  subject: { type: String, required: true },
  level: { type: String, required: true },
  classes: [{ type: String }]
}, { _id: false });

const TeacherGradeEntrySchema = new Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  grade: { type: Number, required: true, min: 60, max: 100 },
  dateRecorded: { type: Date, default: Date.now },
  comments: { type: String }
}, { _id: false });

const TeacherGradesSchema = new Schema({
  academicYear: { type: String, required: true, default: defaultAcademicYear() },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  firstPeriod: [TeacherGradeEntrySchema],
  secondPeriod: [TeacherGradeEntrySchema],
  thirdPeriod: [TeacherGradeEntrySchema],
  firstSemesterExam: [TeacherGradeEntrySchema],
  firstSemesterAverage: [TeacherGradeEntrySchema],
  fourthPeriod: [TeacherGradeEntrySchema],
  fifthPeriod: [TeacherGradeEntrySchema],
  sixthPeriod: [TeacherGradeEntrySchema],
  secondSemesterExam: [TeacherGradeEntrySchema],
  secondSemesterAverage: [TeacherGradeEntrySchema],
  yearlyAverage: [TeacherGradeEntrySchema]
}, { _id: false });

const TeacherSchema: Schema<ITeacher> = new Schema({
  userId: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'teacher' },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickName: { type: String },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  bio: { type: String },
  subjects: [TeacherSubjectSchema],
  isSponsor: { type: Boolean, default: false },
  sponsorClass: { type: String },
  gradeBooks: [TeacherGradesSchema],
  hireDate: { type: Date, default: Date.now },
  qualification: { type: String, required: true, default: 'Bachelor\'s Degree' },
  experience: { type: Number, default: 0 },
  salary: { type: Number },
  employmentStatus: { 
    type: String, 
    required: true, 
    enum: ['active', 'on_leave', 'terminated', 'retired'],
    default: 'active'
  },
  isActive: { type: Boolean, default: true },
  mustChangePassword: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  collection: 'teachers'
});

// ===============================
// ADMINISTRATOR SCHEMA
// ===============================
export interface IAdministrator extends Document, BaseUser {
  role: 'administrator';
  employeeId: string;
  position: 'principal' | 'vpi' | 'vpa' |  'registrar' | 'supervisor' | 'proprietor' | 
  'secretary' | 'dean' | 'cashier';
  
  department?: string;
  qualification: string;
  experience: number;
  salary?: number;
  employmentStatus: 'active' | 'on_leave' | 'terminated' | 'retired';
}

const AdministratorSchema: Schema<IAdministrator> = new Schema({
  userId: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'administrator' },
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickName: { type: String },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  bio: { type: String },
  position: { 
    type: String, 
    required: true,
    enum: [
      'principal', 'vice_principal', 'head_of_department', 'academic_coordinator',
      'discipline_coordinator', 'registrar', 'supervisor', 'proprietor',
      'secretary', 'dean_of_students', 'cashier'
    ]
  },
  department: { type: String },
  qualification: { type: String, required: true, default: 'Bachelor\'s Degree' },
  experience: { type: Number, default: 0 },
  salary: { type: Number },
  employmentStatus: { 
    type: String, 
    required: true, 
    enum: ['active', 'on_leave', 'terminated', 'retired'],
    default: 'active'
  },
  isActive: { type: Boolean, default: true },
  mustChangePassword: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  collection: 'administrators'
});


const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
const Teacher: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
const Administrator: Model<IAdministrator> = mongoose.models.Administrator || mongoose.model<IAdministrator>('Administrator', AdministratorSchema);

export { Student, Teacher, Administrator };