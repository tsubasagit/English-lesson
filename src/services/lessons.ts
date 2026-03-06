import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Lesson, LessonCategory } from '../types/lesson';

const COLLECTION = 'lessons';

export async function fetchLessons(): Promise<Lesson[]> {
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
}

export async function fetchLessonsByCategory(category: LessonCategory): Promise<Lesson[]> {
  const q = query(
    collection(db, COLLECTION),
    where('category', '==', category),
    orderBy('order', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
}

export async function fetchLesson(id: string): Promise<Lesson | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Lesson) : null;
}
