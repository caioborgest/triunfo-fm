import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-[var(--border-subtle)] pb-7 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--brand-gold-900)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-extrabold text-[var(--brand-purple-950)] md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl leading-7 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
      {action ? (
        <Link
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-4 font-bold text-white hover:bg-[var(--brand-purple-950)]"
          href={action.href}
        >
          {action.label}
          <ChevronRight aria-hidden size={18} />
        </Link>
      ) : null}
    </header>
  );
}
