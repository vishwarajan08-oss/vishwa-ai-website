"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const cardSize = { width: 480, height: 260 };
const MAX_VISIBLE = 2;

export function StaggerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(rawX, [0, 1], [-8, 8]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(rawY, [0, 1], [6, -6]), {
    stiffness: 180,
    damping: 22,
  });

  const handleMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY]
  );

  const handleLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
  }, [rawX, rawY]);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % testimonials.length);

  const getOffset = (index) => {
    const total = testimonials.length;
    let offset = (index - activeIndex + total) % total;
    if (offset > Math.floor(total / 2)) offset -= total;
    return offset;
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Stack container */}
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative"
        style={{
          width: cardSize.width,
          height: cardSize.height + 48,
          perspective: 900,
        }}
      >
        {testimonials.map((t, i) => {
          const offset = getOffset(i);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          if (absOffset > MAX_VISIBLE) return null;

          const xShift = offset * 22;
          const yShift = absOffset * 12;
          const rotation = offset * 5;
          const scale = 1 - absOffset * 0.055;
          const zIndex = 10 - absOffset;
          const opacity = 1 - absOffset * 0.28;

          return (
            <motion.div
              key={t.tempId}
              animate={{
                x: xShift,
                y: yShift,
                rotate: rotation,
                scale,
                zIndex,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="absolute top-0 left-0"
              style={{
                width: cardSize.width,
                height: cardSize.height,
                borderRadius: "16px",
                cursor: isActive ? "default" : "pointer",
                transformOrigin: "bottom center",
              }}
              onClick={() => !isActive && setActiveIndex(i)}
            >
              {isActive ? (
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    transformStyle: "preserve-3d",
                    boxShadow: "0px 8px 0px 4px #E8E0DA",
                  }}
                  className="bg-[#6B1E2E] border border-[#6B1E2E] p-8 flex flex-col justify-between"
                >
                  <p className="font-medium text-base leading-relaxed text-white">
                    &ldquo;{t.testimonial}&rdquo;
                  </p>
                  <p className="text-sm text-white/70 mt-4">{t.by}</p>
                </motion.div>
              ) : (
                <div
                  className="w-full h-full bg-[#FAFAFA] border border-[#E8E0DA] p-8 flex flex-col justify-between select-none"
                  style={{ borderRadius: "16px" }}
                >
                  <p className="font-medium text-base leading-relaxed text-[#1A1A1A] line-clamp-5">
                    &ldquo;{t.testimonial}&rdquo;
                  </p>
                  <p className="text-sm text-[#8C8C8C] mt-4">{t.by}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#E8E0DA] flex items-center justify-center text-[#1A1A1A] hover:bg-[#6B1E2E] hover:text-white hover:border-[#6B1E2E] transition-colors duration-200"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="transition-all duration-200"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                backgroundColor: i === activeIndex ? "#6B1E2E" : "#C9B8A8",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#E8E0DA] flex items-center justify-center text-[#1A1A1A] hover:bg-[#6B1E2E] hover:text-white hover:border-[#6B1E2E] transition-colors duration-200"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
