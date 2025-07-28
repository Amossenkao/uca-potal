import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });

  response.headers.set(
    'Set-Cookie',
    serialize('accessToken', '', {
      httpOnly: true,
      path: '/login',
      maxAge: 0,
    })
  );

  response.headers.append(
    'Set-Cookie',
    serialize('refreshToken', '', {
      httpOnly: true,
      path: '/login',
      maxAge: 0,
    })
  );

  return response;
}
