import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  increment,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { PracticeSession, PracticeHistory } from '../types/practice';

const COLLECTION = 'practices';

export async function createPracticeSession(
  lessonId: string,
  userId: string
): Promise<string> {
  const session: Omit<PracticeSession, 'id'> = {
    lessonId,
    userId,
    recordingUri: null,
    transcribedText: null,
    matchRate: null,
    wordResults: null,
    createdAt: Date.now(),
    completedAt: null,
  };
  const docRef = await addDoc(collection(db, COLLECTION), session);
  return docRef.id;
}

export async function uploadRecording(
  practiceId: string,
  userId: string,
  uri: string
): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, `recordings/${userId}/${practiceId}.m4a`);
  await uploadBytes(storageRef, blob);
  const downloadUrl = await getDownloadURL(storageRef);

  await updateDoc(doc(db, COLLECTION, practiceId), {
    recordingUri: downloadUrl,
  });

  return downloadUrl;
}

export async function completePractice(
  practiceId: string,
  transcribedText: string,
  matchRate: number,
  wordResults: PracticeSession['wordResults']
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, practiceId), {
    transcribedText,
    matchRate,
    wordResults,
    completedAt: Date.now(),
  });
}

export async function updateUserStats(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    totalPracticeCount: increment(1),
    lastPracticeDate: new Date().toISOString().split('T')[0],
  });
}

export async function fetchPracticeHistory(
  userId: string,
  maxResults = 20
): Promise<PracticeHistory[]> {
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    where('completedAt', '!=', null),
    orderBy('completedAt', 'desc'),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      lessonId: data.lessonId,
      lessonTitle: data.lessonTitle || '',
      matchRate: data.matchRate || 0,
      practiceDate: data.completedAt,
    };
  });
}

export async function fetchRecentPractices(
  userId: string,
  count = 5
): Promise<PracticeSession[]> {
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PracticeSession));
}
