"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/config/faq";
import { fadeInUp, stagger, staggerMed, viewport } from "@/lib/animations";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className={`border-b border-[#E8E0DA] transition-colors duration-200 ${
        open ? "bg-[#F5F0EE]" : "hover:bg-[#F5F0EE]/50"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 px-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 flex-1 pr-4">
          <span className="text-xs font-black text-[#C9B8A8] tracking-wider flex-shrink-0 mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${
            open ? "text-[#6B1E2E]" : "text-[#1A1A1A] group-hover:text-[#1A1A1A]/80"
          }`}>
            {question}
          </span>
        </div>
        <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-colors duration-200 ${
          open ? "text-[#6B1E2E]" : "text-[#C9B8A8]"
        }`}>
          {open ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#1A1A1A]/60 leading-relaxed px-6 pb-6 pl-16">
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
      <section className="py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              FAQ
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
              Common Questions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-[#1A1A1A]/55 max-w-lg">
              Everything you need to know about working with Core Consulting. Don't see your question? Reach out directly.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerMed}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="border-t border-[#E8E0DA]"
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
            className="mt-16 p-8 bg-[#F5F0EE] border border-[#E8E0DA] space-y-4"
          >
            <p className="text-sm font-bold text-[#1A1A1A]">Still have questions?</p>
            <p className="text-sm text-[#1A1A1A]/55">
              We're happy to answer anything before you commit to a conversation. Reach out directly and we'll get back to you within one business day.
            </p>
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 text-sm font-bold text-white bg-[#6B1E2E] overflow-hidden group px-6 py-3 cursor-pointer"
            >
              <span className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
              <span className="relative">Book a Consultation <span aria-hidden="true">→</span></span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
