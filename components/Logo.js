"use client";

import { motion } from "framer-motion";

export default function Logo({ size = "default", className = "", inverted = false }) {
  const isSmall = size === "small";
  const iconSize = isSmall ? 20 : 28;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="12" stroke="#6B1E2E" strokeWidth="1.5" opacity="0.4" />
        <circle cx="14" cy="5" r="2.5" fill="#6B1E2E" />
        <circle cx="22.5" cy="20" r="2.5" fill="#6B1E2E" opacity="0.85" />
        <circle cx="5.5" cy="20" r="2.5" fill="#6B1E2E" opacity="0.7" />
        <line x1="14" y1="5" x2="22.5" y2="20" stroke="#6B1E2E" strokeWidth="1" opacity="0.5" />
        <line x1="14" y1="5" x2="5.5" y2="20" stroke="#6B1E2E" strokeWidth="1" opacity="0.5" />
        <line x1="5.5" y1="20" x2="22.5" y2="20" stroke="#6B1E2E" strokeWidth="1" opacity="0.5" />
        <circle cx="14" cy="15" r="1.5" fill="#6B1E2E" opacity="0.6" />
      </motion.svg>

      <span className={`font-bold tracking-tight ${isSmall ? "text-sm" : "text-base"} ${inverted ? "text-white" : "text-[#1A1A1A]"}`}>
        Core{" "}
        <span className={`font-light ${inverted ? "text-white/60" : "text-[#1A1A1A]/50"}`}>Consulting</span>
      </span>
    </div>
  );
}
