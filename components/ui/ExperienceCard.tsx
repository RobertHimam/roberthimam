"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import clsx from "clsx";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description?: string | null;
  bullets?: string[];
  logoUrl?: string;
  current?: boolean;
}

export function ExperienceCard({ title, company, period, description, bullets, logoUrl, current }: ExperienceCardProps) {
  return (
    <motion.article variants={fadeUp}>
      <div className="flex gap-4 py-6 border-b border-stone-100 last:border-0">
        <div className="flex-shrink-0 mt-0.5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 rounded-lg bg-white border border-stone-100 flex items-center justify-center overflow-hidden"
          >
            {logoUrl ? (
              <Image src={logoUrl} alt={`${company} logo`} width={36} height={36} className="object-contain w-full h-full p-1" />
            ) : (
              <span className="font-mono text-[10px] font-bold text-stone-100 bg-stone-900 w-full h-full flex items-center justify-center">
                {company.slice(0, 2).toUpperCase()}
              </span>
            )}
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
            <h3 className="font-sans font-semibold text-[14px] text-stone-900">{title}</h3>
            <div className="flex items-center gap-1.5 text-[12px] text-stone-400 font-mono">
              <span>{company}</span>
              <span>·</span>
              <span className={clsx(current && "text-emerald-500 font-medium")}>{period}</span>
            </div>
          </div>
          {description && <p className="text-[13.5px] text-stone-500 leading-[1.7]">{description}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="space-y-1 mt-1">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[13.5px] text-stone-500 leading-[1.7]">
                  <span className="text-stone-300 mt-[0.4em] flex-shrink-0">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.article>
  );
}
