"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/config/testimonials";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

function TestimonialCard({ quote, author, role, company }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-[400px] p-6 bg-[#111111] border-l-2 border-[#C41A1A] space-y-4 mx-3">
      <p className="text-sm text-white/70 leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div className="text-sm font-bold text-white">{author}</div>
        <div className="text-xs text-white/40 font-medium">
          {role ? `${role}, ` : ""}
          {company}
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
  const { label, heading, subheading } = content.testimonials;
  const row1 = testimonials;
  const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3)];

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#0A0A0A] border-t border-white/5 overflow-hidden"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-xs font-bold uppercase tracking-widest text-[#C41A1A] mb-3"
        >
          {label}
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-3xl font-extrabold tracking-tight text-white mb-3"
        >
          {heading}
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="text-sm text-white/50 font-medium max-w-lg"
        >
          {subheading}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
        viewport={viewport}
        className="space-y-4"
      >
        <MarqueeRow items={row1} duration={40} />
        <MarqueeRow items={row2} duration={50} reverse />
      </motion.div>
    </section>
  );
}
