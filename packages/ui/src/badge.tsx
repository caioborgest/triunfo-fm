import type { HTMLAttributes } from "react";

import { cn } from "./cn";

type BadgeTone = "brand" | "gold" | "neutral" | "success" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)]",
  gold: "bg-[var(--brand-gold-100)] text-[var(--brand-gold-900)]",
  neutral: "bg-[var(--surface-subtle)] text-[var(--text-secondary)]",
  success: "bg-[var(--feedback-success-soft)] text-[var(--feedback-success)]",
  danger: "bg-[var(--feedback-error-soft)] text-[var(--feedback-error)]",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({
  children,
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-extrabold uppercase leading-none tracking-[0.08em]",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
