"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TestimonialCarousel({ testimonials, className }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [exitX, setExitX] = React.useState(0)

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 80) {
      const direction = info.offset.x > 0 ? -1 : 1
      setExitX(info.offset.x)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + direction + testimonials.length) % testimonials.length)
        setExitX(0)
      }, 200)
    }
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-96 h-64">
        {testimonials.map((t, index) => {
          const offset = (index - currentIndex + testimonials.length) % testimonials.length
          if (offset > 2) return null
          const isTop = offset === 0
          return (
            <motion.div
              key={t.id}
              className="absolute w-full h-full rounded-2xl border border-[#E8E0DA] bg-[#FAFAFA] shadow-sm overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ zIndex: 3 - offset }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={isTop ? handleDragEnd : undefined}
              animate={{
                scale: 1 - offset * 0.04,
                opacity: 1 - offset * 0.35,
                x: isTop ? exitX : 0,
                y: offset * 10,
                rotate: isTop ? exitX / 20 : offset * -1.5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="p-8 flex flex-col h-full justify-between">
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed italic">
                  &ldquo;{t.description}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E8E0DA]">
                  <img
                    src={t.avatar}
                    alt={t.role}
                    className="w-10 h-10 rounded-full object-cover grayscale"
                  />
                  <p className="text-xs font-semibold text-[#1A1A1A] tracking-wide">{t.role}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      <div className="flex gap-2 mt-20">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === currentIndex ? "w-4 bg-[#6B1E2E]" : "w-1.5 bg-[#C9B8A8]"
            )}
          />
        ))}
      </div>
      <p className="text-xs text-[#1A1A1A]/30 mt-3 tracking-wide">drag to browse</p>
    </div>
  )
}

const HARDCODED_TESTIMONIALS = [
  { id: 1, description: "Honestly I was skeptical at first. We'd tried a few AI tools before and they never really stuck. Vishwa came in, actually learned how we operated, and built something that fit. Our team uses it every day now without thinking about it.", role: "CEO, Wealth Management Firm", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, description: "What stood out was that he wasn't just handing us a list of tools. He understood what was slowing us down and fixed it. Client reporting used to eat up half our week. It doesn't anymore.", role: "Senior Advisor, RIA", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: 3, description: "We're a small team so every hour matters. The systems he put in place gave us capacity we didn't have before. It genuinely felt like adding a staff member without the overhead.", role: "Principal, Independent Advisory", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
  { id: 4, description: "Young, sharp, and surprisingly easy to work with. He didn't overcomplicate anything. Came in with a clear plan, executed it, and checked in regularly. Would bring him back without hesitation.", role: "Director of Operations, Advisory Firm", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 5, description: "We were hesitant about AI. We'd seen other firms implement tools that nobody actually used. Core Consulting took a completely different approach. They spent time understanding how we work before suggesting anything.", role: "Managing Partner, Regional RIA", avatar: "https://randomuser.me/api/portraits/women/40.jpg" },
  { id: 6, description: "The reporting time savings alone paid for the engagement in the first month. Everything after that has been pure operational upside.", role: "COO, Independent RIA", avatar: "https://randomuser.me/api/portraits/men/61.jpg" },
]

export default function TestimonialCarouselStandalone({ className }) {
  return <TestimonialCarousel testimonials={HARDCODED_TESTIMONIALS} className={className} />
}
