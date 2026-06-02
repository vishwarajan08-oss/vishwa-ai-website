"use client";

import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function ResultsHero() {
  return (
    <section data-cursor-dark className="py-24 bg-burgundy">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Client Results
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
