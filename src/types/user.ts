export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string | null;
  streak: number;
  lastPracticeDate: string | null;
  totalPracticeCount: number;
  totalPracticeMinutes: number;
  createdAt: number;
}
