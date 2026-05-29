"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function Vision() {
  const { title, leftCol, rightCol } = content.vision;

  return (
    <section id="vision" className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3"
          >
            Strategy
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-[#0A1628]"
          >
            {title}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-neutral-100"
        >
          <motion.div
            variants={fadeInUp}
            className="py-10 md:pr-16 md:border-r border-neutral-100 space-y-4"
          >
            <h3 className="text-lg font-bold text-[#0A1628] leading-snug">
              {leftCol.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-normal">
              {leftCol.description}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="py-10 md:pl-16 border-t md:border-t-0 border-neutral-100 space-y-4"
          >
            <h3 className="text-lg font-bold text-[#0A1628] leading-snug">
              {rightCol.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-normal">
              {rightCol.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
