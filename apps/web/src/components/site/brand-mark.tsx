import Image from "next/image";
import Link from "next/link";

export function BrandMark({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <Link
      aria-label="Triunfo FM 87,9 — página inicial"
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg no-underline"
      href="/"
    >
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
        <Image
          alt="Triunfo FM"
          aria-hidden="true"
          className="scale-[1.3] object-contain transition-transform group-hover:scale-[1.38]"
          height={56}
          src="/brand/triunfo-fm-symbol.png"
          width={56}
        />
      </span>
      <span className={compact ? "sr-only" : "flex flex-col leading-none"}>
        <span className={`text-[1.05rem] font-black tracking-[-0.04em] ${dark ? "text-white" : "text-[var(--brand-purple-950)]"}`}>
          TRIUNFO FM
        </span>
        <span className={`mt-1 text-xs font-black tracking-[0.14em] ${dark ? "text-[var(--brand-gold-500)]" : "text-[var(--brand-gold-900)]"}`}>
          87,9
        </span>
      </span>
    </Link>
  );
}
