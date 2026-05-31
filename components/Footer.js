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
    <footer className="bg-burgundy-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="space-y-4">
            <Logo inverted={true} />
            <p className="text-xs text-taupe leading-relaxed max-w-[200px]">
              AI infrastructure for wealth management firms.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="mailto:coreconsulting.ai@gmail.com"
                className="text-taupe hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C9B8A8]">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-white/70 hover:text-white underline-offset-2 hover:underline decoration-taupe transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C9B8A8]">
              Contact
            </p>
            <a
              href="mailto:coreconsulting.ai@gmail.com"
              className="block text-xs font-medium text-taupe hover:text-white transition-colors duration-200 cursor-pointer"
            >
              coreconsulting.ai@gmail.com
            </a>
            <Link
              href="/contact"
              className="inline-block text-xs font-semibold px-4 py-2.5 bg-burgundy text-white hover:bg-burgundy-mid transition-colors duration-200 mt-1 cursor-pointer"
            >
              Book a Consultation
            </Link>
          </div>

        </div>

        <div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="text-[11px] text-taupe/70 font-medium">
            &copy; 2026 Core Consulting. All rights reserved.
          </p>
        </div>

      </motion.div>
    </footer>
  );
}
