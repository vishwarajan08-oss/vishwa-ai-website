"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

const PHASES = [
  {
    number: "01",
    status: "Current",
    statusActive: true,
    title: "Discovery & Workflow Mapping",
    description:
      "We interview key personnel across every function — advisors, operations, compliance, client services. We map exactly where time is lost, where errors happen, and where AI creates real leverage. Nothing is assumed. Everything is verified before we recommend a single tool.",
    detail: "Typically 2–3 weeks. Conducted on-site or remotely depending on firm size.",
  },
  {
    number: "02",
    status: "Active",
    statusActive: true,
    title: "Agentic AI Development & Implementation",
    description:
      "We build and deploy custom agentic AI systems based on what the discovery revealed. CRM automation, research pipelines, reporting infrastructure, client communication workflows. Every system is designed around how your firm actually operates — not how a generic template assumes it does.",
    detail: "Deployment timeline varies by scope. Most firms see first systems live within 30 days.",
  },
  {
    number: "03",
    status: "Included",
    statusActive: false,
    title: "Audit & Optimization Quarter",
    description:
      "The first 90 days after deployment we stay fully engaged. We monitor system performance, run staff training sessions, adjust workflows based on real usage, and verify that the results are measurable and defensible. No firm leaves the implementation phase without a clean audit.",
    detail: "90-day engagement. Includes two formal review sessions and continuous monitoring.",
  },
  {
    number: "04",
    status: "Optional",
    statusActive: false,
    title: "Retained Partnership",
    description:
      "Firms that want ongoing support retain us on a quarterly basis. We stay active — monitoring systems, evaluating new tools as they emerge, running quarterly audits, and keeping your AI infrastructure ahead of what your competitors are building.",
    detail: "Quarterly retainer. Includes priority access, ongoing optimization, and new tool evaluation.",
  },
];

function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 py-16 border-b border-[#E8E0DA] last:border-b-0"
    >
      {/* Left — number and status */}
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-3"
      >
        <span className="text-4xl font-black text-[#E8E0DA] leading-none">
          {phase.number}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 w-fit ${
            phase.statusActive
              ? "bg-[#6B1E2E] text-white"
              : "bg-[#F5F0EE] text-[#8C8C8C] border border-[#E8E0DA]"
          }`}
        >
          {phase.statusActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
          )}
          {phase.status}
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
          <motion.p
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-4"
          >
            How We Work
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight mb-6"
          >
            Built to scale.<br />Starting with your firm.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base text-[#636363] leading-relaxed"
          >
            Most AI implementations fail because they start with tools.
            We start with your people.
          </motion.p>
        </motion.div>

        {/* Phase roadmap */}
        <div className="border-t border-[#E8E0DA]">
          {PHASES.map((phase, index) => (
            <PhaseCard key={phase.number} phase={phase} index={index} />
          ))}
        </div>

        {/* Why now section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-20 pt-16 border-t border-[#E8E0DA] grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-4">
              Why This Matters Now
            </p>
            <h2 className="text-2xl font-bold text-[#1A1A1A] leading-snug mb-4">
              The firms building now are the ones that will be unbeatable in three years.
            </h2>
            <p className="text-sm text-[#636363] leading-relaxed mb-8">
              Advisory firms that build AI infrastructure today operate with the efficiency
              of firms three times their size. The window to build before your competitors
              do is not permanent. Every quarter you wait is a quarter they gain.
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
          </div>
          <div className="space-y-4">
            {[
              { stat: "90", unit: "days", label: "to first measurable results" },
              { stat: "4", unit: "firms", label: "currently active across $1.3B AUM" },
              { stat: "30", unit: "researchers", label: "evaluating tools continuously" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 py-4 border-b border-[#E8E0DA] last:border-b-0"
              >
                <div className="text-3xl font-black text-[#6B1E2E] leading-none min-w-[60px]">
                  {item.stat}
                  <span className="text-sm font-semibold text-[#C9B8A8] ml-1">{item.unit}</span>
                </div>
                <p className="text-sm text-[#636363]">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
