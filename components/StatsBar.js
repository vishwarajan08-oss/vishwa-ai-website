"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { content } from "@/config/content";

function CountUp({ value, prefix, suffix, inView }) {
  const [display, setDisplay] = useState("0");
  const num = parseFloat(value);
  const isDecimal = value.includes(".");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setDisplay(isDecimal ? num.toFixed(1) : num.toString());
      return;
    }
    const duration = 1800;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, num, isDecimal, prefersReduced]);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

const SHADOW_CLAY = "0 8px 32px rgba(107,30,46,0.35), inset -4px -4px 8px rgba(255,255,255,0.08), inset 4px 4px 8px rgba(0,0,0,0.15)";

const PULSE_SHADOW = [
  "0 8px 32px rgba(107,30,46,0.35), inset -4px -4px 8px rgba(255,255,255,0.08), inset 4px 4px 8px rgba(0,0,0,0.15)",
  "0 8px 32px rgba(107,30,46,0.35), 0 0 40px rgba(107,30,46,0.25), inset -4px -4px 8px rgba(255,255,255,0.08), inset 4px 4px 8px rgba(0,0,0,0.15)",
  "0 8px 32px rgba(107,30,46,0.35), inset -4px -4px 8px rgba(255,255,255,0.08), inset 4px 4px 8px rgba(0,0,0,0.15)",
];

export default function StatsBar() {
  const { stats } = content.trackRecord;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const hero = stats[0];
  const supporting = stats.slice(1);

  const statItem = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="border-y border-divider py-14 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Hero stat */}
          <motion.div
            variants={statItem}
            data-cursor-dark
            className="relative bg-[#6B1E2E] rounded-[20px] px-10 py-9 overflow-hidden"
            animate={prefersReduced ? {} : { boxShadow: PULSE_SHADOW }}
            transition={prefersReduced ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: SHADOW_CLAY }}
          >
            <span
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
            />
            <div className="text-6xl md:text-7xl font-black text-white tracking-tight tabular-nums relative">
              <CountUp value={hero.value} prefix={hero.prefix} suffix={hero.suffix} inView={inView} />
            </div>
            <div className="text-sm text-white/70 leading-snug mt-2 relative">
              {hero.label}
            </div>
          </motion.div>

          {/* Supporting stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {supporting.map((stat, i) => (
              <motion.div
                key={i}
                variants={statItem}
                data-cursor-dark
                className="bg-[#6B1E2E] rounded-[20px] px-6 py-5 space-y-2"
                style={{ boxShadow: SHADOW_CLAY }}
              >
                <div className="text-2xl md:text-3xl font-black text-white tracking-tight tabular-nums">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} inView={inView} />
                </div>
                <div className="text-xs text-white/70 leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
