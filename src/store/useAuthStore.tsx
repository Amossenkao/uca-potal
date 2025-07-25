import { create } from 'zustand';
import axios from 'axios';

interface UserInfo {
  id: number;
  username: string;
  name: string;
}

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;

  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshtoken: () => Promise<void>;
  loadFromStorage: () => void;
  clearError: () => void;
}

const API_URL = '/api/auth';

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,

  login: async (username: string, password: string): Promise<boolean> => {
    set({ isLoading: true, error: null });
    
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Login failed' }));
        set({ 
          error: errorData.message || 'Invalid credentials',
          isLoading: false 
        });
        return false;
      }

      const data = await res.json();
      const { user, token, refreshToken } = data;

      // Validate required fields
      if (!user || !token || !refreshToken) {
        set({ 
          error: 'Invalid response from server',
          isLoading: false 
        });
        return false;
      }

      // Store in localStorage
      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      } catch (storageError) {
        console.warn('Failed to save to localStorage:', storageError);
      }

      // Update state
      set({
        user,
        token,
        refreshToken,
        isLoggedIn: true,
        error: null,
        isLoading: false,
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

  logout: async () => {
      await axios.post(`${API_URL}/logout`);
    set({ user: null, isLoggedIn: false });
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

      set({ 
        token: data.token,
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

      if (userStr && token && refreshToken) {
        const user = JSON.parse(userStr);
        
        set({
          user,
          token,
          refreshToken,
          isLoggedIn: true,
          error: null,
        });
      } else {
        // Clear any partial data
        set({
          user: null,
          token: null,
          refreshToken: null,
          isLoggedIn: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
      // Clear corrupted data
      get().logout();
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;