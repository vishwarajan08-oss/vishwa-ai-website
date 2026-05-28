"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Hero() {
  const { headline, subheadline, ctaText, secondaryLine } = content.hero;

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Abstract geometric SVG background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <svg
          className="w-full h-full max-w-7xl opacity-[0.03]"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="500" cy="500" r="400" stroke="#0A1628" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="500" cy="500" r="200" stroke="#0A1628" strokeWidth="1" />
          <line x1="100" y1="500" x2="900" y2="500" stroke="#0A1628" strokeWidth="1" strokeDasharray="10 10" />
          <line x1="500" y1="100" x2="500" y2="900" stroke="#0A1628" strokeWidth="1" strokeDasharray="10 10" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0A1628] leading-[1.1] max-w-3xl mx-auto">
            {headline}
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {subheadline}
          </p>

          <div className="pt-4 flex flex-col items-center space-y-4">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-sm font-semibold rounded-none text-white bg-[#0A1628] hover:bg-[#142844] transition-all duration-300 shadow-sm"
            >
              {ctaText}
            </a>
            
            <p className="text-xs tracking-wider text-neutral-400 uppercase font-semibold">
              {secondaryLine}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
