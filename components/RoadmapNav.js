"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PHASE_LABELS = [
  "Discovery",
  "Implementation",
  "Audit Quarter",
  "Partnership",
];

function DiamondMarker({ label, isActive, isCompleted }) {
  return (
    <div className="flex items-center gap-3 relative">
      <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
        <motion.div
          animate={{
            backgroundColor: isActive || isCompleted ? "#6B1E2E" : "#E8E0DA",
            borderColor: isActive || isCompleted ? "#6B1E2E" : "#C9B8A8",
            scale: isActive ? 1.2 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-3 h-3 border-2 rotate-45"
          style={{ borderColor: "#C9B8A8" }}
        />
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute w-5 h-5 border border-[#6B1E2E]/30 rotate-45"
          />
        )}
      </div>
      <motion.span
        animate={{
          color: isActive ? "#6B1E2E" : isCompleted ? "#1A1A1A" : "#C9B8A8",
          fontWeight: isActive ? 700 : 400,
        }}
        transition={{ duration: 0.3 }}
        className="text-xs tracking-wide whitespace-nowrap hidden lg:block"
      >
        {label}
      </motion.span>
    </div>
  );
}

export default function RoadmapNav({ phaseRefs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observers = phaseRefs.map((ref, index) => {
      if (!ref.current) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((obs, i) => {
        if (obs && phaseRefs[i].current) {
          obs.unobserve(phaseRefs[i].current);
        }
      });
    };
  }, [phaseRefs]);

  return (
    <div
      ref={containerRef}
      className="hidden md:flex flex-col items-start relative pt-1"
      style={{ minWidth: "140px" }}
    >
      {/* Background line */}
      <div className="absolute left-[9px] top-0 bottom-0 w-px bg-[#E8E0DA]" />

      {/* Filling line */}
      <div className="absolute left-[9px] top-0 w-px overflow-hidden h-full">
        <motion.div
          className="w-full bg-[#6B1E2E] origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Markers — spaced evenly */}
      <div
        className="relative flex flex-col justify-between h-full w-full gap-0"
        style={{ paddingTop: "2px" }}
      >
        {PHASE_LABELS.map((label, index) => (
          <div key={index} className="flex-1 flex items-start">
            <DiamondMarker
              label={label}
              isActive={index === activeIndex}
              isCompleted={index < activeIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
