import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongoose';
import { serialize } from 'cookie';
import { Student, Teacher, Administrator, SystemAdmin } from '@/models/User';
import mongoose from 'mongoose';

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

// Helper function to find user by ID across all models
async function findUserById(userId: string) {
  if (!userId) {
    console.log('findUserById: No userId provided');
    return null;
  }

  // Check if userId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.log(`findUserById: Invalid ObjectId format: ${userId}`);
    return null;
  }

  console.log(`findUserById: Searching for user with ID: ${userId}`);
  
  try {
    // Try SystemAdmin first since OTP is primarily for system_admin
    console.log('Checking SystemAdmin model...');
    let user = await SystemAdmin.findById(userId);
    if (user) {
      console.log(`User found in SystemAdmin: ${user.username}`);
      return user;
    }
    
    console.log('Checking Student model...');
    user = await Student.findById(userId);
    if (user) {
      console.log(`User found in Student: ${user.username}`);
      return user;
    }
    
    console.log('Checking Teacher model...');
    user = await Teacher.findById(userId);
    if (user) {
      console.log(`User found in Teacher: ${user.username}`);
      return user;
    }
    
    console.log('Checking Administrator model...');
    user = await Administrator.findById(userId);
    if (user) {
      console.log(`User found in Administrator: ${user.username}`);
      return user;
    }
    
    console.log('User not found in any model');
    return null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    console.error('Error details:', error.message);
    return null;
  }
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

  let user;
  switch (role) {
    case "student": 
      user = await Student.findOne({ username, role });
      break;
    case "teacher": 
      user = await Teacher.findOne({ username, role });
      break;
    case "administrator": 
      user = await Administrator.findOne({ username, role });
      break;
    case "system_admin": 
      user = await SystemAdmin.findOne({ username, role });
      break;
    default:
      return NextResponse.json(
        { message: 'Invalid role' }, 
        { status: 400 }
      );
  }

  // Verify user exists
  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' }, 
      { status: 401 }
    );
  }

  console.log('User found:', user.username);

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

  // For system_admin role, generate OTP and require verification
  if (role === 'system_admin') {
    const otp = generateOTP();
    
    // Create temporary session for OTP verification
    const sessionData = {
      userId: user._id.toString(),
      otp,
      timestamp: Date.now(),
      contact: user.email || user.phone,
      role: user.role,
      username: user.username
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

    console.log(`OTP ${otp} generated for user ${user.username} with session ${sessionId}`);

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

  // For non-system_admin roles, complete login immediately
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
    const { userId, otp: expectedOTP, timestamp, role, username } = decoded;

    console.log(`OTP verification attempt for user ${username}:`);
    console.log(`Expected OTP: ${expectedOTP}, Received OTP: ${otp}`);
    console.log(`UserId from session: ${userId}`);
    console.log(`Timestamp: ${timestamp}, Current: ${Date.now()}`);

    // Check if OTP session is expired (10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      return NextResponse.json(
        { message: 'OTP session expired. Please login again.' }, 
        { status: 400 }
      );
    }

    // Verify OTP (convert both to strings for comparison)
    if (String(otp).trim() !== String(expectedOTP).trim()) {
      console.log('OTP verification failed: mismatch');
      return NextResponse.json(
        { message: 'Invalid OTP. Please try again.' }, 
        { status: 401 }
      );
    }

    console.log('OTP verification successful, finding user...');

    // Get user details - try SystemAdmin first since OTP is only for system_admin
    let user = await SystemAdmin.findById(userId);
    
    if (!user) {
      console.log('User not found in SystemAdmin, trying other models...');
      // Fallback to other models if needed
      user = await findUserById(userId);
    }

    console.log(`User found: ${user ? user.username : 'null'}`);

    if (!user) {
      console.log('User not found in any model');
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
        // Role-specific fields based on actual user role
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
        }),
        ...(user.role === 'system_admin' && {
          employeeId: user.employeeId,
          department: user.department,
          qualification: user.qualification,
          experience: user.experience,
          employmentStatus: user.employmentStatus
        })
      },
    });

    const { token, refreshToken } = setAuthTokens(user, response);
    
    const responseData = await response.json();
    return NextResponse.json({
      ...responseData,
      token,
      refreshToken
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Invalid session token. Please login again.' }, 
        { status: 401 }
      );
    } else if (error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: 'Session expired. Please login again.' }, 
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: 'Session verification failed. Please login again.' }, 
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

    // Get user details using the helper function
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
      contact: user.email || user.phone,
      role: user.role,
      username: user.username
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

    console.log(`New OTP ${newOTP} generated for user ${user.username}`);

    return NextResponse.json({
      message: 'New OTP sent successfully',
      sessionId: newSessionId,
      contact: user.email ? 
        user.email.replace(/(.{2}).*(@.*)/, '$1***$2') : 
        user.phone?.replace(/(.{3}).*(.{2})/, '$1***$2')
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { message: 'Invalid or expired session. Please login again.' }, 
      { status: 401 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({
    message: 'Logged out successfully'
  });

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