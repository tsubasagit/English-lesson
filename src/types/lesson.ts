export type LessonCategory = 'daily' | 'business' | 'travel' | 'academic' | 'idiom';
export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  level: LessonLevel;
  script: string;
  audioUrl: string;
  imageUrl?: string;
  durationSeconds: number;
  order: number;
  createdAt: number;
}

export interface LessonGroup {
  category: LessonCategory;
  label: string;
  lessons: Lesson[];
}

export const CATEGORY_LABELS: Record<LessonCategory, string> = {
  daily: '日常会話',
  business: 'ビジネス',
  travel: '旅行',
  academic: 'アカデミック',
  idiom: 'イディオム',
};

export const LEVEL_LABELS: Record<LessonLevel, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};
