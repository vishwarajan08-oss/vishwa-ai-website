"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Track Record", href: "#track-record" },
    { name: "Vision", href: "#vision" },
    { name: "Testimonials", href: "#testimonials" },
  ];

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-100 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "#top")}
          className="font-semibold tracking-tight text-base text-[#0A1628] hover:opacity-70 transition-opacity"
        >
          Vishwa Rajan <span className="font-light text-neutral-400">AI Consulting</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-neutral-500 hover:text-[#0A1628] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="text-sm font-semibold px-5 py-2 bg-[#0A1628] text-white hover:bg-[#142844] transition-colors"
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}
