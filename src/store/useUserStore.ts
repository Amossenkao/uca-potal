import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '@/types'; // Adjust path as needed

type AuthStore = {
  user: UserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: UserInfo, token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
