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
    <section id="vision" className="py-24 bg-bg-alt border-t border-divider">
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
            className="text-xs font-bold uppercase tracking-widest text-burgundy mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-charcoal"
          >
            {title}
          </motion.p>
        </motion.div>

        <div className="space-y-0 border-t border-divider">
          {cols.map((col, index) => {
            const Icon = iconMap[col.icon];
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className={`grid grid-cols-1 md:grid-cols-2 border-b border-divider last:border-b-0 group`}
              >
                {/* Text block — left on even rows, right on odd rows */}
                <div
                  className={`py-16 px-12 flex flex-col justify-center space-y-5 ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-300">
                    {col.title}
                  </h3>
                  <p className="text-sm text-[#636363] leading-relaxed max-w-sm">
                    {col.description}
                  </p>
                </div>

                {/* Graphic block — right on even rows, left on odd rows */}
                <div
                  className={`relative flex items-center justify-center py-16 px-12 bg-bg-alt overflow-hidden ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={100}
                      className="text-burgundy/15 group-hover:text-burgundy/25 transition-colors duration-500"
                      aria-hidden="true"
                    />
                  )}
                  {/* Subtle hover accent */}
                  <span
                    className="absolute inset-0 bg-burgundy opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
