import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose'; 
import { Student, Teacher, Administrator } from '@/models/User';
import bcrypt from 'bcryptjs';

// GET - Fetch users by role
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    let users;
    let totalCount;

    // Fetch users based on role
    switch (role) {
      case 'student':
        users = await Student.find({})
          .select('-password')
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);
        totalCount = await Student.countDocuments({});
        break;
        
      case 'teacher':
        users = await Teacher.find({})
          .select('-password')
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);
        totalCount = await Teacher.countDocuments({});
        break;
        
      case 'administrator':
        users = await Administrator.find({})
          .select('-password')
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);
        totalCount = await Administrator.countDocuments({});
        break;
        
      default:
        // If no role specified, return all users from all collections
        const [students, teachers, administrators] = await Promise.all([
          Student.find({}).select('-password').sort({ createdAt: -1 }),
          Teacher.find({}).select('-password').sort({ createdAt: -1 }),
          Administrator.find({}).select('-password').sort({ createdAt: -1 })
        ]);
        
        users = [...students, ...teachers, ...administrators]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(skip, skip + limit);
        
        totalCount = students.length + teachers.length + administrators.length;
        break;
    }

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasMore: page * limit < totalCount
        }
      }
    });

  } catch (error) {
    console.error('Users fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    }, { status: 500 });
  }
}

// Helper function to validate required fields based on user role
const validateUserData = (userData: any) => {
  const errors: string[] = [];
  
  // Common required fields
  const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'phone', 'address', 'username', 'password', 'role', 'gender'];
  
  for (const field of requiredFields) {
    if (!userData[field] || userData[field].toString().trim() === '') {
      errors.push(`${field} is required`);
    }
  }
  
  // Gender validation
  if (userData.gender && !['male', 'female'].includes(userData.gender)) {
    errors.push('Gender must be either "male" or "female"');
  }
  
  // Role-specific validations
  switch (userData.role) {
    case 'student':
      // if (!userData.grade) {
      //   errors.push('Grade is required for students');
      // }
      if (!userData.guardian || !userData.guardian.firstName || !userData.guardian.lastName || 
          !userData.guardian.phone || !userData.guardian.address) {
        errors.push('Complete guardian information is required for students');
      }
      break;
      
    case 'teacher':
      if (!userData.subjects || userData.subjects.length === 0) {
        errors.push('At least one subject is required for teachers');
      }
      // Validate each subject has required fields
      if (userData.subjects) {
        userData.subjects.forEach((subject: any, index: number) => {
          if (!subject.subject || !subject.level || !subject.classes || subject.classes.length === 0) {
            errors.push(`Subject at index ${index} must have subject, level, and at least one class`);
          }
        });
      }
      if (userData.isSponsor && !userData.sponsorClass) {
        errors.push('Sponsor class is required when teacher is marked as sponsor');
      }
      break;
      
    case 'administrator':
      if (!userData.position) {
        errors.push('Position is required for administrators');
      }
      // Validate position is in allowed enum values
      const allowedPositions = [
        'principal', 'vice_principal', 'head_of_department', 'academic_coordinator',
        'discipline_coordinator', 'registrar', 'supervisor', 'proprietor',
        'secretary', 'dean_of_students', 'cashier'
      ];
      if (userData.position && !allowedPositions.includes(userData.position)) {
        errors.push('Invalid administrator position');
      }
      break;
      
    default:
      errors.push('Invalid role. Must be student, teacher, or administrator');
      break;
  }
  
  // Email validation if provided
  if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
    errors.push('Invalid email format');
  }
  
  // Phone validation
  if (userData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(userData.phone)) {
    errors.push('Invalid phone number format');
  }
  
  // Password validation
  if (userData.password && userData.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  console.log(errors)
  
  return errors;
};

// Helper function to generate user ID
const generateUserId = async (role: string) => {
  const userIdPrefix = {
    student: 'STU',
    teacher: 'TEA',
    administrator: 'ADM'
  };
  
  const year = new Date().getFullYear();
  
  let userCount: number;
  switch (role) {
    case 'student':
      userCount = await Student.countDocuments({}) + 1;
      break;
    case 'teacher':
      userCount = await Teacher.countDocuments({}) + 1;
      break;
    case 'administrator':
      userCount = await Administrator.countDocuments({}) + 1;
      break;
    default:
      throw new Error('Invalid role for ID generation');
  }
  
  return `${userIdPrefix[role as keyof typeof userIdPrefix]}${year}${String(userCount).padStart(4, '0')}`;
};

// Helper function to check if username exists across all collections
const checkUsernameExists = async (username: string) => {
  const [studentExists, teacherExists, adminExists] = await Promise.all([
    Student.findOne({ username: username.toLowerCase() }),
    Teacher.findOne({ username: username.toLowerCase() }),
    Administrator.findOne({ username: username.toLowerCase() })
  ]);
  
  return !!(studentExists || teacherExists || adminExists);
};

// Helper function to check if email exists across all collections
const checkEmailExists = async (email: string) => {
  const [studentExists, teacherExists, adminExists] = await Promise.all([
    Student.findOne({ email: email.toLowerCase() }),
    Teacher.findOne({ email: email.toLowerCase() }),
    Administrator.findOne({ email: email.toLowerCase() })
  ]);
  
  return !!(studentExists || teacherExists || adminExists);
};

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const userData = await request.json();
    
    // Validate the user data
    const validationErrors = validateUserData(userData);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }
    
    // Check if username already exists
    const usernameExists = await checkUsernameExists(userData.username);
    if (usernameExists) {
      return NextResponse.json({
        success: false,
        message: 'Username is already taken'
      }, { status: 400 });
    }
    
    // Check if email already exists (if provided)
    if (userData.email) {
      const emailExists = await checkEmailExists(userData.email);
      if (emailExists) {
        return NextResponse.json({
          success: false,
          message: 'Email address is already registered'
        }, { status: 400 });
      }
    }
    
    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    // Generate user ID
    const generatedUserId = await generateUserId(userData.role);
    
    // Prepare common user data
    const commonUserData = {
      userId: generatedUserId,
      firstName: userData.firstName.trim(),
      middleName: userData.middleName?.trim() || undefined,
      lastName: userData.lastName.trim(),
      gender: userData.gender,
      username: userData.username.toLowerCase().trim(),
      password: hashedPassword,
      nickName: userData.nickName?.trim() || undefined,
      dateOfBirth: new Date(userData.dateOfBirth),
      phone: userData.phone.trim(),
      email: userData.email?.trim().toLowerCase() || undefined,
      address: userData.address.trim(),
      bio: userData.bio?.trim() || undefined,
      isActive: true,
      mustChangePassword: true
    };
    
    let newUser;
    
    // Create user based on role
    switch (userData.role) {
      case 'student':
        const studentData = {
          ...commonUserData,
          studentId: generatedUserId,
          currentClass: userData.currentClass,
          guardian: {
            firstName: userData.guardian.firstName.trim(),
            middleName: userData.guardian.middleName?.trim() || undefined,
            lastName: userData.guardian.lastName.trim(),
            email: userData.guardian.email?.trim().toLowerCase() || undefined,
            phone: userData.guardian.phone.trim(),
            address: userData.guardian.address.trim()
          },
          academicRecords: [],
          enrollmentDate: new Date(),
          status: userData.status || 'enrolled'
        };
        
        newUser = new Student(studentData);
        break;
        
      case 'teacher':
        const teacherData = {
          ...commonUserData,
          subjects: userData.subjects,
          isSponsor: userData.isSponsor || false,
          sponsorClass: userData.isSponsor ? userData.sponsorClass : undefined,
          gradeBooks: [],
          hireDate: new Date(),
          department: userData.department || undefined,
          qualification: userData.qualification || "Bachelor's Degree",
          experience: userData.experience || 0,
          salary: userData.salary || undefined,
          employmentStatus: userData.employmentStatus || 'active'
        };
        
        newUser = new Teacher(teacherData);
        break;
        
      case 'administrator':
        const adminData = {
          ...commonUserData,
          employeeId: generatedUserId,
          position: userData.position,
          department: userData.department || undefined,
          qualification: userData.qualification || "Bachelor's Degree",
          experience: userData.experience || 0,
          salary: userData.salary || undefined,
          employmentStatus: userData.employmentStatus || 'active'
        };
        
        newUser = new Administrator(adminData);
        break;
        
      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid user role'
        }, { status: 400 });
    }
    
    // Save the user
    await newUser.save();
    
    // Remove sensitive data from response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    // Log user creation for audit
    console.log(`New ${userData.role} created:`, {
      id: newUser._id,
      userId: userResponse.userId,
      username: userResponse.username,
      role: userData.role,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: true,
      message: `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} created successfully`,
      data: {
        user: userResponse
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('User creation error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      return NextResponse.json({
        success: false,
        message: `${field} already exists`
      }, { status: 400 });
    }
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// PUT - Update user (placeholder for future implementation)
export async function PUT(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'User update functionality not implemented yet'
  }, { status: 501 });
}

// DELETE - Delete user (placeholder for future implementation)
export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'User deletion functionality not implemented yet'
  }, { status: 501 });
}