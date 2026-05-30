"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { bookPages } from "@/data/book-pages";
import { chapters } from "@/data/chapters";
import { useReadingStore } from "@/store/reading-store";
import type { BookPage } from "@/types/narrative";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function PageContent({ page, pageNumber }: { page: BookPage; pageNumber: number }) {
  const chapter = chapters.find((item) => item.id === page.chapterId);

  return (
    <article className={`book-page book-page-${page.kind}`}>
      <div className="book-page-no">{String(pageNumber).padStart(2, "0")}</div>
      <div className="book-paper-grain" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-black/10 pb-3">
          <p className="font-space text-[0.58rem] uppercase tracking-[0.28em] text-stone-900/48">{page.eyebrow}</p>
          {chapter ? (
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chapter.accent }} />
          ) : null}
        </div>

        {page.video ? (
          <figure className="mb-5">
            <div className="book-plate">
              <video
                className="h-full w-full object-cover"
                src={page.video}
                poster={page.poster}
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            {page.mediaCaption ? (
              <figcaption className="mt-2 font-space text-[0.58rem] uppercase tracking-[0.16em] text-stone-900/48">
                {page.mediaCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : page.image ? (
          <figure className="mb-5">
            <div className="book-plate">
              <Image src={page.image} alt="" fill sizes="(max-width: 760px) 86vw, 42vw" className="object-cover" />
            </div>
            {page.mediaCaption ? (
              <figcaption className="mt-2 font-space text-[0.58rem] uppercase tracking-[0.16em] text-stone-900/48">
                {page.mediaCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <h2 className="font-cinzel text-[clamp(1.7rem,4vw,3.35rem)] leading-[0.95] text-stone-950">
          {page.title}
        </h2>

        {page.quote ? (
          <blockquote className="my-5 border-l-2 border-stone-900/25 pl-4 font-space text-sm leading-6 text-stone-800/75">
            {page.quote}
          </blockquote>
        ) : null}

        <div className="mt-5 space-y-4 text-[0.98rem] leading-7 text-stone-900/78">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {page.evidence ? (
          <div className="mt-auto pt-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {page.evidence.map((item) => (
                <span
                  key={item}
                  className="border border-stone-900/12 bg-stone-950/[0.035] px-3 py-2 font-space text-[0.62rem] uppercase tracking-[0.18em] text-stone-900/58"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {page.mediaCredit ? (
          <p className="mt-4 border-t border-stone-900/10 pt-3 font-space text-[0.56rem] uppercase tracking-[0.14em] text-stone-900/45">
            Fuente visual:{" "}
            {page.sourceUrl ? (
              <a href={page.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-stone-900/25">
                {page.mediaCredit}
              </a>
            ) : (
              page.mediaCredit
            )}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function BookReader() {
  const isMobile = useIsMobile();
  const currentPageIndex = useReadingStore((state) => state.currentPageIndex);
  const setCurrentPageIndex = useReadingStore((state) => state.setCurrentPageIndex);
  const setActiveChapter = useReadingStore((state) => state.setActiveChapter);
  const setProgress = useReadingStore((state) => state.setProgress);
  const introCompleted = useReadingStore((state) => state.introCompleted);

  const pageStep = isMobile ? 1 : 2;
  const normalizedIndex = isMobile ? currentPageIndex : currentPageIndex - (currentPageIndex % 2);
  const visiblePages = useMemo(
    () => bookPages.slice(normalizedIndex, normalizedIndex + pageStep),
    [normalizedIndex, pageStep],
  );

  const canGoBack = normalizedIndex > 0;
  const canGoNext = normalizedIndex + pageStep < bookPages.length;

  useEffect(() => {
    const page = bookPages[Math.min(normalizedIndex, bookPages.length - 1)];
    setActiveChapter(page.chapterId);
    setProgress(bookPages.length > 1 ? normalizedIndex / (bookPages.length - 1) : 0);
  }, [normalizedIndex, setActiveChapter, setProgress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!introCompleted) {
        return;
      }
      if (event.key === "ArrowRight" && canGoNext) {
        setCurrentPageIndex(Math.min(bookPages.length - 1, normalizedIndex + pageStep));
      }
      if (event.key === "ArrowLeft" && canGoBack) {
        setCurrentPageIndex(Math.max(0, normalizedIndex - pageStep));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGoBack, canGoNext, introCompleted, normalizedIndex, pageStep, setCurrentPageIndex]);

  return (
    <section id="libro" className="relative min-h-svh overflow-hidden px-4 pb-10 pt-24 sm:px-6">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_5%,rgba(140,255,213,0.14),transparent_28rem),radial-gradient(circle_at_18%_82%,rgba(208,143,67,0.16),transparent_22rem),#020407]" />
      <div className="absolute inset-0 -z-10 opacity-55 scanlines" />

      <div className="mx-auto flex min-h-[calc(100svh-8.5rem)] w-full max-w-7xl flex-col justify-center">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-space text-[0.66rem] uppercase tracking-[0.36em] text-emerald-100/48">
              Escrito por Jaime Hernandez
            </p>
            <h1 className="mt-2 max-w-4xl font-cinzel text-2xl leading-tight text-stone-100 sm:text-4xl">
              Los grises no son OVNIs
            </h1>
          </div>
          <p className="hidden max-w-sm text-right text-xs leading-5 text-slate-300/55 sm:block">
            Hormigas del centro de la Tierra que sobrevivieron a Chicxulub y llegan hasta la actualidad.
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-3 border border-emerald-100/12 bg-black/28 px-4 py-3 text-slate-200/72 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6">
            Si este expediente te intrigó, puedes hacer un aporte voluntario para extender el libro, sumar más
            capítulos, arte, investigación visual y agradecimientos a lectores.
          </p>
          <a
            href="https://www.paypal.com/ncp/payment/ER9ESYAZ6TPRN"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 border border-amber-200/35 bg-amber-200/10 px-4 py-3 font-space text-[0.66rem] uppercase tracking-[0.22em] text-amber-50 transition hover:border-amber-100/70 hover:bg-amber-200/18"
          >
            <Heart size={15} />
            Aporte voluntario
          </a>
        </div>

        <div className="book-stage">
          <button
            type="button"
            aria-label="Página anterior"
            disabled={!canGoBack}
            onClick={() => setCurrentPageIndex(Math.max(0, normalizedIndex - pageStep))}
            className="book-nav book-nav-left"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="book-spine" />
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${normalizedIndex}-${pageStep}`}
              initial={{ opacity: 0, rotateY: canGoBack ? -10 : 0, x: 22 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: 10, x: -22 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="book-spread"
            >
              {visiblePages.map((page, index) => (
                <PageContent key={page.id} page={page} pageNumber={normalizedIndex + index + 1} />
              ))}
              {!isMobile && visiblePages.length === 1 ? <div className="book-page book-page-blank" /> : null}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            aria-label="Página siguiente"
            disabled={!canGoNext}
            onClick={() => setCurrentPageIndex(Math.min(bookPages.length - 1, normalizedIndex + pageStep))}
            className="book-nav book-nav-right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 font-space text-[0.68rem] uppercase tracking-[0.22em] text-white/48">
          <span>
            Página {Math.min(normalizedIndex + 1, bookPages.length)} de {bookPages.length}
          </span>
          <span>{canGoNext ? "Siguiente: abrir otra hoja" : "Fin del archivo disponible"}</span>
        </div>
      </div>
    </section>
  );
}
