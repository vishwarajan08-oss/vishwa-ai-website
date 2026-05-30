"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, fadeInLeft, fadeInRight, stagger, viewport } from "@/lib/animations";
import { Network, Building2, GraduationCap } from "lucide-react";

const iconMap = { Network, Building2, GraduationCap };
const slideVariants = [fadeInLeft, fadeInUp, fadeInRight];

export default function Vision() {
  const { label, title, cols } = content.vision;

  return (
    <section id="vision" className="py-24 bg-[#171717] border-t border-[#2A2A2A]">
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
            className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#2A2A2A]">
          {cols.map((col, index) => {
            const Icon = iconMap[col.icon];
            return (
              <motion.div
                key={index}
                variants={slideVariants[index]}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="py-10 md:pr-10 md:border-r border-b md:border-b-0 border-[#2A2A2A] last:border-r-0 last:border-b-0 space-y-4 md:pl-10 first:pl-0 last:pr-0 group hover:bg-[#0A0A0A]/30 transition-colors duration-300 cursor-default"
              >
                {Icon && (
                  <div className="w-8 h-8 flex items-center justify-center border border-[#DC2626]/30 text-[#DC2626]">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#DC2626] transition-colors duration-200">
                  {col.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-normal">
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
