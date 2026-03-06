export function getScoreLabel(matchRate: number): string {
  if (matchRate >= 90) return 'Excellent!';
  if (matchRate >= 70) return 'Great Job!';
  if (matchRate >= 50) return 'Good Try!';
  return 'Keep Practicing!';
}

export function getScoreColor(matchRate: number): string {
  if (matchRate >= 90) return '#34D399';
  if (matchRate >= 70) return '#A78BFA';
  if (matchRate >= 50) return '#F59E0B';
  return '#EF4444';
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
}
