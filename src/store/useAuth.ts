import { create } from 'zustand';
import axios from 'axios';

interface UserInfo {
  id: string;
  username: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  position?: string;
  profilePhoto?: string;
  nickName?: string;
  address?: string;
  phone?: string;
  email?: string;
  bio?: string;
}

interface LoginData {
  role: string;
  username: string;
  password: string;
  position?: string;
}

interface OtpData {
  sessionId: string;
  message: string;
  contact?: string;
}

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
  
  // OTP specific states for admin
  sessionId: string | null;
  isAwaitingOtp: boolean;
  otpContact: string | null;

  login: (loginData: LoginData) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resendOtp: () => Promise<boolean>;
  logout: () => void;
  refreshtoken: () => Promise<void>;
  loadFromStorage: () => void;
  clearError: () => void;
  resetOtpState: () => void;
}

const API_URL = '/api/auth/login';

const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  sessionId: null,
  isAwaitingOtp: false,
  otpContact: null,

  login: async (loginData: LoginData): Promise<boolean> => {
    set({ isLoading: true, error: null });
    
    try {
      const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          ...loginData
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        set({ 
          error: data.message || 'Invalid credentials',
          isLoading: false 
        });
        return false;
      }

      if (data.requiresOTP) {
        console.log('OTP required, setting up OTP state');
        set({
          sessionId: data.sessionId,
          isAwaitingOtp: true,
          otpContact: data.contact,
          error: null,
          isLoading: false,
        });
        return false; 
      }

      const { user, token, refreshToken } = data;

      if (!user || !token) {
        set({ 
          error: 'Invalid response from server',
          isLoading: false 
        });
        return false;
      }

      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken || token);
      } catch (storageError) {
        console.warn('Failed to save to localStorage:', storageError);
      }

      // Update state
      set({
        user,
        token,
        refreshToken: refreshToken || token,
        isLoggedIn: true,
        error: null,
        isLoading: false,
        sessionId: null,
        isAwaitingOtp: false,
        otpContact: null,
      });

      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      set({ 
        error: error.message || 'Network error occurred',
        isLoading: false,
        isLoggedIn: false
      });
      return false;
    }
  },

  verifyOtp: async (otp: string): Promise<boolean> => {
    const { sessionId } = get();
    
    if (!sessionId) {
      set({ error: 'No active OTP session' });
      return false;
    }

    // Validate OTP format (6 digits)
    if (!otp || !/^\d{6}$/.test(otp.trim())) {
      set({ error: 'Please enter a valid 6-digit OTP' });
      return false;
    }

    set({ isLoading: true, error: null });
    
    try {
      console.log(`Verifying OTP: ${otp} with session: ${sessionId}`);
      
      const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_otp',
          sessionId,
          otp: otp.trim() // Ensure we trim whitespace
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('OTP verification failed:', data.message);
        set({ 
          error: data.message || 'Invalid OTP',
          isLoading: false 
        });
        return false;
      }

      const { user, token, refreshToken } = data;

      // Validate required fields
      if (!user || !token) {
        set({ 
          error: 'Invalid response from server',
          isLoading: false 
        });
        return false;
      }

      console.log('OTP verification successful, logging in user');

      // Store in localStorage
      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken || token);
      } catch (storageError) {
        console.warn('Failed to save to localStorage:', storageError);
      }

      set({
        user,
        token,
        refreshToken: refreshToken || token,
        isLoggedIn: true,
        error: null,
        isLoading: false,
        sessionId: null,
        isAwaitingOtp: false,
        otpContact: null,
      });

      return true;
    } catch (error: any) {
      console.error('OTP verification error:', error);
      set({ 
        error: error.message || 'Failed to verify OTP',
        isLoading: false
      });
      return false;
    }
  },

  resendOtp: async (): Promise<boolean> => {
    const { sessionId } = get();
    
    if (!sessionId) {
      set({ error: 'No active OTP session' });
      return false;
    }

    set({ isLoading: true, error: null });
    
    try {
      console.log('Resending OTP for session:', sessionId);
      
      const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resend_otp',
          sessionId
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        set({ 
          error: data.message || 'Failed to resend OTP',
          isLoading: false 
        });
        return false;
      }

      set({
        sessionId: data.sessionId,
        otpContact: data.contact,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error: any) {
      console.error('OTP resend error:', error);
      set({ 
        error: error.message || 'Failed to resend OTP',
        isLoading: false
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    
    try {
      await fetch(`/api/auth/login`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${get().token}`,
          'Content-Type': 'application/json'
        }
      }).catch(() => {
        console.warn('Server logout failed, proceeding with local logout');
      });
    } catch (error) {
      console.warn('Logout request failed:', error);
    }

    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }

    // Reset state
    set({
      user: null,
      token: null,
      refreshToken: null,
      isLoggedIn: false,
      error: null,
      isLoading: false,
      sessionId: null,
      isAwaitingOtp: false,
      otpContact: null,
    });
  },

  refreshtoken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const res = await fetch(`${API_URL}/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await res.json();
      
      if (!data.token) {
        throw new Error('Invalid refresh response');
      }

      localStorage.setItem('token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      set({ 
        token: data.token,
        refreshToken: data.refreshToken || get().refreshToken,
        error: null 
      });
    } catch (error: any) {
      console.error('Token refresh failed:', error);
      // Auto-logout on refresh failure
      get().logout();
      throw error;
    }
  },

  loadFromStorage: () => {
    if (typeof window === 'undefined') return;

    try {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (userStr && token) {
        const user = JSON.parse(userStr);
        
        set({
          user,
          token,
          refreshToken: refreshToken || token,
          isLoggedIn: true,
          error: null,
          sessionId: null,
          isAwaitingOtp: false,
          otpContact: null,
        });
      } else {
        // Clear any partial data
        set({
          user: null,
          token: null,
          refreshToken: null,
          isLoggedIn: false,
          error: null,
          sessionId: null,
          isAwaitingOtp: false,
          otpContact: null,
        });
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
      get().logout();
    }
  },

  clearError: () => {
    set({ error: null });
  },

  resetOtpState: () => {
    set({
      sessionId: null,
      isAwaitingOtp: false,
      otpContact: null,
      error: null,
    });
  },
}));

export default useAuth;