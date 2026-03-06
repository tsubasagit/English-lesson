import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Lesson, LessonCategory } from '../types/lesson';
import { SAMPLE_LESSONS } from '../constants/sampleData';

const COLLECTION = 'lessons';

export async function fetchLessons(): Promise<Lesson[]> {
  if (!db) return SAMPLE_LESSONS;
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
  return docs.length > 0 ? docs : SAMPLE_LESSONS;
}

export async function fetchLessonsByCategory(category: LessonCategory): Promise<Lesson[]> {
  if (!db) return SAMPLE_LESSONS.filter((l) => l.category === category);
  const q = query(
    collection(db, COLLECTION),
    where('category', '==', category),
    orderBy('order', 'asc')
  );
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
  return docs.length > 0 ? docs : SAMPLE_LESSONS.filter((l) => l.category === category);
}

export async function fetchLesson(id: string): Promise<Lesson | null> {
  if (!db) return SAMPLE_LESSONS.find((l) => l.id === id) ?? null;
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Lesson) : null;
}
