"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function StatsBar() {
  const { stats } = content.trackRecord;

  return (
    <section className="border-y border-neutral-100 py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-neutral-400 leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
