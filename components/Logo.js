"use client";

import { motion } from "framer-motion";

const GAP = 42;
const OUTER_R = 40;
const MID_R = 26;
const INNER_R = 13;
const LINE_X2 = 83;

const _rad = (GAP * Math.PI) / 180;
const _cos = Math.cos(_rad);
const _sin = Math.sin(_rad);

function arcPath(r) {
  const sx = (50 + r * _cos).toFixed(2);
  const sy = (50 + r * _sin).toFixed(2);
  const ex = sx;
  const ey = (50 - r * _sin).toFixed(2);
  return `M ${sx},${sy} A ${r},${r} 0 1,1 ${ex},${ey}`;
}

function arcLen(r) {
  return parseFloat((((360 - GAP * 2) / 360) * 2 * Math.PI * r).toFixed(1));
}

const paths = {
  outer: arcPath(OUTER_R),
  mid: arcPath(MID_R),
  inner: arcPath(INNER_R),
};

const lens = {
  outer: arcLen(OUTER_R),
  mid: arcLen(MID_R),
  inner: arcLen(INNER_R),
  line: LINE_X2 - 50,
};

export default function Logo({ size = "default", className = "", inverted = false }) {
  const isSmall = size === "small" || size === "sm";
  const svgSize = isSmall ? 34 : 44;

  const color = inverted ? "#C9B8A8" : "#6B1E2E";
  const divColor = inverted ? "rgba(201,184,168,0.35)" : "rgba(107,30,46,0.35)";

  return (
    <motion.div
      className={`flex items-center gap-2.5 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d={paths.outer}
          stroke={color}
          strokeWidth="5"
          strokeLinecap="butt"
          strokeDasharray={lens.outer}
          initial={{ strokeDashoffset: lens.outer }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
        />
        <motion.path
          d={paths.mid}
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="butt"
          strokeDasharray={lens.mid}
          initial={{ strokeDashoffset: lens.mid }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
        />
        <motion.path
          d={paths.inner}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="butt"
          strokeDasharray={lens.inner}
          initial={{ strokeDashoffset: lens.inner }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
        />
        <motion.line
          x1="50"
          y1="50"
          x2={LINE_X2}
          y2="50"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={lens.line}
          initial={{ strokeDashoffset: lens.line }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ transformOrigin: "50px 50px" }}
          transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.48 }}
        />
      </svg>

      <motion.div
        className="self-stretch w-px"
        style={{ background: divColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.62 }}
      />

      <motion.div
        className="flex flex-col leading-none"
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeOut", delay: 0.68 }}
      >
        <span
          className={`font-bold uppercase tracking-[0.2em] ${isSmall ? "text-[10px]" : "text-[13px]"}`}
          style={{ color }}
        >
          CORE
        </span>
        <span
          className={`font-light uppercase tracking-[0.18em] mt-0.5 ${isSmall ? "text-[8px]" : "text-[10px]"}`}
          style={{ color }}
        >
          CONSULTING
        </span>
      </motion.div>
    </motion.div>
  );
}
