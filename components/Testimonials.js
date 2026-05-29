"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/config/testimonials";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

function TestimonialCard({ quote, author, role, company }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 p-6 border border-neutral-100 bg-white space-y-4 mx-3">
      <p className="text-sm text-neutral-600 leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div className="text-sm font-bold text-[#0A1628]">{author}</div>
        <div className="text-xs text-neutral-400 font-medium">
          {role ? `${role}, ` : ""}{company}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, duration, reverse = false }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = testimonials;
  const row2 = [...testimonials.slice(2), ...testimonials.slice(0, 2)];

  return (
    <section id="testimonials" className="py-24 bg-white border-t border-neutral-100 overflow-hidden">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3"
        >
          Feedback
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-3xl font-extrabold tracking-tight text-[#0A1628]"
        >
          What Firms Are Saying
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
        viewport={viewport}
        className="space-y-4"
      >
        <MarqueeRow items={row1} duration={35} />
        <MarqueeRow items={row2} duration={45} reverse />
      </motion.div>
    </section>
  );
}
