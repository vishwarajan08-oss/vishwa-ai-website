"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, viewport } from "@/lib/animations";
import Logo from "./Logo";
import { ExternalLink, Mail } from "lucide-react";

const footerLinks = [
  { name: "Services", href: "/services" },
  { name: "Results", href: "/results" },
  { name: "Vision", href: "/vision" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] py-12 bg-[#0A0A0A]">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-3">
            <Logo />
            <p className="text-xs text-[#A1A1AA] font-medium leading-relaxed max-w-[200px]">
              AI infrastructure for wealth management firms.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://linkedin.com/in/vishwarajan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href="mailto:coreconsulting.ai@gmail.com"
                className="text-[#A1A1AA] hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">Contact</p>
            <a
              href="mailto:coreconsulting.ai@gmail.com"
              className="block text-xs font-medium text-white/40 hover:text-[#DC2626] transition-colors duration-200 cursor-pointer"
            >
              coreconsulting.ai@gmail.com
            </a>
            <Link
              href="/contact"
              className="inline-block text-xs font-semibold px-4 py-2 bg-[#DC2626] text-white hover:bg-[#991B1B] transition-colors duration-200 mt-2 cursor-pointer"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-6">
          <p className="text-xs text-white/20 font-medium">
            &copy; 2026 Core Consulting. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
