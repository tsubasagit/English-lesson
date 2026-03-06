import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize } from '../../src/constants/colors';
import { Button } from '../../src/components/ui/Button';

export default function ResultScreen() {
  const { practiceId } = useLocalSearchParams<{ practiceId: string }>();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>練習完了!</Text>
        <Text style={styles.subtitle}>セッション: {practiceId}</Text>
        <Text style={styles.desc}>
          詳細な結果画面は準備中です。{'\n'}レビューステップでスコアを確認してください。
        </Text>
        <Button title="ホームに戻る" onPress={() => router.push('/')} size="lg" />
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  desc: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
