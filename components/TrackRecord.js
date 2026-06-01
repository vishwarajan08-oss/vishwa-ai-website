"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport } from "@/lib/animations";
import Testimonials from "@/components/Testimonials";
import { use3DTilt } from "@/lib/use3DTilt";

const EASE = [0.25, 0.46, 0.45, 0.94];

const SHADOW_CLAY = "0 8px 24px rgba(107,30,46,0.08), inset -4px -4px 8px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(0,0,0,0.06)";
const SHADOW_CLAY_HOVER = "0 14px 36px rgba(107,30,46,0.12), inset -5px -5px 10px rgba(255,255,255,0.85), inset 5px 5px 10px rgba(0,0,0,0.08)";
const SHADOW_CLAY_BURGUNDY = "0 8px 24px rgba(107,30,46,0.25), inset -3px -3px 8px rgba(255,200,200,0.06), inset 3px 3px 8px rgba(61,13,24,0.12)";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function CaseCard({ cs, index }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt({ maxDeg: 6 });

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        custom={index}
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{
          y: -4,
          boxShadow: SHADOW_CLAY_HOVER,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        className="bg-bg-alt relative group rounded-[20px] overflow-hidden"
        style={{ boxShadow: SHADOW_CLAY, rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <span
          className="absolute top-0 inset-x-0 h-[2px] bg-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none"
          aria-hidden="true"
        />
        {/* Case index strip */}
        <div className="px-10 md:px-14 py-4 border-b border-divider bg-bg flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#595959]">
            Case {String(index + 1).padStart(2, "0")}
          </span>
          <span className="w-8 h-px bg-divider" aria-hidden="true" />
        </div>

        <div className="px-10 md:px-14 pt-10 pb-12 flex flex-col gap-10">

          {/* ── Top: Firm label + Engagement title ──────────────── */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-burgundy">
              {cs.firmLabel}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-charcoal leading-snug">
              {cs.title}
            </h3>
          </div>

          {/* ── Middle: Metric callout ───────────────────────────── */}
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="py-8 px-8 md:px-10 bg-[#3D0D18] rounded-[12px] relative overflow-hidden"
            style={{ boxShadow: SHADOW_CLAY_BURGUNDY }}
          >
            <span
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 50%, rgba(201,184,168,0.06) 0%, transparent 65%)",
              }}
            />
            <p className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight relative">
              {cs.metricCallout}
            </p>
            {cs.metricDescriptor && (
              <p className="text-sm text-[#C9B8A8] mt-2 relative leading-snug">
                {cs.metricDescriptor}
              </p>
            )}
          </motion.div>

          {/* ── Bottom: Bullet list ──────────────────────────────── */}
          <motion.ul
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.45 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-4"
          >
            {cs.bullets.map((bullet, i) => (
              <motion.li
                key={i}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } }}
                className="flex items-start gap-4"
              >
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-burgundy mt-[7px]"
                  aria-hidden="true"
                />
                <span className="text-sm text-[#2A2A2A] leading-relaxed">
                  {bullet}
                </span>
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </motion.div>
    </div>
  );
}

export default function TrackRecord() {
  const { cases } = content.trackRecord;

  return (
    <>
      {/* ── Case Study Cards ─────────────────────────────────────────────── */}
      <section className="py-20 bg-bg border-t border-divider">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col gap-16">
            {cases.map((cs, index) => (
              <CaseCard key={index} cs={cs} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ── Closing CTA Strip ────────────────────────────────────────────── */}
      <section className="py-20 bg-burgundy border-t border-burgundy/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col sm:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-2 text-center sm:text-left">
              <p className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                Ready to see results like these?
              </p>
              <p className="text-sm text-[#C9B8A8] leading-relaxed">
                We work with a limited number of firms each quarter.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-10 py-4 text-sm font-semibold text-charcoal bg-[#C9B8A8] overflow-hidden group cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
            >
              <span
                className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                aria-hidden="true"
              />
              <span className="relative">Book a Consultation</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
