import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../../constants/colors';
import { getScoreColor } from '../../utils/scoring';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 8,
  showLabel = true,
}: ProgressRingProps) {
  const color = getScoreColor(percentage);
  const innerSize = size - strokeWidth * 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: Colors.borderLight,
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderTopColor: color,
            borderRightColor: percentage > 25 ? color : 'transparent',
            borderBottomColor: percentage > 50 ? color : 'transparent',
            borderLeftColor: percentage > 75 ? color : 'transparent',
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
      {showLabel && (
        <View style={[styles.labelContainer, { width: innerSize, height: innerSize }]}>
          <Text style={[styles.label, { color, fontSize: size * 0.22 }]}>
            {percentage}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
  },
});
