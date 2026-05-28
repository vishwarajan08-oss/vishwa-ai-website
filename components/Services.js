"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Services() {
  const { title, items } = content.services;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0A1628] mb-3">
            Services
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
            {title}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {items.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white p-8 border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-neutral-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Accent Icon indicator */}
                <div className="w-8 h-1 bg-[#0A1628] opacity-70 group-hover:w-12 transition-all duration-300" />
                
                <h3 className="text-xl font-bold text-[#0A1628]">
                  {service.title}
                </h3>
                
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
