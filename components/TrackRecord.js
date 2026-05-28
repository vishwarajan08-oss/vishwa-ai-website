"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function TrackRecord() {
  const { title, stats, cases } = content.trackRecord;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="track-record" className="py-24 bg-white border-t border-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0A1628] mb-3">
            Impact
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
            {title}
          </p>
        </div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="space-y-2 border-l border-neutral-100 pl-6"
            >
              <div className="text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-neutral-500 leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          <h3 className="text-lg font-bold text-[#0A1628] mb-6">
            Case Studies
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {cases.map((cs, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                    Case 0{index + 1}
                  </h4>
                  <h5 className="text-base font-bold text-[#0A1628]">
                    {cs.title}
                  </h5>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {cs.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
