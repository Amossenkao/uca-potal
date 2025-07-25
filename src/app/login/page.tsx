"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  User,
  Users,
  GraduationCap,
  Settings,
  ArrowLeft,
  LogIn,
  AlertCircle,
} from 'lucide-react';
import NavBar from '@/components/sections/NavBar';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import Spinner from '@/components/ui/spinner';

const SchoolLoginPage = () => {
  const { login, isLoggedIn, loadFromStorage, error, isLoading } = useAuthStore();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Stable reference to loadFromStorage
  const stableLoadFromStorage = useCallback(() => {
    if (loadFromStorage) {
      loadFromStorage();
    }
  }, [loadFromStorage]);

  // Handle mounting and loading auth state
  useEffect(() => {
    setMounted(true);
    stableLoadFromStorage(); // Load auth state from localStorage
  }, [stableLoadFromStorage]);

  // Load saved role from localStorage after mounting
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        const savedRole = localStorage.getItem('selectedRole');
        if (savedRole) {
          const parsedRole = JSON.parse(savedRole);
          // Validate that the parsed role has the expected structure
          if (parsedRole && parsedRole.id && parsedRole.title && parsedRole.icon) {
            setSelectedRole(parsedRole);
          } else {
            localStorage.removeItem('selectedRole');
          }
        }
      } catch (error) {
        console.error('Error parsing saved role:', error);
        localStorage.removeItem('selectedRole');
      }
    }

    return localStorage.removeItem('selectedRole');
  }, [mounted]);

  // Handle redirect after successful login
  useEffect(() => {
    if (mounted && isLoggedIn && !isLoading) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, mounted, router, isLoading]);

  // Clear error when store error changes
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Access courses, assignments, grades, and school resources',
      color: 'bg-brand-500',
    },
    {
      id: 'parent',
      title: 'Parent',
      icon: Users,
      description: "Monitor your child's progress, communicate with teachers",
      color: 'bg-success-500',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: User,
      description: 'Manage classes, create assignments, track student progress',
      color: 'bg-theme-purple-500',
    },
    {
      id: 'administrator',
      title: 'Administrator',
      icon: Settings,
      description: 'System management, user administration, and school oversight',
      color: 'bg-error-500',
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    // Save selected role to localStorage with error handling
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('selectedRole', JSON.stringify(role));
      } catch (error) {
        console.error('Error saving role to localStorage:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setErrorMessage('');
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    // Clear any existing error messages
    setErrorMessage('');

    // Validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    if (!selectedRole) {
      setErrorMessage('Please select a role first.');
      return;
    }

    try {
      const { username, password } = formData;
      const success = await login(username.trim(), password);
        
      if (!success) {
        // Use the error from the store if available, otherwise use a generic message
        setErrorMessage(error || "Login failed. Please check your credentials.");
        return;
      }

      // Login successful - the useEffect will handle the redirect
    } catch (loginError) {
      console.error('Login error:', loginError);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setFormData({ username: '', password: '' });
    setErrorMessage('');
    // Clear saved role from localStorage with error handling
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('selectedRole');
      } catch (error) {
        console.error('Error removing role from localStorage:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleLogin();
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  // Show loading state during login
  if (isLoading && isLoggedIn) {
    return (
      <div>
        <NavBar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div>
        <NavBar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-title-lg font-outfit font-semibold text-gray-900 dark:text-white mb-3">
                Welcome
              </h1>
              <p className="text-theme-xl text-gray-600 dark:text-gray-300">
                Please select your role to continue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-lg hover:shadow-theme-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] p-6 border border-gray-200 dark:border-gray-800"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRoleSelect(role);
                      }
                    }}
                    aria-label={`Select ${role.title} role`}
                  >
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 ${role.color} rounded-full mb-4 mx-auto`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-outfit font-semibold text-gray-900 dark:text-white mb-3">
                        {role.title}
                      </h3>
                      <p className="text-theme-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-theme-sm text-gray-500 dark:text-gray-400">
                Need help? Contact your school administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Spinner/>
  }

  const IconComponent = selectedRole.icon;

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-lg p-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${selectedRole.color} rounded-full mb-4`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-title-sm font-outfit font-semibold text-gray-900 dark:text-white mb-2">
                {selectedRole.title} Login
              </h2>
              <p className="text-theme-sm text-gray-600 dark:text-gray-400">
                {selectedRole.description}
              </p>
            </div>

            {errorMessage && (
              <div className="flex items-center text-sm text-red-600 bg-red-100 dark:bg-red-950 border border-red-400 dark:border-red-700 px-4 py-3 rounded mb-4">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              if (!isLoading) {
                handleLogin(); 
              }
            }}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                    placeholder="Enter your username"
                    required
                    autoComplete="username"
                    disabled={isLoading}
                    maxLength={100}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    disabled={isLoading}
                    maxLength={200}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-theme-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors bg-transparent border-none cursor-pointer"
                onClick={() => {
                  // You can implement forgot password functionality here
                  console.log('Forgot password clicked');
                }}
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolLoginPage;