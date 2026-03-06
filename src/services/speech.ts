const FUNCTIONS_BASE_URL = process.env.EXPO_PUBLIC_FUNCTIONS_URL || 'http://localhost:5001';

export interface TranscriptionResult {
  text: string;
  confidence: number;
}

export async function transcribeAudio(audioUrl: string): Promise<TranscriptionResult> {
  const response = await fetch(`${FUNCTIONS_BASE_URL}/transcribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioUrl }),
  });

  if (!response.ok) {
    throw new Error(`Transcription failed: ${response.status}`);
  }

  return response.json();
}
