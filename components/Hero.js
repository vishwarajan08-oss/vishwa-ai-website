"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Concentric rings top-right */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full border border-[#C41A1A]/8" style={{ animation: "float-slow 12s ease-in-out infinite" }} />
      <div className="absolute -top-16 -right-16 w-[500px] h-[500px] rounded-full border border-[#C41A1A]/6" style={{ animation: "float-slow 16s ease-in-out infinite reverse" }} />
      <div className="absolute top-16 right-16 w-[300px] h-[300px] rounded-full border border-[#C41A1A]/10" style={{ animation: "float-med 10s ease-in-out infinite" }} />

      {/* Glow blobs */}
      <div className="absolute top-[15%] right-[8%] w-[320px] h-[320px] rounded-full bg-[#C41A1A]/5 blur-3xl" style={{ animation: "float-slow 14s ease-in-out infinite" }} />
      <div className="absolute bottom-[25%] left-[3%] w-[240px] h-[240px] rounded-full bg-[#C41A1A]/4 blur-3xl" style={{ animation: "float-med 18s ease-in-out infinite reverse" }} />

      {/* Vertical accent lines */}
      <div className="absolute top-0 left-[28%] w-px h-[45%] bg-gradient-to-b from-transparent via-[#C41A1A]/12 to-transparent" />
      <div className="absolute top-[15%] right-[22%] w-px h-[35%] bg-gradient-to-b from-transparent via-[#C41A1A]/8 to-transparent" />

      {/* Small pulsing dots */}
      <div className="absolute top-[32%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#C41A1A]/50" style={{ animation: "pulse-dot 3s ease-in-out infinite" }} />
      <div className="absolute top-[18%] left-[38%] w-1 h-1 rounded-full bg-[#C41A1A]/40" style={{ animation: "pulse-dot 4s ease-in-out infinite 1s" }} />
      <div className="absolute top-[65%] right-[18%] w-1.5 h-1.5 rounded-full bg-[#FF2D2D]/40" style={{ animation: "pulse-dot 3.5s ease-in-out infinite 0.5s" }} />
      <div className="absolute bottom-[30%] left-[22%] w-1 h-1 rounded-full bg-[#C41A1A]/30" style={{ animation: "pulse-dot 5s ease-in-out infinite 2s" }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  const { badge, headlinePart1, headlinePart2, subheadline, ctaPrimary, ctaSecondary } = content.hero;

  const words1 = headlinePart1.split(" ");
  const words2 = headlinePart2.split(" ");
  const allWords = [...words1, ...words2];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-dvh flex items-center pt-28 pb-20 bg-[#0A0A0A] overflow-hidden"
    >
      <ParticleBackground />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="space-y-10 max-w-5xl">
          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C41A1A]/40 bg-[#C41A1A]/10 text-[#FF2D2D] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D]" />
              {badge}
            </span>
          </motion.div>

          {/* Headline — word by word stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-[0.35em] gap-y-1"
            aria-label={`${headlinePart1} ${headlinePart2}`}
          >
            {allWords.map((word, i) => {
              const isRedWord = i < words1.length;
              return (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  className={`text-5xl md:text-7xl lg:text-[84px] font-black tracking-tight leading-[1.05] ${
                    isRedWord
                      ? "bg-gradient-to-r from-[#C41A1A] to-[#FF2D2D] bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 font-normal leading-relaxed max-w-xl"
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-[#C41A1A] hover:bg-[#FF2D2D] transition-colors duration-200"
            >
              {ctaPrimary}
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-white/20 hover:border-white/60 hover:bg-white/5 transition-colors duration-200"
            >
              {ctaSecondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
