"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport, staggerMed } from "@/lib/animations";
import { Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search } from "lucide-react";

const iconMap = {
  Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search,
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function PreviewCard({ service, index }) {
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      variants={fadeUp}
      className="relative bg-white border border-[#E8E0DA] p-7 group cursor-default overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Top accent line — reveals on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#6B1E2E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />

      {/* Icon */}
      {Icon && (
        <div className="mb-5">
          <Icon size={18} className="text-[#6B1E2E]" aria-hidden="true" />
        </div>
      )}

      {/* Tag */}
      <div className="mb-3">
        <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#6B1E2E] text-white leading-none">
          {service.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#6B1E2E] transition-colors duration-200">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#1A1A1A]/55 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}

export default function Services({ preview = false }) {
  const { label, title, items } = content.services;
  const displayItems = preview ? items.slice(0, 3) : items;
  const sectionClass = preview
    ? "py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]"
    : "pt-44 pb-24 bg-[#FAFAFA] border-t border-[#E8E0DA]";

  return (
    <section id="services" className={sectionClass}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ staggerChildren: 0.08 }}
          className="mb-14"
        >
          <motion.p
            variants={slideInLeft}
            className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3"
          >
            {label}
          </motion.p>
          <motion.h2
            variants={slideInLeft}
            className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]"
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Preview: 3-column card grid */}
        {preview ? (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {displayItems.map((service, index) => (
                <PreviewCard key={index} service={service} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={viewport}
              className="mt-10 flex justify-between items-center"
            >
              <p className="text-sm text-[#1A1A1A]/35">
                {items.length - displayItems.length} more services available
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A1A] hover:text-[#6B1E2E] transition-colors duration-200 cursor-pointer"
              >
                View All Services <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </>
        ) : (
          /* Full services page: row table layout */
          <>
            <motion.div
              variants={staggerMed}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="border-t border-[#E8E0DA]"
            >
              {displayItems.map((service, index) => {
                const Icon = iconMap[service.icon];
                return (
                  <motion.div
                    key={index}
                    variants={slideInLeft}
                    className="relative grid grid-cols-12 gap-6 py-10 border-b border-[#E8E0DA] group hover:bg-[#F5F0EE]/60 transition-colors duration-300 overflow-hidden"
                  >
                    <div className="absolute right-4 bottom-2 opacity-[0.03] pointer-events-none select-none" aria-hidden="true">
                      <svg width="80" height="80" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="5" r="2.5" fill="#1A1A1A" />
                        <circle cx="22.5" cy="20" r="2.5" fill="#1A1A1A" />
                        <circle cx="5.5" cy="20" r="2.5" fill="#1A1A1A" />
                        <line x1="14" y1="5" x2="22.5" y2="20" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="14" y1="5" x2="5.5" y2="20" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="5.5" y1="20" x2="22.5" y2="20" stroke="#1A1A1A" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="col-span-12 md:col-span-4 space-y-2">
                      <div className="flex items-center gap-2.5">
                        {Icon && (
                          <Icon size={16} className="text-[#6B1E2E] flex-shrink-0" aria-hidden="true" />
                        )}
                        <h3 className="text-base font-bold text-[#1A1A1A] leading-snug group-hover:text-[#6B1E2E] transition-colors duration-200">
                          {service.title}
                        </h3>
                      </div>
                      <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#6B1E2E] text-white leading-none">
                        {service.tag}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={viewport}
              className="mt-12 flex justify-end"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A1A] hover:text-[#6B1E2E] transition-colors duration-200 cursor-pointer"
              >
                Work With Us <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
