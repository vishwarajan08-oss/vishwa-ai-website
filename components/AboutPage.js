"use client";

import Image from "next/image";
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

const founderPhotos = {
  "Vishwa Rajan": "/vishwa.jpg",
  "Naiya Patel": "/naiya.jpg",
};

export default function AboutPage() {
  const { label, headline, subhead, whyWeStarted, ourApproach, differentiators, categories, lookingAhead } = content.about;

  const founders = [
    {
      name: "Vishwa Rajan",
      role: "Co-Founder",
      bio: "Vishwa interns at Loftin Wealth Partners, working directly under the CEO on a $350M AUM book of business. He has implemented AI systems across four wealth management firms totaling $1.3B in combined AUM, and founded the AI Efficiency Internship Program, a nationally distributed team of 30 researchers from Brown, UC Irvine, and UGA. He also co-founded Fynoptic, a financial literacy platform backed by Georgia state legislators and partnered with Invesco and Emory's GIMG, and serves as Atlanta Chapter President of the Junior Economic Club, overseeing 2,000+ members and $100K+ in managed sponsorships.",
    },
    {
      name: "Naiya Patel",
      role: "Co-Founder",
      bio: "Naiya serves as Executive Director of Communications at Fynoptic. She has partnered directly with Goodwin Investment Advisory to improve operational efficiency by over 20%, and evaluated 100+ AI tools to build implementation plans for financial firms. She brings a research-first approach to every engagement, focused on making AI practical rather than theoretical.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-[#E8E0DA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-3xl space-y-6"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E]">
              {label}
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight">
              {headline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#1A1A1A]/55 leading-relaxed">
              {subhead}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why We Started + Our Approach */}
      <section className="py-20 bg-[#F5F0EE] border-t border-[#E8E0DA]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-4"
          >
            <motion.div variants={fadeInUp} className="w-8 h-px bg-[#6B1E2E]" aria-hidden="true" />
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-[#1A1A1A]">
              {whyWeStarted.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-sm text-[#1A1A1A]/60 leading-relaxed">
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
            <motion.div variants={fadeInUp} className="w-8 h-px bg-[#6B1E2E]" aria-hidden="true" />
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-[#1A1A1A]">
              {ourApproach.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-sm text-[#1A1A1A]/60 leading-relaxed">
              {ourApproach.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Core Different */}
      <section className="py-20 bg-[#FAFAFA] border-t border-[#E8E0DA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              Differentiation
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
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
                  className="relative overflow-hidden p-6 bg-[#F5F0EE] border border-[#E8E0DA] hover:border-[#6B1E2E] transition-all duration-300 group space-y-3"
                  style={{ boxShadow: "0 0 0 0 rgba(107,30,46,0)" }}
                  whileHover={{ boxShadow: "0 4px 20px rgba(107,30,46,0.06)" }}
                >
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6B1E2E] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" aria-hidden="true" />
                  {Icon && (
                    <div className="w-8 h-8 flex items-center justify-center border border-[#6B1E2E]/25 text-[#6B1E2E]">
                      <Icon size={15} aria-hidden="true" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-[#1A1A1A] leading-snug group-hover:text-[#6B1E2E] transition-colors duration-200">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Six Categories */}
      <section className="py-20 bg-[#F5F0EE] border-t border-[#E8E0DA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              Scope of Work
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
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
                  className="relative overflow-hidden p-6 bg-white border border-[#E8E0DA] hover:border-[#6B1E2E] transition-all duration-300 group space-y-3"
                  whileHover={{ boxShadow: "0 4px 20px rgba(107,30,46,0.06)" }}
                >
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6B1E2E] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" aria-hidden="true" />
                  {Icon && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 flex items-center justify-center border border-[#6B1E2E]/25 text-[#6B1E2E]">
                        <Icon size={14} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-black text-[#C9B8A8] tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-[#1A1A1A] leading-snug group-hover:text-[#6B1E2E] transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/55 leading-relaxed">
                    {cat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-[#FAFAFA] border-t border-[#E8E0DA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              Team
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
              Founders
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl"
          >
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 bg-white border border-[#E8E0DA] hover:border-[#6B1E2E] transition-all duration-300 space-y-5"
                whileHover={{ boxShadow: "0 4px 24px rgba(107,30,46,0.07)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#E8E0DA]">
                    <Image
                      src={founderPhotos[founder.name]}
                      alt={founder.name}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#1A1A1A]">{founder.name}</p>
                    <p className="text-xs font-semibold text-[#6B1E2E] uppercase tracking-widest mt-0.5">{founder.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">{founder.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="py-20 bg-[#3D0D18] border-t border-[#6B1E2E]/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-2xl space-y-4"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#C9B8A8] mb-3">
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
