import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { Award, Radio, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparência e Acesso à Informação (LAI) | Triunfo FM 87,9",
  description:
    "Portal de Transparência, dados institucionais da outorga de radiodifusão, equipe de redação e Linha Editorial da Rádio Triunfo FM 87,9 MHz em conformidade com a Lei de Acesso à Informação (Lei nº 12.527/2011).",
};

export default function TransparenciaPage() {
  return (
    <SiteFrame>
      <main className="bg-slate-50 text-slate-900 py-12 md:py-20">
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-10 space-y-3 border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-50)] px-3.5 py-1 text-xs font-black uppercase text-[var(--brand-purple-950)] border border-[var(--brand-purple-100)]">
              <Award className="size-4 text-[var(--brand-purple-800)]" />
              LEI DE ACESSO À INFORMAÇÃO (LEI Nº 12.527/2011)
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#12002b] sm:text-5xl">
              TRANSPARÊNCIA E LINHA EDITORIAL
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Dados institucionais, concessão de radiodifusão e compromisso com o jornalismo ético no Sertão do Pajeú
            </p>
          </div>

          {/* Content Document */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-4">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <Radio className="size-5 text-[var(--brand-purple-800)]" />
                1. Dados de Outorga e Concessão de Radiodifusão
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="block text-xs uppercase font-bold text-slate-500">Razão Social / Entidade</span>
                  <strong className="text-sm text-[#12002b]">Associação de Radiodifusão Comunitária de Triunfo</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="block text-xs uppercase font-bold text-slate-500">Frequência de Operação</span>
                  <strong className="text-sm text-[#12002b]">87,9 MHz (FM) · Canal 200</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="block text-xs uppercase font-bold text-slate-500">Município / UF</span>
                  <strong className="text-sm text-[#12002b]">Triunfo - Pernambuco (Sertão do Pajeú)</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="block text-xs uppercase font-bold text-slate-500">Órgão Regulador</span>
                  <strong className="text-sm text-[#12002b]">Ministério das Comunicações / ANATEL</strong>
                </div>
              </div>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <ShieldCheck className="size-5 text-[var(--brand-purple-800)]" />
                2. Princípios Editoriais e Código de Ética
              </h2>
              <p>
                A linha editorial do portal e da programação da <strong>Triunfo FM 87,9</strong> pauta-se pelo compromisso estrito com a verdade, a pluralidade de vozes, o respeito aos direitos humanos e a valorização da cultura pernambucana.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Checagem Rigorosa de Fatos:</strong> Toda notícia divulgada passa por verificação em fontes oficiais antes da veiculação no rádio ou no portal.</li>
                <li><strong>Direito de Resposta:</strong> Garantia constitucional de espaço proporcional para manifestação de partes citadas em matérias jornalísticas.</li>
                <li><strong>Isenção Política e Comunitária:</strong> Foco exclusivo no interesse público dos cidadãos de Triunfo e da região do Pajeú.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <Mail className="size-5 text-[var(--brand-purple-800)]" />
                3. Canais Oficiais de Atendimento à Sociedade (LAI)
              </h2>
              <p>Conforme previsto na Lei de Acesso à Informação, disponibilizamos os seguintes canais diretos:</p>
              <div className="grid sm:grid-cols-3 gap-3 pt-2 font-bold text-[#12002b]">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <Mail className="size-4 text-[var(--brand-purple-800)]" />
                  <span className="text-xs">redacao@triunfofm.com.br</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <Phone className="size-4 text-[var(--brand-purple-800)]" />
                  <span className="text-xs">(87) 3846-0000</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <MapPin className="size-4 text-[var(--brand-purple-800)]" />
                  <span className="text-xs">Triunfo - PE</span>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </SiteFrame>
  );
}
