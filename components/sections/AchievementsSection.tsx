"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { KEY_ACHIEVEMENTS } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

export function AchievementsSection() {
  return (
    <Section title="Key Achievements">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {KEY_ACHIEVEMENTS.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="group p-5 rounded-2xl border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 transition-all duration-200"
          >
            <div className="flex gap-3 items-start">
              <span className="text-stone-300 text-[10px] mt-1 flex-shrink-0 font-mono">0{i + 1}</span>
              <p className="text-[13.5px] text-stone-600 leading-[1.7]">{item}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
