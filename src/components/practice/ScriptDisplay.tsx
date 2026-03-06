import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, Spacing, FontSize } from '../../constants/colors';

interface ScriptDisplayProps {
  script: string;
  showTranslation?: boolean;
}

export function ScriptDisplay({ script }: ScriptDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Script</Text>
      <Text style={styles.script}>{script}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  script: {
    fontSize: FontSize.lg,
    color: Colors.text,
    lineHeight: 28,
  },
});
