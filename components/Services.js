"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport } from "@/lib/animations";
import { use3DTilt } from "@/lib/use3DTilt";
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
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.08 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon];
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt({ maxDeg: 6 });

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        custom={index}
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative bg-bg-alt group cursor-default overflow-hidden rounded-[20px] flex flex-col h-full"
        style={{ padding: "2rem", boxShadow: SHADOW_CLAY, rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{
          y: -4,
          boxShadow: SHADOW_CLAY_HOVER,
          transition: { duration: 0.25, ease: EASE },
        }}
      >
        <span
          className="absolute top-0 inset-x-0 h-[2px] bg-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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
        <div className="mt-auto">
          <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-burgundy text-white leading-none">
            {service.tag}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services({ preview = false }) {
  const { label, title, items } = content.services;
  const displayItems = preview ? items.slice(0, 3) : items;

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayItems.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

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

  // ── Full services page (clay card grid) ──────────────────────────────
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

      {/* All 10 services — 3-column clay card grid */}
      <section className="py-24 bg-bg border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {items.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

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
