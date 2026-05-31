"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94];

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.1 },
  }),
};

export default function ResultsHero() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden" style={{ backgroundColor: "#3D0D18" }}>
      {/* Subtle radial warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 25% 60%, rgba(201,184,168,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(201,184,168,0.018) 20px,
            rgba(201,184,168,0.018) 21px
          )`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9B8A8] mb-6"
          >
            Track Record
          </motion.p>

          <motion.h1
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.9] mb-8"
          >
            Client Results
          </motion.h1>

          <motion.p
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-[#C9B8A8] leading-relaxed font-medium"
          >
            Three engagements. Measurable outcomes. No fluff.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
