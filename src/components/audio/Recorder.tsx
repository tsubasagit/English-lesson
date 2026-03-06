import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, FontSize } from '../../constants/colors';
import { VolumeIndicator } from './VolumeIndicator';
import { formatDuration } from '../../utils/scoring';

interface RecorderProps {
  isRecording: boolean;
  metering: number;
  durationMillis: number;
  onStart: () => void;
  onStop: () => void;
}

export function Recorder({
  isRecording,
  metering,
  durationMillis,
  onStart,
  onStop,
}: RecorderProps) {
  return (
    <View style={styles.container}>
      <VolumeIndicator metering={metering} isActive={isRecording} />
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordButtonActive]}
        onPress={isRecording ? onStop : onStart}
        activeOpacity={0.7}
      >
        <View style={[styles.recordInner, isRecording && styles.recordInnerActive]}>
          {isRecording ? (
            <Ionicons name="stop" size={32} color={Colors.textOnPrimary} />
          ) : (
            <Ionicons name="mic" size={32} color={Colors.textOnPrimary} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.duration}>
        {isRecording
          ? formatDuration(Math.floor(durationMillis / 1000))
          : 'Tap to record'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  recordButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonActive: {
    borderColor: Colors.error,
  },
  recordInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordInnerActive: {
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.md,
    width: 52,
    height: 52,
  },
  duration: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
