import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../src/constants/colors';
import { Card } from '../../src/components/ui/Card';
import { ProgressRing } from '../../src/components/ui/ProgressRing';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Your Progress</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>0</Text>
              <Text style={styles.overviewLabel}>Total Sessions</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>0 min</Text>
              <Text style={styles.overviewLabel}>Practice Time</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>0</Text>
              <Text style={styles.overviewLabel}>Day Streak</Text>
            </View>
          </View>
        </Card>

        {/* Average Score */}
        <Card style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <ProgressRing percentage={0} size={100} strokeWidth={10} />
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreTitle}>Average Score</Text>
              <Text style={styles.scoreDesc}>
                Complete practice sessions to see your average accuracy here.
              </Text>
            </View>
          </View>
        </Card>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.emptyCard}>
            <Ionicons name="analytics-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>
              No practice sessions yet.{'\n'}Start your first lesson!
            </Text>
          </Card>
        </View>

        {/* Weekly Calendar placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <Card>
            <View style={styles.weekRow}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <View key={day} style={styles.dayItem}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <View style={styles.dayCircle}>
                    <Ionicons name="remove-outline" size={16} color={Colors.textLight} />
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  overviewCard: {
    gap: Spacing.md,
  },
  overviewTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewItem: {
    alignItems: 'center',
    gap: 4,
  },
  overviewValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.primary,
  },
  overviewLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },
  scoreCard: {},
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  scoreInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  scoreTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  scoreDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dayLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
