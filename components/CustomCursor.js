"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_DEFAULT = 28;
const RING_HOVER = 52;
const SPRING = { stiffness: 150, damping: 18 };
const RING_SPRING = { stiffness: 250, damping: 22 };

export default function CustomCursor() {
  const [isFine, setIsFine] = useState(false);

  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const ringX = useSpring(rawX, SPRING);
  const ringY = useSpring(rawY, SPRING);
  const ringSize = useMotionValue(RING_DEFAULT);
  const ringSizeSpring = useSpring(ringSize, RING_SPRING);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setIsFine(true);
    document.documentElement.style.cursor = "none";

    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const enter = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ringSize.set(RING_HOVER);
      }
    };

    const leave = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ringSize.set(RING_DEFAULT);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", enter, { passive: true });
    document.addEventListener("mouseout", leave, { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, [dotX, dotY, rawX, rawY, ringSize]);

  if (!isFine) return null;

  return (
    <>
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#6B1E2E",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9998]"
        style={{
          width: ringSizeSpring,
          height: ringSizeSpring,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid rgba(107,30,46,0.45)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
