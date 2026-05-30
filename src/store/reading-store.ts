"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ReadingState = {
  activeChapterId: string;
  currentPageIndex: number;
  progress: number;
  audioEnabled: boolean;
  audioPreviewStartedAt: number | null;
  volume: number;
  introCompleted: boolean;
  setActiveChapter: (chapterId: string) => void;
  setCurrentPageIndex: (pageIndex: number) => void;
  setProgress: (progress: number) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  completeIntro: () => void;
  reset: () => void;
};

export const useReadingStore = create<ReadingState>()(
  persist(
    (set) => ({
      activeChapterId: "extincion",
      currentPageIndex: 0,
      progress: 0,
      audioEnabled: false,
      audioPreviewStartedAt: null,
      volume: 0.68,
      introCompleted: false,
      setActiveChapter: (activeChapterId) => set({ activeChapterId }),
      setCurrentPageIndex: (currentPageIndex) => set({ currentPageIndex: Math.max(0, currentPageIndex) }),
      setProgress: (progress) => set({ progress: Math.min(1, Math.max(0, progress)) }),
      setAudioEnabled: (audioEnabled) =>
        set({
          audioEnabled,
          audioPreviewStartedAt: audioEnabled ? Date.now() : null,
        }),
      setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
      completeIntro: () => set({ introCompleted: true, audioEnabled: true, audioPreviewStartedAt: Date.now() }),
      reset: () =>
        set({
          activeChapterId: "extincion",
          currentPageIndex: 0,
          progress: 0,
          audioEnabled: false,
          audioPreviewStartedAt: null,
          introCompleted: false,
          volume: 0.68,
        }),
    }),
    {
      name: "the-last-colony-reading-state",
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<ReadingState>;
        return {
          activeChapterId: "extincion",
          currentPageIndex: 0,
          progress: 0,
          audioEnabled: state.audioEnabled ?? false,
          audioPreviewStartedAt: null,
          volume: state.volume ?? 0.68,
          introCompleted: state.introCompleted ?? false,
        };
      },
      partialize: (state) => ({
        activeChapterId: state.activeChapterId,
        currentPageIndex: state.currentPageIndex,
        progress: state.progress,
        audioEnabled: state.audioEnabled,
        audioPreviewStartedAt: state.audioPreviewStartedAt,
        volume: state.volume,
        introCompleted: state.introCompleted,
      }),
    },
  ),
);
