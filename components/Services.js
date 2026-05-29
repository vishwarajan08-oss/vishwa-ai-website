"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function Services() {
  const { items } = content.services;

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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3"
          >
            Services
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-[#0A1628]"
          >
            What I Offer
          </motion.p>
        </motion.div>

        <div className="border-t border-neutral-100">
          {items.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              viewport={viewport}
              className="grid grid-cols-12 gap-6 py-10 border-b border-neutral-100 group"
            >
              <div className="col-span-12 md:col-span-1">
                <span className="text-xs font-black text-neutral-300 tracking-wider">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-lg font-bold text-[#0A1628] leading-snug group-hover:opacity-70 transition-opacity">
                  {service.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12 flex justify-end"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A1628] hover:opacity-60 transition-opacity"
          >
            Work With Us <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
