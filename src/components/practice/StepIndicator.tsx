import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, Spacing, FontSize } from '../../constants/colors';
import { PracticeStep } from '../../types/practice';

const STEPS: { key: PracticeStep; label: string; icon: string }[] = [
  { key: 'listen', label: 'Listen', icon: '1' },
  { key: 'shadow', label: 'Shadow', icon: '2' },
  { key: 'review', label: 'Review', icon: '3' },
];

interface StepIndicatorProps {
  currentStep: PracticeStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <React.Fragment key={step.key}>
            {index > 0 && (
              <View style={[styles.line, isCompleted && styles.lineCompleted]} />
            )}
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.circle,
                  isActive && styles.circleActive,
                  isCompleted && styles.circleCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    (isActive || isCompleted) && styles.circleTextActive,
                  ]}
                >
                  {isCompleted ? '\u2713' : step.icon}
                </Text>
              </View>
              <Text
                style={[styles.label, isActive && styles.labelActive]}
              >
                {step.label}
              </Text>
            </View>
          </React.Fragment>
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
    paddingHorizontal: Spacing.lg,
  },
  stepItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: Colors.primary,
  },
  circleCompleted: {
    backgroundColor: Colors.accent,
  },
  circleText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textLight,
  },
  circleTextActive: {
    color: Colors.textOnPrimary,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  lineCompleted: {
    backgroundColor: Colors.accent,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
