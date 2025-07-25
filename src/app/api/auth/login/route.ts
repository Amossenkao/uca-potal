import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongoose';
import { serialize } from 'cookie';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(request: NextRequest) {
  await connectDB();
  const { username, password } = await request.json();

  const user = await User.findOne({username});
  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({
    token,
    refreshToken,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
      profilePhoto: user.photo,
      nickName: user.nickName,
      address: user.address,
      phone: user.phone,
      email: user.email,
      bio: user.bio,
    },
  });

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

  return response;
}
