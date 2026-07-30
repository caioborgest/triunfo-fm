import { Play, ShieldCheck, Radio, Bell, Smartphone, QrCode } from "lucide-react";
import { Container } from "@triunfo/ui";

export function AppDownloadSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#12002b] via-[#220054] to-[#38007e] text-white relative isolate overflow-hidden border-t border-white/10" id="app">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-10 size-96 rounded-full bg-[var(--brand-purple-600)]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-96 rounded-full bg-[var(--brand-gold-500)]/15 blur-[100px] pointer-events-none" />

      <Container className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Left Side: Copy and App Store Downloads */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15 text-xs font-black uppercase tracking-wider text-[var(--brand-gold-300)]">
            <Smartphone className="size-4 text-[var(--brand-gold-500)]" />
            APLICATIVO OFICIAL MÓVEL
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl leading-tight">
            LEVE A TRIUNFO FM COM VOCÊ EM QUALQUER LUGAR
          </h2>

          <p className="text-base text-white/80 leading-relaxed font-medium">
            Ouça a rádio ao vivo em alta definição, receba alertas de notícias urgentes de Triunfo e acesse seus podcasts favoritos com consumo mínimo de dados.
          </p>

          {/* Key App Features */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-bold text-white/90">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black">
                <Radio className="size-4" />
              </span>
              Streaming contínuo HD com reconexão automática
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-white/90">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black">
                <Bell className="size-4" />
              </span>
              Notificações push de notícias e plantões urgentes
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-white/90">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black">
                <ShieldCheck className="size-4" />
              </span>
              100% gratuito e compatível com iOS e Android
            </div>
          </div>

          {/* Download Buttons */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 px-5 py-3 border border-white/20 transition-all hover:scale-105 shadow-xl"
            >
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-white/70">DISPONÍVEL NO</span>
                <span className="block text-base font-black text-white leading-none">Google Play</span>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 px-5 py-3 border border-white/20 transition-all hover:scale-105 shadow-xl"
            >
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-white/70">DISPONÍVEL NA</span>
                <span className="block text-base font-black text-white leading-none">App Store</span>
              </div>
            </a>

            <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-black/40 p-2.5 border border-white/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white text-black">
                <QrCode className="size-6" />
              </div>
              <span className="text-[11px] font-bold text-white/70 leading-tight">
                Escaneie para<br/><strong className="text-white">Baixar o App</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Realistic Mobile App Screen Mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[300px] sm:w-[340px] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.8)] ring-1 ring-white/20">
            {/* Notch / Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-28 rounded-full bg-black z-30" />

            {/* Mobile App Screen Content */}
            <div className="relative flex flex-col h-[580px] rounded-[36px] bg-gradient-to-b from-[#1c033c] via-[var(--brand-purple-950)] to-[#100224] p-4 text-white overflow-hidden border border-white/10 pt-8">
              {/* App Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black tracking-tight text-[var(--brand-gold-500)]">TRIUNFO FM</span>
                  <span className="text-xs font-bold text-white/60">87,9</span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-400 border border-emerald-500/30">
                  ● AO VIVO HD
                </span>
              </div>

              {/* Host & Show Card in App */}
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Locutor no Ar"
                    className="size-24 rounded-full border-3 border-[var(--brand-gold-500)] object-cover shadow-xl"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[var(--brand-gold-500)] px-2 py-0.5 text-[8px] font-black uppercase text-black">
                    NO AR
                  </span>
                </div>

                <h4 className="mt-4 text-xl font-black tracking-tight">Manhã Triunfo</h4>
                <p className="text-xs text-[var(--brand-gold-300)] font-bold">Com João Almeida · 06h às 09h</p>
                <p className="mt-2 text-xs text-white/70 truncate max-w-[240px]">
                  Tocando: Alceu Valença - Anunciação
                </p>
              </div>

              {/* Waveform Equalizer */}
              <div className="mt-6 flex h-8 items-end justify-between gap-1 px-4">
                {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 60, 85, 40, 65].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 rounded-full bg-[var(--brand-gold-500)] animate-pulse"
                  />
                ))}
              </div>

              {/* Big App Play Controls */}
              <div className="mt-6 flex items-center justify-center">
                <button className="flex size-16 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black shadow-xl">
                  <Play className="size-8 fill-current ml-1" />
                </button>
              </div>

              {/* App Navigation Bottom Tabs */}
              <div className="mt-auto border-t border-white/10 pt-3 flex items-center justify-around text-[10px] font-bold text-white/60">
                <span className="text-[var(--brand-gold-500)] flex flex-col items-center gap-0.5">
                  <Radio className="size-4" />
                  Rádio
                </span>
                <span className="flex flex-col items-center gap-0.5">
                  <Smartphone className="size-4" />
                  Notícias
                </span>
                <span className="flex flex-col items-center gap-0.5">
                  <Bell className="size-4" />
                  Alertas
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
