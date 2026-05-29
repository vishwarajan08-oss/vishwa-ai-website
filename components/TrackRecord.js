"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

function Ticker({ text }) {
  const repeated = `${text}   ${text}   `;
  return (
    <div className="overflow-hidden border-y border-white/5 py-3 mb-16 bg-[#111111]">
      <div
        className="flex whitespace-nowrap text-xs font-semibold tracking-widest uppercase text-white/30"
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
                  <span className="text-[#C41A1A] mx-3">·</span>
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
    <section id="track-record" className="py-24 bg-[#0A0A0A] border-t border-white/5">
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
            className="text-xs font-bold uppercase tracking-widest text-[#C41A1A] mb-3"
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

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/5"
        >
          {cases.map((cs, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 border-b md:border-b-0 md:border-r border-white/5 last:border-r-0 space-y-4 hover:bg-[#111111] transition-colors duration-300"
            >
              <div className="text-xs font-black text-white/20 tracking-wider">
                Case {String(index + 1).padStart(2, "0")}
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                {cs.title}
              </h4>
              <p className="text-sm text-white/50 leading-relaxed font-normal">
                {cs.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
