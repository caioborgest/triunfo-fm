import Link from "next/link";
import {
  FileCheck2,
  FileText,
  Gauge,
  Radio,
  Settings,
} from "lucide-react";
import { LogoutButton } from "./logout-button";

interface AdminShellProps {
  actor: {
    name: string;
    email: string;
  };
  children: React.ReactNode;
}

const navigation = [
  { href: "/admin", label: "Visão geral", icon: Gauge },
  { href: "/admin/conteudos", label: "Conteúdos", icon: FileText },
  { href: "/admin/editorial", label: "Revisão editorial", icon: FileCheck2 },
];

export function AdminShell({ actor, children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-subtle)] lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="flex flex-col border-b border-white/10 bg-[var(--brand-purple-950)] p-5 text-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <Link
          className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3"
          href="/"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-[var(--brand-gold-500)] text-[var(--text-primary)]">
            <Radio aria-hidden size={22} />
          </span>
          <span>
            <strong className="block">Triunfo FM</strong>
            <small className="text-white/70">Painel editorial</small>
          </span>
        </Link>

        <nav aria-label="Navegação administrativa" className="mt-8">
          <ul className="grid gap-2">
            {navigation.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  className="flex min-h-11 items-center gap-3 rounded-lg px-3 font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                  href={href}
                >
                  <Icon aria-hidden size={19} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 border-t border-white/15 pt-5 lg:mt-auto">
          <p className="font-bold">{actor.name}</p>
          <p className="mt-1 truncate text-sm text-white/65">{actor.email}</p>
          <div className="mt-4 flex gap-2">
            <Link
              aria-label="Configurações"
              className="grid size-10 place-items-center rounded-lg border border-white/20 hover:bg-white/10"
              href="/admin/configuracoes"
            >
              <Settings aria-hidden size={18} />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>
      <main className="min-w-0 p-5 md:p-8 lg:p-10">{children}</main>
    </div>
  );
}
