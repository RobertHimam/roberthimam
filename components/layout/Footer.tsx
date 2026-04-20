"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t border-stone-200"
    >
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-stone-400 tracking-wide">
          © 2026 Mochammad Robbitul Himam
        </p>
        <p className="font-mono text-[11px] text-stone-400 tracking-wide">
          Built with Next.js · Tailwind CSS · Framer Motion
        </p>
      </div>
    </motion.footer>
  );
}
