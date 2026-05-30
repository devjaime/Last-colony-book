"use client";

import { motion } from "framer-motion";
import { useReadingStore } from "@/store/reading-store";

export function IntroGate() {
  const completeIntro = useReadingStore((state) => state.completeIntro);

  return (
    <motion.section
      className="fixed inset-0 z-[80] grid min-h-svh place-items-center overflow-hidden bg-black px-6 text-center"
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
        className="relative flex max-w-3xl flex-col items-center"
      >
        <p className="mb-7 text-[0.68rem] uppercase tracking-[0.45em] text-emerald-100/50">
          Expediente recuperado
        </p>
        <motion.h1
          initial={{ opacity: 0, filter: "blur(18px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.45, duration: 1.6 }}
          className="font-cinzel text-4xl leading-tight text-stone-100 sm:text-6xl lg:text-7xl"
        >
          Los grises no venían del cielo...
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 1 }}
          className="mt-7 max-w-xl text-sm leading-7 text-slate-300/68 sm:text-base"
        >
          Eran una colonia terrestre. Sobrevivieron al impacto. Y llevan millones de años observándonos desde abajo.
        </motion.p>
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            completeIntro();
            requestAnimationFrame(() => {
              document.getElementById("libro")?.scrollIntoView({ behavior: "smooth" });
            });
          }}
          className="mt-12 border border-emerald-200/40 bg-emerald-100/8 px-7 py-4 font-space text-xs uppercase tracking-[0.32em] text-emerald-50 shadow-[0_0_42px_rgba(140,255,213,0.12)] transition hover:border-emerald-100/75 hover:bg-emerald-100/15"
        >
          Comenzar Lectura
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
