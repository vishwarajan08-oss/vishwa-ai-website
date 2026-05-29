"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewport } from "@/lib/animations";

export default function Footer() {
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

  const links = [
    { name: "Services", href: "#services" },
    { name: "Track Record", href: "#track-record" },
    { name: "Vision", href: "#vision" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-neutral-100 py-10 bg-white">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <p className="text-xs text-neutral-400 font-medium tracking-wide">
          &copy; 2026 Vishwa Rajan AI Consulting
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs font-semibold text-neutral-400 hover:text-[#0A1628] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
