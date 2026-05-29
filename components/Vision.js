"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Vision() {
  const { title, leftCol, rightCol } = content.vision;

  return (
    <section id="vision" className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
            Strategy
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
            {title}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-neutral-100"
        >
          <div className="py-10 md:pr-16 md:border-r border-neutral-100 space-y-4">
            <h3 className="text-lg font-bold text-[#0A1628] leading-snug">
              {leftCol.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-normal">
              {leftCol.description}
            </p>
          </div>

          <div className="py-10 md:pl-16 border-t md:border-t-0 border-neutral-100 space-y-4">
            <h3 className="text-lg font-bold text-[#0A1628] leading-snug">
              {rightCol.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-normal">
              {rightCol.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
