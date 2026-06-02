"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import {
  Target, Workflow, Users, TrendingUp, LayoutGrid, Lock,
  LineChart, Calculator, Megaphone, UserCheck, FileText, Settings,
} from "lucide-react";

const iconMap = {
  Target, Workflow, Users, TrendingUp, LayoutGrid, Lock,
  LineChart, Calculator, Megaphone, UserCheck, FileText, Settings,
};

const EASE = [0.25, 0.46, 0.45, 0.94];
const SHADOW_CLAY = "0 8px 24px rgba(107,30,46,0.08), inset -4px -4px 8px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(0,0,0,0.06)";
const SHADOW_CLAY_HOVER = "0 14px 36px rgba(107,30,46,0.12), inset -5px -5px 10px rgba(255,255,255,0.85), inset 5px 5px 10px rgba(0,0,0,0.08)";

const founderLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const founderRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const stagger007 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const stagger008 = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE } },
};

const differentiatorItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const categoryItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const founders = [
  {
    name: "Vishwa Rajan",
    role: "Co-Founder",
    photo: "/vishwa.jpg",
    chips: ["Co-Founder, Core Consulting", "Analyst Intern, Blaylock Van LLC", "Co-Founder, Fynoptic"],
    bio: "Vishwa interns at Loftin Wealth Partners, working directly under the CEO on a $350M book of business. He serves as Atlanta Chapter President of the Junior Economic Club, an organization with over 2,000 members and $100K+ in managed sponsorships. He co-founded Fynoptic, a financial literacy platform backed by Georgia state legislators and partnered with Invesco and Emory's GIMG.",
  },
  {
    name: "Naiya Patel",
    role: "Co-Founder",
    photo: "/naiya.jpg",
    chips: ["Co-Founder, Core Consulting", "AI Strategy Lead", "Research Lead, Fynoptic"],
    bio: "Naiya serves as Executive Director of Communications at Fynoptic, where she leads strategic partnerships and institutional outreach. She has partnered with Goodwin Investment Advisory on operational initiatives, driving over 20% efficiency improvements. Her background spans financial services communications, platform growth, and stakeholder engagement across the wealth management industry.",
  },
];

function splitLead(text) {
  const idx = text.indexOf(". ");
  if (idx === -1) return { lead: text, body: "" };
  return { lead: text.slice(0, idx + 1), body: text.slice(idx + 2) };
}

export default function AboutPage() {
  const { label, headline, subhead, whyWeStarted, ourApproach, differentiators, categories, lookingAhead } = content.about;

  const whyLead = splitLead(whyWeStarted.body);
  const approachLead = splitLead(ourApproach.body);

  return (
    <div className="pt-20">

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-burgundy">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-3xl space-y-5"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-taupe">
              {label}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {headline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base text-taupe leading-relaxed max-w-2xl">
              {subhead}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Why We Started + How We Work — pull-quote layout ─────────────── */}
      <section className="py-20 bg-bg-alt" style={{ borderTop: "1px solid rgba(107,30,46,0.15)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">

          {[
            { section: whyWeStarted, lead: whyLead.lead, body: whyLead.body },
            { section: ourApproach, lead: approachLead.lead, body: approachLead.body },
          ].map(({ section, lead, body }, i) => (
            <motion.div
              key={i}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-4"
            >
              {/* Decorative quote mark */}
              <motion.div
                variants={fadeInUp}
                aria-hidden="true"
                className="text-6xl font-black text-burgundy leading-none select-none"
                style={{ opacity: 0.12, marginBottom: "-0.5rem" }}
              >
                &ldquo;
              </motion.div>

              {/* Section label */}
              <motion.p variants={fadeInUp} className="text-[11px] font-bold uppercase tracking-widest text-burgundy">
                {section.title}
              </motion.p>

              {/* Lead sentence — large */}
              <motion.p variants={fadeInUp} className="text-xl font-semibold text-charcoal leading-snug">
                {lead}
              </motion.p>

              {/* Remaining body — small */}
              {body && (
                <motion.p variants={fadeInUp} className="text-sm text-[#636363] leading-relaxed">
                  {body}
                </motion.p>
              )}
            </motion.div>
          ))}

        </div>
      </section>

      {/* ── What Makes Core Different ─────────────────────────────────────── */}
      <section className="py-20 bg-burgundy-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-white">
              What Makes Core Different
            </motion.h2>
          </motion.div>

          <motion.ul
            variants={stagger007}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-white/10"
          >
            {differentiators.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.li
                  key={i}
                  variants={differentiatorItem}
                  className="group flex items-center gap-5 py-5 transition-colors duration-200 hover:text-taupe"
                >
                  {Icon && (
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-taupe/20 text-taupe group-hover:border-taupe/50 transition-colors duration-200">
                      <Icon size={15} aria-hidden="true" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-white leading-snug group-hover:text-taupe transition-colors duration-200 flex-1">
                    {item.title}
                  </p>
                  <span className="flex-shrink-0 w-4 h-px bg-taupe/20 group-hover:bg-taupe/60 transition-colors duration-200" aria-hidden="true" />
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* ── Six Categories ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-bg" style={{ borderTop: "1px solid #E8E0DA" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-charcoal">
              The Six Categories We Work In
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger008}
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
                  variants={categoryItem}
                  className="relative overflow-hidden p-6 rounded-[20px] group space-y-3 transition-all duration-300"
                  style={{ backgroundColor: cardBg, boxShadow: SHADOW_CLAY }}
                  whileHover={{ y: -4, boxShadow: SHADOW_CLAY_HOVER }}
                >
                  <span
                    className="absolute top-0 inset-x-0 h-[2px] bg-burgundy/0 group-hover:bg-burgundy/30 transition-colors duration-300 pointer-events-none"
                    aria-hidden="true"
                  />
                  {Icon && (
                    <div className="w-7 h-7 flex items-center justify-center border border-burgundy/25 text-burgundy">
                      <Icon size={14} aria-hidden="true" />
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-charcoal leading-snug group-hover:text-burgundy transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#6D6D6D] leading-relaxed">
                    {cat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Founders ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-bg-alt" style={{ borderTop: "1px solid #E8E0DA" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-14"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-charcoal">
              Founders
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.15 }}
            className="flex flex-col sm:flex-row items-start justify-center gap-12 sm:gap-16"
          >
            {founders.map((founder, i) => {
              return (
                <motion.div
                  key={i}
                  variants={i === 0 ? founderLeft : founderRight}
                  className="flex flex-col items-center text-center w-full sm:w-80"
                >
                  {/* Photo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE }}
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

                  {/* Name + title */}
                  <p className="text-base font-bold text-charcoal mb-1">{founder.name}</p>
                  <p
                    className="text-sm mb-5 text-charcoal"
                    style={{
                      fontFamily: "var(--font-spectral)",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    Co-Founder, Core Consulting
                  </p>

                  {/* 2 credential bullets */}
                  <motion.div
                    variants={chipContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    {founder.chips.slice(1, 3).map((chip, ci) => (
                      <motion.p
                        key={ci}
                        variants={chipItem}
                        className="text-xs text-[#636363]"
                      >
                        - {chip}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Looking Ahead ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-burgundy-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-5"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
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
