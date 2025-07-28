import mongoose, { Schema, Document } from 'mongoose';
import { ClassLevel, ClassId } from './User';

const SchoolSettingsSchema = new Schema({
  studentsCanLogin: { type: Boolean, default: true },
  teachersCanLogin: { type: Boolean, default: true },
  administratorsCanLogin: { type: Boolean, default: true },
  systemAdminCanLogin: { type: Boolean, default: true },
  teachersCanSubmitGrades: { type: Boolean, default: false },
  studentsCanViewPeriodicReports: { type: Boolean, default: true },
  studentsCanViewYearlyReports: {type: Boolean, default: false}
})

const ClassScheduleSchema = new Schema({
  day: { 
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    required: true 
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }, 
  subject: { type: String, required: true }
});

const ClassSchema = new Schema({
  classId: { 
    type: String, 
    enum: ["nusury", "kOne", "kTwo", "one", "two", "three", "four", "five",
           "six", "seven", "eight", "nine", "thenOne", "tenTwo",
           "elevenOne", "elevenTwo", "twelveOne", "twelveTwo"],
    unique: true,
    required: true 
  },
  name: { type: String, required: true },
  level: { 
    type: String, 
    enum: ["Self Contained", "Elementry", "Junior High", "Senior High"],
    required: true 
  },
  sponsorId: { type: Schema.Types.ObjectId, ref: 'User'},
  schedule: [ClassScheduleSchema],
  studentIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teacherIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  academicYear: { type: String, required: true },
  currentEnrollment: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Grade Submission Schema
const GradeSubmissionSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  submissionDate: { type: Date, default: Date.now },
  academicYear: { type: String, required: true },
  period: { 
    type: String, 
    enum: ['firstPeriod', 'secondPeriod', 'thirdPeriod', 'ThirdPeriodExam', 
           'firstSemesterAverage', 'fourthPeriod', 'fifthPeriod', 'sixthPeriod',
           'secondSemesterExam', 'secondSemesterAverage', 'yearlyAverage'],
    required: true 
  },
  classId: { type: String, required: true },
  subject: { type: String, required: true },
  grades: [{
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    grade: { type: Number, min: 0, max: 100, required: true },
    comments: { type: String }
  }],
  status: { 
    type: String, 
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending' 
  },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvalDate: { type: Date },
  rejectionReason: { type: String }
}, {
  timestamps: true
});

// Event Schema
const EventLogSchema = new Schema({
  type: { type: String, required: true, enum: ["password", "grade", "login"] },
  description: { type: String, required: true },
  dateTime: { type: Date, required: true },
  notificationSent: { type: Boolean, default: false }
}, {
  timestamps: true
});

const MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Fee Schema
const FeeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  academicYear: { type: String, required: true },
  feeType: { 
    type: String, 
    enum: ['tuition', 'registration', 'fieldTrip', 'uniform', 'transport', 'computer', 'e-potal'],
    required: true 
  },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidAmount: { type: Number, default: 0 },
  paymentDate: { type: Date },
  status: { 
    type: String, 
    enum: ['pending', 'partial', 'paid', 'overdue'],
    default: 'pending' 
  },
  paymentMethod: { type: String },
  transactionId: { type: String },
  description: { type: String }
}, {
  timestamps: true
});


export interface IClass extends Document {
  classId: ClassId;
  name: string;
  level: ClassLevel;
  sponsorId: mongoose.Types.ObjectId;
  schedule: any[];
  studentIds: mongoose.Types.ObjectId[];
  teacherIds: mongoose.Types.ObjectId[];
  academicYear: string;
  currentEnrollment: number;
}

export interface IGradeSubmission extends Document {
  teacherId: mongoose.Types.ObjectId;
  submissionDate: Date;
  academicYear: string;
  period: string;
  classId: string;
  subject: string;
  grades: any[];
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  approvedBy?: mongoose.Types.ObjectId;
  approvalDate?: Date;
  rejectionReason?: string;
}

export interface IEventLog extends Document {
  type: string;
  description: string;
  dateTime: Date;
  notificationSent: boolean;
}

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  messageType: string;
  read: boolean;
}


export interface IFee extends Document {
  studentId: mongoose.Types.ObjectId;
  academicYear: string;
  feeType: string;
  amount: number;
  dueDate: Date;
  paidAmount: number;
  paymentDate?: Date;
  status: string;
  paymentMethod?: string;
  transactionId?: string;
  description?: string;
}

export interface ISchoolSettings extends Document {
  studentsCanLogin: boolean;
  teachersCanLogin: boolean;
  administratorsCanLogin: boolean;
  systemAdminCanLogin: boolean;
  teachersCanSubmitGrades: boolean;
  studentsCanViewPeriodicReports: boolean;
  studentsCanViewYearlyReports: boolean;
}

// Create and export models
const Class = mongoose.model<IClass>('Class', ClassSchema);
const GradeSubmission = mongoose.model<IGradeSubmission>('GradeSubmission', GradeSubmissionSchema);
const Message = mongoose.model<IMessage>('Message', MessageSchema);
const Fee = mongoose.model<IFee>('Fee', FeeSchema);
const SchoolSettings = mongoose.model<ISchoolSettings>("SchoolSettings", SchoolSettingsSchema);
const EventLog = mongoose.model<IEventLog>("EventLog", EventLogSchema);

export {
  Class,
  GradeSubmission,
  Message,
  Fee,
  SchoolSettings,
  EventLog
};