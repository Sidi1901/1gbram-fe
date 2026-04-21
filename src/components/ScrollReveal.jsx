"use client";

import { motion } from "framer-motion";

/**
 * Props:
 *   delay    – ms to wait after element enters view before animating (default: 0)
 *   duration – animation length in ms (default: 400)
 *   amount   – 0–1, fraction of element that must be visible to trigger (default: 0)
 *              0 = fires the instant any pixel enters the viewport
 *              0.5 = fires when half the element is visible
 *              1 = fires only when the full element is visible
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 400,
  amount = 0,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px 0px 0px" }}
      transition={{
        duration: duration / 1000,
        ease: "easeOut",
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
