"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function use3DTilt({ maxDeg = 8, stiffness = 200, damping = 20 } = {}) {
  const ref = useRef(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(rawX, [0, 1], [-maxDeg, maxDeg]), { stiffness, damping });
  const rotateX = useSpring(useTransform(rawY, [0, 1], [maxDeg, -maxDeg]), { stiffness, damping });

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
