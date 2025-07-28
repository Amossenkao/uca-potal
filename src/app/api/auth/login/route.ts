import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongoose';
import { serialize } from 'cookie';
import { Student, Teacher, Administrator, SystemAdmin } from '@/models/User';

const models = {
  student: Student,
  teacher: Teacher,
  administrator: Administrator,
  system_admin: SystemAdmin,
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Helper function to generate OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to send OTP (implement your SMS/Email service here)
async function sendOTP(contact: string, otp: string): Promise<boolean> {
  // TODO: Implement actual OTP sending logic (SMS/Email)
  console.log(`Sending OTP ${otp} to ${contact}`);
  return true;
}


function setAuthTokens(user: any, response: NextResponse) {

  const token = jwt.sign(
    {
      id: user._id.toString(), // Use MongoDB's _id
      username: user.username,
      role: user.role,
      position: user.position || null,
      userId: user.userId, // Custom user ID from schema
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id.toString() },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Set HttpOnly cookies
  response.headers.set(
    'Set-Cookie',
    serialize('accessToken', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 15, // 15 minutes
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  response.headers.append(
    'Set-Cookie',
    serialize('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return { token, refreshToken };
}

export async function POST(request: NextRequest) {
  await connectDB();
  
  const body = await request.json();
  const { action, username, password, role, position, otp, sessionId } = body;

  try {
    switch (action) {
      case 'login':
        return await handleLogin(username, password, role, position);
      
      case 'verify_otp':
        return await handleOTPVerification(sessionId, otp);
      
      case 'resend_otp':
        return await handleResendOTP(sessionId);
      
      default:
        return NextResponse.json(
          { message: 'Invalid action' }, 
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

async function handleLogin(username: string, password: string, role: string, position?: string) {
  // Validate required fields
  if (!username || !password || !role) {
    return NextResponse.json(
      { message: 'Username, password, and role are required' }, 
      { status: 400 }
    );
  }

  console.log(models[role])

  let user = await models[role].findOne({username, role})
  // switch (role) {
  //   case "student": user = await Student.findOne({ username, role })
  //     break;
  //   case "teacher": user = await Teacher.findOne({ username, role })
  //     break;
  //   case "administrator": user = await Administrator.findOne({username, role})
  // }

  // Verify user exists
  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' }, 
      { status: 401 }
    );
  }
  console.log(user)
  // Check if user is active
  if (!user.isActive) {
    return NextResponse.json(
      { message: 'Account is deactivated. Please contact administrator.' }, 
      { status: 403 }
    );
  }


  // Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: 'Invalid credentials' }, 
      { status: 401 }
    );
  }

  // For administrator role, verify position if provided
  if (role === 'administrator' && position) {
    if (user.position !== position) {
      return NextResponse.json(
        { message: 'Invalid position for this administrator account' }, 
        { status: 401 }
      );
    }
  }

  // Check if user must change password
  // if (user.mustChangePassword) {
  //   return NextResponse.json({
  //     message: 'Password change required',
  //     requiresPasswordChange: true,
  //     user: {
  //       id: user._id.toString(),
  //       username: user.username,
  //       role: user.role,
  //     }
  //   }, { status: 200 });
  // }

  // For administrator role, generate OTP and require verification
  if (role === 'system_admi') {
    const otp = generateOTP();
    
    // Create temporary session for OTP verification
    const sessionData = {
      userId: user._id.toString(),
      otp,
      timestamp: Date.now(),
      contact: user.email || user.phone
    };
    
    const sessionId = jwt.sign(sessionData, JWT_SECRET, { expiresIn: '10m' });

    // Send OTP to user's contact method
    const otpSent = await sendOTP(user.email || user.phone, otp);
    
    if (!otpSent) {
      return NextResponse.json(
        { message: 'Failed to send OTP. Please try again.' }, 
        { status: 500 }
      );
    }

    // Return OTP verification required response
    return NextResponse.json({
      message: 'OTP verification required',
      requiresOTP: true,
      sessionId,
      contact: user.email ? 
        user.email.replace(/(.{2}).*(@.*)/, '$1***$2') : 
        user.phone?.replace(/(.{3}).*(.{2})/, '$1***$2'),
      user: {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
        position: user.position
      }
    });
  }

  // For non-administrator roles, complete login immediately
  const response = NextResponse.json({
    message: 'Login successful',
    requiresOTP: false,
    user: {
      id: user._id.toString(),
      userId: user.userId, // Custom user ID from schema
      username: user.username,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      role: user.role,
      position: user.position || null,
      nickName: user.nickName,
      address: user.address,
      phone: user.phone,
      email: user.email,
      bio: user.bio,
      // Role-specific fields
      ...(role === 'student' && {
        grade: user.grade || user.currentClass,
        guardian: user.guardian,
        status: user.status
      }),
      ...(role === 'teacher' && {
        subjects: user.subjects,
        isSponsor: user.isSponsor,
        sponsorClass: user.sponsorClass,
        department: user.department,
        qualification: user.qualification,
        experience: user.experience,
        employmentStatus: user.employmentStatus
      }),
      ...(role === 'administrator' && {
        employeeId: user.employeeId,
        department: user.department,
        qualification: user.qualification,
        experience: user.experience,
        employmentStatus: user.employmentStatus
      })
    },
  });

  // Set authentication tokens
  const { token, refreshToken } = setAuthTokens(user, response);
  
  // Add tokens to response body
  const responseData = await response.json();
  return NextResponse.json({
    ...responseData,
    token,
    refreshToken
  });
}

async function handleOTPVerification(sessionId: string, otp: string) {
  if (!sessionId || !otp) {
    return NextResponse.json(
      { message: 'Session ID and OTP are required' }, 
      { status: 400 }
    );
  }

  try {
    // Verify and decode session
    const decoded = jwt.verify(sessionId, JWT_SECRET) as any;
    const { userId, otp: expectedOTP, timestamp } = decoded;

    // Check if OTP session is expired (10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      return NextResponse.json(
        { message: 'OTP session expired. Please login again.' }, 
        { status: 400 }
      );
    }

    // Verify OTP
    if (otp !== expectedOTP) {
      return NextResponse.json(
        { message: 'Invalid OTP. Please try again.' }, 
        { status: 401 }
      );
    }

    // Get user details
    const user = await findUserById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404 }
      );
    }

    // Complete login process
    const response = NextResponse.json({
      message: 'Login successful',
      requiresOTP: false,
      user: {
        id: user._id.toString(),
        userId: user.userId,
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        role: user.role,
        position: user.position,
        nickName: user.nickName,
        address: user.address,
        phone: user.phone,
        email: user.email,
        bio: user.bio,
        // Role-specific fields
        ...(user.role === 'student' && {
          grade: user.grade || user.currentClass,
          guardian: user.guardian,
          status: user.status
        }),
        ...(user.role === 'teacher' && {
          subjects: user.subjects,
          isSponsor: user.isSponsor,
          sponsorClass: user.sponsorClass,
          department: user.department,
          qualification: user.qualification,
          experience: user.experience,
          employmentStatus: user.employmentStatus
        }),
        ...(user.role === 'administrator' && {
          employeeId: user.employeeId,
          department: user.department,
          qualification: user.qualification,
          experience: user.experience,
          employmentStatus: user.employmentStatus
        })
      },
    });

    // Set authentication tokens
    const { token, refreshToken } = setAuthTokens(user, response);
    
    // Add tokens to response body
    const responseData = await response.json();
    return NextResponse.json({
      ...responseData,
      token,
      refreshToken
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid or expired session. Please login again.' }, 
      { status: 401 }
    );
  }
}

async function handleResendOTP(sessionId: string) {
  if (!sessionId) {
    return NextResponse.json(
      { message: 'Session ID is required' }, 
      { status: 400 }
    );
  }

  try {
    // Verify and decode session
    const decoded = jwt.verify(sessionId, JWT_SECRET) as any;
    const { userId } = decoded;

    // Get user details
    const user = await findUserById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404 }
      );
    }

    // Generate new OTP
    const newOTP = generateOTP();
    
    // Create new session with new OTP
    const newSessionData = {
      userId: user._id.toString(),
      otp: newOTP,
      timestamp: Date.now(),
      contact: user.email || user.phone
    };
    
    const newSessionId = jwt.sign(newSessionData, JWT_SECRET, { expiresIn: '10m' });

    // Send new OTP
    const otpSent = await sendOTP(user.email || user.phone, newOTP);
    
    if (!otpSent) {
      return NextResponse.json(
        { message: 'Failed to send OTP. Please try again.' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'New OTP sent successfully',
      sessionId: newSessionId,
      contact: user.email ? 
        user.email.replace(/(.{2}).*(@.*)/, '$1***$2') : 
        user.phone?.replace(/(.{3}).*(.{2})/, '$1***$2')
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid or expired session. Please login again.' }, 
      { status: 401 }
    );
  }
}

// Optional: Add logout functionality
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({
    message: 'Logged out successfully'
  });

  // Clear auth cookies
  response.headers.set(
    'Set-Cookie',
    serialize('accessToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  response.headers.append(
    'Set-Cookie',
    serialize('refreshToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return response;
}