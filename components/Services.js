"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

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
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
            Services
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
            What I Offer
          </p>
        </div>

        <div className="border-t border-neutral-100">
          {items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
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

        <div className="mt-12 flex justify-end">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A1628] hover:opacity-60 transition-opacity"
          >
            Work With Us <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
