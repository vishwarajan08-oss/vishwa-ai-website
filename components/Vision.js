"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileSearch2, Zap, BarChart2, Users } from "lucide-react";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import RoadmapNav from "@/components/RoadmapNav";
import { SHADOW_CLAY } from "@/lib/tokens";

const PHASES = [
  {
    number: "01",
    icon: FileSearch2,
    title: "Discovery & Workflow Mapping",
    description:
      "Before we recommend anything, we sit down with the people who actually do the work. Advisors, ops staff, compliance, client services. We find out where time is going and where things break down. That's what everything else is built on.",
    detail: "Takes two to three weeks depending on firm size.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Agentic AI Development & Implementation",
    description:
      "We build what the discovery tells us to build. Custom agentic systems, tool integrations, and automated workflows. All designed around how your firm actually runs. Nothing generic, nothing speculative.",
    detail: "Most firms have their first systems live within 30 days of kickoff.",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Audit & Optimization Quarter",
    description:
      "The first 90 days after we deploy, we stay involved. We watch how the systems perform, run training sessions with your team, and fix what needs fixing. You don't sign off on something until it's actually working.",
    detail: "Includes two formal reviews and ongoing monitoring throughout the quarter.",
  },
  {
    number: "04",
    icon: Users,
    title: "Retained Partnership",
    description:
      "Some firms keep us on after the audit quarter. We monitor the systems, stay current on new tools, and run quarterly check-ins. It's straightforward ongoing support. Nothing more complicated than that.",
    detail: "Month-to-month after the initial engagement.",
  },
];

function PhaseCard({ phase, index, forwardedRef }) {
  const ref = useRef(null);

  return (
    <div
      ref={(el) => {
        ref.current = el;
        if (forwardedRef) forwardedRef.current = el;
      }}
      className="relative grid grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] gap-8 py-16 border-b border-[#E8E0DA] last:border-b-0"
    >
      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute"
        style={{
          fontSize: "clamp(80px, 12vw, 120px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "#6B1E2E",
          opacity: 0.06,
          top: "24px",
          left: "-8px",
          textShadow: "0 0 60px rgba(107,30,46,0.3)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {phase.number}
      </span>

      {/* Left — phase label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-3 pt-1"
        style={{ position: "relative", zIndex: 1 }}
      >
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-burgundy">
          Phase {phase.number}
        </span>
        <div
          className="w-9 h-9 rounded-[10px] bg-bg flex items-center justify-center flex-shrink-0"
          style={{ boxShadow: SHADOW_CLAY }}
        >
          <phase.icon size={16} className="text-burgundy" strokeWidth={2} />
        </div>
      </motion.div>

      {/* Right — content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className="space-y-4"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h3 className="text-2xl font-bold text-[#1A1A1A] leading-snug">
          {phase.title}
        </h3>
        <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
          {phase.description}
        </p>
        <p className="text-xs text-[#595959] font-medium border-l-2 border-[#E8E0DA] pl-3">
          {phase.detail}
        </p>
      </motion.div>
    </div>
  );
}

export default function Vision() {
  const phaseRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <section id="vision" className="py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-20 max-w-2xl"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight mb-6"
          >
            Here&apos;s exactly how we work.
          </motion.h1>
        </motion.div>

        {/* Phase roadmap */}
        <div className="flex gap-12 items-stretch border-t border-[#E8E0DA]">
          <RoadmapNav phaseRefs={phaseRefs} />
          <div className="flex-1">
            {PHASES.map((phase, index) => (
              <PhaseCard
                key={phase.number}
                phase={phase}
                index={index}
                forwardedRef={phaseRefs[index]}
              />
            ))}
          </div>
        </div>

        {/* Why now section */}
        <div className="mt-20 pt-16 border-t border-[#E8E0DA] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl font-bold text-[#1A1A1A] leading-snug mb-4">
              Why it matters to move now.
            </h2>
            <p className="text-sm text-[#636363] leading-relaxed mb-8">
              Firms that build this infrastructure today will run leaner and serve clients
              better than competitors who wait. The longer they wait, the harder it gets.
            </p>
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#6B1E2E] overflow-hidden group cursor-pointer"
            >
              <span
                className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="relative">Book a Consultation</span>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <p className="text-sm text-[#636363] leading-relaxed">
              We work with a small number of firms at a time. Every engagement gets direct
              attention from the people who built the system, not a junior team working from
              a playbook.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
