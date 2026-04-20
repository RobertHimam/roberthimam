"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function Tag({ label }: { label: string }) {
  return (
    <motion.span
      variants={fadeUp}
      whileHover={{ scale: 1.03, backgroundColor: "#1c1917", color: "#fafaf9" }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-700 text-[12px] font-medium font-mono tracking-wide cursor-default select-none"
    >
      {label}
    </motion.span>
  );
}
