import { useState, useRef, useCallback } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { PLAYBACK_STATUS_UPDATE_INTERVAL } from '../constants/audio';

interface AudioPlayerState {
  isPlaying: boolean;
  isLoaded: boolean;
  position: number;
  duration: number;
}

export function useAudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoaded: false,
    position: 0,
    duration: 0,
  });

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      setState((s) => ({ ...s, isLoaded: false }));
      return;
    }
    setState({
      isPlaying: status.isPlaying,
      isLoaded: true,
      position: status.positionMillis,
      duration: status.durationMillis || 0,
    });
    if (status.didJustFinish) {
      setState((s) => ({ ...s, isPlaying: false, position: 0 }));
    }
  }, []);

  const loadSound = useCallback(async (uri: string) => {
    await unloadSound();
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { progressUpdateIntervalMillis: PLAYBACK_STATUS_UPDATE_INTERVAL },
      onPlaybackStatusUpdate
    );
    soundRef.current = sound;
  }, [onPlaybackStatusUpdate]);

  const play = useCallback(async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded && status.positionMillis === status.durationMillis) {
      await soundRef.current.setPositionAsync(0);
    }
    await soundRef.current.playAsync();
  }, []);

  const pause = useCallback(async () => {
    if (!soundRef.current) return;
    await soundRef.current.pauseAsync();
  }, []);

  const stop = useCallback(async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync();
    await soundRef.current.setPositionAsync(0);
  }, []);

  const seekTo = useCallback(async (positionMillis: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(positionMillis);
  }, []);

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  return {
    ...state,
    loadSound,
    play,
    pause,
    stop,
    seekTo,
    unloadSound,
  };
}
