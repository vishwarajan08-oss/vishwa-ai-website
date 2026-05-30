"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Hero() {
  const { subheadline, ctaPrimary } = content.hero;

  return (
    <section
      id="top"
      className="relative min-h-dvh flex items-center pt-24 pb-16 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Warm radial gradient texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(107,30,46,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="relative grid grid-cols-1 md:grid-cols-[55%_45%] gap-16 md:gap-0 items-center">

          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-[55%] w-px bg-[#E8E0DA]"
            aria-hidden="true"
          />

          {/* Left column — editorial statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:pr-16 flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-[80px] md:text-[120px] lg:text-[140px] font-black tracking-tight leading-none text-[#6B1E2E]">
                $1.3B+
              </p>
            </motion.div>

            <p className="mt-3 text-sm tracking-wide text-[#1A1A1A]/60 uppercase">
              in AUM across our partner firms
            </p>

            <div className="mt-6 w-12 h-px bg-[#6B1E2E]" aria-hidden="true" />

            <p className="mt-6 text-xl font-bold text-[#1A1A1A] tracking-tight">
              4 firms. 90 days. 20% less overhead.
            </p>
          </motion.div>

          {/* Right column — value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
            className="md:pl-16 flex flex-col justify-center gap-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B1E2E]">
              AI for Wealth Management
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-snug">
              We build the AI systems your firm actually uses.
            </h1>

            <p className="text-sm text-[#1A1A1A]/60 leading-relaxed max-w-sm">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-[#6B1E2E] overflow-hidden group cursor-pointer"
              >
                <span
                  className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
                  aria-hidden="true"
                />
                <span className="relative">{ctaPrimary}</span>
              </Link>

              <Link
                href="/services"
                className="text-sm font-medium text-[#6B1E2E] hover:text-[#3D0D18] transition-colors duration-200 self-center"
              >
                See our services →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
