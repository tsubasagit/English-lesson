import { onRequest } from 'firebase-functions/v2/https';

interface WordResult {
  word: string;
  status: 'correct' | 'incorrect' | 'missing';
  expected?: string;
}

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function compareTexts(reference: string, transcribed: string) {
  const refWords = normalize(reference);
  const transWords = normalize(transcribed);

  const dp: number[][] = Array.from({ length: refWords.length + 1 }, () =>
    Array(transWords.length + 1).fill(0)
  );

  for (let i = 0; i <= refWords.length; i++) dp[i][0] = i;
  for (let j = 0; j <= transWords.length; j++) dp[0][j] = j;

  for (let i = 1; i <= refWords.length; i++) {
    for (let j = 1; j <= transWords.length; j++) {
      if (refWords[i - 1] === transWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const wordResults: WordResult[] = [];
  let i = refWords.length;
  let j = transWords.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && refWords[i - 1] === transWords[j - 1]) {
      wordResults.unshift({ word: refWords[i - 1], status: 'correct' });
      i--; j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      wordResults.unshift({ word: transWords[j - 1], status: 'incorrect', expected: refWords[i - 1] });
      i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      wordResults.unshift({ word: refWords[i - 1], status: 'missing' });
      i--;
    } else {
      wordResults.unshift({ word: transWords[j - 1], status: 'incorrect' });
      j--;
    }
  }

  const correctCount = wordResults.filter((w) => w.status === 'correct').length;
  const matchRate = refWords.length > 0 ? Math.round((correctCount / refWords.length) * 100) : 0;

  return { matchRate, wordResults };
}

export const calculateScore = onRequest(
  { cors: true, region: 'asia-northeast1' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { reference, transcribed } = req.body;
    if (!reference || !transcribed) {
      res.status(400).json({ error: 'reference and transcribed are required' });
      return;
    }

    const result = compareTexts(reference, transcribed);
    res.json(result);
  }
);
