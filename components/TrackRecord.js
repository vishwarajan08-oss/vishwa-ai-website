"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

function Ticker({ text }) {
  const repeated = `${text}   ${text}   `;
  return (
    <div className="overflow-hidden border-y border-[#2A2A2A] py-3 bg-[#171717]">
      <div
        className="flex whitespace-nowrap text-xs font-semibold tracking-widest uppercase text-[#A1A1AA]"
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
                  <span className="text-[#DC2626] mx-3">·</span>
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
    <section id="track-record" className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
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
            className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-white"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#2A2A2A]"
        >
          {cases.map((cs, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 bg-[#171717] border border-[#2A2A2A] md:border-r-0 md:last:border-r space-y-4 hover:border-[#DC2626] transition-all duration-300 group"
              style={{
                boxShadow: "0 0 0 0 rgba(220,38,38,0)",
              }}
              whileHover={{
                boxShadow: "0 0 20px rgba(220,38,38,0.15)",
              }}
            >
              <div className="text-xs font-black text-[#A1A1AA] tracking-wider">
                Case {String(index + 1).padStart(2, "0")}
              </div>
              <h4 className="text-base font-bold text-white leading-snug group-hover:text-[#EF4444] transition-colors duration-200">
                {cs.title}
              </h4>
              <p className="text-sm text-white/50 leading-relaxed font-normal">
                {cs.description}
              </p>
              {cs.metrics && cs.metrics.length > 0 && (
                <ul className="space-y-1.5 pt-2 border-t border-[#2A2A2A]">
                  {cs.metrics.map((metric, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#A1A1AA] font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#DC2626] flex-shrink-0" aria-hidden="true" />
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
