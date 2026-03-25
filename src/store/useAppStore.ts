import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  user: any | null;
  token: string | null;
  lastActive: number | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  updateLastActive: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      lastActive: null,
      setUser: (user) => set({ user, lastActive: Date.now() }),
      setToken: (token) => set({ token }),
      updateLastActive: () => set({ lastActive: Date.now() }),
      logout: () => set({ user: null, token: null, lastActive: null }),
    }),
    {
      name: 'airpax-rider-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
