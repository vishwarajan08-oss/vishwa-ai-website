"use client";
import { useScroll, useSpring, motion } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    bounce: 0,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
      }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#6B1E2E] z-[100] pointer-events-none"
      aria-hidden="true"
    />
  );
}
