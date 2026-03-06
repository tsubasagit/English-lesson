import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSize, Spacing } from '../../constants/colors';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
}

export function Badge({
  label,
  color = Colors.primaryLight + '30',
  textColor = Colors.primary,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
