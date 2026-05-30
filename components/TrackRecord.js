"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

function Ticker({ text }) {
  const repeated = `${text}   ${text}   `;
  return (
    <div className="overflow-hidden border-y border-[#6B1E2E]/20 py-3 bg-[#3D0D18]">
      <div
        className="flex whitespace-nowrap text-xs font-semibold tracking-widest uppercase text-white/40"
        style={{
          animation: "ticker 40s linear infinite",
          width: "max-content",
        }}
      >
        {[repeated, repeated].map((chunk, i) => (
          <span key={i} className="px-4">
            {chunk.split("·").map((part, j, arr) => (
              <span key={j}>
                {part.trim()}
                {j < arr.length - 1 && (
                  <span className="text-[#C9B8A8] mx-3">·</span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TrackRecord() {
  const { label, title, ticker, cases } = content.trackRecord;

  return (
    <section id="track-record" className="py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]"
          >
            {title}
          </motion.p>
        </motion.div>
      </div>

      <Ticker text={ticker} />

      <div className="max-w-6xl mx-auto px-6 pt-0">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#E8E0DA]"
        >
          {cases.map((cs, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative overflow-hidden p-8 bg-[#F5F0EE] border border-[#E8E0DA] md:border-r-0 md:last:border-r space-y-4 hover:border-[#6B1E2E] hover:-translate-y-1 transition-all duration-300 group"
              style={{ boxShadow: "0 0 0 0 rgba(107,30,46,0)" }}
              whileHover={{ boxShadow: "0 4px 24px rgba(107,30,46,0.08)" }}
            >
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6B1E2E] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" aria-hidden="true" />
              <div className="text-xs font-black text-[#C9B8A8] tracking-wider">
                Case {String(index + 1).padStart(2, "0")}
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] leading-snug group-hover:text-[#6B1E2E] transition-colors duration-200">
                {cs.title}
              </h4>
              <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-normal">
                {cs.description}
              </p>
              {cs.metrics && cs.metrics.length > 0 && (
                <ul className="space-y-1.5 pt-2 border-t border-[#E8E0DA]">
                  {cs.metrics.map((metric, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#C9B8A8] font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#6B1E2E] flex-shrink-0" aria-hidden="true" />
                      {metric}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
