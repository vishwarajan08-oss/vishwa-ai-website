"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { faqs } from "@/config/faq";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { Plus, Minus, Search } from "lucide-react";
import { SHADOW_CLAY, SHADOW_CLAY_BURGUNDY } from "@/lib/tokens";

const EASE = [0.25, 0.46, 0.45, 0.94];
const CATEGORIES = ["All", "Getting Started", "Implementation", "Pricing", "Results"];

const listVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE, staggerChildren: 0.04 },
  },
};

const faqItemVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

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
      className={`border-b border-divider transition-colors duration-200 ${
        open ? "bg-burgundy/8" : "bg-transparent"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between py-5 px-5 text-left cursor-pointer group gap-4 focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className={`text-sm font-bold leading-snug transition-colors duration-200 flex-1 ${
            open ? "text-burgundy" : "text-charcoal group-hover:text-burgundy"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 transition-colors duration-200 ${
            open ? "text-burgundy" : "text-taupe"
          }`}
        >
          {open ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
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
    <div style={{ paddingTop: "var(--navbar-height)" }} className="bg-bg-alt min-h-screen">

      {/* Page header */}
      <section className="py-16 bg-burgundy">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-4 max-w-2xl"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-white">
              Common Questions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-taupe max-w-md leading-relaxed">
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search questions…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-divider text-charcoal placeholder-[#6D6D6D] focus:outline-none focus:border-burgundy transition-colors duration-200"
                  aria-label="Search FAQ questions"
                />
              </div>

              {/* Category filter pills */}
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-left text-sm font-semibold px-4 min-h-[44px] flex items-center py-2 cursor-pointer overflow-hidden border rounded-[8px] transition-colors duration-200 ${
                      activeCategory === cat
                        ? "border-burgundy text-white"
                        : "bg-white border-divider text-[#636363] hover:border-burgundy hover:text-burgundy"
                    }`}
                    style={activeCategory === cat ? { boxShadow: SHADOW_CLAY_BURGUNDY } : {}}
                    aria-pressed={activeCategory === cat}
                  >
                    {activeCategory === cat && (
                      <motion.span
                        layoutId="pill-active"
                        className="absolute inset-0 bg-burgundy"
                        style={{ zIndex: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      {cat}
                      {cat !== "All" && (
                        <span
                          className={`ml-2 text-[11px] font-normal ${
                            activeCategory === cat ? "text-white/70" : "text-[#6D6D6D]"
                          }`}
                        >
                          {categorizedFaqs.filter((f) => f.category === cat).length}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right — FAQ items */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="border-t border-divider"
                >
                  {filtered.length > 0 ? (
                    filtered.map((faq, i) => (
                      <motion.div key={faq.question} variants={faqItemVariant}>
                        <FAQItem faq={faq} index={i} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-sm text-[#595959]">
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
                className="mt-12 p-8 bg-[#FAFAFA] rounded-[20px] space-y-4"
                style={{ boxShadow: SHADOW_CLAY }}
              >
                <p className="text-sm font-bold text-charcoal">Still have questions?</p>
                <p className="text-sm text-[#6D6D6D] leading-relaxed">
                  Questions before you commit? Reach out directly. We get back within one business day.
                </p>
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white bg-burgundy overflow-hidden group px-6 py-3 cursor-pointer"
                >
                  <span
                    className="absolute inset-0 bg-burgundy-dark translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
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
