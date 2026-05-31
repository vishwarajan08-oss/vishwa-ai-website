"use client";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ResultsHero() {
  return (
    <section className="py-24 bg-burgundy relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
        >
          Client Results
        </motion.h1>
      </div>
    </section>
  );
}
