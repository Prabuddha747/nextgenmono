"use client";

import Image from "next/image";
import { PinnedScene } from "@/components/scroll-story/pinned-scene";
import { FanDeck } from "@/components/scroll-story/fan-deck";
import { FanCard } from "@/components/scroll-story/fan-card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { business, buildWhatsAppLink } from "@/data/business";

const proofPoints = [
  { label: `${business.yearsExperience}+ Years`, sub: "Building & repairing in Patna" },
  { label: `${business.rating}★ Rated`, sub: `${business.reviewCount.toLocaleString()}+ Google reviews` },
  { label: "Genuine Parts", sub: "No greymarket components" },
  { label: "Same Address", sub: `${business.address.line1}, unchanged` },
];

export function SceneOwner() {
  return (
    <PinnedScene heightVh={150}>
      {(progress) => (
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
                Behind the counter
              </p>
              <h2 className="mt-4 max-w-xl break-words font-display text-3xl font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7)] sm:text-4xl">
                {business.founderName} has been building, repairing, and arguing over spec sheets on{" "}
                {business.address.line1} for {business.yearsExperience} years.
              </h2>
              <p className="mt-6 font-serif text-xl italic leading-snug text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-2xl">
                &ldquo;Every build that leaves this store, I&apos;d put in my own home.&rdquo;
              </p>
              <Button href={buildWhatsAppLink("Hi, I'd like to know more about Next Gen Computer.")} className="mt-8">
                WhatsApp Us
              </Button>

              <FanDeck progress={progress} className="mt-12 grid grid-cols-2 gap-4">
                {proofPoints.map((point, i) => (
                  <FanCard
                    key={point.label}
                    index={i}
                    count={proofPoints.length}
                    maxAngle={6}
                    spacing={0}
                    enterOffset={i % 2 === 0 ? -80 : 80}
                    className="glass-card-scene p-6"
                  >
                    <p className="font-display text-2xl font-bold text-white">{point.label}</p>
                    <p className="mt-1.5 text-sm text-white/70">{point.sub}</p>
                  </FanCard>
                ))}
              </FanDeck>
            </div>

            {/* Real photo, framed as a card rather than a small circle — a soft
                grayscale glow ring, monochrome to match the rest of the theme. */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
              <div className="absolute -inset-[3px] rounded-[2rem] bg-gradient-to-br from-accent via-[#d4d4d4] to-[#737373] opacity-70 blur-[3px]" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-black/40">
                <Image
                  src="/owner-studio.jpg"
                  alt={`${business.founderName}, founder of Next Gen Computer`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="object-cover grayscale-[0.2] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      )}
    </PinnedScene>
  );
}
