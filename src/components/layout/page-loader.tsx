"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const DURATION_MS = 1700;
// The same open-case shot the homepage hero used to open on — brought back here
// so first paint shows brand imagery instead of a blank black screen.
const LOADER_PHOTO = "https://images.unsplash.com/photo-1756576630180-653cbd594433";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <Image
            src={LOADER_PHOTO}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative flex h-40 w-40 items-center justify-center">
            <div
              className="absolute inset-0 animate-spin rounded-full opacity-90"
              style={{
                animationDuration: "1.4s",
                background:
                  "conic-gradient(from 0deg, #ffffff, #808080, #ffffff, #333333, #ffffff, #808080, #ffffff)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
            />
            <div
              className="absolute inset-3 animate-spin rounded-full opacity-60"
              style={{
                animationDuration: "2.2s",
                animationDirection: "reverse",
                background:
                  "conic-gradient(from 90deg, #808080, #ffffff, #333333, #ffffff, #808080)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
              }}
            />
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="font-display text-lg font-bold tracking-tight text-white"
            >
              Next<span className="text-accent">Gen</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
