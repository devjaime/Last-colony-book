"use client";

import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { chapters } from "@/data/chapters";
import { useReadingStore } from "@/store/reading-store";

export function AudioOrchestrator() {
  const activeChapterId = useReadingStore((state) => state.activeChapterId);
  const audioEnabled = useReadingStore((state) => state.audioEnabled);
  const audioPreviewStartedAt = useReadingStore((state) => state.audioPreviewStartedAt);
  const setAudioEnabled = useReadingStore((state) => state.setAudioEnabled);
  const volume = useReadingStore((state) => state.volume);
  const sounds = useRef<Record<string, Howl>>({});
  const currentId = useRef<string | null>(null);

  useEffect(() => {
    Howler.volume(audioEnabled ? volume : 0);
  }, [audioEnabled, volume]);

  useEffect(() => {
    if (!audioEnabled || !audioPreviewStartedAt) {
      return;
    }

    const elapsed = Date.now() - audioPreviewStartedAt;
    const timeout = window.setTimeout(() => {
      setAudioEnabled(false);
    }, Math.max(0, 10000 - elapsed));

    return () => window.clearTimeout(timeout);
  }, [audioEnabled, audioPreviewStartedAt, setAudioEnabled]);

  useEffect(() => {
    if (!audioEnabled) {
      Object.values(sounds.current).forEach((sound) => sound.fade(sound.volume(), 0, 500));
      return;
    }

    const chapter = chapters.find((item) => item.id === activeChapterId);
    if (!chapter) {
      return;
    }

    if (!sounds.current[chapter.id]) {
      sounds.current[chapter.id] = new Howl({
        src: [chapter.audio],
        loop: true,
        volume: 0,
        html5: true,
      });
    }

    const nextSound = sounds.current[chapter.id];
    if (!nextSound.playing()) {
      nextSound.play();
    }
    nextSound.fade(nextSound.volume(), volume, 900);

    if (currentId.current && currentId.current !== chapter.id) {
      const previousSound = sounds.current[currentId.current];
      previousSound?.fade(previousSound.volume(), 0, 900);
    }

    currentId.current = chapter.id;
  }, [activeChapterId, audioEnabled, volume]);

  useEffect(() => {
    const soundMap = sounds.current;
    return () => {
      Object.values(soundMap).forEach((sound) => sound.unload());
    };
  }, []);

  return null;
}
