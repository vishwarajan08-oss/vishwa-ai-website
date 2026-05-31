"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport } from "@/lib/animations";
import { Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search, Target, Settings, Users } from "lucide-react";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";

const iconMap = { Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search };

const EASE = [0.25, 0.46, 0.45, 0.94];

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

const servicesData = [
  { id: 1, title: "Workflow Automation", date: "Fastest ROI", content: "We eliminate repetitive manual tasks — meeting notes, follow-up emails, onboarding workflows, internal reporting. Clients see 20% reductions in operational hours within 90 days.", category: "Automation", icon: Zap, relatedIds: [2, 3], status: "completed", energy: 95 },
  { id: 2, title: "AI Strategy & Advisory", date: "Start Here", content: "Before touching a single tool, we audit how your firm operates. Then we identify the two or three places where AI creates real, measurable impact.", category: "Strategy", icon: Target, relatedIds: [1, 3], status: "completed", energy: 90 },
  { id: 3, title: "End-to-End Implementation", date: "Most Popular", content: "From audit to full deployment. CRM, research, client reporting, back-office operations. No tool bloat, no guesswork.", category: "Implementation", icon: Settings, relatedIds: [1, 2, 4], status: "in-progress", energy: 85 },
  { id: 4, title: "Human-Focused Tech", date: "Relationship-Safe", content: "Every system we build gives advisors more time for clients, not automates away what makes the relationship valuable. Privacy-first data handling on every engagement.", category: "Design", icon: Users, relatedIds: [3, 5], status: "in-progress", energy: 80 },
  { id: 5, title: "Ongoing Optimization", date: "Long-Term", content: "AI implementations don't maintain themselves. Quarterly audits, continuous monitoring, hands-on training so your systems keep working as your firm grows.", category: "Support", icon: RefreshCw, relatedIds: [4, 6], status: "in-progress", energy: 70 },
  { id: 6, title: "Compliance-Aware", date: "Risk-Reduced", content: "Every tool is vetted against compliance requirements of independent advisory firms. We understand the regulatory environment and design accordingly.", category: "Compliance", icon: Shield, relatedIds: [5, 7], status: "pending", energy: 75 },
  { id: 7, title: "Research & Evaluation", date: "Research-Backed", content: "30 interns from Brown, UC Irvine, and UGA run continuous tool evaluations. We always know what actually works before recommending anything.", category: "Research", icon: Search, relatedIds: [6, 1], status: "pending", energy: 65 },
];

// Card used in both preview (homepage) and full (services page)
function ServiceCard({ service, index, variant = "preview" }) {
  const Icon = iconMap[service.icon];
  const isFullPage = variant === "full";

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      className="relative bg-white border border-divider group cursor-default overflow-hidden"
      style={{ padding: isFullPage ? "2.5rem" : "2rem" }}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 48px rgba(107,30,46,0.10)",
        transition: { duration: 0.25, ease: EASE },
      }}
    >
      {/* Top accent — draws left to right on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />

      {/* Icon */}
      {Icon && (
        <div className={isFullPage ? "mb-5" : "mb-4"}>
          <Icon
            size={isFullPage ? 20 : 18}
            className="text-burgundy"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Title */}
      <h3
        className={`font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200 ${
          isFullPage ? "text-lg mb-3" : "text-base mb-3"
        }`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[#6D6D6D] leading-relaxed mb-4 ${
          isFullPage ? "text-sm" : "text-sm"
        }`}
      >
        {service.description}
      </p>

      {/* Tag pill — now at bottom */}
      <div>
        <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-burgundy text-white leading-none">
          {service.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function Services({ preview = false }) {
  const { label, title, items } = content.services;
  const displayItems = preview ? items.slice(0, 3) : items;

  // ── Preview mode (homepage 3-card grid) ────────────────────────────────
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
            <motion.p
              variants={slideInLeft}
              className="text-xs font-bold uppercase tracking-widest text-burgundy mb-3"
            >
              {label}
            </motion.p>
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
              <ServiceCard key={index} service={service} index={index} variant="preview" />
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

  // ── Full services page (2-column card grid) ────────────────────────────
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
            <motion.p
              variants={slideInLeft}
              className="text-xs font-bold uppercase tracking-widest text-taupe"
            >
              {label}
            </motion.p>
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

          {/* Radial orbital timeline */}
          <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden" style={{ minHeight: "700px" }}>
            <div className="p-8 md:p-12">
              <RadialOrbitalTimeline timelineData={servicesData} />
            </div>
          </div>

          {/* CTA banner */}
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
