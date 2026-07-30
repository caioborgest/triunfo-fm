import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { ShieldCheck, Lock, Mail, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD) | Triunfo FM 87,9",
  description:
    "Conheça a Política de Privacidade e Proteção de Dados da Triunfo FM 87,9, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <SiteFrame>
      <main className="bg-slate-50 text-slate-900 py-12 md:py-20">
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-10 space-y-3 border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-50)] px-3.5 py-1 text-xs font-black uppercase text-[var(--brand-purple-950)] border border-[var(--brand-purple-100)]">
              <ShieldCheck className="size-4 text-[var(--brand-purple-800)]" />
              LEI GERAL DE PROTEÇÃO DE DADOS (LEI Nº 13.709/2018)
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#12002b] sm:text-5xl">
              POLÍTICA DE PRIVACIDADE
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Última atualização: {new Date().toLocaleDateString("pt-BR")} · Rádio Triunfo FM 87,9 MHz
            </p>
          </div>

          {/* Content Document */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <Lock className="size-5 text-[var(--brand-purple-800)]" />
                1. Compromisso com a Privacidade
              </h2>
              <p>
                A <strong>Rádio Triunfo FM 87,9 MHz</strong>, com sede em Triunfo - PE, compromete-se com a segurança e a transparência no tratamento dos dados pessoais de seus ouvintes, leitores e usuários do portal e aplicativo móvel. Esta Política de Privacidade foi elaborada em estrita observância à <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong> e ao <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong>.
              </p>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                2. Dados Pessoais Coletados e Finalidades
              </h2>
              <p>Coletamos dados estritamente necessários para prestação dos nossos serviços de radiodifusão e jornalismo digital:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>
                  <strong>Inscrição no Boletim por E-mail (Newsletter):</strong> Coletamos exclusivamente o seu endereço de e-mail com a finalidade de enviar resumos jornalísticos e coberturas de eventos de Triunfo.
                </li>
                <li>
                  <strong>Formulário de Contato e Ouvidoria:</strong> Nome, e-mail e telefone fornecidos voluntariamente para atendimento de solicitações ou participação ao vivo na programação da rádio.
                </li>
                <li>
                  <strong>Dados de Navegação Técnica:</strong> Endereço IP, tipo de navegador e dados anônimos de acesso ao player de áudio para fins de medição de audiência e aprimoramento da transmissão.
                </li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                3. Direitos do Titular de Dados (Artigo 18 da LGPD)
              </h2>
              <p>O usuário possui direito de solicitar a qualquer momento:</p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-[#12002b] block">Confirmação e Acesso</strong>
                  <span>Saber se tratamos seus dados e acessar as informações mantidas.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-[#12002b] block">Correção e Atualização</strong>
                  <span>Corrigir dados incompletos, inexatos ou desatualizados.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-[#12002b] block">Eliminação e Revogação</strong>
                  <span>Solicitar a exclusão permanente do seu e-mail do nosso boletim.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-[#12002b] block">Portabilidade</strong>
                  <span>Receber os dados em formato estruturado quando aplicável.</span>
                </div>
              </div>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                4. Compartilhamento e Não Comercialização
              </h2>
              <p>
                A Triunfo FM <strong>não vende, aluga ou compartilha dados pessoais</strong> com terceiros para fins de marketing direto. O envio do boletim informativo é feito diretamente por nossas ferramentas com garantia de confidencialidade.
              </p>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                5. Encarregado pelo Tratamento de Dados (DPO / LGPD)
              </h2>
              <p>
                Para exercer seus direitos de titular de dados ou esclarecer dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados:
              </p>
              <div className="flex items-center gap-3 p-4 bg-[var(--brand-purple-50)] rounded-2xl border border-[var(--brand-purple-100)] text-[#12002b] font-bold">
                <Mail className="size-5 text-[var(--brand-purple-800)] shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold">E-mail do DPO / Ouvidoria LGPD</span>
                  <span>dpo@triunfofm.com.br</span>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </SiteFrame>
  );
}
