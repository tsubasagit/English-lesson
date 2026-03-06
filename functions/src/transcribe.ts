import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { SpeechClient } from '@google-cloud/speech';

if (!admin.apps.length) {
  admin.initializeApp();
}

const speechClient = new SpeechClient();

export const transcribe = onRequest(
  { cors: true, region: 'asia-northeast1' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { audioUrl } = req.body;
    if (!audioUrl) {
      res.status(400).json({ error: 'audioUrl is required' });
      return;
    }

    try {
      // Download audio from Firebase Storage
      const bucket = admin.storage().bucket();
      const audioPath = new URL(audioUrl).pathname.split('/o/')[1];
      if (!audioPath) {
        res.status(400).json({ error: 'Invalid audio URL' });
        return;
      }
      const decodedPath = decodeURIComponent(audioPath.split('?')[0]);
      const file = bucket.file(decodedPath);
      const [audioBuffer] = await file.download();
      const audioContent = audioBuffer.toString('base64');

      // Call Speech-to-Text
      const [response] = await speechClient.recognize({
        config: {
          encoding: 'MP4' as any,
          sampleRateHertz: 44100,
          languageCode: 'en-US',
          model: 'latest_long',
          enableAutomaticPunctuation: true,
        },
        audio: { content: audioContent },
      });

      const transcription = response.results
        ?.map((result) => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join(' ') || '';

      const confidence = response.results?.[0]?.alternatives?.[0]?.confidence || 0;

      res.json({ text: transcription, confidence });
    } catch (error: any) {
      console.error('Transcription error:', error);
      res.status(500).json({ error: 'Transcription failed', details: error.message });
    }
  }
);
