"use client"
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Shield, BookOpen, GraduationCap, Users, Settings, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useAuth from '@/store/useAuth';
import {PageLoading} from "@/components/loading"

const LoginPage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminPosition, setAdminPosition] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const {
    isLoading, 
    isLoggedIn, 
    user, 
    error,
    isAwaitingOtp,
    otpContact,
    login,
    verifyOtp,
    resendOtp,
    clearError,
    resetOtpState,
    loadFromStorage
  } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    otp: ''
  });

  useEffect(() => {
    loadFromStorage();
    setIsInitializing(false);
  }, [loadFromStorage]);

  useEffect(() => {
    if (!isInitializing && !isLoading && user && isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isInitializing, isLoading, user, isLoggedIn, router]);

  if (isInitializing || (isLoading && !isAwaitingOtp)) {

    return (
      <PageLoading variant='school'/>
    );
  }

  const roles = [
    { value: 'student', label: 'Student/Parent', icon: GraduationCap, color: 'bg-blue-500' },
    { value: 'teacher', label: 'Teacher', icon: BookOpen, color: 'bg-green-500' },
    { value: 'administrator', label: 'School Administrator', icon: Users, color: 'bg-purple-500' },
    { value: 'admin', label: 'System Admin', icon: Shield, color: 'bg-red-500' }
  ];

  const adminPositions = [
    'principal',
    'vice_principal',
    'head_of_department',
    'academic_coordinator',
    'discipline_coordinator',
    'registrar',
    'supervisor',
    'proprietor',
    'secretary',
    'dean_of_students',
    'cashier'
  ];

  const positionLabels = {
    'proprietor': 'Proprietor',
    'principal': 'Principal',
    'supervisor': 'Supervisor',
    'vpa': 'Vice Principal for Academic Affairs',
    'dean': 'Dean of Students',
    'vpi': 'Vicp Principal Instruction',
    'secretary': 'Secretary',
    'registrar': 'Registrar',
    'cashier': 'Cashier'
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!formData.username || !formData.password) {
      return;
    }

    if (selectedRole === 'administrator' && !adminPosition) {
      return;
    }

    clearError();
    
    const loginData = {
      role: selectedRole,
      username: formData.username,
      password: formData.password,
      ...(selectedRole === 'administrator' && { position: adminPosition })
    };

    try {
      const success = await login(loginData);
      
      if (success) {
        // Login successful, redirect will happen via useEffect
        console.log('Login successful, user:', user);
      }

    } catch (err) {
      console.error('Invalid username or password', err);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    
    if (!formData.otp || formData.otp.length !== 6) {
      return;
    }

    clearError();
    
    try {
      const success = await verifyOtp(formData.otp);
      
      if (success) {
        console.log('OTP verification successful');
        // Redirect will happen via useEffect
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  const handleResendOtp = async () => {
    try {
      const success = await resendOtp();
      if (success) {
        // Clear the OTP input to show fresh start
        setFormData(prev => ({ ...prev, otp: '' }));
      }
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  const resetForm = () => {
    setSelectedRole('');
    setAdminPosition('');
    setFormData({ username: '', password: '', otp: '' });
    setShowPassword(false);
    resetOtpState();
    clearError();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border">
        {/* Header */}
        <div className="bg-primary px-8 py-6 text-center">
          <div className="w-30 h-30   mx-auto mb-4 flex items-center justify-center">
            <img src="https://res.cloudinary.com/dcalueltd/image/upload/v1753484515/uca_logo2_kqlgdl.png" alt="Upstairs Logo" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">Upstairs e-Potal System</h1>
          <p className="text-primary-foreground/80 text-sm">Please select your role to continue</p>
        </div>

        <div className="p-8">
          {!selectedRole ? (
            /* Role Selection */
            <div>
              <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                Choose Your Role
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className="p-6 border-2 border-border rounded-xl hover:border-primary hover:bg-accent transition-all duration-200 flex flex-col items-center space-y-4 group min-h-[140px] justify-center transform hover:scale-[1.02]"
                      disabled={isLoading}
                    >
                      <div className={`w-14 h-14 ${role.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-base font-medium text-foreground group-hover:text-primary text-center leading-tight">
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Login Form */
            <div>
              {/* Back Button */}
              <button
                onClick={resetForm}
                className="mb-4 text-primary hover:text-primary/80 text-sm font-medium flex items-center disabled:opacity-50"
                disabled={isLoading}
              >
                ← Back to role selection
              </button>

              {/* Current Role Display */}
              <div className="mb-6 p-4 bg-accent rounded-lg border border-border">
                <p className="text-sm text-foreground font-medium">
                  Logging in as: <span className="font-bold text-primary">
                    {roles.find(r => r.value === selectedRole)?.label}
                  </span>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              {/* Administrator Position Selection */}
              {selectedRole === 'administrator' && !adminPosition && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Select Your Position
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                    {adminPositions.map((position) => (
                      <button
                        key={position}
                        onClick={() => setAdminPosition(position)}
                        className="text-left p-3 border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors disabled:opacity-50"
                        disabled={isLoading}
                      >
                        <span className="text-sm font-medium text-foreground">
                          {positionLabels[position]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Login Form - Show when role is selected and (not administrator or position is selected) */}
              {(selectedRole !== 'administrator' || adminPosition) && !isAwaitingOtp && (
                <form onSubmit={handleLogin} className="space-y-6">
                  {selectedRole === 'administrator' && (
                    <div className="p-3 bg-accent rounded-lg border border-border">
                      <p className="text-sm text-foreground">
                        Position: <span className="font-semibold text-primary">{positionLabels[adminPosition]}</span>
                      </p>
                    </div>
                  )}

                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 ">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all bg-background text-foreground disabled:opacity-50"
                          placeholder="Enter your username"
                          autoFocus
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all bg-background text-foreground disabled:opacity-50"
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    disabled={isLoading || !formData.username || !formData.password || (selectedRole === 'administrator' && !adminPosition)}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Logging in...
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Forgot Password */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-sm text-primary hover:text-primary/80 font-medium disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
              )}

              {/* OTP Verification Form */}
              {isAwaitingOtp && (
                <form onSubmit={handleOtpVerification} className="animate-in fade-in-50 slide-in-from-top-2 duration-300">
                  <div className="mb-6 p-4 bg-accent rounded-lg border border-border">
                    <p className="text-sm text-foreground">
                      <strong>OTP sent to:</strong> {otpContact}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Please check your phone or email for the verification code
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Enter OTP Code
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all bg-background text-foreground disabled:opacity-50 text-center text-lg tracking-widest"
                          placeholder="000000"
                          maxLength={6}
                          required
                          disabled={isLoading}
                          autoFocus
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                      disabled={isLoading || !formData.otp || formData.otp.length !== 6}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Verifying OTP...
                        </div>
                      ) : (
                        'Verify OTP & Login'
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-sm text-primary hover:text-primary/80 font-medium disabled:opacity-50 flex items-center justify-center mx-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin mr-1" />
                            Sending...
                          </div>
                        ) : (
                          'Resend OTP'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-muted px-8 py-4 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-border animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowForgotPasswordModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-8 h-8 text-secondary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                Password Reset Required
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To reset your password, please contact the school administrator. 
                They will be able to help you regain access to your account.
              </p>
              
              <div className="bg-accent border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground">
                  <strong>Contact Information:</strong><br />
                  Name: Amos Senkao <br />
                  Email: senkao.a@outlook.com<br />
                  Phone: 0776 - 949463<br />
                  Office: Upstairs Campus
                </p>
              </div>
              
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;