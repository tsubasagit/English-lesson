import { useState, useCallback, useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      Speech.stop();
    };
  }, []);

  const speak = useCallback((text: string) => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'en',
      rate: 0.85,
      onDone: () => {
        if (mountedRef.current) setIsSpeaking(false);
      },
      onStopped: () => {
        if (mountedRef.current) setIsSpeaking(false);
      },
      onError: () => {
        if (mountedRef.current) setIsSpeaking(false);
      },
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
