"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export default function HeroParallaxWrapper({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0, 12]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [1, 0]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [1, 0.97]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, -60]),
    springConfig
  );

  return (
    <div
      ref={ref}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          opacity,
          scale,
          translateY,
          transformOrigin: "center bottom",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
