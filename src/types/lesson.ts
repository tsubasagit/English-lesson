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
  daily: 'Daily Conversation',
  business: 'Business',
  travel: 'Travel',
  academic: 'Academic',
  idiom: 'Idioms & Phrases',
};

export const LEVEL_LABELS: Record<LessonLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
