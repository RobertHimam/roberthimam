"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useSidoarjoTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false,
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function StatusBar() {
  const time = useSidoarjoTime();
  return (
    <div className="flex items-center gap-4 text-[11px] font-mono text-stone-400 tracking-wide">
      <div className="flex items-center gap-1.5">
        <motion.span
          className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>Sidoarjo, Indonesia</span>
      </div>
      <span className="text-stone-300">·</span>
      <span>{time} WIB</span>
    </div>
  );
}
