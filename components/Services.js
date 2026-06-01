"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { content } from "@/config/content";
import { viewport } from "@/lib/animations";
import {
  Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield,
  Search, Globe, MessageSquare, TrendingUp,
} from "lucide-react";

const iconMap = {
  Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield,
  Search, Globe, MessageSquare, TrendingUp,
};

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

// Panel card for the snake scroll layout
function ServicePanelCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = iconMap[service.icon];
  const num = String(index + 1).padStart(2, "0");
  const bg = index % 2 === 0 ? "#FAFAFA" : "#F5F0EE";

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-between flex-shrink-0 border-r border-divider last:border-r-0 group h-full overflow-hidden"
      style={{
        width: "clamp(260px, 28vw, 380px)",
        padding: "1.75rem 1.5rem 1.5rem",
        backgroundColor: bg,
      }}
    >
      {/* Hover top-line reveal */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3">
        {/* Glowing number */}
        <span
          className="text-6xl font-black leading-none select-none transition-all duration-500"
          style={{
            color: isInView ? "#6B1E2E" : "#C9B8A8",
            textShadow: isInView
              ? "0 0 20px rgba(107,30,46,0.45), 0 0 40px rgba(107,30,46,0.2)"
              : "none",
          }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Icon */}
        {Icon && (
          <div className="w-7 h-7 flex items-center justify-center border border-burgundy/25 text-burgundy flex-shrink-0">
            <Icon size={13} aria-hidden="true" />
          </div>
        )}

        {/* Title + description */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200">
            {service.title}
          </h3>
          <p className="text-xs text-[#636363] leading-relaxed line-clamp-5">
            {service.description}
          </p>
        </div>
      </div>

      {/* Tag */}
      <div className="mt-4 flex-shrink-0">
        <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-burgundy text-white leading-none">
          {service.tag}
        </span>
      </div>
    </div>
  );
}

export default function Services({ preview = false }) {
  const { label, title, items } = content.services;
  const displayItems = preview ? items.slice(0, 3) : items;

  // Snake scroll refs (full page only)
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Row 1 (items 0-4): slides left during first half of scroll
  const x1 = useTransform(scrollYProgress, [0, 0.5], ["0vw", "-56vw"]);
  // Row 2 (items 5-9): starts showing end cards, slides right during second half
  // At -50vw: shows cards 8,9,10 (far right of 5-card 140vw row). At 0: shows 6,7,8.
  const x2 = useTransform(scrollYProgress, [0.5, 1], ["-56vw", "0vw"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const row1 = items.slice(0, 5);
  const row2 = items.slice(5, 10);

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

  // ── Full services page (snake scroll) ────────────────────────────────
  return (
    <div className="pt-20">
      {/* Hero */}
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

      {/* Snake scroll section */}
      <div ref={sectionRef} style={{ height: "600vh" }} className="relative">
        <div
          className="sticky top-0 overflow-hidden bg-bg"
          style={{
            height: "min(680px, 88dvh)",
            borderTop: "1px solid #E8E0DA",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 h-14 flex-shrink-0 border-b border-divider">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-[11px] font-bold uppercase tracking-widest text-burgundy"
            >
              {label}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[11px] text-[#8C8C8C] tracking-wide"
            >
              Scroll to explore &rarr;
            </motion.p>
          </div>

          {/* Row 1 — pans left */}
          <div
            className="overflow-hidden flex-shrink-0"
            style={{ height: "calc((100% - 57px) / 2)" }}
          >
            <motion.div style={{ x: x1 }} className="flex h-full">
              {row1.map((service, index) => (
                <ServicePanelCard key={index} service={service} index={index} />
              ))}
              <div className="flex-shrink-0 w-8" />
            </motion.div>
          </div>

          {/* Divider between rows */}
          <div className="h-px bg-divider flex-shrink-0" />

          {/* Row 2 — pans right (snake back) */}
          <div
            className="overflow-hidden flex-shrink-0"
            style={{ height: "calc((100% - 57px) / 2)" }}
          >
            <motion.div style={{ x: x2 }} className="flex h-full">
              {row2.map((service, index) => (
                <ServicePanelCard key={index} service={service} index={index + 5} />
              ))}
              <div className="flex-shrink-0 w-8" />
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-divider">
            <motion.div
              className="h-full bg-burgundy origin-left"
              style={{ scaleX }}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-bg border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="py-12 px-10 bg-burgundy-dark text-center space-y-5"
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
