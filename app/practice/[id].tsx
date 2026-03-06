import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize } from '../../src/constants/colors';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { AudioPlayer } from '../../src/components/audio/AudioPlayer';
import { Recorder } from '../../src/components/audio/Recorder';
import { ScriptDisplay } from '../../src/components/practice/ScriptDisplay';
import { StepIndicator } from '../../src/components/practice/StepIndicator';
import { TextComparison } from '../../src/components/practice/TextComparison';
import { useAudioPlayer } from '../../src/hooks/useAudioPlayer';
import { useAudioRecorder } from '../../src/hooks/useAudioRecorder';
import { useTextToSpeech } from '../../src/hooks/useTextToSpeech';
import { usePracticeStore } from '../../src/stores/practiceStore';
import { SAMPLE_LESSONS } from '../../src/constants/sampleData';
import { compareTexts } from '../../src/utils/textComparison';
import { getScoreLabel } from '../../src/utils/scoring';
import { ProgressRing } from '../../src/components/ui/ProgressRing';
import { PracticeStep } from '../../src/types/practice';

export default function PracticeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const lesson = SAMPLE_LESSONS.find((l) => l.id === id);
  const {
    currentStep,
    matchRate,
    wordResults,
    isProcessing,
    setStep,
    setRecordingUri,
    setTranscribedText,
    setMatchRate,
    setWordResults,
    setIsProcessing,
    reset,
  } = usePracticeStore();

  const modelPlayer = useAudioPlayer();
  const recordingPlayer = useAudioPlayer();
  const recorder = useAudioRecorder();
  const tts = useTextToSpeech();

  useEffect(() => {
    reset();
    return () => {
      modelPlayer.unloadSound();
      recordingPlayer.unloadSound();
      tts.stop();
      reset();
    };
  }, [id]);

  const handleNextStep = useCallback(() => {
    const steps: PracticeStep[] = ['listen', 'shadow', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [currentStep, setStep]);

  const handleStartRecording = useCallback(async () => {
    try {
      await recorder.startRecording();
    } catch (err) {
      Alert.alert('エラー', '録音を開始できませんでした。マイクの権限を確認してください。');
    }
  }, [recorder]);

  const handleStopRecording = useCallback(async () => {
    try {
      const uri = await recorder.stopRecording();
      if (uri) {
        setRecordingUri(uri);

        // Load recording for playback
        try {
          await recordingPlayer.loadSound(uri);
        } catch (e) {
          console.warn('Could not load recording for playback:', e);
        }

        // Simulate transcription for demo (in production: upload -> Cloud Functions -> STT)
        setIsProcessing(true);
        setTimeout(() => {
          if (lesson) {
            const words = lesson.script.split(/\s+/);
            const simulated = words
              .map((w) => (Math.random() > 0.2 ? w : ''))
              .filter(Boolean)
              .join(' ');
            const result = compareTexts(lesson.script, simulated);
            setTranscribedText(simulated);
            setMatchRate(result.matchRate);
            setWordResults(result.wordResults);
          }
          setIsProcessing(false);
          setStep('review');
        }, 1500);
      }
    } catch (e) {
      console.error('Stop recording error:', e);
      setIsProcessing(false);
    }
  }, [recorder, recordingPlayer, lesson, setRecordingUri, setIsProcessing, setStep, setTranscribedText, setMatchRate, setWordResults]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.errorText}>レッスンが見つかりません</Text>
          <Button title="戻る" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Lesson Title */}
        <Text style={styles.title}>{lesson.title}</Text>

        {/* Step Content */}
        {currentStep === 'listen' && (
          <View style={styles.stepContent}>
            <Card>
              <ScriptDisplay script={lesson.script} />
            </Card>
            <Card>
              {lesson.audioUrl ? (
                <AudioPlayer
                  isPlaying={modelPlayer.isPlaying}
                  isLoaded={modelPlayer.isLoaded}
                  position={modelPlayer.position}
                  duration={modelPlayer.duration}
                  onPlay={modelPlayer.play}
                  onPause={modelPlayer.pause}
                  label="お手本音声"
                />
              ) : (
                <View style={styles.ttsContainer}>
                  <Button
                    title={tts.isSpeaking ? '停止する' : 'お手本を聴く'}
                    onPress={() => {
                      if (tts.isSpeaking) {
                        tts.stop();
                      } else {
                        tts.speak(lesson.script);
                      }
                    }}
                    variant={tts.isSpeaking ? 'outline' : 'primary'}
                    size="lg"
                  />
                  <Text style={styles.ttsHint}>
                    端末の音声読み上げでスクリプトを再生します
                  </Text>
                </View>
              )}
            </Card>
            <Button title="次へ: 声を録音する" onPress={handleNextStep} size="lg" />
          </View>
        )}

        {currentStep === 'shadow' && (
          <View style={styles.stepContent}>
            <Card>
              <ScriptDisplay script={lesson.script} />
            </Card>
            <Card style={styles.recorderCard}>
              <Recorder
                isRecording={recorder.isRecording}
                metering={recorder.metering}
                durationMillis={recorder.durationMillis}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
              />
            </Card>
            {isProcessing && (
              <View style={styles.processingContainer}>
                <Text style={styles.processingText}>発音を分析中...</Text>
              </View>
            )}
            {recorder.recordingUri && !recorder.isRecording && !isProcessing && (
              <Button title="聞き比べる" onPress={() => setStep('review')} size="lg" />
            )}
          </View>
        )}

        {currentStep === 'review' && (
          <View style={styles.stepContent}>
            {/* Score */}
            {matchRate !== null && (
              <Card style={styles.scoreCard}>
                <ProgressRing percentage={matchRate} size={120} strokeWidth={12} />
                <Text style={styles.scoreLabel}>{getScoreLabel(matchRate)}</Text>
              </Card>
            )}

            {/* Playback comparison */}
            {recordingPlayer.isLoaded && (
              <Card>
                <AudioPlayer
                  isPlaying={recordingPlayer.isPlaying}
                  isLoaded={recordingPlayer.isLoaded}
                  position={recordingPlayer.position}
                  duration={recordingPlayer.duration}
                  onPlay={recordingPlayer.play}
                  onPause={recordingPlayer.pause}
                  label="あなたの録音"
                />
              </Card>
            )}

            {/* Text comparison */}
            {wordResults && (
              <Card>
                <TextComparison wordResults={wordResults} />
              </Card>
            )}

            {/* Actions */}
            <View style={styles.reviewActions}>
              <Button
                title="もう一度"
                onPress={() => {
                  reset();
                }}
                variant="outline"
                size="lg"
                style={{ flex: 1 }}
              />
              <Button
                title="完了"
                onPress={() => router.back()}
                size="lg"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}
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
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  errorText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  stepContent: {
    gap: Spacing.md,
  },
  ttsContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  ttsHint: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    textAlign: 'center',
  },
  recorderCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  processingText: {
    fontSize: FontSize.md,
    color: Colors.secondary,
    fontWeight: '500',
  },
  scoreCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  scoreLabel: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
});
