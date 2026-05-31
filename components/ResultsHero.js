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
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#3D0D18" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 25% 60%, rgba(201,184,168,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl space-y-5">
          <motion.h1
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Client Results
          </motion.h1>

          <motion.p
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-base text-[#C9B8A8] leading-relaxed"
          >
            Three engagements. Measurable outcomes. No fluff.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
