"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { PROFILE } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

const contacts = [
  { label: "Email", href: `mailto:${PROFILE.contact.email}`, display: PROFILE.contact.email },
  { label: "Phone", href: `tel:${PROFILE.contact.phone}`, display: PROFILE.contact.phone },
  { label: "LinkedIn", href: `https://linkedin.com${PROFILE.contact.linkedin}`, display: PROFILE.contact.linkedin },
];

export function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <div className="-mt-2">
        {contacts.map(({ label, href, display }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.18 }}
            className="group flex items-center justify-between py-4 border-b border-stone-100 last:border-0"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-stone-400">{label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[13.5px] text-stone-700 group-hover:text-stone-900 transition-colors">{display}</span>
              <span className="text-stone-300 text-[13px] group-hover:text-stone-500 transition-colors">↗</span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
