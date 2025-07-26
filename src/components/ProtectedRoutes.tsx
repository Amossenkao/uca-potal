"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/store/useAuth';
import LoginPage from '@/app/login/page';
import {PageLoading} from "@/components/loading"

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  allowedRoles 
}: ProtectedRouteProps) => {
  const { 
    isLoggedIn, 
    user, 
    isLoading, 
    loadFromStorage 
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Load auth state from localStorage on mount
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {

        router.push('/login');
        return;

    }
  }, [isLoggedIn, user, isLoading, requiredRole, allowedRoles, router]);

  if (isLoading) {
    return (
      null
    );
  } else if (!isLoggedIn) {
    return <LoginPage/>
  }


  return <>{children}</>;
};

export default ProtectedRoute;