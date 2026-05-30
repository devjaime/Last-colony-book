"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Chapter } from "@/types/narrative";

type ChapterPanelProps = {
  chapter: Chapter;
};

const profileClass: Record<Chapter["animationProfile"], string> = {
  impact: "chapter-impact",
  biolume: "chapter-biolume",
  surveillance: "chapter-surveillance",
  transmission: "chapter-transmission",
  contact: "chapter-contact",
};

export function ChapterPanel({ chapter }: ChapterPanelProps) {
  return (
    <section
      id={`capitulo-${chapter.id}`}
      data-chapter-id={chapter.id}
      className={`chapter-section ${profileClass[chapter.animationProfile]} relative isolate flex min-h-[135svh] items-center overflow-hidden px-4 py-28 sm:px-6 lg:min-h-[150svh]`}
      style={{ "--chapter-accent": chapter.accent } as CSSProperties}
    >
      <div className="chapter-backdrop absolute inset-0 -z-20">
        <Image
          src={chapter.image}
          alt=""
          fill
          sizes="100vw"
          className="chapter-image object-cover"
          priority={chapter.order === 1}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(140,255,213,0.08),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.38)_48%,rgba(0,0,0,0.86))]" />
      <div className="absolute inset-0 -z-10 opacity-45 scanlines" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="chapter-heading max-w-xl"
        >
          <p className="mb-5 font-space text-[0.68rem] uppercase tracking-[0.42em] text-white/48">
            Capítulo {String(chapter.order).padStart(2, "0")}
          </p>
          <h2 className="font-cinzel text-5xl leading-none text-stone-100 sm:text-7xl lg:text-8xl">
            {chapter.title}
          </h2>
          <p className="mt-6 font-space text-sm uppercase tracking-[0.24em]" style={{ color: chapter.accent }}>
            {chapter.subtitle}
          </p>
          <p className="mt-7 max-w-md text-sm leading-7 text-slate-300/62">{chapter.visualTheme}</p>
        </motion.div>

        <div className="chapter-copy flex min-h-[75svh] flex-col justify-center gap-[22svh] py-[10svh]">
          {chapter.sections.map((section, index) => (
            <motion.article
              key={`${chapter.id}-${section.text}`}
              initial={{ opacity: 0, y: 50, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.65 }}
              transition={{ duration: 0.9, delay: index * 0.06, ease: "easeOut" }}
              className={`narrative-fragment reveal-${section.revealStyle}`}
              style={{ "--depth": section.parallaxDepth } as CSSProperties}
            >
              <p className="font-space text-[0.62rem] uppercase tracking-[0.34em] text-white/38">
                {section.soundCue}
              </p>
              <p className="mt-4 max-w-2xl text-balance text-3xl leading-tight text-stone-100 sm:text-4xl lg:text-5xl">
                {section.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
