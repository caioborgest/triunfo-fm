import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { Cookie, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Triunfo FM 87,9",
  description:
    "Saiba como a Triunfo FM 87,9 utiliza cookies para garantir a reprodução de áudio, segurança e navegação personalizada, em conformidade com as diretrizes da LGPD e ANPD.",
};

export default function PoliticaDeCookiesPage() {
  return (
    <SiteFrame>
      <main className="bg-slate-50 text-slate-900 py-12 md:py-20">
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-10 space-y-3 border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-50)] px-3.5 py-1 text-xs font-black uppercase text-[var(--brand-purple-950)] border border-[var(--brand-purple-100)]">
              <Cookie className="size-4 text-[var(--brand-purple-800)]" />
              TRANSPARÊNCIA E NAVEGAÇÃO
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#12002b] sm:text-5xl">
              POLÍTICA DE COOKIES
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Diretrizes de utilização de cookies e tecnologias de armazenamento local na Triunfo FM 87,9
            </p>
          </div>

          {/* Content Document */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <ShieldCheck className="size-5 text-[var(--brand-purple-800)]" />
                1. O que são Cookies?
              </h2>
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita o portal da <strong>Triunfo FM 87,9</strong>. Eles servem para reconhecer suas preferências, manter a reprodução contínua do rádio ao vivo enquanto você navega pelas matérias e garantir a segurança da navegação.
              </p>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                2. Tipos de Cookies que Utilizamos
              </h2>
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="font-black text-[#12002b] text-base flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    Cookies Essenciais do Player de Áudio
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Indispensáveis para salvar o estado de reprodução (play/pause), o volume selecionado pelo ouvinte e garantir que a rádio permaneça tocando em segundo plano.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="font-black text-[#12002b] text-base flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    Cookies de Desempenho e Audiência
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Coletam dados estatísticos agregados e totalmente anônimos sobre as matérias mais lidas e o número de ouvintes conectados simultaneamente, sem identificar o usuário pessoalmente.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                3. Gerenciamento e Desativação de Cookies
              </h2>
              <p>
                Você pode alterar as permissões de cookies a qualquer momento através das configurações do seu navegador de internet (Google Chrome, Firefox, Safari ou Edge). Note que desativar os cookies essenciais pode afetar a continuidade da reprodução da rádio ao vivo.
              </p>
            </section>
          </div>
        </Container>
      </main>
    </SiteFrame>
  );
}
