import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/adsense-script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Triunfo FM 87,9",
    template: "%s | Triunfo FM 87,9",
  },
  description: "Informação, cultura e turismo em um só lugar.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  applicationName: "Triunfo FM 87,9",
  icons: {
    icon: "/brand/triunfo-fm-symbol.png",
    apple: "/brand/triunfo-fm-symbol.png",
  },
  openGraph: {
    locale: "pt_BR",
    siteName: "Triunfo FM 87,9",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2B0757",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <AdSenseScript />
      </head>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
