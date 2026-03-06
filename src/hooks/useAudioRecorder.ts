import { useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { RECORDING_OPTIONS } from '../constants/audio';

interface RecorderState {
  isRecording: boolean;
  recordingUri: string | null;
  metering: number;
  durationMillis: number;
  permissionGranted: boolean;
}

export function useAudioRecorder() {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [state, setState] = useState<RecorderState>({
    isRecording: false,
    recordingUri: null,
    metering: -160,
    durationMillis: 0,
    permissionGranted: false,
  });

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const { status } = await Audio.requestPermissionsAsync();
    const granted = status === 'granted';
    setState((s) => ({ ...s, permissionGranted: granted }));
    return granted;
  }, []);

  const startRecording = useCallback(async () => {
    // Request permission first
    const granted = await requestPermission();
    if (!granted) {
      throw new Error('マイクの権限が許可されていません');
    }

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
  }, [requestPermission]);

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
    setState({ isRecording: false, recordingUri: null, metering: -160, durationMillis: 0, permissionGranted: state.permissionGranted });
  }, [state.permissionGranted]);

  return {
    ...state,
    startRecording,
    stopRecording,
    cancelRecording,
    requestPermission,
  };
}
