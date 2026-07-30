import { PageHeader } from "@/components/admin/page-header";
import { requireActor } from "@/lib/auth";

export default async function SettingsPage() {
  const actor = await requireActor();

  return (
    <>
      <PageHeader description="Resumo somente leitura do acesso efetivo desta sessão." eyebrow="Segurança" title="Meu acesso" />
      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div><dt className="text-sm font-bold text-[var(--text-secondary)]">Usuário</dt><dd className="mt-1 font-extrabold">{actor.name}</dd><dd className="text-sm">{actor.email}</dd></div>
          <div><dt className="text-sm font-bold text-[var(--text-secondary)]">Papéis</dt><dd className="mt-1 font-extrabold">{actor.roleKeys.join(", ") || "Nenhum papel ativo"}</dd></div>
        </dl>
        <h2 className="mt-8 font-extrabold text-[var(--brand-purple-950)]">Permissões efetivas</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {actor.grants.map((grant) => <li className="rounded-lg bg-[var(--surface-subtle)] px-3 py-2 font-mono text-sm" key={`${grant.resource}.${grant.action}:${grant.scope}`}>{grant.resource}.{grant.action}:{grant.scope}</li>)}
        </ul>
      </section>
    </>
  );
}
