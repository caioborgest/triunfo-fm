"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Send, ShieldCheck, Info } from "lucide-react";
import { Container } from "@triunfo/ui";

export function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section
      className="py-16 bg-white text-slate-900 relative isolate overflow-hidden border-y border-slate-200 shadow-xs"
      id="newsletter"
    >
      {/* Subtle Background Glows */}
      <div className="absolute -top-24 -right-24 size-80 rounded-full bg-[var(--brand-gold-500)]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-[var(--brand-purple-600)]/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          {/* Left Side: Copy */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-50)] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[var(--brand-purple-950)] border border-[var(--brand-purple-100)]">
              <Mail className="size-3.5 text-[var(--brand-purple-800)]" />
              BOLETIM DE NOTÍCIAS DA CIDADE
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight text-[#12002b] sm:text-4xl leading-tight">
              RECEBA O BOLETIM DE TRIUNFO NO SEU E-MAIL
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Fique por dentro das últimas matérias de jornalismo, agenda de eventos e coberturas especiais em primeira mão. Conteúdo direto na sua caixa de entrada.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Sem spam
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600" />
                100% Gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-[var(--brand-purple-800)]" />
                Cancelamento a qualquer momento
              </span>
            </div>
          </div>

          {/* Right Side: Form (Email Only) */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            {subscribed ? (
              <div className="flex flex-col items-center text-center py-6 space-y-3">
                <span className="flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="text-xl font-black text-[#12002b]">Inscrição Confirmada!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                  Obrigado! Seu e-mail foi cadastrado com sucesso. Você passará a receber nosso boletim exclusivo sobre Triunfo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label
                  htmlFor="newsletter-email"
                  className="block text-xs font-black uppercase tracking-wider text-[#12002b]"
                >
                  DIGITE SEU E-MAIL
                </label>

                <div className="relative flex items-center">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full rounded-full bg-white px-5 py-4 pr-14 text-xs font-bold text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple-600)] shadow-xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 flex size-10 items-center justify-center rounded-full bg-[var(--brand-purple-950)] text-white shadow-md transition hover:bg-[var(--brand-purple-800)] hover:scale-105"
                    title="Inscrever e-mail"
                  >
                    <Send className="size-4 fill-current ml-0.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                  <Info className="size-3.5 text-[var(--brand-purple-800)] shrink-0" />
                  <span>
                    Enviado exclusivamente por e-mail. <strong>Não enviamos mensagens pelo WhatsApp.</strong>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
