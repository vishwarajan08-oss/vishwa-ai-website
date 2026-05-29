"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewport } from "@/lib/animations";

export default function Footer() {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const links = [
    { name: "Services", href: "#services" },
    { name: "Results", href: "#track-record" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" },
    { name: "rajan.vishwa08@gmail.com", href: "mailto:rajan.vishwa08@gmail.com", external: true },
  ];

  return (
    <footer className="border-t border-white/5 py-10 bg-[#0A0A0A]">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6 space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">
              Core <span className="font-light text-white/50">Consulting</span>
            </p>
            <p className="text-xs text-white/30 font-medium">
              AI infrastructure for wealth management.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.external ? undefined : (e) => handleScrollTo(e, link.href)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-xs font-medium text-white/40 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-6">
          <p className="text-xs text-white/20 font-medium">
            &copy; 2026 Core Consulting. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
