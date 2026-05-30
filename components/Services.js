"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { viewport, staggerMed } from "@/lib/animations";
import { Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search } from "lucide-react";

const iconMap = {
  Zap, Lightbulb, Cpu, Heart, RefreshCw, Shield, Search,
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Services({ preview = false }) {
  const { label, title, items } = content.services;
  const displayItems = preview ? items.slice(0, 3) : items;

  return (
    <section id="services" className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ staggerChildren: 0.08 }}
          className="mb-16"
        >
          <motion.h2
            variants={slideInLeft}
            className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3"
          >
            {label}
          </motion.h2>
          <motion.p
            variants={slideInLeft}
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            {title}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerMed}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="border-t border-[#2A2A2A]"
        >
          {displayItems.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                variants={slideInLeft}
                className="grid grid-cols-12 gap-6 py-10 border-b border-[#2A2A2A] group hover:bg-[#171717]/50 transition-colors duration-300"
              >
                <div className="col-span-12 md:col-span-1">
                  <span className="text-xs font-black text-[#A1A1AA] tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-4 space-y-2">
                  <div className="flex items-center gap-2.5">
                    {Icon && (
                      <Icon size={16} className="text-[#DC2626] flex-shrink-0" aria-hidden="true" />
                    )}
                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#EF4444] transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#DC2626]/40 text-[#DC2626]">
                    {service.tag}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p className="text-sm text-white/50 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {preview ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={viewport}
            className="mt-12 flex justify-between items-center"
          >
            <p className="text-sm text-white/40">
              {items.length - displayItems.length} more services available
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#DC2626] transition-colors duration-200 cursor-pointer"
            >
              View All Services <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={viewport}
            className="mt-12 flex justify-end"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#DC2626] transition-colors duration-200 cursor-pointer"
            >
              Work With Us <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
