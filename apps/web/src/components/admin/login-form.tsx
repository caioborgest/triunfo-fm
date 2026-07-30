"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/admin",
    });

    if (result.error) {
      setError("Não foi possível entrar. Confira os dados e tente novamente.");
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="email">
          E-mail
        </label>
        <input
          autoComplete="username"
          className="min-h-12 w-full rounded-lg border border-[var(--border-control)] px-4 focus:border-[var(--brand-purple-600)]"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="password">
          Senha
        </label>
        <input
          autoComplete="current-password"
          className="min-h-12 w-full rounded-lg border border-[var(--border-control)] px-4 focus:border-[var(--brand-purple-600)]"
          id="password"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </div>
      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[var(--feedback-error)]"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 font-bold text-white transition hover:bg-[var(--brand-purple-950)] disabled:cursor-wait disabled:opacity-70"
        disabled={pending}
        type="submit"
      >
        {pending ? (
          <LoaderCircle aria-hidden className="animate-spin" size={20} />
        ) : (
          <LockKeyhole aria-hidden size={20} />
        )}
        {pending ? "Entrando…" : "Entrar no painel"}
      </button>
    </form>
  );
}
