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
import {
  SAMPLE_HISTORY,
  SAMPLE_STATS,
  getPracticedWeekdays,
} from '../../src/constants/sampleProgress';

const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'];
// JS getDay(): 0=Sun, map to Mon-Sun index
const JS_DAY_TO_INDEX: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };

export default function ProgressScreen() {
  const practicedDays = getPracticedWeekdays();
  const todayIndex = JS_DAY_TO_INDEX[new Date().getDay()];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>あなたの進捗</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>{SAMPLE_STATS.totalSessions}</Text>
              <Text style={styles.overviewLabel}>練習回数</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>{SAMPLE_STATS.totalMinutes} 分</Text>
              <Text style={styles.overviewLabel}>練習時間</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>{SAMPLE_STATS.streakDays}</Text>
              <Text style={styles.overviewLabel}>連続日数</Text>
            </View>
          </View>
        </Card>

        {/* Average Score */}
        <Card style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <ProgressRing percentage={SAMPLE_STATS.averageScore} size={100} strokeWidth={10} />
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreTitle}>平均スコア</Text>
              <Text style={styles.scoreDesc}>
                {SAMPLE_STATS.averageScore}% — 着実に上達しています!
              </Text>
            </View>
          </View>
        </Card>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最近のアクティビティ</Text>
          {[...SAMPLE_HISTORY].reverse().slice(0, 5).map((item, index) => {
            const date = new Date(item.practiceDate);
            const isToday = date.toDateString() === new Date().toDateString();
            const dateLabel = isToday
              ? '今日'
              : `${date.getMonth() + 1}/${date.getDate()}`;

            return (
              <Card key={index} style={styles.activityCard}>
                <View style={styles.activityLeft}>
                  <View style={[
                    styles.activityDot,
                    { backgroundColor: item.matchRate >= 80 ? Colors.success : item.matchRate >= 60 ? Colors.warning : Colors.error },
                  ]} />
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>{item.lessonTitle}</Text>
                    <Text style={styles.activityDate}>{dateLabel}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.activityScore,
                  { color: item.matchRate >= 80 ? Colors.success : item.matchRate >= 60 ? Colors.primary : Colors.textSecondary },
                ]}>
                  {item.matchRate}%
                </Text>
              </Card>
            );
          })}
        </View>

        {/* Weekly Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今週</Text>
          <Card>
            <View style={styles.weekRow}>
              {WEEKDAYS.map((day, i) => {
                // Map WEEKDAYS index (0=Mon..6=Sun) to JS day (1=Mon..0=Sun)
                const jsDay = i === 6 ? 0 : i + 1;
                const practiced = practicedDays.has(jsDay);
                const isToday = i === todayIndex;

                return (
                  <View key={day} style={styles.dayItem}>
                    <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>{day}</Text>
                    <View style={[
                      styles.dayCircle,
                      practiced && styles.dayCircleDone,
                      isToday && !practiced && styles.dayCircleToday,
                    ]}>
                      {practiced ? (
                        <Ionicons name="checkmark" size={16} color={Colors.textOnPrimary} />
                      ) : (
                        <Ionicons name="remove-outline" size={16} color={isToday ? Colors.primary : Colors.textLight} />
                      )}
                    </View>
                  </View>
                );
              })}
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
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activityInfo: {
    gap: 2,
  },
  activityTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  activityDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  activityScore: {
    fontSize: FontSize.lg,
    fontWeight: '700',
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
  dayLabelToday: {
    color: Colors.primary,
    fontWeight: '700',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleDone: {
    backgroundColor: Colors.primary,
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
});
