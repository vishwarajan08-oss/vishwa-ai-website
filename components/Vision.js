"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, fadeInLeft, fadeInRight, stagger, viewport } from "@/lib/animations";

const slideVariants = [fadeInLeft, fadeInUp, fadeInRight];

export default function Vision() {
  const { label, title, cols } = content.vision;

  return (
    <section id="vision" className="py-24 bg-[#111111] border-t border-white/5">
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
            className="text-xs font-bold uppercase tracking-widest text-[#C41A1A] mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            {title}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/5">
          {cols.map((col, index) => (
            <motion.div
              key={index}
              variants={slideVariants[index]}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="py-10 md:pr-10 md:border-r border-b md:border-b-0 border-white/5 last:border-r-0 last:border-b-0 space-y-4 md:pl-10 first:pl-0 last:pr-0"
            >
              <div className="w-8 h-px bg-[#C41A1A]" />
              <h3 className="text-base font-bold text-white leading-snug">
                {col.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-normal">
                {col.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
