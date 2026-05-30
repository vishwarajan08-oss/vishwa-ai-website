"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/config/faq";
import { fadeInUp, stagger, staggerMed, viewport } from "@/lib/animations";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className={`border-b border-[#2A2A2A] transition-colors duration-200 ${
        open ? "bg-[#171717]" : "hover:bg-[#171717]/50"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 px-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 flex-1 pr-4">
          <span className="text-xs font-black text-[#A1A1AA] tracking-wider flex-shrink-0 mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${
            open ? "text-[#EF4444]" : "text-white group-hover:text-white/90"
          }`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`flex-shrink-0 transition-colors duration-200 ${
            open ? "text-[#DC2626]" : "text-[#A1A1AA]"
          }`}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/50 leading-relaxed px-6 pb-6 pl-16">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3">
              FAQ
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-white mb-4">
              Common Questions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-white/50 max-w-lg">
              Everything you need to know about working with Core Consulting. Don't see your question here? Reach out directly.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerMed}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="border-t border-[#2A2A2A]"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={viewport}
            className="mt-16 p-8 bg-[#171717] border border-[#2A2A2A] space-y-4"
          >
            <p className="text-sm font-bold text-white">Still have questions?</p>
            <p className="text-sm text-white/50">
              We're happy to answer anything before you commit to a conversation. Reach out directly and we'll get back to you within one business day.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#DC2626] hover:bg-[#991B1B] px-6 py-3 transition-colors duration-200 cursor-pointer"
            >
              Book a Consultation <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
