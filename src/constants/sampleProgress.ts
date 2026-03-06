import { PracticeHistory } from '../types/practice';

// サンプル練習履歴データ（デモ用）
const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

export const SAMPLE_HISTORY: PracticeHistory[] = [
  {
    lessonId: 'lesson-1',
    lessonTitle: '友達へのあいさつ',
    matchRate: 72,
    practiceDate: now - 4 * DAY,
  },
  {
    lessonId: 'lesson-2',
    lessonTitle: 'カフェで注文する',
    matchRate: 65,
    practiceDate: now - 4 * DAY,
  },
  {
    lessonId: 'lesson-1',
    lessonTitle: '友達へのあいさつ',
    matchRate: 81,
    practiceDate: now - 3 * DAY,
  },
  {
    lessonId: 'lesson-4',
    lessonTitle: '道を尋ねる',
    matchRate: 58,
    practiceDate: now - 2 * DAY,
  },
  {
    lessonId: 'lesson-3',
    lessonTitle: '面接での自己紹介',
    matchRate: 45,
    practiceDate: now - 2 * DAY,
  },
  {
    lessonId: 'lesson-2',
    lessonTitle: 'カフェで注文する',
    matchRate: 78,
    practiceDate: now - 1 * DAY,
  },
  {
    lessonId: 'lesson-1',
    lessonTitle: '友達へのあいさつ',
    matchRate: 88,
    practiceDate: now - 1 * DAY,
  },
  {
    lessonId: 'lesson-4',
    lessonTitle: '道を尋ねる',
    matchRate: 71,
    practiceDate: now,
  },
];

// 集計ヘルパー
export const SAMPLE_STATS = {
  totalSessions: SAMPLE_HISTORY.length,
  totalMinutes: 12,
  streakDays: 4,
  averageScore: Math.round(
    SAMPLE_HISTORY.reduce((sum, h) => sum + h.matchRate, 0) / SAMPLE_HISTORY.length
  ),
  todaySessions: SAMPLE_HISTORY.filter(
    (h) => new Date(h.practiceDate).toDateString() === new Date(now).toDateString()
  ).length,
  todayMinutes: 2,
};

// 今週の練習日（曜日インデックス: 0=日, 1=月, ...）
export function getPracticedWeekdays(): Set<number> {
  const days = new Set<number>();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
  weekStart.setHours(0, 0, 0, 0);

  for (const h of SAMPLE_HISTORY) {
    const d = new Date(h.practiceDate);
    if (d >= weekStart) {
      days.add(d.getDay());
    }
  }
  return days;
}
