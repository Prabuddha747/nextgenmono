"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";
import { clsx } from "clsx";

/**
 * Shared pin structure for scroll-story scenes (design spec §5.2): a tall outer
 * wrapper provides scroll distance, a CSS-sticky inner div holds the visible
 * content — cheaper than JS-driven fixed positioning, and it can't fight the
 * navbar's own stacking context the way a `position: fixed` hero can.
 */
export function PinnedScene({
  heightVh = 180,
  className,
  children,
}: {
  heightVh?: number;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [minHeightPx, setMinHeightPx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // heightVh assumes the sticky content is roughly one viewport tall, which holds
  // on desktop's wide multi-column grids. On mobile, the same cards stack into a
  // single column and can grow taller than that — the sticky child then exceeds
  // its own containing block (this outer div) before it has scrolled far enough
  // to release, so it overflows into the next scene below instead of handing off
  // cleanly. Measuring the real content height and growing the wrapper to fit it
  // (content height + one viewport — the room a sticky element needs to fully
  // scroll through) fixes that regardless of viewport width or card count.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setMinHeightPx(el.getBoundingClientRect().height + window.innerHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} style={{ height: `max(${heightVh}vh, ${minHeightPx}px)` }} className="relative">
      <div
        ref={contentRef}
        className={clsx("sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden", className)}
      >
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
