import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isConfigured } from './firebase';
import { AppUser } from '../types/user';

export function observeAuth(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function signUp(email: string, password: string, displayName: string): Promise<User> {
  if (!auth || !db) throw new Error('Firebase is not configured');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  const appUser: AppUser = {
    uid: cred.user.uid,
    email,
    displayName,
    photoUrl: null,
    streak: 0,
    lastPracticeDate: null,
    totalPracticeCount: 0,
    totalPracticeMinutes: 0,
    createdAt: Date.now(),
  };
  await setDoc(doc(db, 'users', cred.user.uid), appUser);
  return cred.user;
}

export async function signIn(email: string, password: string): Promise<User> {
  if (!auth) throw new Error('Firebase is not configured');
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut(): Promise<void> {
  if (!auth) return;
  await firebaseSignOut(auth);
}

export async function getUserProfile(uid: string): Promise<AppUser | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as AppUser) : null;
}
