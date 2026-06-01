"use client";

import { motion, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
