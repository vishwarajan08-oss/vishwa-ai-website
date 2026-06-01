"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { ArrowLeft } from "lucide-react";

const SHADOW_CLAY = "0 8px 24px rgba(107,30,46,0.08), inset -4px -4px 8px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(0,0,0,0.06)";
import ReadingProgress from "@/components/ReadingProgress";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function renderBlock(block, i) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="text-xl font-bold text-charcoal mt-10 mb-3">{block.text}</h2>;
    case "p":
      return <p key={i} className="text-sm text-[#595959] leading-relaxed mb-4">{block.text}</p>;
    case "ul":
      return (
        <ul key={i} className="space-y-2 mb-4 pl-4">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-[#595959] leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-burgundy flex-shrink-0 mt-2" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogArticlePage({ article }) {
  return (
    <>
      <ReadingProgress />
      <div className="pt-20">
      <section className="py-24 bg-bg border-t border-divider">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#636363] hover:text-charcoal transition-colors duration-200 mb-8 cursor-pointer py-2"
              >
                <ArrowLeft size={13} aria-hidden="true" /> Back to Blog
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-burgundy/6 text-burgundy border border-burgundy/20">
                {article.category}
              </span>
              <span className="text-xs text-[#636363]">{formatDate(article.date)}</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl font-black tracking-tight text-charcoal leading-tight">
              {article.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base text-[#636363] leading-relaxed bg-burgundy/5 px-5 py-4 italic">
              {article.excerpt}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="border-t border-divider pt-10 space-y-1"
            >
              {article.content.map((block, i) => renderBlock(block, i))}
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-divider pt-10">
              <div className="bg-bg-alt rounded-[20px] p-8 space-y-4" style={{ boxShadow: SHADOW_CLAY }}>
                <p className="text-sm font-bold text-charcoal">Want to implement this for your firm?</p>
                <p className="text-sm text-[#636363]">
                  Core Consulting works with a limited number of firms each quarter. If you're ready to modernize your operations, let's talk.
                </p>
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white bg-burgundy overflow-hidden group px-6 py-3 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-burgundy-dark translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                  <span className="relative">Book a Consultation <ArrowLeft size={13} className="rotate-180 inline" aria-hidden="true" /></span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
