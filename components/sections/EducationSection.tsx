"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { EDUCATION } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

export function EducationSection() {
  return (
    <Section title="Education">
      <div className="space-y-0 -mt-2">
        {EDUCATION.map((edu) => (
          <motion.article
            key={edu.id}
            variants={fadeUp}
            className="py-6 border-b border-stone-100 last:border-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
              <h3 className="font-sans font-semibold text-[14px] text-stone-900">
                {edu.degree}
              </h3>
              <div className="flex items-center gap-1.5 text-[12px] text-stone-400 font-mono">
                <span>{edu.school}</span>
                <span>·</span>
                <span>{edu.period}</span>
              </div>
            </div>
            <p className="text-[13.5px] text-stone-500 leading-[1.7] font-sans">
              {edu.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
