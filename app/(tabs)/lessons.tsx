import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../src/constants/colors';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { SAMPLE_LESSONS } from '../../src/constants/sampleData';
import {
  LessonCategory,
  CATEGORY_LABELS,
  LEVEL_LABELS,
} from '../../src/types/lesson';

const CATEGORIES: (LessonCategory | 'all')[] = [
  'all',
  'daily',
  'business',
  'travel',
  'academic',
  'idiom',
];

const CATEGORY_TAB_LABELS: Record<string, string> = {
  all: 'すべて',
  ...CATEGORY_LABELS,
};

export default function LessonsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | 'all'>('all');

  const filteredLessons =
    selectedCategory === 'all'
      ? SAMPLE_LESSONS
      : SAMPLE_LESSONS.filter((l) => l.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, selectedCategory === cat && styles.tabActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat && styles.tabTextActive,
              ]}
            >
              {CATEGORY_TAB_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lesson List */}
      <ScrollView contentContainerStyle={styles.content}>
        {filteredLessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => router.push(`/practice/${lesson.id}`)}
            activeOpacity={0.7}
          >
            <Card style={styles.lessonCard}>
              {lesson.imageUrl ? (
                <Image
                  source={{ uri: lesson.imageUrl }}
                  style={styles.lessonImage}
                />
              ) : (
                <View style={styles.lessonImagePlaceholder} />
              )}
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDesc} numberOfLines={2}>
                  {lesson.description}
                </Text>
                <View style={styles.lessonMeta}>
                  <Badge label={LEVEL_LABELS[lesson.level]} />
                  <Badge
                    label={CATEGORY_LABELS[lesson.category]}
                    color={Colors.secondaryLight + '30'}
                    textColor={Colors.secondary}
                  />
                  <Text style={styles.lessonDuration}>
                    {lesson.durationSeconds}s
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabScroll: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  tab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceSecondary,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textOnPrimary,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  lessonImage: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
  },
  lessonImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSecondary,
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
    lineHeight: 20,
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
