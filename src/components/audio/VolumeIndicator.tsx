import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../constants/colors';

interface VolumeIndicatorProps {
  metering: number;
  isActive: boolean;
  barCount?: number;
}

export function VolumeIndicator({ metering, isActive, barCount = 20 }: VolumeIndicatorProps) {
  // metering ranges from -160 (silence) to 0 (max)
  const normalizedLevel = isActive ? Math.max(0, (metering + 60) / 60) : 0;

  return (
    <View style={styles.container}>
      {Array.from({ length: barCount }).map((_, i) => {
        const threshold = i / barCount;
        const active = normalizedLevel > threshold;
        return (
          <View
            key={i}
            style={[
              styles.bar,
              {
                backgroundColor: active ? Colors.primary : Colors.borderLight,
                height: 8 + Math.abs(i - barCount / 2) * 1.5,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 40,
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },
});
