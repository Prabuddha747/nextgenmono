import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock, Gem, Headphones, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceExplorer } from "@/components/services/service-explorer";
import { Reveal } from "@/components/ui/reveal";
import { glowOverlayStyle } from "@/lib/glow";
import { buildWhatsAppLink } from "@/data/business";

export const metadata: Metadata = {
  title: "Services — Custom Builds, Upgrades & Gaming Setups",
  description:
    "Custom gaming PC builds, component upgrades, and gaming peripherals in Patna — every build benchmarked in-store, genuine parts only.",
};

const trustPoints = [
  { icon: ShieldCheck, title: "Benchmarked Builds", description: "Every system stress-tested before delivery." },
  { icon: Headphones, title: "Expert Support", description: "Experienced technicians for every build." },
  { icon: Gem, title: "Genuine Parts", description: "No greymarket components, ever." },
  { icon: Clock, title: "After the Sale", description: "Warranty and support don't stop at pickup." },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="relative overflow-hidden pb-0 pt-14">
        {/* Page-local glow, not a change to the shared .atmosphere layer —
            same monochrome accent glow as the rest of the site, scoped to this hero only. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -top-1/3 hidden h-[140%] w-[70%] dark:block"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.18), rgba(200,200,200,0.08) 55%, transparent 75%)",
          }}
        />
        <div className="relative grid gap-10 border-b border-border pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Services <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="h-px w-10 bg-accent/40" />
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Technology, Installed <br />
              Professionally<span className="text-accent">.</span>
            </h1>
            <div className="mt-6 max-w-xs border-l-2 border-accent/50 pl-4 text-sm text-muted">
              Custom gaming PCs. Component upgrades. Genuine peripherals.
            </div>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1644987708868-1a97a5341ec3"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover grayscale contrast-[1.1]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3" style={glowOverlayStyle("rgba(168,85,247,0.4)")} />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <ServiceExplorer />
      </Section>

      <Section className="pt-0">
        <div className="border-t border-border pt-14 text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent/40" />
            Ready to build?
            <span className="h-px w-8 bg-accent/40" />
          </p>
          <h2 className="mx-auto max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Let&apos;s build your next rig<span className="text-accent">.</span>
          </h2>
          <Button
            href={buildWhatsAppLink("Hi, I'd like to talk about a custom PC build or upgrade.")}
            variant="secondary"
            className="mt-8"
          >
            Talk to an Expert
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl border border-border bg-surface p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal key={point.title} index={i} className="flex items-start gap-3">
              <point.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-foreground">{point.title}</p>
                <p className="mt-1 text-xs text-muted">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
