"use client";

import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Award, ShieldCheck, Star, Wrench } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { business } from "@/data/business";

const chips = [
  { icon: ShieldCheck, label: "Genuine Products" },
  { icon: Wrench, label: "Certified Repairs" },
  { icon: Award, label: `${business.yearsExperience}+ Years Experience` },
  { icon: Star, label: `${business.rating}★ Google Rated` },
];

export function WhoWeAreCard() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(rootRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: rootRef }
  );

  const scrollToStory = (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById("why-choose-us")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={rootRef}
      className="flex h-full flex-col justify-center gap-6 rounded-3xl border border-border bg-surface p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Who we are</p>
        <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
          Genuine hardware. Real expertise. Zero compromises.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {business.yearsExperience}+ years of hands-on service in Patna — from custom builds to enterprise IT,
          we treat every machine like it&apos;s our own.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60"
          >
            <chip.icon className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.75} />
            <span className="text-xs font-medium text-foreground">{chip.label}</span>
          </div>
        ))}
      </div>

      <a
        href="#why-choose-us"
        onClick={scrollToStory}
        className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        Our Story
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
