"use client";
import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

const TESTIMONIALS = [
  { id: 1, description: "Honestly I was skeptical at first. We'd tried a few AI tools before and they never really stuck. Vishwa came in, actually learned how we operated, and built something that fit. Our team uses it every day now without thinking about it.", role: "CEO", firm: "Wealth Management Firm" },
  { id: 2, description: "What stood out was that he wasn't just handing us a list of tools. He understood what was slowing us down and fixed it. Client reporting used to eat up half our week. It doesn't anymore.", role: "Senior Advisor", firm: "Independent RIA" },
  { id: 3, description: "We're a small team so every hour matters. The systems he put in place gave us capacity we didn't have before. It genuinely felt like adding a staff member without the overhead.", role: "Principal", firm: "Independent Advisory" },
  { id: 4, description: "Young, sharp, and surprisingly easy to work with. He didn't overcomplicate anything. Came in with a clear plan, executed it, and checked in regularly. Would bring him back without hesitation.", role: "Director of Operations", firm: "Advisory Firm" },
  { id: 5, description: "We were hesitant about AI. We'd seen other firms implement tools that nobody actually used. Core Consulting took a completely different approach. They spent time understanding how we work before suggesting anything.", role: "Managing Partner", firm: "Regional RIA" },
  { id: 6, description: "The reporting time savings alone paid for the engagement in the first month. Everything after that has been pure operational upside.", role: "COO", firm: "Independent RIA" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-bg-alt border-t border-divider">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="max-w-xl mb-16">
          <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-burgundy mb-3">Client Feedback</motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-charcoal">Don&apos;t take our word for it.</motion.h2>
          <motion.p variants={fadeInUp} className="mt-3 text-[#636363] text-sm">Firms managing over a billion dollars in assets trust Core Consulting.</motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.id} variants={fadeInUp} className="bg-white border border-divider p-6 flex flex-col justify-between">
              <p className="text-sm text-[#636363] leading-relaxed italic mb-6">&ldquo;{t.description}&rdquo;</p>
              <div className="pt-4 border-t border-divider">
                <p className="text-xs font-semibold text-charcoal tracking-wide">{t.role}</p>
                <p className="text-xs text-[#8C8C8C] mt-0.5">{t.firm}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
