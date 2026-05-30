"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, viewport } from "@/lib/animations";

export default function HomeCTA() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
            Ready to Start
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Let's build something that actually works.
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            We work with a limited number of firms each quarter. If you're serious about transforming your operations, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-[#DC2626] hover:bg-[#991B1B] transition-colors duration-200 hover:scale-[1.02] transform cursor-pointer"
            >
              Book a Consultation
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-[#2A2A2A] hover:border-white/40 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
            >
              Learn About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
