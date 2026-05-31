"use client";

import { motion } from "framer-motion";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { TESTIMONIALS } from "@/lib/testimonials";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#F5F0EE]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-xl mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs uppercase tracking-widest text-[#6B1E2E] mb-3 font-medium"
          >
            Client Feedback
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-[#1A1A1A]"
          >
            Don&apos;t take our word for it.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-[#1A1A1A]/50 text-sm"
          >
            Firms managing over a billion dollars in assets trust Core Consulting.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={viewport}
        >
          <TestimonialCarousel testimonials={TESTIMONIALS} className="mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
