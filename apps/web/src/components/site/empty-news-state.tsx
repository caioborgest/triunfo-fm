import { Newspaper } from "lucide-react";

export function EmptyNewsState() {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--border-control)] bg-[var(--surface-subtle)] px-6 py-14 text-center sm:px-10">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)]">
        <Newspaper aria-hidden="true" size={26} />
      </span>
      <h3 className="mt-5 text-xl font-extrabold text-[var(--brand-purple-950)]">
        Nenhuma notícia publicada ainda
      </h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
        Quando a equipe editorial concluir a revisão e a publicação, as matérias
        aparecerão aqui automaticamente.
      </p>
    </div>
  );
}
