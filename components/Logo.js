"use client";

import { motion } from "framer-motion";

export default function Logo({ size = "default", className = "" }) {
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
        {/* Outer ring */}
        <circle cx="14" cy="14" r="12" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
        {/* Three nodes */}
        <circle cx="14" cy="5" r="2.5" fill="#DC2626" />
        <circle cx="22.5" cy="20" r="2.5" fill="#DC2626" opacity="0.85" />
        <circle cx="5.5" cy="20" r="2.5" fill="#DC2626" opacity="0.7" />
        {/* Connecting lines */}
        <line x1="14" y1="5" x2="22.5" y2="20" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
        <line x1="14" y1="5" x2="5.5" y2="20" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
        <line x1="5.5" y1="20" x2="22.5" y2="20" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
        {/* Center dot */}
        <circle cx="14" cy="15" r="1.5" fill="#DC2626" opacity="0.6" />
      </motion.svg>

      <span className={`font-bold tracking-tight ${isSmall ? "text-sm" : "text-base"} text-white`}>
        Core{" "}
        <span className="font-light text-white/60">Consulting</span>
      </span>
    </div>
  );
}
