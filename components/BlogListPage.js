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
      <section className="py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              Blog
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
              Insights & Perspectives
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-[#1A1A1A]/55 max-w-lg">
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
                className="group bg-white border border-[#E8E0DA] hover:border-[#6B1E2E] transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
                style={{ boxShadow: "0 0 0 0 rgba(107,30,46,0)" }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 4px 20px rgba(107,30,46,0.08)",
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6B1E2E] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" aria-hidden="true" />
                <Link href={`/blog/${article.slug}`} className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#6B1E2E]/6 text-[#6B1E2E] border border-[#6B1E2E]/20 group-hover:bg-[#6B1E2E] group-hover:text-white transition-colors duration-200">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#C9B8A8]">{formatDate(article.date)}</span>
                  </div>
                  <h2 className="text-sm font-bold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#6B1E2E] transition-colors duration-200 flex-1">
                    {article.title}
                  </h2>
                  <p className="text-xs text-[#1A1A1A]/55 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B1E2E] mt-auto">
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
