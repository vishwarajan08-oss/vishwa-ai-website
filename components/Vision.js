"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Vision() {
  const { title, leftCol, rightCol } = content.vision;

  return (
    <section id="vision" className="py-24 bg-white border-t border-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0A1628] mb-3">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left Column */}
          <div className="space-y-4 border-l border-neutral-100 pl-6 md:pl-8">
            <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">
              {leftCol.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed text-sm font-normal">
              {leftCol.description}
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-4 border-l border-neutral-100 pl-6 md:pl-8">
            <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">
              {rightCol.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed text-sm font-normal">
              {rightCol.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
