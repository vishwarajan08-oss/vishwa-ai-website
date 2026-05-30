"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { ArrowLeft } from "lucide-react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function renderBlock(block, i) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="text-xl font-bold text-white mt-10 mb-3">{block.text}</h2>;
    case "p":
      return <p key={i} className="text-sm text-white/60 leading-relaxed mb-4">{block.text}</p>;
    case "ul":
      return (
        <ul key={i} className="space-y-2 mb-4 pl-4">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-white/60 leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-[#DC2626] flex-shrink-0 mt-2" aria-hidden="true" />
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
    <div className="pt-20">
      <section className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
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
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] hover:text-white transition-colors duration-200 mb-8 cursor-pointer"
              >
                <ArrowLeft size={13} aria-hidden="true" /> Back to Blog
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30">
                {article.category}
              </span>
              <span className="text-xs text-[#A1A1AA]">{formatDate(article.date)}</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              {article.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base text-white/50 leading-relaxed border-l-2 border-[#DC2626] pl-4">
              {article.excerpt}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="border-t border-[#2A2A2A] pt-10 space-y-1"
            >
              {article.content.map((block, i) => renderBlock(block, i))}
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-[#2A2A2A] pt-10">
              <div className="bg-[#171717] border border-[#2A2A2A] p-8 space-y-4">
                <p className="text-sm font-bold text-white">Want to implement this for your firm?</p>
                <p className="text-sm text-white/50">
                  Core Consulting works with a limited number of firms each quarter. If you're ready to modernize your operations, let's talk.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#DC2626] hover:bg-[#991B1B] px-6 py-3 transition-colors duration-200 cursor-pointer"
                >
                  Book a Consultation <ArrowLeft size={13} className="rotate-180" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
