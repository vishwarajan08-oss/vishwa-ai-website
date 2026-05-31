"use client";

import { motion } from "framer-motion";

export default function Logo({ size = "default", className = "", inverted = false }) {
  const isSmall = size === "small";
  const iconSize = isSmall ? 20 : 26;

  const markPrimary = inverted ? "#C9B8A8" : "#6B1E2E";
  const markSecondary = inverted ? "rgba(201,184,168,0.7)" : "rgba(107,30,46,0.7)";
  const markFaint = inverted ? "rgba(201,184,168,0.5)" : "rgba(107,30,46,0.5)";
  const ringColor = inverted ? "rgba(201,184,168,0.3)" : "rgba(107,30,46,0.3)";
  const lineColor = inverted ? "rgba(201,184,168,0.4)" : "rgba(107,30,46,0.4)";

  const wordmarkBase = inverted
    ? "text-white font-bold"
    : "text-charcoal font-bold";
  const wordmarkLight = inverted ? "text-white/65" : "text-[#6D6D6D]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 7, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="12" stroke={ringColor} strokeWidth="1.5" />
        <circle cx="14" cy="5" r="2.5" fill={markPrimary} />
        <circle cx="22.5" cy="20" r="2.5" fill={markSecondary} />
        <circle cx="5.5" cy="20" r="2.5" fill={markFaint} />
        <line x1="14" y1="5" x2="22.5" y2="20" stroke={lineColor} strokeWidth="1" />
        <line x1="14" y1="5" x2="5.5" y2="20" stroke={lineColor} strokeWidth="1" />
        <line x1="5.5" y1="20" x2="22.5" y2="20" stroke={lineColor} strokeWidth="1" />
        <circle cx="14" cy="15" r="1.5" fill={markFaint} />
      </motion.svg>

      <span
        className={`tracking-tight ${isSmall ? "text-[13px]" : "text-[15px]"} ${wordmarkBase}`}
      >
        Core{" "}
        <span className={`font-light ${wordmarkLight}`}>Consulting</span>
      </span>
    </div>
  );
}
