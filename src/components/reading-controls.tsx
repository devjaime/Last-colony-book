"use client";

import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { chapters } from "@/data/chapters";
import { useReadingStore } from "@/store/reading-store";

export function ReadingControls() {
  const activeChapterId = useReadingStore((state) => state.activeChapterId);
  const audioEnabled = useReadingStore((state) => state.audioEnabled);
  const progress = useReadingStore((state) => state.progress);
  const reset = useReadingStore((state) => state.reset);
  const setAudioEnabled = useReadingStore((state) => state.setAudioEnabled);

  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeChapterId);

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="h-1 bg-white/5">
        <div
          className="h-full bg-[linear-gradient(90deg,#d08f43,#8cffd5)] transition-[width] duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="pointer-events-auto hidden items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/60 backdrop-blur-md sm:flex">
          <span>Archivo TLC-66M</span>
          <span className="h-1 w-1 rounded-full bg-emerald-200/70" />
          <span>{String(activeIndex + 1).padStart(2, "0")} / 05</span>
        </div>
        <div className="pointer-events-auto ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/45 p-1.5 backdrop-blur-md">
          <button
            type="button"
            aria-label={audioEnabled ? "Silenciar audio" : "Escuchar muestra de audio"}
            title={audioEnabled ? "Silenciar audio" : "Escuchar muestra de audio"}
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="grid size-10 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            type="button"
            aria-label="Reiniciar lectura"
            title="Reiniciar lectura"
            onClick={() => {
              reset();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="grid size-10 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
