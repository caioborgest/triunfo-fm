import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Entrar no painel",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <section className="flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-purple-800)]"
            href="/"
          >
            <ArrowLeft aria-hidden size={18} />
            Voltar ao portal
          </Link>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--brand-gold-900)]">
            Redação Triunfo FM
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-[var(--brand-purple-950)]">
            Entre no painel
          </h1>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            Acesso exclusivo para a equipe editorial autorizada.
          </p>
          <LoginForm />
        </div>
      </section>
      <aside className="hidden bg-[linear-gradient(145deg,var(--brand-purple-950),var(--brand-purple-600))] p-12 text-white lg:flex lg:flex-col lg:justify-end">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-gold-300)]">
            Fluxo editorial protegido
          </p>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight">
            Informação responsável, da pauta à publicação.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Crie, revise e publique com histórico completo e permissões claras.
          </p>
        </div>
      </aside>
    </main>
  );
}
