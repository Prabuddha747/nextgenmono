"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { buildWhatsAppLink } from "@/data/business";
import { serviceDetails } from "@/data/services-detail";
import { glowOverlayStyle } from "@/lib/glow";
import { clsx } from "clsx";

// Real Unsplash photos (site's usual license-free-stock convention), tinted
// white — the same monochrome glow language as the atmosphere blobs — rather
// than a literal custom illustration we can't produce.
const GLOW_TINTS = [
  "rgba(255,255,255,0.4)", // CCTV
  "rgba(255,255,255,0.4)", // networking
  "rgba(200,200,200,0.4)", // enterprise/IT
];

function ServiceVisual({ photo, glow }: { photo: string; glow: string }) {
  return (
    <div className="relative ml-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-border">
      <Image src={photo} alt="" fill sizes="(min-width: 1024px) 25vw, 90vw" className="object-cover grayscale contrast-[1.1]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3" style={glowOverlayStyle(glow)} />
    </div>
  );
}

export function ServiceExplorer() {
  const [active, setActive] = useState(-1);

  return (
    <div className="divide-y divide-border border-t border-border">
      {serviceDetails.map((service, i) => {
        const isActive = active === i;
        return (
          <div key={service.slug} id={service.slug} className="scroll-mt-24 py-10 sm:py-12">
            <Reveal index={i} className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              {/* Number + connector rail, decorative — echoes the reference's
                  numbered list without needing a literal illustration asset. */}
              <div className="hidden flex-col items-center sm:flex">
                <span className="font-display text-6xl font-bold text-foreground/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 h-full w-px bg-border" />
                <span className="-mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{service.category}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {service.title}
                  </h3>

                  <ul className="mt-4 space-y-1.5">
                    {service.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-center gap-2 text-sm text-muted">
                        <span className="text-accent">—</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActive(isActive ? -1 : i)}
                    className="group mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent"
                    aria-expanded={isActive}
                  >
                    {isActive ? "Show less" : "Learn more"}
                    <ArrowRight
                      className={clsx("h-4 w-4 transition-transform", isActive ? "rotate-90" : "group-hover:translate-x-1")}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                          {service.description}
                        </p>
                        <ul className="mt-6 space-y-3">
                          {service.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <Button
                          href={buildWhatsAppLink(`Hi, I'd like to enquire about ${service.title}.`)}
                          className="mt-6"
                        >
                          Enquire on WhatsApp
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <ServiceVisual photo={service.photo} glow={GLOW_TINTS[i % GLOW_TINTS.length]} />
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
