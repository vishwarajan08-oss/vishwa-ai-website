"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport, staggerMed } from "@/lib/animations";

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Services() {
  const { label, title, items } = content.services;

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ staggerChildren: 0.08 }}
          className="mb-16"
        >
          <motion.h2
            variants={slideInLeft}
            className="text-xs font-bold uppercase tracking-widest text-[#C41A1A] mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={slideInLeft}
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            {title}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerMed}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="border-t border-white/5"
        >
          {items.map((service, index) => (
            <motion.div
              key={index}
              variants={slideInLeft}
              className="grid grid-cols-12 gap-6 py-10 border-b border-white/5 group"
            >
              <div className="col-span-12 md:col-span-1">
                <span className="text-xs font-black text-white/20 tracking-wider">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-2">
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#FF2D2D] transition-colors duration-200">
                  {service.title}
                </h3>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C41A1A]/40 text-[#C41A1A]">
                  {service.tag}
                </span>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="text-sm text-white/50 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={viewport}
          className="mt-12 flex justify-end"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#FF2D2D] transition-colors duration-200"
          >
            Work With Us <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
