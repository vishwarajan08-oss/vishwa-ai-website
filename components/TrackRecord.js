"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function TrackRecord() {
  const { title, cases } = content.trackRecord;

  return (
    <section id="track-record" className="py-24 bg-white border-t border-neutral-100">
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
            Impact
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
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-neutral-100"
        >
          {cases.map((cs, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 border-b md:border-b-0 md:border-r border-neutral-100 last:border-r-0 space-y-4"
            >
              <div className="text-xs font-black text-neutral-300 tracking-wider">
                Case {String(index + 1).padStart(2, "0")}
              </div>
              <h4 className="text-base font-bold text-[#0A1628] leading-snug">
                {cs.title}
              </h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                {cs.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
