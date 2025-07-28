import mongoose, { Schema, Document } from 'mongoose';
import { ClassLevel, ClassId } from './User';

const SchoolSettings = new Schema({
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

// Class Schema
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
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  participants: { 
    type: String, 
    enum: ['all', 'students', 'teachers', 'parents', 'administrators'],
    default: 'all' 
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String },
  isActive: { type: Boolean, default: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notificationSent: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Message Schema (for standalone messages, different from user messages)
const MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  subject: { type: String },
  messageType: { 
    type: String, 
    enum: ['direct', 'announcement', 'grade_notification', 'event_notification'],
    default: 'direct' 
  },
  read: { type: Boolean, default: false },
  readAt: { type: Date },
  priority: { 
    type: String, 
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal' 
  }
}, {
  timestamps: true
});

// Subject Schema
const SubjectSchema = new Schema({
  name: { type: String, unique: true, required: true },
  code: { type: String, unique: true, required: true },
  description: { type: String },
  level: { 
    type: String, 
    enum: ["Self Contained", "Elementry", "Junior High", "Senior High"],
    required: true 
  },
  credits: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
  prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
}, {
  timestamps: true
});

// Attendance Schema
const AttendanceSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  classId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['present', 'absent', 'late', 'excused'],
    required: true 
  },
  markedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  notes: { type: String },
  period: { type: String }, // Which class period
  subject: { type: String }
}, {
  timestamps: true
});

// Fee Schema
const FeeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  academicYear: { type: String, required: true },
  feeType: { 
    type: String, 
    enum: ['tuition', 'registration', 'books', 'uniform', 'transport', 'meals', 'other'],
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

// Create indexes for better performance
ClassSchema.index({ level: 1, academicYear: 1 });
ClassSchema.index({ sponsorId: 1 });

GradeSubmissionSchema.index({ teacherId: 1, academicYear: 1 });
GradeSubmissionSchema.index({ status: 1 });
GradeSubmissionSchema.index({ classId: 1, subject: 1 });

EventSchema.index({ startDate: 1 });
EventSchema.index({ participants: 1 });
EventSchema.index({ isActive: 1 });

MessageSchema.index({ senderId: 1, receiverId: 1 });
MessageSchema.index({ read: 1 });
MessageSchema.index({ messageType: 1 });

AttendanceSchema.index({ studentId: 1, date: 1 });
AttendanceSchema.index({ classId: 1, date: 1 });

FeeSchema.index({ studentId: 1, academicYear: 1 });
FeeSchema.index({ status: 1 });
FeeSchema.index({ dueDate: 1 });


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
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  participants: string;
  createdBy: mongoose.Types.ObjectId;
  location?: string;
  isActive: boolean;
  attendees: mongoose.Types.ObjectId[];
  notificationSent: boolean;
}

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  subject?: string;
  messageType: string;
  read: boolean;
  readAt?: Date;
  priority: string;
  attachments: any[];
}


export interface ISubject extends Document {
  name: string;
  code: string;
  description?: string;
  level: ClassLevel;

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

// Create and export models
const Class = mongoose.model<IClass>('Class', ClassSchema);
const GradeSubmission = mongoose.model<IGradeSubmission>('GradeSubmission', GradeSubmissionSchema);
const Message = mongoose.model<IMessage>('Message', MessageSchema);
const Subject = mongoose.model<ISubject>('Subject', SubjectSchema);
const Fee = mongoose.model<IFee>('Fee', FeeSchema);

export {
  Class,
  GradeSubmission,
  Message,
  Subject,
  Fee
};