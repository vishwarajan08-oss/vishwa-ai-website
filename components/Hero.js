"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TICKER_TEXT =
  "Wealth Management · AI Implementation · Workflow Automation · CRM Integration · Financial Research · Client Reporting · ";

const lineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.1 },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col min-h-dvh bg-[#FAFAFA] overflow-hidden"
    >
      {/* Warm radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 30% 65%, rgba(107,30,46,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="flex flex-col flex-1 relative z-10">
        {/* Trust bar */}
        <div className="pt-28 pb-0 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[11px] tracking-[0.15em] text-[#1A1A1A]/30 uppercase font-medium"
            >
              Trusted by wealth management firms across the Southeast
            </motion.p>
          </div>
        </div>

        {/* Editorial grid */}
        <div className="flex-1 flex items-center py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 lg:gap-0 items-center">

              {/* Left — large editorial headline */}
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
                    <span className="font-light text-[#1A1A1A]/40">AI </span>
                    <span className="font-black text-[#1A1A1A]">infrastructure</span>
                  </motion.span>

                  <motion.span
                    custom={1}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="block font-light text-[#1A1A1A]/40 mt-1"
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

              {/* Right — description + CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="lg:pl-16 lg:border-l lg:border-[#E8E0DA] flex flex-col gap-7"
              >
                <p className="text-sm leading-relaxed text-[#1A1A1A]/55 max-w-xs">
                  We build and deploy AI systems for wealth management firms. The work is practical, not theoretical. Most clients see measurable results within 90 days.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#6B1E2E] overflow-hidden group cursor-pointer"
                  >
                    <span
                      className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
                      aria-hidden="true"
                    />
                    <span className="relative">Book a Consultation</span>
                  </Link>

                  <Link
                    href="/results"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[#6B1E2E] border border-[#6B1E2E]/35 hover:border-[#6B1E2E] hover:bg-[#6B1E2E]/5 transition-all duration-200 cursor-pointer"
                  >
                    See the Results
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom — divider + ticker */}
        <div className="mt-auto">
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-[#E8E0DA]" aria-hidden="true" />
          </div>
          <div className="py-3.5 overflow-hidden" aria-hidden="true">
            <div
              className="flex whitespace-nowrap will-change-transform"
              style={{ animation: "ticker 30s linear infinite" }}
            >
              {[TICKER_TEXT, TICKER_TEXT, TICKER_TEXT, TICKER_TEXT].map((t, i) => (
                <span
                  key={i}
                  className="inline-block text-[10.5px] tracking-[0.14em] text-[#1A1A1A]/25 uppercase font-medium px-6"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
