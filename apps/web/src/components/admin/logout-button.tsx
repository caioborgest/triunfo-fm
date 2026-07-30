"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      className="flex min-h-10 items-center gap-2 rounded-lg border border-white/20 px-3 text-sm font-semibold hover:bg-white/10 disabled:cursor-wait disabled:opacity-70"
      disabled={pending}
      onClick={signOut}
      type="button"
    >
      {pending ? <LoaderCircle aria-hidden className="animate-spin" size={18} /> : <LogOut aria-hidden size={18} />}
      {pending ? "Saindo…" : "Sair"}
    </button>
  );
}
