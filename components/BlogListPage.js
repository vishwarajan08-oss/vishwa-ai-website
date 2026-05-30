"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { allArticles } from "@/content/blog/index";
import { fadeInUp, staggerMed, viewport } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogListPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3">
              Blog
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-white mb-4">
              Insights & Perspectives
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-white/50 max-w-lg">
              Practical thinking on AI strategy, workflow automation, and operational efficiency for advisory firms.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerMed}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allArticles.map((article) => (
              <motion.article
                key={article.slug}
                variants={slideUp}
                className="group bg-[#171717] border border-[#2A2A2A] hover:border-[#DC2626] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                whileHover={{ boxShadow: "0 0 20px rgba(220,38,38,0.12)" }}
              >
                <Link href={`/blog/${article.slug}`} className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#A1A1AA]">{formatDate(article.date)}</span>
                  </div>
                  <h2 className="text-sm font-bold text-white leading-snug mb-3 group-hover:text-[#EF4444] transition-colors duration-200 flex-1">
                    {article.title}
                  </h2>
                  <p className="text-xs text-white/50 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] mt-auto">
                    Read Article <ArrowRight size={13} aria-hidden="true" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
