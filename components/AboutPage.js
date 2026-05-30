"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, staggerMed, viewport } from "@/lib/animations";
import {
  Target, Workflow, Users, TrendingUp, LayoutGrid, Lock,
  LineChart, Calculator, Megaphone, UserCheck, FileText, Settings,
} from "lucide-react";

const iconMap = {
  Target, Workflow, Users, TrendingUp, LayoutGrid, Lock,
  LineChart, Calculator, Megaphone, UserCheck, FileText, Settings,
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  const { label, headline, subhead, whyWeStarted, ourApproach, differentiators, categories, founders, lookingAhead } = content.about;

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-3xl space-y-6"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
              {label}
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {headline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/50 leading-relaxed">
              {subhead}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why We Started + Our Approach */}
      <section className="py-20 bg-[#171717] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-4"
          >
            <motion.div variants={fadeInUp} className="w-8 h-px bg-[#DC2626]" aria-hidden="true" />
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-white">
              {whyWeStarted.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-sm text-white/50 leading-relaxed">
              {whyWeStarted.body}
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-4"
          >
            <motion.div variants={fadeInUp} className="w-8 h-px bg-[#DC2626]" aria-hidden="true" />
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-white">
              {ourApproach.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-sm text-white/50 leading-relaxed">
              {ourApproach.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Core Different */}
      <section className="py-20 bg-[#0A0A0A] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3">
              Differentiation
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-white">
              What Makes Core Different
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerMed}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {differentiators.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={i}
                  variants={slideUp}
                  className="p-6 bg-[#171717] border border-[#2A2A2A] hover:border-[#DC2626] transition-all duration-300 group space-y-3"
                  style={{ boxShadow: "0 0 0 0 rgba(220,38,38,0)" }}
                  whileHover={{ boxShadow: "0 0 20px rgba(220,38,38,0.1)" }}
                >
                  {Icon && (
                    <div className="w-8 h-8 flex items-center justify-center border border-[#DC2626]/30 text-[#DC2626]">
                      <Icon size={15} aria-hidden="true" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-white leading-snug group-hover:text-[#EF4444] transition-colors duration-200">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Six Categories */}
      <section className="py-20 bg-[#171717] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3">
              Scope of Work
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-white">
              The Six Categories We Work In
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerMed}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <motion.div
                  key={i}
                  variants={slideUp}
                  className="p-6 bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#DC2626] transition-all duration-300 group space-y-3"
                  whileHover={{ boxShadow: "0 0 20px rgba(220,38,38,0.1)" }}
                >
                  {Icon && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 flex items-center justify-center border border-[#DC2626]/30 text-[#DC2626]">
                        <Icon size={14} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-black text-[#A1A1AA] tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#EF4444] transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {cat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-[#0A0A0A] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3">
              Team
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-white">
              Founders
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl"
          >
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 bg-[#171717] border border-[#2A2A2A] hover:border-[#DC2626] transition-all duration-300 space-y-3"
                whileHover={{ boxShadow: "0 0 20px rgba(220,38,38,0.1)" }}
              >
                <div>
                  <p className="text-base font-bold text-white">{founder.name}</p>
                  <p className="text-xs font-semibold text-[#DC2626] uppercase tracking-widest mt-0.5">{founder.role}</p>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{founder.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="py-20 bg-[#171717] border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-2xl space-y-4"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-3">
              Looking Ahead
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-2xl font-extrabold tracking-tight text-white leading-snug">
              {lookingAhead}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
