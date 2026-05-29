"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Results", href: "#track-record" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "#top")}
          className="font-bold tracking-tight text-base text-white hover:text-[#FF2D2D] transition-colors duration-200"
        >
          Core{" "}
          <span className="font-light text-white/60">Consulting</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="text-sm font-semibold px-5 py-2.5 bg-[#C41A1A] text-white hover:bg-[#FF2D2D] transition-colors duration-200"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile CTA */}
        <a
          href="#contact"
          onClick={(e) => handleScrollTo(e, "#contact")}
          className="md:hidden text-sm font-semibold px-4 py-2 bg-[#C41A1A] text-white hover:bg-[#FF2D2D] transition-colors duration-200"
        >
          Book a Call
        </a>
      </div>
    </motion.header>
  );
}
