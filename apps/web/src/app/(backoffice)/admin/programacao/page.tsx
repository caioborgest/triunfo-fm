import { PageHeader } from "@/components/admin/page-header";
import { getPrograms } from "@/modules/radio/queries";
import { createProgramAction, deleteProgramAction } from "@/modules/radio/actions";
import { requireActor } from "@/lib/auth";
import { Radio, Plus, Trash2, User } from "lucide-react";

export default async function AdminProgramacaoPage() {
  await requireActor();
  const programs = await getPrograms();

  return (
    <div className="space-y-8">
      <PageHeader
        description="Cadastre programas da rádio e vincule locutores para exibição na grade de programação."
        eyebrow="Rádio Ao Vivo"
        title="Grade da Programação"
      />

      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--brand-purple-950)] mb-4 flex items-center gap-2">
          <Plus className="size-5 text-[var(--brand-purple-800)]" /> Cadastrar Novo Programa
        </h2>
        <form action={createProgramAction} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">
              Nome do Programa *
            </label>
            <input
              id="title"
              name="title"
              placeholder="Ex: Manhã Sertaneja"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="presenterName">
              Nome do Locutor / Apresentador(a)
            </label>
            <input
              id="presenterName"
              name="presenterName"
              placeholder="Ex: Carlos Alberto"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="scheduleText">
              Horário de Exibição (Texto Informativo)
            </label>
            <input
              id="scheduleText"
              name="scheduleText"
              placeholder="Ex: Segunda a Sexta, das 06h às 09h"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="description">
              Descrição do Programa
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="O melhor da música sertaneja e informação local..."
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-purple-900)]"
          >
            <Radio size={18} /> Cadastrar Programa
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)]">
          Programas Cadastrados ({programs.length})
        </h2>

        {programs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Nenhum programa cadastrado no momento. Cadastre o primeiro acima.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <div key={program.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-[var(--brand-purple-100)] px-2.5 py-0.5 text-xs font-bold text-[var(--brand-purple-800)]">
                      {program.scheduleText || "Horário a definir"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-[var(--brand-purple-950)]">{program.title}</h3>
                  {program.presenter && (
                    <p className="mt-1 text-xs font-semibold text-gray-600 flex items-center gap-1">
                      <User size={13} /> {program.presenter.name}
                    </p>
                  )}
                  {program.description && (
                    <p className="mt-2 text-sm text-gray-600">{program.description}</p>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-end">
                  <form action={async () => {
                    "use server";
                    await deleteProgramAction(program.id);
                  }}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={14} /> Excluir
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
