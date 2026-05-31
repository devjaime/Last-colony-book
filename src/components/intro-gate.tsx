"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocaleFromSearch, getLocalePath, type Locale } from "@/lib/locale";
import { useReadingStore } from "@/store/reading-store";

export function IntroGate({ initialLocale }: { initialLocale: Locale }) {
  const completeIntro = useReadingStore((state) => state.completeIntro);
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const nextLocale = getLocaleFromSearch(window.location.search);
    setLocale(nextLocale);
    window.localStorage.setItem("the-last-colony-locale", nextLocale);
  }, []);

  return (
    <motion.section
      className="fixed inset-0 z-[80] grid min-h-svh place-items-center overflow-hidden bg-black px-4 py-6 text-center sm:px-6"
      exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      <div className="absolute inset-0 opacity-60 mix-blend-screen">
        <div className="intro-rift" />
        <div className="scanlines" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative grid w-full max-w-6xl items-center gap-8 md:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1fr)] md:text-left"
      >
        <motion.figure
          initial={{ opacity: 0, rotateY: -18, y: 18 }}
          animate={{ opacity: 1, rotateY: 0, y: 0 }}
          transition={{ delay: 0.18, duration: 1.1, ease: "easeOut" }}
          className="intro-cover mx-auto hidden w-full max-w-[18rem] md:block lg:max-w-[21rem]"
        >
          <Image
            src="/visuals/cover-art.svg"
            alt=""
            width={1200}
            height={1600}
            priority
            className="h-auto w-full object-cover"
          />
          <figcaption className="sr-only">
            {locale === "en" ? "Cover art for The Greys Are Not UFOs." : "Portada de Los grises no son OVNIs."}
          </figcaption>
        </motion.figure>

        <div className="flex flex-col items-center md:items-start">
          <p className="mb-5 text-[0.64rem] uppercase tracking-[0.45em] text-emerald-100/50">
            {locale === "en" ? "Recovered dossier" : "Expediente recuperado"}
          </p>
          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.32, duration: 1.2 }}
            className="mb-3 font-space text-[0.68rem] uppercase tracking-[0.34em] text-amber-100/58"
          >
            {locale === "en" ? "Under the Shadow of the Impact" : "Bajo la sombra del impacto"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(18px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.45, duration: 1.6 }}
            className="max-w-4xl font-cinzel text-4xl leading-[1.06] text-stone-100 sm:text-6xl lg:text-7xl"
          >
            {locale === "en" ? "The Greys Are Not UFOs" : "Los grises no son OVNIs"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 1 }}
            className="mt-6 max-w-2xl text-sm font-semibold leading-7 text-slate-200/74 sm:text-base"
          >
            {locale === "en"
              ? "They are not visitors from the sky. They are a colony intelligence from the center of the Earth that survived the first impact."
              : "No son visitantes del cielo. Son una inteligencia de colonia del centro de la Tierra que sobrevivió al primer impacto."}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 1 }}
            className="mt-3 max-w-xl text-sm leading-7 text-slate-300/62"
          >
            {locale === "en"
              ? "A bilingual science-fiction dossier written by Jaime Hernandez, built from real impacts, declassified UAP culture, Chilean geology, and one forbidden hypothesis."
              : "Un expediente bilingüe de ciencia ficción escrito por Jaime Hernandez, construido desde impactos reales, cultura UAP desclasificada, geología chilena y una hipótesis prohibida."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-3 font-space text-[0.68rem] uppercase tracking-[0.24em] md:justify-start"
          >
            <Link
              href={getLocalePath("es")}
              className={`border px-4 py-2 transition ${
                locale === "es"
                  ? "border-emerald-100/60 bg-emerald-100/12 text-emerald-50"
                  : "border-white/14 text-white/55 hover:border-white/35 hover:text-white"
              }`}
            >
              Español
            </Link>
            <Link
              href={getLocalePath("en")}
              className={`border px-4 py-2 transition ${
                locale === "en"
                  ? "border-emerald-100/60 bg-emerald-100/12 text-emerald-50"
                  : "border-white/14 text-white/55 hover:border-white/35 hover:text-white"
              }`}
            >
              English
            </Link>
            <a
              href="https://www.war.gov/UFO/"
              target="_blank"
              rel="noreferrer"
              className="border border-amber-100/20 px-4 py-2 text-amber-50/65 transition hover:border-amber-100/45 hover:text-amber-50"
            >
              {locale === "en" ? "Official UAP files" : "Archivos UAP oficiales"}
            </a>
          </motion.div>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.localStorage.setItem("the-last-colony-locale", locale);
              completeIntro();
              requestAnimationFrame(() => {
                document.getElementById("libro")?.scrollIntoView({ behavior: "smooth" });
              });
            }}
            className="mt-10 border border-emerald-200/40 bg-emerald-100/8 px-7 py-4 font-space text-xs uppercase tracking-[0.32em] text-emerald-50 shadow-[0_0_42px_rgba(140,255,213,0.12)] transition hover:border-emerald-100/75 hover:bg-emerald-100/15"
          >
            {locale === "en" ? "Begin Reading" : "Comenzar Lectura"}
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}
