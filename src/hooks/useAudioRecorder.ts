import { useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { RECORDING_OPTIONS } from '../constants/audio';

interface RecorderState {
  isRecording: boolean;
  recordingUri: string | null;
  metering: number;
  durationMillis: number;
}

export function useAudioRecorder() {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [state, setState] = useState<RecorderState>({
    isRecording: false,
    recordingUri: null,
    metering: -160,
    durationMillis: 0,
  });

  const startRecording = useCallback(async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(RECORDING_OPTIONS);
    recording.setOnRecordingStatusUpdate((status) => {
      if (status.isRecording) {
        setState((s) => ({
          ...s,
          metering: status.metering ?? -160,
          durationMillis: status.durationMillis,
        }));
      }
    });
    recording.setProgressUpdateInterval(100);
    await recording.startAsync();
    recordingRef.current = recording;
    setState((s) => ({ ...s, isRecording: true, recordingUri: null }));
  }, []);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!recordingRef.current) return null;
    await recordingRef.current.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    const uri = recordingRef.current.getURI();
    recordingRef.current = null;
    setState((s) => ({
      ...s,
      isRecording: false,
      recordingUri: uri,
      metering: -160,
    }));
    return uri;
  }, []);

  const cancelRecording = useCallback(async () => {
    if (!recordingRef.current) return;
    await recordingRef.current.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    recordingRef.current = null;
    setState({ isRecording: false, recordingUri: null, metering: -160, durationMillis: 0 });
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
