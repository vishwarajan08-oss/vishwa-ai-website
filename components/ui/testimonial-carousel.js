"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const TestimonialCarousel = React.forwardRef(
  ({ className, testimonials, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState(0)

    const handleDragEnd = (event, info) => {
      if (Math.abs(info.offset.x) > 80) {
        const direction = info.offset.x > 0 ? 1 : -1
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) =>
            (prev + (direction > 0 ? testimonials.length - 1 : 1)) % testimonials.length
          )
          setExitX(0)
        }, 200)
      }
    }

    return (
      <div ref={ref} className={cn("flex flex-col items-center justify-center", className)} {...props}>
        <div className="relative w-96 h-72">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard = index === (currentIndex + 1) % testimonials.length
            const isNextCard = index === (currentIndex + 2) % testimonials.length
            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className="absolute w-full h-full rounded-2xl border border-[#E8E0DA] bg-[#FAFAFA] shadow-sm overflow-hidden"
                style={{ zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1 }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                animate={{
                  scale: isCurrentCard ? 1 : isPrevCard ? 0.96 : 0.92,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.5 : 0.25,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -1.5 : -3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="p-8 flex flex-col h-full justify-between">
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed italic">
                    &ldquo;{testimonial.description}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E8E0DA]">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.role}
                      className="w-10 h-10 rounded-full object-cover grayscale"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A] tracking-wide">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex gap-2 mt-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-[#6B1E2E] w-4" : "bg-[#C9B8A8] w-1.5"
              )}
            />
          ))}
        </div>

        <p className="text-xs text-[#1A1A1A]/30 mt-4 tracking-wide">drag to browse</p>
      </div>
    )
  }
)
TestimonialCarousel.displayName = "TestimonialCarousel"
export { TestimonialCarousel }
