import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WordResult } from '../../types/practice';
import { Colors, BorderRadius, Spacing, FontSize } from '../../constants/colors';

interface TextComparisonProps {
  wordResults: WordResult[];
}

export function TextComparison({ wordResults }: TextComparisonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Result</Text>
      <View style={styles.wordContainer}>
        {wordResults.map((result, index) => (
          <View key={index} style={styles.wordWrapper}>
            <Text
              style={[
                styles.word,
                result.status === 'correct' && styles.correct,
                result.status === 'incorrect' && styles.incorrect,
                result.status === 'missing' && styles.missing,
              ]}
            >
              {result.word}
            </Text>
            {result.status === 'incorrect' && result.expected && (
              <Text style={styles.expected}>{result.expected}</Text>
            )}
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.matchCorrect }]} />
          <Text style={styles.legendText}>Correct</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.matchIncorrect }]} />
          <Text style={styles.legendText}>Incorrect</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.matchMissing }]} />
          <Text style={styles.legendText}>Missing</Text>
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
    fontSize: FontSize.xs,
    color: Colors.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  wordWrapper: {
    alignItems: 'center',
  },
  word: {
    fontSize: FontSize.md,
    fontWeight: '500',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  correct: {
    color: Colors.matchCorrect,
    backgroundColor: Colors.matchCorrect + '15',
  },
  incorrect: {
    color: Colors.matchIncorrect,
    backgroundColor: Colors.matchIncorrect + '15',
    textDecorationLine: 'line-through',
  },
  missing: {
    color: Colors.matchMissing,
    backgroundColor: Colors.matchMissing + '15',
    fontStyle: 'italic',
  },
  expected: {
    fontSize: FontSize.xs,
    color: Colors.matchCorrect,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
