"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const TICKER_ITEMS = [
  "Wealth Management",
  "AI Implementation",
  "Workflow Automation",
  "CRM Integration",
  "Financial Research",
  "Client Reporting",
];

// Custom ease — sharp deceleration, professional feel (Emil/Jakub)
const EASE = [0.25, 0.46, 0.45, 0.94];

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

export default function Hero() {
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <section
      id="top"
      className="relative flex flex-col min-h-dvh bg-[#FAFAFA] overflow-hidden"
    >
      {/* Diagonal grain texture — 0.015 opacity so it's subliminal */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(107,30,46,0.015) 20px,
            rgba(107,30,46,0.015) 21px
          )`,
        }}
      />

      {/* Warm radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 30% 65%, rgba(107,30,46,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="flex flex-col flex-1 relative z-10">

        {/* Trust bar — fades in after initial headline lands */}
        <div className="pt-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[11px] tracking-[0.15em] text-[#636363] uppercase font-medium"
            >
              Trusted by wealth management firms across the Southeast
            </motion.p>
          </div>
        </div>

        {/* Editorial grid */}
        <div className="flex-1 flex items-center py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 lg:gap-0 items-center">

              {/* Left — staggered editorial headline */}
              <div className="lg:pr-20">
                <h1
                  className="text-[clamp(48px,6.5vw,88px)] leading-[0.93] tracking-tight"
                  aria-label="AI infrastructure for the firms that can't afford to wait."
                >
                  <motion.span
                    custom={0}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="block"
                  >
                    <span className="font-light text-[#8C8C8C]">AI </span>
                    <span className="font-black text-[#1A1A1A]">infrastructure</span>
                  </motion.span>

                  <motion.span
                    custom={1}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="block font-light text-[#8C8C8C] mt-1"
                  >
                    for the firms that
                  </motion.span>

                  <motion.span
                    custom={2}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="block mt-1"
                  >
                    <span className="font-black text-[#1A1A1A]">can&rsquo;t afford </span>
                    <span className="font-light text-[#6B1E2E]">to wait.</span>
                  </motion.span>
                </h1>
              </div>

              {/* Right — value prop + CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.55, ease: EASE }}
                className="lg:pl-16 lg:border-l lg:border-[#E8E0DA] flex flex-col gap-7"
              >
                <p className="text-sm leading-relaxed text-[#6D6D6D] max-w-xs">
                  We build and deploy AI systems for wealth management firms. The work is practical, not theoretical. Most clients see measurable results within 90 days.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-3">
                  {/* Primary — fill from left */}
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#6B1E2E] overflow-hidden group cursor-pointer"
                  >
                    <span
                      className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                      style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                      aria-hidden="true"
                    />
                    <span className="relative">Book a Consultation</span>
                  </Link>

                  {/* Secondary — fill from left, text inverts */}
                  <Link
                    href="/results"
                    className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold border border-[#6B1E2E]/35 overflow-hidden group cursor-pointer"
                  >
                    <span
                      className="absolute inset-0 bg-[#6B1E2E] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                      style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                      aria-hidden="true"
                    />
                    <span className="relative text-[#6B1E2E] group-hover:text-white transition-colors duration-200">
                      See the Results
                    </span>
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom — gradient rule draws left→right, then ticker */}
        <div className="mt-auto">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.55 }}
              className="h-px origin-left"
              style={{ background: "linear-gradient(90deg, #6B1E2E 0%, #C9B8A8 100%)" }}
              aria-hidden="true"
            />
          </div>

          {/* Ticker — pauses on hover */}
          <div
            className="py-3.5 overflow-hidden cursor-default select-none"
            aria-hidden="true"
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            <div
              className="flex whitespace-nowrap will-change-transform"
              style={{
                animation: "ticker 32s linear infinite",
                animationPlayState: tickerPaused ? "paused" : "running",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-[10.5px] tracking-[0.14em] uppercase font-medium px-4"
                >
                  {TICKER_ITEMS.map((item, j) => (
                    <span key={j} className="inline-flex items-center">
                      <span className="text-[#B0B0B0]">{item}</span>
                      <span className="text-[#6B1E2E] mx-3 text-[8px]">♦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
