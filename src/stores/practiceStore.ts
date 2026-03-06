import { create } from 'zustand';
import { PracticeStep, WordResult } from '../types/practice';
import { Lesson } from '../types/lesson';

interface PracticeState {
  currentStep: PracticeStep;
  currentLesson: Lesson | null;
  practiceId: string | null;
  recordingUri: string | null;
  transcribedText: string | null;
  matchRate: number | null;
  wordResults: WordResult[] | null;
  isRecording: boolean;
  isPlaying: boolean;
  isProcessing: boolean;

  setStep: (step: PracticeStep) => void;
  setLesson: (lesson: Lesson) => void;
  setPracticeId: (id: string) => void;
  setRecordingUri: (uri: string | null) => void;
  setTranscribedText: (text: string) => void;
  setMatchRate: (rate: number) => void;
  setWordResults: (results: WordResult[]) => void;
  setIsRecording: (recording: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'listen' as PracticeStep,
  currentLesson: null,
  practiceId: null,
  recordingUri: null,
  transcribedText: null,
  matchRate: null,
  wordResults: null,
  isRecording: false,
  isPlaying: false,
  isProcessing: false,
};

export const usePracticeStore = create<PracticeState>((set) => ({
  ...initialState,
  setStep: (step) => set({ currentStep: step }),
  setLesson: (lesson) => set({ currentLesson: lesson }),
  setPracticeId: (id) => set({ practiceId: id }),
  setRecordingUri: (uri) => set({ recordingUri: uri }),
  setTranscribedText: (text) => set({ transcribedText: text }),
  setMatchRate: (rate) => set({ matchRate: rate }),
  setWordResults: (results) => set({ wordResults: results }),
  setIsRecording: (recording) => set({ isRecording: recording }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  reset: () => set(initialState),
}));
