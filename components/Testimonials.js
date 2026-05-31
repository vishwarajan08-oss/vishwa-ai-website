"use client";
import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#F5F0EE] border-t border-[#E8E0DA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-xl mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3"
          >
            Client Feedback
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]"
          >
            Don&apos;t take our word for it.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-[#636363] text-sm"
          >
            Firms managing over a billion dollars in assets trust Core Consulting.
          </motion.p>
        </motion.div>
        <StaggerTestimonials />
      </div>
    </section>
  );
}
