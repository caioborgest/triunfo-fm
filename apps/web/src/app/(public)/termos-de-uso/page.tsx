import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { FileText, Shield, Radio, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso e Serviço | Triunfo FM 87,9",
  description:
    "Termos de Uso do Portal e Rádio Triunfo FM 87,9, em conformidade com o Marco Civil da Internet (Lei nº 12.965/2014) e o Código de Defesa do Consumidor (Lei nº 8.078/1990).",
};

export default function TermosDeUsoPage() {
  return (
    <SiteFrame>
      <main className="bg-slate-50 text-slate-900 py-12 md:py-20">
        <Container className="max-w-4xl">
          {/* Header */}
          <div className="mb-10 space-y-3 border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-50)] px-3.5 py-1 text-xs font-black uppercase text-[var(--brand-purple-950)] border border-[var(--brand-purple-100)]">
              <FileText className="size-4 text-[var(--brand-purple-800)]" />
              MARCO CIVIL DA INTERNET (LEI Nº 12.965/2014)
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#12002b] sm:text-5xl">
              TERMOS DE USO E SERVIÇO
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Condições de utilização do portal e transmissões ao vivo da Rádio Triunfo FM 87,9
            </p>
          </div>

          {/* Content Document */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <Shield className="size-5 text-[var(--brand-purple-800)]" />
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar o portal da <strong>Triunfo FM 87,9</strong>, utilizar nosso player de áudio ou baixar o aplicativo móvel, o usuário concorda expressamente com as disposições estabelecidas nestes Termos de Uso, regidos pela legislação brasileira vigente, inclusive a <strong>Lei nº 12.965/2014 (Marco Civil da Internet)</strong> e a <strong>Lei nº 8.078/1990 (Código de Defesa do Consumidor)</strong>.
              </p>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b] flex items-center gap-2">
                <Radio className="size-5 text-[var(--brand-purple-800)]" />
                2. Propriedade Intelectual e Transmissões
              </h2>
              <p>
                Todo o conteúdo disponibilizado — incluindo marcas, textos jornalísticos, programas gravados, podcasts, fotografias e a marca <strong>Triunfo FM 87,9</strong> — é protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>É permitida a citação de matérias jornalísticas desde que creditada a fonte <strong>Triunfo FM 87,9</strong> com link direto para o conteúdo original.</li>
                <li>É proibida a retransmissão comercial do sinal de áudio da rádio sem autorização expressa e formal da direção da emissora.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                3. Responsabilidades e Conduta do Usuário
              </h2>
              <p>O usuário compromete-se a utilizar a plataforma de forma ética, sendo vedado:</p>
              <div className="space-y-2 text-slate-600">
                <p className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Utilizar os canais de contato da rádio para difusão de conteúdos ilícitos, discriminatórios ou difamatórios.</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tentar burlar sistemas de segurança ou sobrecarregar a infraestrutura dos servidores da rádio.</span>
                </p>
              </div>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                4. Disponibilidade do Serviço
              </h2>
              <p>
                A Triunfo FM busca manter a transmissão da rádio e o portal online 24 horas por dia. Contudo, interrupções temporárias decorrentes de manutenção técnica preventiva, problemas de infraestrutura de telecomunicações ou motivos de força maior não ensejam qualquer penalidade ou indenização.
              </p>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-black text-[#12002b]">
                5. Foro de Eleição
              </h2>
              <p>
                Para dirimir quaisquer controvérsias oriundas destes Termos de Uso, fica eleito o Foro da Comarca de <strong>Triunfo, Estado de Pernambuco</strong>, renunciando a qualquer outro por mais privilegiado que seja.
              </p>
            </section>
          </div>
        </Container>
      </main>
    </SiteFrame>
  );
}
