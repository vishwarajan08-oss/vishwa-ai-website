"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Results", href: "/results" },
  { name: "Vision", href: "/vision" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#E8E0DA] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.slice(1).map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 group cursor-pointer ${
                    isActive ? "text-[#1A1A1A]" : "text-[#636363] hover:text-[#1A1A1A]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#6B1E2E] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="relative text-sm font-semibold px-5 py-2.5 bg-[#6B1E2E] text-white overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
              <span className="relative">Book a Consultation</span>
            </Link>
          </nav>

          {/* Mobile: CTA + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/contact"
              className="text-xs font-semibold px-4 py-2 bg-[#6B1E2E] text-white hover:bg-[#3D0D18] transition-colors duration-200 cursor-pointer"
            >
              Book a Consultation
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#636363] hover:text-[#1A1A1A] transition-colors duration-200 cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#1A1A1A]/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#FAFAFA] border-l border-[#E8E0DA] flex flex-col lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#E8E0DA]">
                <Logo size="small" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-[#636363] hover:text-[#1A1A1A] transition-colors duration-200 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block py-3 text-sm font-medium border-b border-[#E8E0DA]/70 transition-colors duration-200 cursor-pointer ${
                        isActive ? "text-[#1A1A1A]" : "text-[#636363] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="p-6 border-t border-[#E8E0DA]">
                <Link
                  href="/contact"
                  className="block text-center text-sm font-semibold px-5 py-3 bg-[#6B1E2E] text-white hover:bg-[#3D0D18] transition-colors duration-200 cursor-pointer"
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
