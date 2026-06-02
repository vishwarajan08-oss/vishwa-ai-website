"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_DEFAULT = 28;
const RING_HOVER = 52;
const SPRING = { stiffness: 150, damping: 18 };
const RING_SPRING = { stiffness: 250, damping: 22 };
const COLOR_TRANSITION = { duration: 0.2 };

const LIGHT = { dot: "#6B1E2E", ring: "rgba(107,30,46,0.45)" };
const DARK = { dot: "#FAFAFA", ring: "rgba(250,240,238,0.5)" };

export default function CustomCursor() {
  const [isFine, setIsFine] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
      setIsDark(!!e.target.closest("[data-cursor-dark]"));
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

  const colors = isDark ? DARK : LIGHT;

  return (
    <>
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999]"
        animate={{ backgroundColor: colors.dot }}
        transition={COLOR_TRANSITION}
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9998]"
        animate={{ borderColor: colors.ring }}
        transition={COLOR_TRANSITION}
        style={{
          width: ringSizeSpring,
          height: ringSizeSpring,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderWidth: "1.5px",
          borderStyle: "solid",
        }}
        aria-hidden="true"
      />
    </>
  );
}
