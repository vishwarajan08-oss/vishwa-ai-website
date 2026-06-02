"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Honestly I was skeptical at first. We had tried a few AI tools before and they never really stuck. Vishwa came in, actually learned how we operated, and built something that fit. Our team uses it every day now without thinking about it.",
    by: "CEO, Wealth Management Firm",
  },
  {
    tempId: 1,
    testimonial:
      "What stood out was that he wasn't just handing us a list of tools. He understood what was slowing us down and fixed it. Client reporting used to eat up half our week. It doesn't anymore.",
    by: "Senior Advisor, Independent RIA",
  },
  {
    tempId: 2,
    testimonial:
      "We're a small team so every hour matters. The systems he put in place gave us capacity we didn't have before. It genuinely felt like adding a staff member without the overhead.",
    by: "Principal, Independent Advisory",
  },
  {
    tempId: 3,
    testimonial:
      "Young, sharp, and surprisingly easy to work with. He didn't overcomplicate anything. Came in with a clear plan, executed it, and checked in regularly. Would bring him back without hesitation.",
    by: "Director of Operations, Advisory Firm",
  },
  {
    tempId: 4,
    testimonial:
      "We were hesitant about AI. We had seen other firms implement tools that nobody actually used. Core Consulting took a completely different approach. They spent time understanding how we work before suggesting anything.",
    by: "Managing Partner, Regional RIA",
  },
  {
    tempId: 5,
    testimonial:
      "The reporting time savings alone paid for the engagement in the first month. Everything after that has been pure operational upside.",
    by: "COO, Independent RIA",
  },
];

const items = [...testimonials, ...testimonials];

export function StaggerTestimonials() {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {items.map((t, i) => {
          const isBurgundy = t.tempId % 2 === 0;
          return (
            <div
              key={i}
              data-cursor-dark={isBurgundy ? "" : undefined}
              className={`flex-shrink-0 w-[340px] rounded-2xl p-6 flex flex-col gap-3 ${
                isBurgundy
                  ? "bg-[#6B1E2E]"
                  : "bg-[#FAFAFA] border border-[#E8E0DA]"
              }`}
            >
              <p
                className={`text-sm font-medium leading-relaxed ${
                  isBurgundy ? "text-white" : "text-[#1A1A1A]"
                }`}
              >
                &ldquo;{t.testimonial}&rdquo;
              </p>
              <p
                className={`text-sm ${
                  isBurgundy ? "text-white/75" : "text-[#6B1E2E]"
                }`}
              >
                {t.by}
              </p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
