"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { useMagnetic } from "@/lib/useMagnetic";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Results", href: "/results" },
  { name: "How We Work", href: "/vision" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
];

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { ref: magRef, x: magX, y: magY, onMouseMove: magMove, onMouseLeave: magLeave } = useMagnetic({ strength: 0.3, radius: 70 });
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const previousFocusRef = useRef(null);

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

  // Focus management
  useEffect(() => {
    if (mobileOpen) {
      previousFocusRef.current = document.activeElement;
      const frame = requestAnimationFrame(() => {
        if (drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll(FOCUSABLE);
          if (focusable.length) focusable[0].focus();
        }
      });
      return () => cancelAnimationFrame(frame);
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [mobileOpen]);

  const handleDrawerKeyDown = useCallback((e) => {
    if (!drawerRef.current) return;
    if (e.key === "Escape") {
      setMobileOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = Array.from(drawerRef.current.querySelectorAll(FOCUSABLE));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-md border-b border-divider py-4"
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
                  className={`relative text-sm font-medium transition-colors duration-200 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 ${
                    isActive ? "text-charcoal" : "text-[#636363] hover:text-charcoal"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-burgundy transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <motion.div
              ref={magRef}
              style={{ x: magX, y: magY }}
              onMouseMove={magMove}
              onMouseLeave={magLeave}
              className="inline-flex"
            >
              <Link
                href="/contact"
                className="relative text-sm font-semibold px-5 py-2.5 bg-burgundy text-white overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
              >
                <span className="absolute inset-0 bg-burgundy-dark translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                <span className="relative">Book a Consultation</span>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile: CTA + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/contact"
              className="text-xs font-semibold px-4 py-2 bg-burgundy text-white hover:bg-burgundy-dark transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
            >
              Book a Consultation
            </Link>
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#636363] hover:text-charcoal transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
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
              className="fixed inset-0 z-40 bg-charcoal/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-nav"
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg border-l border-divider flex flex-col lg:hidden"
              aria-label="Mobile navigation"
              onKeyDown={handleDrawerKeyDown}
            >
              <div className="flex items-center justify-between p-6 border-b border-divider">
                <Logo size="small" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#636363] hover:text-charcoal transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block py-3 text-sm font-medium border-b border-divider/70 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 ${
                        isActive ? "text-charcoal" : "text-[#636363] hover:text-charcoal"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="p-6 border-t border-divider">
                <Link
                  href="/contact"
                  className="block text-center text-sm font-semibold px-5 py-3 bg-burgundy text-white hover:bg-burgundy-dark transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
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
