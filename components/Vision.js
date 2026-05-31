"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import RoadmapNav from "@/components/RoadmapNav";

const PHASES = [
  {
    number: "01",
    title: "Discovery & Workflow Mapping",
    description:
      "Before we recommend anything, we sit down with the people who actually do the work. Advisors, ops staff, compliance, client services. We find out where time is going and where things break down. That's what everything else is built on.",
    detail: "Takes two to three weeks depending on firm size.",
  },
  {
    number: "02",
    title: "Agentic AI Development & Implementation",
    description:
      "We build what the discovery tells us to build. Custom agentic systems, tool integrations, and automated workflows. All designed around how your firm actually runs. Nothing generic, nothing speculative.",
    detail: "Most firms have their first systems live within 30 days of kickoff.",
  },
  {
    number: "03",
    title: "Audit & Optimization Quarter",
    description:
      "The first 90 days after we deploy, we stay involved. We watch how the systems perform, run training sessions with your team, and fix what needs fixing. You don't sign off on something until it's actually working.",
    detail: "Includes two formal reviews and ongoing monitoring throughout the quarter.",
  },
  {
    number: "04",
    title: "Retained Partnership",
    description:
      "Some firms keep us on after the audit quarter. We monitor the systems, stay current on new tools, and run quarterly check-ins. It's straightforward ongoing support. Nothing more complicated than that.",
    detail: "Month-to-month after the initial engagement.",
  },
];

function PhaseCard({ phase, index, forwardedRef }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={(el) => {
        ref.current = el;
        if (forwardedRef) forwardedRef.current = el;
      }}
      className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 py-16 border-b border-[#E8E0DA] last:border-b-0"
    >
      {/* Left — number */}
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-3"
      >
        <span className="text-4xl font-black text-[#E8E0DA] leading-none">
          {phase.number}
        </span>
      </motion.div>

      {/* Right — content */}
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-[#1A1A1A] leading-snug">
          {phase.title}
        </h3>
        <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
          {phase.description}
        </p>
        <p className="text-xs text-[#8C8C8C] font-medium border-l-2 border-[#E8E0DA] pl-3">
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-4">
              Why This Matters Now
            </p>
            <h2 className="text-2xl font-bold text-[#1A1A1A] leading-snug mb-4">
              Why it matters to move now.
            </h2>
            <p className="text-sm text-[#636363] leading-relaxed mb-8">
              Firms that build this infrastructure today will run leaner and faster than
              competitors who wait. That gap compounds. It doesn&apos;t close.
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
              We work with a small number of firms at a time. That&apos;s intentional. Every
              engagement gets direct attention from the people who built the system, not a
              junior team working from a playbook.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
