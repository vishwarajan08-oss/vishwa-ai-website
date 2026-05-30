"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/config/testimonials";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

const INTERVAL_MS = 5500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6 mb-14"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3"
        >
          From the Field
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]"
        >
          What Firms Are Saying
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        viewport={viewport}
        className="flex flex-col items-center gap-8 px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Card */}
        <div className="relative w-full max-w-2xl min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white border border-[#E8E0DA] border-l-[3px] border-l-[#6B1E2E] px-10 py-9 shadow-sm"
            >
              <p className="text-base italic leading-relaxed text-[#1A1A1A]/65 mb-5">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="text-sm font-semibold text-[#1A1A1A]">
                {current.author}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="text-[#C9B8A8] hover:text-[#6B1E2E] transition-colors duration-200 text-lg font-light select-none cursor-pointer"
          >
            ←
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className="w-2 h-2 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1E2E] cursor-pointer"
                style={{
                  backgroundColor: i === index ? "#6B1E2E" : "transparent",
                  border: i === index ? "none" : "1.5px solid #6B1E2E",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="text-[#C9B8A8] hover:text-[#6B1E2E] transition-colors duration-200 text-lg font-light select-none cursor-pointer"
          >
            →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
