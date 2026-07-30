import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";
import { ArtisticBanner } from "./artistic-banner";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white pb-20">
      {/* Banner Artístico Pré-Rodapé (Careta de Triunfo) */}
      <ArtisticBanner />

      {/* Main Footer Links */}
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5 text-xs text-[var(--text-secondary)]">
        {/* Coluna 1: App */}
        <div className="space-y-4">
          <h3 className="font-extrabold uppercase tracking-wider text-[var(--brand-purple-950)] text-xs">
            BAIXE NOSSO APP
          </h3>
          <p className="leading-relaxed">
            Leve a Triunfo FM com você em qualquer lugar no seu celular.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white shadow-xs">
              <span className="text-[10px] font-bold">
                DISPONÍVEL NO <br />
                <strong className="text-xs">Google Play</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white shadow-xs">
              <span className="text-[10px] font-bold">
                DISPONÍVEL NA <br />
                <strong className="text-xs">App Store</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Coluna 2: Institucional */}
        <div className="space-y-3">
          <h3 className="font-extrabold uppercase tracking-wider text-[var(--brand-purple-950)] text-xs">
            INSTITUCIONAL
          </h3>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="#equipe" className="hover:text-[var(--brand-purple-800)]">
                Nossa Equipe
              </Link>
            </li>
            <li>
              <Link href="/transparencia-e-acesso-a-informacao" className="hover:text-[var(--brand-purple-800)]">
                Transparência & LAI
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[var(--brand-purple-800)]">
                Anuncie na 87,9 FM
              </Link></li>
            <li>
              <Link href="#" className="hover:text-[var(--brand-purple-800)]">
                Trabalhe Conosco
              </Link>
            </li>
            <li>
              <Link href="#newsletter" className="hover:text-[var(--brand-purple-800)]">
                Boletim Informativo
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Legislação & Privacidade */}
        <div className="space-y-3">
          <h3 className="font-extrabold uppercase tracking-wider text-[var(--brand-purple-950)] text-xs flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-[var(--brand-purple-800)]" />
            LEGISLAÇÃO & LGPD
          </h3>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/politica-de-privacidade" className="hover:text-[var(--brand-purple-800)]">
                Política de Privacidade (LGPD)
              </Link>
            </li>
            <li>
              <Link href="/termos-de-uso" className="hover:text-[var(--brand-purple-800)]">
                Termos de Uso e Serviço
              </Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" className="hover:text-[var(--brand-purple-800)]">
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link href="/transparencia-e-acesso-a-informacao" className="hover:text-[var(--brand-purple-800)]">
                Transparência & Acesso à Informação
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Redes Sociais */}
        <div className="space-y-3">
          <h3 className="font-extrabold uppercase tracking-wider text-[var(--brand-purple-950)] text-xs">
            SIGA A TRIUNFO FM
          </h3>
          <div className="flex flex-wrap gap-2 text-[var(--brand-purple-950)]">
            <a
              href="#"
              className="flex size-9 items-center justify-center rounded-full bg-[var(--brand-purple-50)] hover:bg-[var(--brand-purple-100)]"
              title="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="#"
              className="flex size-9 items-center justify-center rounded-full bg-[var(--brand-purple-50)] hover:bg-[var(--brand-purple-100)]"
              title="Facebook"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="#"
              className="flex size-9 items-center justify-center rounded-full bg-[var(--brand-purple-50)] hover:bg-[var(--brand-purple-100)]"
              title="Youtube"
            >
              <Youtube className="size-4" />
            </a>
            <a
              href="#"
              className="flex size-9 items-center justify-center rounded-full bg-[var(--brand-purple-50)] hover:bg-[var(--brand-purple-100)]"
              title="WhatsApp"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        {/* Coluna 5: Fale Conosco */}
        <div className="space-y-3">
          <h3 className="font-extrabold uppercase tracking-wider text-[var(--brand-purple-950)] text-xs">
            FALE CONOSCO
          </h3>
          <ul className="space-y-2.5 font-medium">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-[var(--brand-purple-800)]" />
              <span>(87) 3846-0000</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 text-[var(--brand-purple-800)]" />
              <span>(87) 9 9999-9999</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-[var(--brand-purple-800)]" />
              <span>contato@triunfofm.com.br</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="size-4 shrink-0 text-[var(--brand-purple-800)] mt-0.5" />
              <span>
                Rua Antônio Henrique, 100
                <br />
                Centro, Triunfo - PE
              </span>
            </li>
          </ul>
        </div>
      </Container>

      {/* Direitos Autorais & Nota Legal */}
      <div className="border-t border-[var(--border-subtle)] pt-6 text-center text-[11px] text-[var(--text-secondary)] space-y-1">
        <p>Triunfo FM 87,9 MHz · Concessão de Radiodifusão em Triunfo/PE</p>
        <p className="text-slate-400">
          Em conformidade com a LGPD (Lei nº 13.709/18), Marco Civil da Internet (Lei nº 12.965/14) e LAI (Lei nº 12.527/11). Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
