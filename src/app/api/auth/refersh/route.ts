import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token missing' }, { status: 401 });
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as jwt.JwtPayload;

    // Optional: re-fetch user from DB
    const user = await User.findById(payload.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const response = NextResponse.json({ message: 'Token refreshed' });

    response.headers.set(
      'Set-Cookie',
      serialize('accessToken', newAccessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 15,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    );

    return response;
  } catch (err) {
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }
}
