"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function ContainerScroll({ titleComponent, children, className }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [18, 0, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.55, 1]);

  return (
    <div
      ref={containerRef}
      className={cn("relative py-6", className)}
      style={{ perspective: "1400px" }}
    >
      {titleComponent && (
        <div className="mb-10 text-center">{titleComponent}</div>
      )}
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformOrigin: "top center",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
