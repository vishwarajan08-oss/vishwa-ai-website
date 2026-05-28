"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/config/testimonials";

export default function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="testimonials" className="py-24 bg-white border-t border-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0A1628] mb-3">
            Feedback
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
            What Firms Are Saying
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white p-8 border border-neutral-100 border-l-[3px] border-l-[#0A1628] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-200 hover:border-l-[3px] hover:border-l-[#0A1628] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Quote Symbol decoration */}
                <span className="block text-4xl text-[#0A1628]/10 font-serif leading-none -mb-4">“</span>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal italic">
                  {t.quote}
                </p>
                <div className="pt-2">
                  <div className="text-sm font-bold text-[#0A1628]">
                    {t.author}
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">
                    {t.role ? `${t.role}, ` : ""}{t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
