import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// protected routes and their required roles
const protectedRoutes = {
  '/api/reports': ['admin', 'teacher', 'student'],
  '/api/students': ['admin', 'teacher'],
  '/api/grades': ['admin', 'teacher'],
  '/dashboard': ['admin', 'teacher', 'student'],
  '/api/logout': ['admin', 'teacher', 'student'],
};

// Routes that don't require authentication
const publicRoutes = ['/api/auth/login', '/login',  '/', '/api/payment', '/payment'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, images, etc.
  if (pathname.includes('/_next/') || 
      pathname.includes('/favicon.ico') || 
      pathname.includes('/public/')) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get token from cookies or Authorization header
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    // Redirect to login for protected pages
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const userRole = payload.role as string;
    const userId = payload.userId as string;

    // Check if route requires specific roles
    const requiredRoles = getRequiredRoles(pathname);
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Add user info to request headers for API routes
    const response = NextResponse.next();
    response.headers.set('x-user-id', userId);
    response.headers.set('x-user-role', userRole);
    
    
    return response;

  } catch (error) {
    console.error('Token verification failed:', error);
    
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

function getRequiredRoles(pathname: string): string[] {
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }
  return [];
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};


// lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser {
  userId: string;
  role: 'admin' | 'teacher' | 'student';
  username: string;
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const userId = request.headers.get('x-user-id');
  const userRole = request.headers.get('x-user-role');
  
  if (!userId || !userRole) return null;
  
  return {
    userId,
    role: userRole as AuthUser['role'],
    username: '' // You can add this to the JWT payload if needed
  };
}

export function requireAuth(handler: (req: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (req: NextRequest) => {
    const user = getAuthUser(req);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, user);
  };
}

export function requireRole(roles: string[], handler: (req: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (req: NextRequest) => {
    const user = getAuthUser(req);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!roles.includes(user.role)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    return handler(req, user);
  };
}

// ============================================
// Example API Route Usage
// ============================================

// app/api/reports/route.ts
import { NextRequest } from 'next/server';
import { requireRole } from '@/lib/auth';

export const GET = requireRole(['admin', 'teacher', 'student'], async (req: NextRequest, user) => {
  // User is authenticated and has proper role
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('id');
  
  // Role-based logic
  if (user.role === 'student' && studentId !== user.userId) {
    return Response.json({ error: 'Can only access own reports' }, { status: 403 });
  }
  
  if (user.role === 'teacher') {
    // Teachers can access reports for their students
    // Add teacher-student relationship check here
  }
  
  // Admin can access all reports
  // Fetch and return report data
  return Response.json({ message: 'Report data', user });
});

// ============================================
// Login API Route
// ============================================

// app/api/auth/login/route.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    
    // Validate user credentials (replace with your DB logic)
    const user = await validateUser(username, password);
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role, 
        username: user.username 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    // Set httpOnly cookie
    const response = Response.json({ 
      success: true, 
      user: { id: user.id, username: user.username, role: user.role } 
    });
    
    response.headers.set('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`);
    
    return response;
    
  } catch (error) {
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

async function validateUser(username: string, password: string) {
  // Replace with your actual user validation logic
  // This should check against your database
  const users = {
    'admin': { id: '1', username: 'admin', password: await bcrypt.hash('admin123', 10), role: 'admin' },
    'teacher1': { id: '2', username: 'teacher1', password: await bcrypt.hash('teacher123', 10), role: 'teacher' },
    'student1': { id: '3', username: 'student1', password: await bcrypt.hash('student123', 10), role: 'student' }
  };
  
  const user = users[username as keyof typeof users];
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

// ============================================
// Client-side Auth Context
// ============================================

// contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ============================================
// Environment Variables
// ============================================

// .env.local
/*
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
DATABASE_URL=your-database-connection-string
*/