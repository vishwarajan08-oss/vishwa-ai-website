"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/config/content";

const FIRMS = content.trackRecord.ticker
  .split("·")
  .map((s) => s.trim())
  .filter(Boolean);

export default function ClientTicker() {
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <section className="border-b border-divider py-8 bg-bg-alt">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#595959] flex-shrink-0">
              Trusted by —
            </span>
            <span className="flex-1 h-px bg-divider" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {FIRMS.map((firm, i) => (
              <span key={i} className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#595959]">
                {firm}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const rows = [0, 1, 2, 3];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-divider py-10 bg-bg-alt overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Label */}
      <div className="flex items-center gap-4 mb-5 px-6 max-w-6xl mx-auto">
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#595959] flex-shrink-0">
          Trusted by —
        </span>
        <span className="flex-1 h-px bg-divider" aria-hidden="true" />
      </div>

      {/* Forward row */}
      <div className="overflow-hidden mb-3" aria-hidden="true">
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{
            animation: "marquee 28s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {rows.map((r) =>
            FIRMS.map((firm, j) => (
              <span key={`f-${r}-${j}`} className="inline-flex items-center">
                <span className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#595959] px-5">
                  {firm}
                </span>
                <span className="text-burgundy opacity-40" style={{ fontSize: "8px" }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Reverse row */}
      <div className="overflow-hidden" aria-hidden="true">
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{
            animation: "marquee-reverse 34s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {rows.map((r) =>
            FIRMS.map((firm, j) => (
              <span key={`r-${r}-${j}`} className="inline-flex items-center">
                <span className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#595959] px-5">
                  {firm}
                </span>
                <span className="text-burgundy opacity-40" style={{ fontSize: "8px" }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
}
