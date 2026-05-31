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

const founders = [
  {
    name: "Vishwa Rajan",
    role: "Co-Founder",
    photo: "/vishwa.jpg",
    bio: "Vishwa interns at Loftin Wealth Partners, working directly under the CEO on a $350M book of business. He serves as Atlanta Chapter President of the Junior Economic Club, an organization with over 2,000 members and $100K+ in managed sponsorships. He co-founded Fynoptic, a financial literacy platform backed by Georgia state legislators and partnered with Invesco and Emory's GIMG.",
  },
  {
    name: "Naiya Patel",
    role: "Co-Founder",
    photo: "/naiya.jpg",
    bio: "Naiya serves as Executive Director of Communications at Fynoptic, where she leads strategic partnerships and institutional outreach. She has partnered with Goodwin Investment Advisory on operational initiatives, driving over 20% efficiency improvements. Her background spans financial services communications, platform growth, and stakeholder engagement across the wealth management industry.",
  },
];

export default function AboutPage() {
  const { label, headline, subhead, whyWeStarted, ourApproach, differentiators, categories, lookingAhead } = content.about;

  return (
    <div className="pt-20">

      {/* ── Hero banner — burgundy bg ─────────────────────────────────────── */}
      <section className="py-24 bg-[#6B1E2E]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-3xl space-y-5"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#C9B8A8]">
              {label}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {headline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base text-[#C9B8A8] leading-relaxed max-w-2xl">
              {subhead}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Why We Started + Our Approach — warm off-white, left accent ────── */}
      <section className="py-20 bg-[#F5F0EE]" style={{ borderTop: "1px solid rgba(107,30,46,0.15)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-4 border-l-[3px] border-[#6B1E2E] pl-6"
          >
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
            className="space-y-4 border-l-[3px] border-[#6B1E2E] pl-6"
          >
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-[#1A1A1A]">
              {ourApproach.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-sm text-[#1A1A1A]/60 leading-relaxed">
              {ourApproach.body}
            </motion.p>
          </motion.div>

        </div>
      </section>

      {/* ── What Makes Core Different — dark burgundy bg ─────────────────── */}
      <section className="py-20 bg-[#3D0D18]" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#C9B8A8] mb-3">
              Differentiation
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-white">
              What Makes Core Different
            </motion.h2>
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
                  className="relative overflow-hidden p-6 border border-white/10 group space-y-3 transition-all duration-300 hover:border-white/20"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9B8A8] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out"
                    aria-hidden="true"
                  />
                  {Icon && (
                    <div className="w-8 h-8 flex items-center justify-center border border-[#C9B8A8]/20 text-[#C9B8A8]">
                      <Icon size={15} aria-hidden="true" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-white leading-snug group-hover:text-[#C9B8A8] transition-colors duration-200">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Six Categories — alternating card backgrounds ──────────────────── */}
      <section className="py-20 bg-[#FAFAFA]" style={{ borderTop: "1px solid #E8E0DA" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              Scope of Work
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
              The Six Categories We Work In
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerMed}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              const cardBg = i % 2 === 0 ? "#FFFFFF" : "#F5F0EE";
              return (
                <motion.div
                  key={i}
                  variants={slideUp}
                  className="relative overflow-hidden p-6 border border-[#E8E0DA] hover:border-[#6B1E2E] transition-all duration-300 group space-y-3"
                  style={{ backgroundColor: cardBg }}
                  whileHover={{ boxShadow: "0 4px 20px rgba(107,30,46,0.06)" }}
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6B1E2E] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out"
                    aria-hidden="true"
                  />
                  {Icon && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 flex items-center justify-center border border-[#6B1E2E]/25 text-[#6B1E2E]">
                        <Icon size={14} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-black text-[#6B1E2E] tracking-wider">
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

      {/* ── Founders — warm off-white, large centered photos ──────────────── */}
      <section className="py-20 bg-[#F5F0EE]" style={{ borderTop: "1px solid #E8E0DA" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#6B1E2E] mb-3">
              Team
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
              Founders
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col sm:flex-row items-start justify-center gap-12 sm:gap-16"
          >
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center w-full sm:w-80"
              >
                {/* Photo with burgundy ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-[200px] h-[200px] rounded-full overflow-hidden flex-shrink-0 mb-5 mx-auto"
                  style={{ outline: "3px solid #6B1E2E", outlineOffset: "3px" }}
                >
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover object-center"
                    sizes="200px"
                  />
                </motion.div>

                {/* Name + role */}
                <p className="text-base font-bold text-[#1A1A1A] mb-1">{founder.name}</p>
                <p className="text-xs font-semibold text-[#6B1E2E] uppercase tracking-widest mb-4">
                  {founder.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed text-center">
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Looking Ahead — dark banner, centered ─────────────────────────── */}
      <section className="py-24 bg-[#3D0D18]" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-5"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-[#C9B8A8]">
              Looking Ahead
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug"
            >
              {lookingAhead}
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
