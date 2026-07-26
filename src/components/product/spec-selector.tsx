"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import type { ConfigGroup, Product } from "@/data/products";
import { formatINR } from "@/lib/format";
import { buildWhatsAppLink } from "@/data/business";
import { clsx } from "clsx";

export function SpecSelector({
  product,
  groups,
  ctaLabel = "Get This Quote on WhatsApp",
}: {
  product: Product;
  groups: ConfigGroup[];
  ctaLabel?: string;
}) {
  const [selection, setSelection] = useState<Record<string, number>>(() =>
    Object.fromEntries(groups.map((g) => [g.key, 0]))
  );

  const total = useMemo(() => {
    return (
      product.price +
      groups.reduce((sum, group) => sum + group.options[selection[group.key]].priceDelta, 0)
    );
  }, [groups, product.price, selection]);

  const message = useMemo(() => {
    const lines = groups.map((g) => `${g.title}: ${g.options[selection[g.key]].label}`);
    return `Hi, I'd like a quote for the ${product.name} configured as:\n${lines.join("\n")}\n\nEstimated total: ${formatINR(total)}`;
  }, [groups, product.name, selection, total]);

  return (
    <div>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.key}>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              {group.title}
            </p>
            <div className="space-y-2">
              {group.options.map((option, i) => {
                const isSelected = selection[group.key] === i;
                return (
                  <button
                    key={option.label}
                    onClick={() => setSelection((s) => ({ ...s, [group.key]: i }))}
                    className={clsx(
                      "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors",
                      isSelected
                        ? "border-accent bg-accent/10 shadow-[0_0_0_1px_var(--accent)]"
                        : "border-border bg-surface hover:border-accent/40"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={clsx(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          isSelected ? "border-accent bg-accent text-accent-foreground" : "border-border"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground">{option.label}</span>
                        <span className="block text-xs text-muted">{option.detail}</span>
                      </span>
                    </span>
                    {option.priceDelta > 0 && (
                      <span className="shrink-0 font-mono text-xs font-semibold text-muted">
                        +{formatINR(option.priceDelta)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <motion.div
        layout
        className="sticky bottom-4 mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      >
        <div>
          <p className="text-xs text-muted">Estimated total</p>
          <motion.p
            key={total}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-2xl font-bold text-foreground"
          >
            {formatINR(total)}
          </motion.p>
        </div>
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          {ctaLabel}
        </a>
      </motion.div>
    </div>
  );
}
