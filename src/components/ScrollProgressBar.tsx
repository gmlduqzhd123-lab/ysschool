"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] origin-left"
      style={{
        scaleX,
        height: "6px",
        background:
          "linear-gradient(90deg, #38BDF8 0%, #1E3A8A 50%, #F97316 100%)",
        borderRadius: "0 2px 2px 0",
        boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
      }}
    />
  );
}
