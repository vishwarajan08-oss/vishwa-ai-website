"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { Network, Building2, GraduationCap } from "lucide-react";

const iconMap = { Network, Building2, GraduationCap };

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: index * 0.1,
    },
  }),
};

export default function Vision() {
  const { label, title, cols } = content.vision;

  return (
    <section id="vision" className="py-24 bg-[#F5F0EE] border-t border-[#E8E0DA]">
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
            className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]"
          >
            {title}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#E8E0DA]">
          {cols.map((col, index) => {
            const Icon = iconMap[col.icon];
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative overflow-hidden py-10 md:pr-10 md:border-r border-b md:border-b-0 border-[#E8E0DA] last:border-r-0 last:border-b-0 space-y-4 md:pl-10 first:pl-0 last:pr-0 group hover:bg-white/60 transition-colors duration-300 cursor-default"
              >
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-[#6B1E2E] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" aria-hidden="true" />
                {Icon && (
                  <div className="w-8 h-8 flex items-center justify-center border border-[#6B1E2E]/25 text-[#6B1E2E]">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug group-hover:text-[#6B1E2E] transition-colors duration-200">
                  {col.title}
                </h3>
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-normal">
                  {col.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
