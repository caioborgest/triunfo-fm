import Link from "next/link";
import { ArrowRight, FileCheck2, FilePlus2, ShieldCheck, Youtube, Radio, Compass, Calendar, Mic, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { requireActor } from "@/lib/auth";

const cards = [
  {
    href: "/admin/conteudos/novo",
    title: "Criar matéria",
    description: "Comece um rascunho com autoria, fonte e estrutura editorial.",
    icon: FilePlus2,
  },
  {
    href: "/admin/editorial",
    title: "Fila editorial",
    description: "Revise, solicite alterações, endosse e aprove revisões exatas.",
    icon: FileCheck2,
  },
  {
    href: "/admin/anunciantes",
    title: "Patrocinadores",
    description: "Cadastre marcas e banners comerciais com anexo e link de destino.",
    icon: Megaphone,
  },
  {
    href: "/admin/youtube",
    title: "Canal do YouTube",
    description: "Cadastre e organize vídeos em destaque na capa do portal.",
    icon: Youtube,
  },
  {
    href: "/admin/programacao",
    title: "Grade da Rádio",
    description: "Gerencie a programação semanal, locutores e horários no ar.",
    icon: Radio,
  },
  {
    href: "/admin/turismo",
    title: "Guia de Turismo",
    description: "Cadastre atrativos, ecoturismo, restaurantes e cachaçarias.",
    icon: Compass,
  },
  {
    href: "/admin/eventos",
    title: "Agenda de Eventos",
    description: "Gerencie eventos culturais e festivos da cidade de Triunfo.",
    icon: Calendar,
  },
  {
    href: "/admin/podcasts",
    title: "Podcasts & Episódios",
    description: "Publique programas em áudio, episódios e transcrições.",
    icon: Mic,
  },
] as const;

export default async function AdminDashboardPage() {
  const actor = await requireActor();

  return (
    <>
      <PageHeader
        description={`Olá, ${actor.name}. Acompanhe o ecossistema e gerencie o portal Triunfo FM.`}
        eyebrow="Visão geral"
        title="Painel Administrativo"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ description, href, icon: Icon, title }) => (
          <Link className="group rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href={href} key={href}>
            <span className="grid size-12 place-items-center rounded-xl bg-[var(--brand-purple-800)] text-white"><Icon aria-hidden size={23} /></span>
            <h2 className="mt-5 text-xl font-extrabold text-[var(--brand-purple-950)]">{title}</h2>
            <p className="mt-2 leading-7 text-[var(--text-secondary)]">{description}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-bold text-[var(--brand-purple-800)]">Abrir <ArrowRight aria-hidden className="transition group-hover:translate-x-1" size={18} /></span>
          </Link>
        ))}
      </div>
      <section className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
        <h2 className="flex items-center gap-2 font-extrabold"><ShieldCheck aria-hidden size={20} /> Acesso verificado</h2>
        <p className="mt-2 text-sm leading-6">Papéis ativos: {actor.roleKeys.join(", ") || "nenhum"}. Cada ação no painel possui rastreamento e auditoria.</p>
      </section>
    </>
  );
}
