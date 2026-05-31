"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.46, 0.45, 0.94];

export function RadialOrbitalTimeline({ timelineData, className }) {
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const centerX = 240;
  const centerY = 240;
  const radius = 155;
  const angleStep = (2 * Math.PI) / timelineData.length;

  const nodes = timelineData.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      ...item,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  const expandedNode = nodes.find((n) => n.id === expandedId);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Orbital SVG */}
        <div className="relative flex-shrink-0">
          <svg
            width="480"
            height="480"
            viewBox="0 0 480 480"
            className="max-w-full"
            aria-label="Service orbital diagram"
          >
            {/* Outer decorative ring */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius + 32}
              fill="none"
              stroke="rgba(201,184,168,0.06)"
              strokeWidth="1"
            />
            {/* Orbital track */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(107,30,46,0.18)"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            {/* Center pulse rings */}
            <circle cx={centerX} cy={centerY} r="22" fill="rgba(107,30,46,0.08)" stroke="rgba(107,30,46,0.25)" strokeWidth="1" />
            <circle cx={centerX} cy={centerY} r="10" fill="#6B1E2E" opacity="0.7" />
            <text x={centerX} y={centerY + 4} textAnchor="middle" fill="#C9B8A8" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600" className="select-none">CORE</text>

            {/* Radial spokes */}
            {nodes.map((node) => {
              const active = hoveredId === node.id || expandedId === node.id;
              return (
                <line
                  key={`spoke-${node.id}`}
                  x1={centerX} y1={centerY}
                  x2={node.x} y2={node.y}
                  stroke={active ? "rgba(107,30,46,0.45)" : "rgba(107,30,46,0.08)"}
                  strokeWidth={active ? "1.5" : "0.75"}
                  style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
                />
              );
            })}

            {/* Related-item connection lines */}
            {nodes.map((node) =>
              (node.relatedIds || []).map((relId) => {
                const rel = nodes.find((n) => n.id === relId);
                if (!rel || relId <= node.id) return null;
                const active =
                  hoveredId === node.id || hoveredId === relId ||
                  expandedId === node.id || expandedId === relId;
                return (
                  <line
                    key={`rel-${node.id}-${relId}`}
                    x1={node.x} y1={node.y}
                    x2={rel.x} y2={rel.y}
                    stroke={active ? "rgba(107,30,46,0.5)" : "rgba(107,30,46,0.07)"}
                    strokeWidth={active ? "1.5" : "0.75"}
                    strokeDasharray="3 3"
                    style={{ transition: "stroke 0.25s" }}
                  />
                );
              })
            )}

            {/* Nodes */}
            {nodes.map((node) => {
              const Icon = node.icon;
              const isExpanded = expandedId === node.id;
              const isHovered = hoveredId === node.id;
              const r = isExpanded ? 26 : isHovered ? 23 : 19;

              return (
                <g
                  key={node.id}
                  onClick={() => setExpandedId(isExpanded ? null : node.id)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  aria-label={node.title}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setExpandedId(isExpanded ? null : node.id)}
                >
                  {/* Hit area */}
                  <circle cx={node.x} cy={node.y} r={r + 10} fill="transparent" />
                  {/* Expanded glow ring */}
                  {isExpanded && (
                    <circle
                      cx={node.x} cy={node.y} r={r + 8}
                      fill="none"
                      stroke="#6B1E2E"
                      strokeWidth="1"
                      opacity="0.35"
                      strokeDasharray="2 3"
                    />
                  )}
                  {/* Node body */}
                  <circle
                    cx={node.x} cy={node.y} r={r}
                    fill={isExpanded ? "#6B1E2E" : isHovered ? "rgba(107,30,46,0.15)" : "#1E1E1E"}
                    stroke={isExpanded || isHovered ? "#6B1E2E" : "rgba(201,184,168,0.25)"}
                    strokeWidth={isExpanded ? "2" : "1"}
                    style={{ transition: "all 0.25s" }}
                  />
                  {/* Energy bar arc */}
                  {isExpanded && (
                    <circle
                      cx={node.x} cy={node.y}
                      r={r - 6}
                      fill="none"
                      stroke="rgba(201,184,168,0.3)"
                      strokeWidth="1.5"
                      strokeDasharray={`${(node.energy / 100) * (2 * Math.PI * (r - 6))} 9999`}
                    />
                  )}
                  {/* Label below node */}
                  <text
                    x={node.x}
                    y={node.y + r + 14}
                    textAnchor="middle"
                    fill={isExpanded ? "#FAFAFA" : "#C9B8A8"}
                    fontSize="9.5"
                    fontFamily="Inter,sans-serif"
                    fontWeight={isExpanded ? "700" : "400"}
                    className="select-none"
                    style={{ transition: "fill 0.25s" }}
                  >
                    {node.title.split(" ").slice(0, 2).join(" ")}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="max-w-sm w-full min-h-[220px] flex items-center">
          <AnimatePresence mode="wait">
            {expandedNode ? (
              <motion.div
                key={expandedNode.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="w-full border border-[#6B1E2E]/25 bg-[#161616] p-7 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 bg-[#6B1E2E] flex items-center justify-center">
                    {expandedNode.icon && React.createElement(expandedNode.icon, { size: 16, className: "text-white" })}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#C9B8A8] font-semibold mb-0.5">
                      {expandedNode.date}
                    </p>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {expandedNode.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#B0A090] leading-relaxed">
                  {expandedNode.content}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] px-2.5 py-1 bg-[#6B1E2E] text-white font-semibold rounded-full">
                    {expandedNode.category}
                  </span>
                  <span className={cn(
                    "text-[10px] px-2.5 py-1 font-semibold rounded-full",
                    expandedNode.status === "completed" && "bg-emerald-900/40 text-emerald-300",
                    expandedNode.status === "in-progress" && "bg-amber-900/40 text-amber-300",
                    expandedNode.status === "pending" && "bg-[#3D0D18]/60 text-[#C9B8A8]"
                  )}>
                    {expandedNode.status === "completed" ? "Active" : expandedNode.status === "in-progress" ? "Expanding" : "Available"}
                  </span>
                  <span className="text-[10px] text-[#636363] font-medium">
                    {expandedNode.energy}% efficiency
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full hidden lg:block border border-[#C9B8A8]/08 p-7 text-center space-y-3"
              >
                <p className="text-[10px] uppercase tracking-widest text-[#4A4A4A] font-semibold">
                  Explore Services
                </p>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  Click any node to see what we do and how each service connects.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile list fallback */}
      <div className="lg:hidden mt-8 space-y-3">
        {timelineData.map((item) => (
          <button
            key={item.id}
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className={cn(
              "w-full text-left p-4 border transition-all duration-200",
              expandedId === item.id
                ? "border-[#6B1E2E] bg-[#6B1E2E]/08"
                : "border-[#E8E0DA] bg-white hover:border-[#6B1E2E]/40"
            )}
          >
            <div className="flex items-center gap-3 mb-1">
              {item.icon && React.createElement(item.icon, { size: 14, className: expandedId === item.id ? "text-[#6B1E2E]" : "text-[#8C8C8C]" })}
              <span className={cn("text-sm font-bold", expandedId === item.id ? "text-[#6B1E2E]" : "text-[#1A1A1A]")}>
                {item.title}
              </span>
              <span className="ml-auto text-[10px] text-[#8C8C8C] font-medium">{item.date}</span>
            </div>
            {expandedId === item.id && (
              <p className="text-sm text-[#595959] leading-relaxed mt-2 pl-5">{item.content}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
