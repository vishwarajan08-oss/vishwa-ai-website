"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Hero() {
  const { subheadline, secondaryLine } = content.hero;

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-end pb-20 pt-40 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl lg:text-[96px] font-black tracking-tight text-[#0A1628] leading-[1.0]">
              AI That Actually Works
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-[96px] font-black tracking-tight text-neutral-300 leading-[1.0]">
              for Your Firm.
            </h1>
          </div>

          <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed max-w-xl">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-[#0A1628] hover:bg-[#142844] transition-colors"
            >
              Let&apos;s Talk
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-[#0A1628] border border-[#0A1628] hover:bg-neutral-50 transition-colors"
            >
              View Services
            </a>
          </div>

          <p className="text-xs tracking-widest text-neutral-400 uppercase font-semibold">
            {secondaryLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
