"use client";

import { AnimatePresence } from "framer-motion";
import { AudioOrchestrator } from "./audio-orchestrator";
import { BookReader } from "./book-reader";
import { IntroGate } from "./intro-gate";
import { ReadingControls } from "./reading-controls";
import type { Locale } from "@/lib/locale";
import { useReadingStore } from "@/store/reading-store";

export function TheLastColonyExperience({ initialLocale }: { initialLocale: Locale }) {
  const introCompleted = useReadingStore((state) => state.introCompleted);

  return (
    <main className="relative min-h-svh overflow-x-clip bg-black text-white">
      <AudioOrchestrator />
      <ReadingControls initialLocale={initialLocale} />
      <AnimatePresence>{!introCompleted ? <IntroGate initialLocale={initialLocale} /> : null}</AnimatePresence>
      <BookReader initialLocale={initialLocale} />
    </main>
  );
}
