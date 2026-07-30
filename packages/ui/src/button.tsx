import type { ButtonHTMLAttributes } from "react";

import { cn } from "./cn";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-purple-800)] text-white shadow-[0_10px_30px_rgba(43,7,87,0.18)] hover:bg-[var(--brand-purple-950)]",
  accent:
    "bg-[var(--brand-gold-500)] text-[var(--text-primary)] shadow-[0_10px_30px_rgba(242,169,0,0.2)] hover:bg-[var(--brand-gold-300)]",
  outline:
    "border border-[var(--border-control)] bg-white text-[var(--brand-purple-950)] hover:bg-[var(--brand-purple-50)]",
  ghost:
    "bg-transparent text-[var(--brand-purple-800)] hover:bg-[var(--brand-purple-50)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses({
  className,
  size = "md",
  variant = "primary",
}: {
  className?: string | undefined;
  size?: ButtonSize;
  variant?: ButtonVariant;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold no-underline transition-colors motion-reduce:transition-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ className, size, variant })}
      type={type}
      {...props}
    />
  );
}
