"use client";

import { useEffect } from "react";

interface AdSenseBannerProps {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

export function AdSenseBanner({
  slotId = "1234567890",
  format = "auto",
  className = "",
  style,
}: AdSenseBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (clientId) {
      try {
        // @ts-expect-error window.adsbygoogle is defined by Google AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("Erro ao carregar bloco do AdSense:", err);
      }
    }
  }, [clientId]);

  if (!clientId) {
    return (
      <div
        className={`my-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--brand-purple-300)] bg-[var(--brand-purple-50)]/50 p-6 text-center text-sm font-semibold text-[var(--brand-purple-950)] ${className}`}
        style={style}
      >
        <span className="rounded-full bg-[var(--brand-purple-200)] px-3 py-1 text-xs font-bold text-[var(--brand-purple-800)] uppercase tracking-wider mb-2">
          Espaço Publicitário · Google AdSense
        </span>
        <p className="text-xs text-[var(--text-secondary)]">
          Pronto para monetização. Defina <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> no .env para ativar.
        </p>
      </div>
    );
  }

  return (
    <div className={`my-6 overflow-hidden text-center ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
