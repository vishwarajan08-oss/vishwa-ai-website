"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { stagger, viewport } from "@/lib/animations";

// Custom variant that reads `custom` prop for per-card stagger delay.
// Entrance uses the design system easing and duration range.
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: index * 0.08,
    },
  }),
};

// Shared fadeInUp for heading/title — kept identical to the lib version
// so we don't break anything by importing a possibly-different shape.
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Stagger delay values for metric list items so each line
// fades in slightly after the previous one on card hover.
// We only need a handful — CSS custom properties do the work.
const METRIC_DELAYS = ["0ms", "60ms", "120ms", "180ms", "240ms"];

function Ticker({ text }) {
  const repeated = `${text}   ${text}   `;
  return (
    <div className="overflow-hidden border-y border-burgundy/20 py-3 bg-burgundy-dark">
      <div
        className="flex whitespace-nowrap text-xs font-semibold tracking-widest uppercase text-white/40"
        style={{
          animation: "ticker 40s linear infinite",
          width: "max-content",
        }}
      >
        {[repeated, repeated].map((chunk, i) => (
          <span key={i} className="px-4">
            {chunk.split("·").map((part, j, arr) => (
              <span key={j}>
                {part.trim()}
                {j < arr.length - 1 && (
                  <span className="text-taupe mx-3">·</span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TrackRecord() {
  const { label, title, ticker, cases } = content.trackRecord;

  return (
    <section id="track-record" className="py-24 bg-bg border-t border-divider">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading — stagger with fadeInUp variants, unchanged */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-widest text-burgundy mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-charcoal"
          >
            {title}
          </motion.p>
        </motion.div>
      </div>

      <Ticker text={ticker} />

      <div className="max-w-6xl mx-auto px-6 pt-0">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-divider"
        >
          {cases.map((cs, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              className="relative overflow-hidden p-8 bg-bg-alt border border-divider md:border-r-0 md:last:border-r space-y-4 hover:border-burgundy hover:-translate-y-1 transition-all duration-300 group"
              style={{ boxShadow: "0 0 0 0 rgba(107,30,46,0)" }}
              whileHover={{ boxShadow: "0 4px 24px rgba(107,30,46,0.08)" }}
            >
              {/* Left-edge accent bar */}
              <span
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-burgundy scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />

              {/* Burgundy overlay — CSS-only, frequent interaction (Emil's frequency rule) */}
              <span
                className="absolute inset-0 bg-burgundy opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />

              {/* Hero metric — first metric displayed large and prominent */}
              {cs.metrics && cs.metrics.length > 0 && (
                <div className="text-3xl font-black text-burgundy leading-none tracking-tight group-hover:scale-[1.02] transition-transform duration-200 origin-left">
                  {cs.metrics[0]}
                </div>
              )}

              {/* Case label + title */}
              <div className="pt-2 space-y-1">
                <p className="text-[10px] font-black text-taupe tracking-widest uppercase">
                  Case {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="text-base font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200">
                  {cs.title}
                </h4>
              </div>

              <p className="text-sm text-[#636363] leading-relaxed font-normal">
                {cs.description}
              </p>

              {/* Additional metrics (after the first) */}
              {cs.metrics && cs.metrics.length > 1 && (
                <ul className="space-y-1.5 pt-2 border-t border-divider">
                  {cs.metrics.slice(1).map((metric, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-taupe font-medium opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ transitionDelay: METRIC_DELAYS[i] ?? "0ms" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-burgundy flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="inline-block group-hover:scale-[1.05] transition-transform duration-200 origin-left">
                        {metric}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
