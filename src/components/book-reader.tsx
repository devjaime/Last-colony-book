"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { bookPages } from "@/data/book-pages";
import { englishBookPages } from "@/data/book-pages-en";
import { chapters } from "@/data/chapters";
import { getLocaleFromSearch, getLocalePath, type Locale } from "@/lib/locale";
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

function useLocale(initialLocale: Locale) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const searchLocale = getLocaleFromSearch(window.location.search);
    const storedLocale = window.localStorage.getItem("the-last-colony-locale");
    const nextLocale = window.location.search.includes("lang=")
      ? searchLocale
      : storedLocale === "en"
        ? "en"
        : "es";
    setLocale(nextLocale);
    window.localStorage.setItem("the-last-colony-locale", nextLocale);
  }, []);

  return locale;
}

function PageContent({ page, pageNumber, locale }: { page: BookPage; pageNumber: number; locale: Locale }) {
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

        {page.image ? (
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
            {locale === "en" ? "Visual source" : "Fuente visual"}:{" "}
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

export function BookReader({ initialLocale }: { initialLocale: Locale }) {
  const isMobile = useIsMobile();
  const locale = useLocale(initialLocale);
  const currentPageIndex = useReadingStore((state) => state.currentPageIndex);
  const setCurrentPageIndex = useReadingStore((state) => state.setCurrentPageIndex);
  const setActiveChapter = useReadingStore((state) => state.setActiveChapter);
  const setProgress = useReadingStore((state) => state.setProgress);
  const introCompleted = useReadingStore((state) => state.introCompleted);

  const pages = locale === "en" ? englishBookPages : bookPages;
  const pageStep = isMobile ? 1 : 2;
  const normalizedIndex = isMobile ? currentPageIndex : currentPageIndex - (currentPageIndex % 2);
  const visiblePages = useMemo(
    () => pages.slice(normalizedIndex, normalizedIndex + pageStep),
    [normalizedIndex, pageStep, pages],
  );

  const canGoBack = normalizedIndex > 0;
  const canGoNext = normalizedIndex + pageStep < pages.length;

  useEffect(() => {
    if (currentPageIndex >= pages.length) {
      setCurrentPageIndex(0);
    }
  }, [currentPageIndex, pages.length, setCurrentPageIndex]);

  useEffect(() => {
    const page = pages[Math.min(normalizedIndex, pages.length - 1)];
    setActiveChapter(page.chapterId);
    setProgress(pages.length > 1 ? normalizedIndex / (pages.length - 1) : 0);
  }, [normalizedIndex, pages, setActiveChapter, setProgress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!introCompleted) {
        return;
      }
      if (event.key === "ArrowRight" && canGoNext) {
        setCurrentPageIndex(Math.min(pages.length - 1, normalizedIndex + pageStep));
      }
      if (event.key === "ArrowLeft" && canGoBack) {
        setCurrentPageIndex(Math.max(0, normalizedIndex - pageStep));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGoBack, canGoNext, introCompleted, normalizedIndex, pageStep, pages.length, setCurrentPageIndex]);

  return (
    <section id="libro" className="relative min-h-svh overflow-hidden px-4 pb-10 pt-24 sm:px-6">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_5%,rgba(140,255,213,0.14),transparent_28rem),radial-gradient(circle_at_18%_82%,rgba(208,143,67,0.16),transparent_22rem),#020407]" />
      <div className="absolute inset-0 -z-10 opacity-55 scanlines" />

      <div className="mx-auto flex min-h-[calc(100svh-8.5rem)] w-full max-w-7xl flex-col justify-center">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-space text-[0.66rem] uppercase tracking-[0.36em] text-emerald-100/48">
              {locale === "en" ? "Written by Jaime Hernandez" : "Escrito por Jaime Hernandez"}
            </p>
            <h1 className="mt-2 max-w-4xl font-cinzel text-2xl leading-tight text-stone-100 sm:text-4xl">
              {locale === "en" ? "The Greys Are Not UFOs" : "Los grises no son OVNIs"}
            </h1>
          </div>
          <div className="hidden flex-col items-end gap-3 sm:flex">
            <div className="flex gap-2 font-space text-[0.58rem] uppercase tracking-[0.2em]">
              <Link
                href={getLocalePath("es")}
                className={`border px-3 py-2 transition ${
                  locale === "es"
                    ? "border-emerald-100/45 bg-emerald-100/10 text-emerald-50"
                    : "border-white/12 text-white/42 hover:border-white/30 hover:text-white/70"
                }`}
              >
                ES
              </Link>
              <Link
                href={getLocalePath("en")}
                className={`border px-3 py-2 transition ${
                  locale === "en"
                    ? "border-emerald-100/45 bg-emerald-100/10 text-emerald-50"
                    : "border-white/12 text-white/42 hover:border-white/30 hover:text-white/70"
                }`}
              >
                EN
              </Link>
            </div>
            <p className="max-w-sm text-right text-xs leading-5 text-slate-300/55">
              {locale === "en"
                ? "A terrestrial colony intelligence that survived Chicxulub and reaches the present."
                : "Hormigas del centro de la Tierra que sobrevivieron a Chicxulub y llegan hasta la actualidad."}
            </p>
          </div>
        </div>
        <div className="mb-4 flex gap-2 font-space text-[0.58rem] uppercase tracking-[0.2em] sm:hidden">
          <Link
            href={getLocalePath("es")}
            className={`border px-3 py-2 transition ${
              locale === "es"
                ? "border-emerald-100/45 bg-emerald-100/10 text-emerald-50"
                : "border-white/12 text-white/42"
            }`}
          >
            ES
          </Link>
          <Link
            href={getLocalePath("en")}
            className={`border px-3 py-2 transition ${
              locale === "en"
                ? "border-emerald-100/45 bg-emerald-100/10 text-emerald-50"
                : "border-white/12 text-white/42"
            }`}
          >
            EN
          </Link>
        </div>

        <div className="mb-5 flex flex-col gap-3 border border-emerald-100/12 bg-black/28 px-4 py-3 text-slate-200/72 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6">
            {locale === "en"
              ? "If this dossier intrigued you, you can make a voluntary contribution to extend the book with more chapters, art, visual research, and reader acknowledgements."
              : "Si este expediente te intrigó, puedes hacer un aporte voluntario para extender el libro, sumar más capítulos, arte, investigación visual y agradecimientos a lectores."}
          </p>
          <a
            href="https://www.paypal.com/ncp/payment/ER9ESYAZ6TPRN"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 border border-amber-200/35 bg-amber-200/10 px-4 py-3 font-space text-[0.66rem] uppercase tracking-[0.22em] text-amber-50 transition hover:border-amber-100/70 hover:bg-amber-200/18"
          >
            <Heart size={15} />
            {locale === "en" ? "Voluntary support" : "Aporte voluntario"}
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
                <PageContent key={page.id} page={page} pageNumber={normalizedIndex + index + 1} locale={locale} />
              ))}
              {!isMobile && visiblePages.length === 1 ? <div className="book-page book-page-blank" /> : null}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            aria-label="Página siguiente"
            disabled={!canGoNext}
            onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, normalizedIndex + pageStep))}
            className="book-nav book-nav-right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 font-space text-[0.68rem] uppercase tracking-[0.22em] text-white/48">
          <span>
            {locale === "en" ? "Page" : "Página"} {Math.min(normalizedIndex + 1, pages.length)}{" "}
            {locale === "en" ? "of" : "de"} {pages.length}
          </span>
          <span>
            {canGoNext
              ? locale === "en"
                ? "Next: turn the page"
                : "Siguiente: abrir otra hoja"
              : locale === "en"
                ? "End of available archive"
                : "Fin del archivo disponible"}
          </span>
        </div>
      </div>
    </section>
  );
}
