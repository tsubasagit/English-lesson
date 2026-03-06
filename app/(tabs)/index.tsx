import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../src/constants/colors';
import { Card } from '../../src/components/ui/Card';
import { SAMPLE_LESSONS } from '../../src/constants/sampleData';
import { LEVEL_LABELS } from '../../src/types/lesson';
import { Badge } from '../../src/components/ui/Badge';

export default function HomeScreen() {
  const router = useRouter();
  const recentLessons = SAMPLE_LESSONS.slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.appName}>Oshaberi Shadow</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={20} color={Colors.primary} />
            <Text style={styles.streakText}>0 days</Text>
          </View>
        </View>

        {/* Quick Start */}
        <TouchableOpacity
          style={styles.quickStart}
          onPress={() => router.push('/practice/lesson-1')}
          activeOpacity={0.8}
        >
          <View style={styles.quickStartContent}>
            <View style={styles.quickStartIcon}>
              <Ionicons name="mic" size={28} color={Colors.textOnPrimary} />
            </View>
            <View style={styles.quickStartText}>
              <Text style={styles.quickStartTitle}>Start Shadowing</Text>
              <Text style={styles.quickStartSub}>
                Pick up where you left off
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.textOnPrimary} />
          </View>
        </TouchableOpacity>

        {/* Today's Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Ionicons name="time-outline" size={24} color={Colors.secondary} />
            <Text style={styles.statValue}>0 min</Text>
            <Text style={styles.statLabel}>Today</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={24} color={Colors.accent} />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="trending-up-outline" size={24} color={Colors.primary} />
            <Text style={styles.statValue}>--%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </Card>
        </View>

        {/* Recommended Lessons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/lessons')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {recentLessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => router.push(`/practice/${lesson.id}`)}
              activeOpacity={0.7}
            >
              <Card style={styles.lessonCard}>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDesc} numberOfLines={1}>
                    {lesson.description}
                  </Text>
                  <View style={styles.lessonMeta}>
                    <Badge label={LEVEL_LABELS[lesson.level]} />
                    <Text style={styles.lessonDuration}>
                      {lesson.durationSeconds}s
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.textLight}
                />
              </Card>
            </TouchableOpacity>
          ))}
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
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  streakText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  quickStart: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  quickStartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  quickStartIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickStartText: {
    flex: 1,
  },
  quickStartTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textOnPrimary,
  },
  quickStartSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  lessonInfo: {
    flex: 1,
    gap: 4,
  },
  lessonTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  lessonDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  lessonDuration: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
});
