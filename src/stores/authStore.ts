import { create } from 'zustand';
import { User } from 'firebase/auth';
import { AppUser } from '../types/user';

interface AuthState {
  firebaseUser: User | null;
  profile: AppUser | null;
  isLoading: boolean;
  setFirebaseUser: (user: User | null) => void;
  setProfile: (profile: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  profile: null,
  isLoading: true,
  setFirebaseUser: (user) => set({ firebaseUser: user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
