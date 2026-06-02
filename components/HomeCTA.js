"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { viewport } from "@/lib/animations";
import { useMagnetic } from "@/lib/useMagnetic";

const EASE = [0.25, 0.46, 0.45, 0.94];

const wordVariant = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

const CTA_HEADING = "Let's build something that actually works.";

export default function HomeCTA() {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic({ strength: 0.35, radius: 80 });

  return (
    <section className="py-24 bg-burgundy-dark border-t border-burgundy/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          <motion.h2
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            {CTA_HEADING.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className="inline-block"
                style={{ whiteSpace: "pre", willChange: "filter, opacity, transform" }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
            className="text-sm text-[#C9B8A8] leading-relaxed"
          >
            We work with a limited number of firms each quarter. If you&rsquo;re serious about running leaner operations, let&rsquo;s talk.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay: 0.1 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <motion.div
              ref={ref}
              style={{ x, y }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="inline-flex"
            >
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-charcoal bg-taupe overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy-dark"
              >
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                <span className="relative">Book a Consultation</span>
              </Link>
            </motion.div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy-dark"
            >
              Learn About Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
