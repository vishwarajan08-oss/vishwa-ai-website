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

export default function StatsBar() {
  const { stats } = content.trackRecord;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={statItem}
              className="bg-[#6B1E2E] rounded-[20px] px-8 py-7 space-y-2"
              style={{ boxShadow: SHADOW_CLAY }}
            >
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight tabular-nums">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div className="text-xs text-white/70 leading-snug max-w-[140px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
