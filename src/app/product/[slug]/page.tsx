import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProductArt } from "@/components/product/product-art";
import { SpecSelector } from "@/components/product/spec-selector";
import { AddToBasketButton } from "@/components/basket/add-to-basket-button";
import { formatINR } from "@/lib/format";
import { buildTelLink, buildWhatsAppLink } from "@/data/business";
import { getProductBySlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline} — ${product.brand}, ${formatINR(product.price)} at Next Gen Computer, Patna.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const enquiryMessage = `Hi, I'm interested in the ${product.name} (${formatINR(product.price)}). Could you share more details?`;

  return (
    <Section className="pt-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <ProductArt product={product} className="aspect-square w-full lg:sticky lg:top-24" />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-base text-muted">{product.tagline}</p>

          {product.badges && (
            <div className="mt-4 flex gap-2">
              {product.badges.map((b) => (
                <Badge key={b} kind={b} />
              ))}
            </div>
          )}

          <p className="mt-6 font-mono text-3xl font-bold text-foreground">
            {formatINR(product.price)}
          </p>
          <p className="mt-1 text-xs text-muted">Estimated store price — confirm final pricing on WhatsApp.</p>

          <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
            {product.specs.map((spec) => (
              <li key={spec.label} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-muted">{spec.label}</span>
                <span className="font-mono font-medium text-foreground">{spec.value}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>

          {!product.configurable && (
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(enquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
              <a
                href={buildTelLink()}
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-accent/60"
              >
                <Phone className="h-4 w-4" />
                Call to Ask
              </a>
              <AddToBasketButton
                item={{ slug: product.slug, name: product.name, price: product.price }}
                className="h-12 w-12"
              />
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-border pt-6 text-center text-xs text-muted sm:grid-cols-3">
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Warranty backed
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="h-5 w-5 text-accent" strokeWidth={1.5} />
              In-store pickup
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Wrench className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Free setup help
            </div>
          </div>

          {product.configurable && (
            <div className="mt-10">
              <p className="mb-4 text-sm font-semibold text-foreground">Configure this build</p>
              <SpecSelector product={product} groups={product.configurable} ctaLabel="Enquire With This Config" />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
