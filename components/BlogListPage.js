"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { allArticles } from "@/content/blog/index";
import { fadeInUp, viewport } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const WAVE_Y = [16, 28, 20];
const SHADOW_CLAY = "0 8px 24px rgba(107,30,46,0.08), inset -4px -4px 8px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(0,0,0,0.06)";
const SHADOW_CLAY_HOVER = "0 14px 36px rgba(107,30,46,0.12), inset -5px -5px 10px rgba(255,255,255,0.85), inset 5px 5px 10px rgba(0,0,0,0.08)";

function BlogCard({ article, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const yOffset = WAVE_Y[index % 3];

  return (
    <motion.article
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-bg-alt rounded-[20px] flex flex-col cursor-pointer overflow-hidden"
      style={{ boxShadow: SHADOW_CLAY }}
      whileHover={{
        y: -4,
        boxShadow: SHADOW_CLAY_HOVER,
      }}
    >
      <Link href={`/blog/${article.slug}`} className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-burgundy/6 text-burgundy border border-burgundy/20 group-hover:bg-burgundy group-hover:text-white transition-colors duration-200">
            {article.category}
          </span>
          <span className="text-xs text-taupe">{formatDate(article.date)}</span>
        </div>
        <h2 className="text-sm font-bold text-charcoal leading-snug mb-3 group-hover:text-burgundy transition-colors duration-200 flex-1">
          {article.title}
        </h2>
        <p className="text-xs text-[#6D6D6D] leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-burgundy mt-auto">
          Read Article <ArrowRight size={13} aria-hidden="true" />
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogListPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-bg border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight text-charcoal mb-4">
              Insights & Perspectives
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm text-[#6D6D6D] max-w-lg">
              Practical thinking on AI strategy, workflow automation, and operational efficiency for advisory firms.
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {/* Featured first article */}
            {allArticles.length > 0 && (() => {
              const article = allArticles[0];
              return (
                <motion.article
                  key={article.slug}
                  variants={{ hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="group bg-bg-alt rounded-[20px] overflow-hidden"
                  style={{ boxShadow: SHADOW_CLAY }}
                  whileHover={{ boxShadow: SHADOW_CLAY_HOVER }}
                >
                  <Link href={`/blog/${article.slug}`} className="grid md:grid-cols-[3fr_2fr] min-h-[240px]">
                    <div className="p-10 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-burgundy/6 text-burgundy border border-burgundy/20 group-hover:bg-burgundy group-hover:text-white transition-colors duration-200">
                            {article.category}
                          </span>
                          <span className="text-xs text-taupe">{formatDate(article.date)}</span>
                          <span className="text-[10px] font-semibold text-burgundy uppercase tracking-wider">Featured</span>
                        </div>
                        <h2 className="text-xl font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200">
                          {article.title}
                        </h2>
                        <p className="text-sm text-[#6D6D6D] leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-burgundy mt-6">
                        Read Article <ArrowRight size={14} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center bg-bg-alt border-l border-divider p-10">
                      <div className="text-center space-y-2">
                        <div className="text-5xl font-black text-burgundy/20 group-hover:text-burgundy/35 transition-colors duration-300 leading-none">01</div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-taupe">Latest</p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })()}

            {/* Remaining articles in 3-column grid */}
            {allArticles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allArticles.slice(1).map((article, index) => (
                  <BlogCard key={article.slug} article={article} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
