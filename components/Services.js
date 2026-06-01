"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import { viewport } from "@/lib/animations";
import { Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search, Globe, ChevronDown } from "lucide-react";

const iconMap = { Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search, Globe };

const EASE = [0.25, 0.46, 0.45, 0.94];

const SHADOW_CLAY = "0 8px 24px rgba(107,30,46,0.08), inset -4px -4px 8px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(0,0,0,0.06)";
const SHADOW_CLAY_HOVER = "0 14px 36px rgba(107,30,46,0.12), inset -5px -5px 10px rgba(255,255,255,0.85), inset 5px 5px 10px rgba(0,0,0,0.08)";

const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, delay: i * 0.08 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const rowVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE, delay: i * 0.05 },
  }),
};

// Card used in preview (homepage) — unchanged
function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      className="relative bg-bg-alt group cursor-default overflow-hidden rounded-[20px]"
      style={{ padding: "2rem", boxShadow: SHADOW_CLAY }}
      whileHover={{
        y: -4,
        boxShadow: SHADOW_CLAY_HOVER,
        transition: { duration: 0.25, ease: EASE },
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-burgundy"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: EASE, delay: 0.2 }}
        style={{ transformOrigin: "top" }}
        aria-hidden="true"
      />
      {Icon && (
        <div className="mb-4">
          <Icon size={18} className="text-burgundy" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-base font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200 mb-3">
        {service.title}
      </h3>
      <p className="text-sm text-[#6D6D6D] leading-relaxed mb-4">
        {service.description}
      </p>
      <div>
        <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-burgundy text-white leading-none">
          {service.tag}
        </span>
      </div>
    </motion.div>
  );
}

// Accordion row for the full services page
function AccordionRow({ service, index, isOpen, onToggle }) {
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      custom={index}
      variants={rowVariant}
      className="relative border-b border-divider last:border-b-0 overflow-hidden"
    >
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-burgundy"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: EASE, delay: index * 0.04 + 0.2 }}
        style={{ transformOrigin: "top" }}
        aria-hidden="true"
      />

      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center gap-4 px-6 py-5 pl-8 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        {Icon && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-burgundy/20 text-burgundy transition-colors duration-200 group-hover:border-burgundy/50">
            <Icon size={15} aria-hidden="true" />
          </div>
        )}

        <span className="flex-1 text-sm font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200">
          {service.title}
        </span>

        <span className="flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-burgundy text-white leading-none hidden sm:inline-block">
          {service.tag}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="flex-shrink-0 ml-2"
          aria-hidden="true"
        >
          <ChevronDown size={16} className="text-[#8C8C8C]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-8 pb-5 sm:pr-16 sm:pl-[4.5rem]">
              <p className="text-sm text-[#636363] leading-relaxed">
                {service.description}
              </p>
              <span className="inline-block mt-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-burgundy text-white leading-none sm:hidden">
                {service.tag}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services({ preview = false }) {
  const { label, title, items } = content.services;
  const displayItems = preview ? items.slice(0, 3) : items;
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ── Preview mode (homepage 3-card grid) ──────────────────────────────
  if (preview) {
    return (
      <section id="services" className="py-24 bg-bg border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ staggerChildren: 0.08 }}
            className="mb-14"
          >
            <motion.h2
              variants={slideInLeft}
              className="text-3xl font-extrabold tracking-tight text-charcoal"
            >
              {title}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {displayItems.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 flex justify-between items-center"
          >
            <p className="text-sm text-[#636363]">
              {items.length - displayItems.length} more services available
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-burgundy transition-colors duration-200 cursor-pointer"
            >
              View All Services <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Full services page (accordion) ───────────────────────────────────
  return (
    <div className="pt-20">
      <section className="py-24 bg-burgundy">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ staggerChildren: 0.1 }}
            className="max-w-3xl space-y-5"
          >
            <motion.h1
              variants={slideInLeft}
              className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              variants={slideInLeft}
              className="text-base text-taupe leading-relaxed max-w-2xl"
            >
              We don&rsquo;t start with tools. We start with your workflows, identify where time is being lost, and build AI systems around those friction points. Each engagement is scoped to what creates real impact, not what looks impressive in a proposal.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-bg border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ staggerChildren: 0.05 }}
            className="rounded-[20px] overflow-hidden bg-bg-alt"
            style={{ boxShadow: SHADOW_CLAY }}
          >
            {displayItems.map((service, index) => (
              <AccordionRow
                key={index}
                service={service}
                index={index}
                isOpen={openIndex === index}
                onToggle={handleToggle}
              />
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 py-12 px-10 bg-burgundy-dark text-center space-y-5"
          >
            <p className="text-xl md:text-2xl font-bold text-white leading-snug">
              Not sure where to start?
            </p>
            <p className="text-sm text-taupe max-w-sm mx-auto">
              Book a free workflow audit. We&rsquo;ll map where your firm loses time and show you exactly where AI creates real value.
            </p>
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-charcoal bg-taupe overflow-hidden group cursor-pointer"
            >
              <span
                className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                aria-hidden="true"
              />
              <span className="relative">Book a Free Workflow Audit</span>
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
