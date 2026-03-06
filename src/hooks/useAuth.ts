import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { observeAuth, getUserProfile } from '../services/auth';

export function useAuth() {
  const { firebaseUser, profile, isLoading, setFirebaseUser, setProfile, setLoading } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = observeAuth(async (user) => {
      setFirebaseUser(user);
      if (user) {
        const p = await getUserProfile(user.uid);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user: firebaseUser, profile, isLoading };
}
