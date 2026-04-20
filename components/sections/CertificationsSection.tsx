"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { CERTIFICATIONS } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

export function CertificationsSection() {
  return (
    <Section title="Certifications">
      <div className="-mt-2">
        {CERTIFICATIONS.map((cert) => (
          <motion.a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
            className="group flex gap-4 py-6 border-b border-stone-100 last:border-0 cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
                <h3 className="font-sans font-semibold text-[14px] text-stone-900 group-hover:text-stone-700 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[12px] text-stone-400 font-mono">
                  <span>{cert.issuer}</span>
                  <span>·</span>
                  <span>{cert.year}</span>
                </div>
              </div>
              <p className="text-[13.5px] text-stone-500 leading-[1.7] font-sans">
                {cert.description}
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <motion.span
                className="text-stone-300 text-[16px] group-hover:text-stone-500 transition-colors"
                animate={{ x: 0 }}
                whileHover={{ x: 2 }}
              >
                ↗
              </motion.span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
