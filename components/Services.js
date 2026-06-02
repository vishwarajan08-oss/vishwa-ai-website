"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport } from "@/lib/animations";
import { use3DTilt } from "@/lib/use3DTilt";
import {
  Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield,
  Search, Globe, MessageSquare, TrendingUp,
} from "lucide-react";
import { SHADOW_CLAY, SHADOW_CLAY_HOVER } from "@/lib/tokens";

const iconMap = {
  Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield,
  Search, Globe, MessageSquare, TrendingUp,
};

const EASE = [0.25, 0.46, 0.45, 0.94];

const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const WAVE_Y = [16, 28, 20];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon];
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt({ maxDeg: 6 });
  const yOffset = WAVE_Y[index % 3];

  return (
    <div style={{ perspective: "900px" }} className="h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: EASE }}
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
        <motion.span
          className="absolute top-0 inset-x-0 h-[2px] bg-burgundy pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
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
        <p className="text-sm text-[#6D6D6D] leading-relaxed mb-2">
          {service.lead}
        </p>
        <ul className="list-none space-y-1 mb-4">
          {service.bullets.map((b, i) => (
            <li key={i} className="text-xs text-[#6D6D6D] flex items-start gap-2">
              <span className="text-burgundy mt-0.5 flex-shrink-0" aria-hidden="true">-</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
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
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      {/* Hero */}
      <section data-cursor-dark className="py-24 bg-burgundy">
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
            <motion.div variants={slideInLeft} className="max-w-2xl space-y-3">
              <p className="text-base text-taupe leading-relaxed">
                We start with your workflows, not your tools.
              </p>
              <ul className="list-none space-y-1.5">
                {[
                  "Identify where time is being lost before recommending anything",
                  "Build AI systems around those specific friction points",
                  "Scope every engagement to real impact, not what looks good in a proposal",
                ].map((b, i) => (
                  <li key={i} className="text-sm text-taupe/70 flex items-start gap-2">
                    <span aria-hidden="true" className="mt-0.5 flex-shrink-0">-</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* All 10 services — 3-column clay card grid */}
      <section className="py-24 bg-bg border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            data-cursor-dark
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
