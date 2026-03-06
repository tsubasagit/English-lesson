export type PracticeStep = 'listen' | 'shadow' | 'review';

export interface PracticeSession {
  id: string;
  lessonId: string;
  userId: string;
  recordingUri: string | null;
  transcribedText: string | null;
  matchRate: number | null;
  wordResults: WordResult[] | null;
  createdAt: number;
  completedAt: number | null;
}

export interface WordResult {
  word: string;
  status: 'correct' | 'incorrect' | 'missing';
  expected?: string;
}

export interface PracticeHistory {
  lessonId: string;
  lessonTitle: string;
  matchRate: number;
  practiceDate: number;
}
