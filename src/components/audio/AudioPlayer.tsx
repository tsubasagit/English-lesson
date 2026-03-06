import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, FontSize } from '../../constants/colors';
import { formatDuration } from '../../utils/scoring';

interface AudioPlayerProps {
  isPlaying: boolean;
  isLoaded: boolean;
  position: number;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
  label?: string;
}

export function AudioPlayer({
  isPlaying,
  isLoaded,
  position,
  duration,
  onPlay,
  onPause,
  label,
}: AudioPlayerProps) {
  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={isPlaying ? onPause : onPlay}
          disabled={!isLoaded}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={28}
            color={Colors.textOnPrimary}
          />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.time}>{formatDuration(Math.floor(position / 1000))}</Text>
            <Text style={styles.time}>{formatDuration(Math.floor(duration / 1000))}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
  },
  progressContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
});
