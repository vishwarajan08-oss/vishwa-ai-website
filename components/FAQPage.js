"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { faqs } from "@/config/faq";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { Plus, Minus, Search } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94];
const CATEGORIES = ["All", "Getting Started", "Implementation", "Pricing", "Results"];

const CATEGORY_MAP = [
  "Getting Started", "Getting Started", "Getting Started", "Implementation",
  "Getting Started", "Implementation", "Getting Started", "Pricing",
  "Results", "Implementation", "Implementation", "Results",
  "Pricing", "Getting Started", "Implementation", "Getting Started", "Pricing",
];

const categorizedFaqs = faqs.map((faq, i) => ({
  ...faq,
  category: CATEGORY_MAP[i] ?? "Getting Started",
}));

function AnswerText({ text }) {
  const dot = text.indexOf(". ");
  if (dot === -1) {
    return <p className="text-sm text-[#595959] leading-relaxed">{text}</p>;
  }
  const first = text.slice(0, dot + 1);
  const rest = text.slice(dot + 2);
  return (
    <p className="text-sm leading-relaxed">
      <span className="text-[#595959]">{first} </span>
      <span className="text-[#595959]">{rest}</span>
    </p>
  );
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-[#E8E0DA] transition-colors duration-200 ${
        open ? "bg-[#6B1E2E]/8" : "bg-transparent"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between py-5 px-5 text-left cursor-pointer group gap-4 focus-visible:ring-2 focus-visible:ring-[#6B1E2E] focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-expanded={open}
      >
        <span
          className={`text-sm font-bold leading-snug transition-colors duration-200 flex-1 ${
            open ? "text-[#6B1E2E]" : "text-[#1A1A1A] group-hover:text-[#6B1E2E]"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 transition-colors duration-200 ${
            open ? "text-[#6B1E2E]" : "text-[#C9B8A8]"
          }`}
        >
          {open ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-5">
              <AnswerText text={faq.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return categorizedFaqs.filter((faq) => {
      const matchCat = activeCategory === "All" || faq.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-20 bg-[#F5F0EE] min-h-screen">

      {/* Page header */}
      <section className="py-16 bg-[#6B1E2E]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-4 max-w-2xl"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#C9B8A8]">
              FAQ
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-white">
              Common Questions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-[#C9B8A8] max-w-md leading-relaxed">
              Everything you need to know about working with Core Consulting. Don&rsquo;t see your question? Reach out directly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">

            {/* Left — search + filter pills */}
            <div className="space-y-6">

              {/* Search */}
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search questions…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E8E0DA] text-[#1A1A1A] placeholder-[#767676] focus:outline-none focus:border-[#6B1E2E] transition-colors duration-200"
                  aria-label="Search FAQ questions"
                />
              </div>

              {/* Category filter pills */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8C8C8C] mb-1">
                  Topics
                </p>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left text-sm font-semibold px-4 py-2.5 transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#6B1E2E] text-white"
                        : "bg-white border border-[#E8E0DA] text-[#636363] hover:border-[#6B1E2E] hover:text-[#6B1E2E]"
                    }`}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span
                        className={`ml-2 text-[11px] font-normal ${
                          activeCategory === cat ? "text-white/60" : "text-[#B0B0B0]"
                        }`}
                      >
                        {categorizedFaqs.filter((f) => f.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — FAQ items */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="border-t border-[#E8E0DA]"
                >
                  {filtered.length > 0 ? (
                    filtered.map((faq, i) => (
                      <FAQItem key={faq.question} faq={faq} index={i} />
                    ))
                  ) : (
                    <div className="py-12 text-center text-sm text-[#8C8C8C]">
                      No questions match your search.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Still have questions? */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-12 p-8 bg-white border border-[#E8E0DA] space-y-4"
              >
                <p className="text-sm font-bold text-[#1A1A1A]">Still have questions?</p>
                <p className="text-sm text-[#6D6D6D] leading-relaxed">
                  We&rsquo;re happy to answer anything before you commit to a conversation. Reach out directly and we&rsquo;ll get back to you within one business day.
                </p>
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white bg-[#6B1E2E] overflow-hidden group px-6 py-3 cursor-pointer"
                >
                  <span
                    className="absolute inset-0 bg-[#3D0D18] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                    aria-hidden="true"
                  />
                  <span className="relative">Book a Consultation →</span>
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
