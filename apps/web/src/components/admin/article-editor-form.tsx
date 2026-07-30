"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Save, Send, ImagePlus, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";

export interface ArticleEditorValues {
  title?: string | undefined;
  subtitle?: string | undefined;
  summary?: string | undefined;
  proposedSlug?: string | undefined;
  bodyText?: string | undefined;
  bodyJson?: string | undefined;
  categoryId?: string | undefined;
  authorProfileId?: string | undefined;
  heroMediaAssetId?: string | undefined;
  heroAltText?: string | undefined;
  heroCaption?: string | undefined;
  heroCredit?: string | undefined;
  sourceName?: string | undefined;
  sourceUrl?: string | undefined;
  contentKind?: string | undefined;
  location?: string | undefined;
  sponsorDisclosure?: string | undefined;
  isExclusive?: boolean | undefined;
  isSensitive?: boolean | undefined;
}

interface ArticleEditorFormProps {
  action: (formData: FormData) => void | Promise<void>;
  values?: ArticleEditorValues;
  submitLabel?: string;
  articleId?: string;
  articleVersion?: number;
  workingCopyVersion?: number;
  authors?: ReadonlyArray<{ id: string; displayName: string }>;
  categories?: ReadonlyArray<{ id: string; name: string }>;
}

export function ArticleEditorForm({
  action,
  values,
  submitLabel = "Salvar rascunho",
  articleId,
  articleVersion,
  workingCopyVersion: initialWcVersion,
  authors = [],
  categories = [],
}: ArticleEditorFormProps) {
  // Form states for autosave & hero image
  const [wcVersion, setWcVersion] = useState(initialWcVersion);
  const [heroAssetId, setHeroAssetId] = useState(values?.heroMediaAssetId ?? "");
  const [heroPreviewUrl, setHeroPreviewUrl] = useState("");
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Form values tracking for autosave
  const [formState, setFormState] = useState({
    title: values?.title ?? "",
    subtitle: values?.subtitle ?? "",
    proposedSlug: values?.proposedSlug ?? "",
    summary: values?.summary ?? "",
    bodyJson: values?.bodyJson ?? "",
    bodyText: values?.bodyText ?? "",
    categoryId: values?.categoryId ?? "",
    authorProfileId: values?.authorProfileId ?? "",
    location: values?.location ?? "",
    contentKind: values?.contentKind ?? "NEWS",
    sourceName: values?.sourceName ?? "",
    sourceUrl: values?.sourceUrl ?? "",
    isExclusive: values?.isExclusive ?? false,
    isSensitive: values?.isSensitive ?? false,
  });

  const heroInputRef = useRef<HTMLInputElement>(null);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Handle Hero Image Upload
  const handleHeroUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingHero(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao enviar imagem principal.");
      }

      const media = await response.json();
      setHeroAssetId(media.id);
      setHeroPreviewUrl(media.publicUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro no upload da imagem principal.");
    } finally {
      setIsUploadingHero(false);
    }
  };

  // Perform Debounced Autosave
  const performAutosave = useCallback(async () => {
    if (!articleId || articleVersion === undefined || wcVersion === undefined) return;
    if (!formState.title.trim()) return; // Don't autosave empty title

    try {
      setAutosaveStatus("saving");
      const response = await fetch("/api/admin/conteudos/autosave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          articleVersion,
          workingCopyVersion: wcVersion,
          heroMediaAssetId: heroAssetId || null,
          ...formState,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na resposta do servidor.");
      }

      const data = await response.json();
      if (data.workingCopyVersion) {
        setWcVersion(data.workingCopyVersion);
      }
      setAutosaveStatus("saved");
      setLastSavedTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch {
      setAutosaveStatus("error");
    }
  }, [articleId, articleVersion, wcVersion, heroAssetId, formState]);

  // Trigger autosave on state changes (debounced 2.5s)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!articleId) return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      performAutosave();
    }, 2500);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [formState, heroAssetId, articleId, performAutosave]);

  const updateField = (field: string, value: unknown) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {articleId ? <input name="articleId" type="hidden" value={articleId} /> : null}
      {articleVersion !== undefined ? <input name="articleVersion" type="hidden" value={articleVersion} /> : null}
      {wcVersion !== undefined ? <input name="workingCopyVersion" type="hidden" value={wcVersion} /> : null}
      {heroAssetId ? <input name="heroMediaAssetId" type="hidden" value={heroAssetId} /> : null}

      <section className="space-y-6">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-5 md:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <legend className="text-lg font-extrabold text-[var(--brand-purple-950)]">
              Identidade da matéria
            </legend>
            {articleId && (
              <div className="flex items-center gap-2 text-xs font-semibold">
                {autosaveStatus === "saving" && (
                  <span className="flex items-center gap-1.5 text-amber-600">
                    <Loader2 className="animate-spin" size={14} /> Salvando rascunho...
                  </span>
                )}
                {autosaveStatus === "saved" && (
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 size={14} /> Rascunho salvo {lastSavedTime ? `às ${lastSavedTime}` : ""}
                  </span>
                )}
                {autosaveStatus === "error" && (
                  <span className="flex items-center gap-1.5 text-red-600">
                    <AlertCircle size={14} /> Erro ao salvar rascunho
                  </span>
                )}
              </div>
            )}
          </div>

          <fieldset className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="title">
                Título
              </label>
              <input
                className="min-h-12 w-full rounded-lg border border-[var(--border-control)] px-4"
                defaultValue={values?.title}
                id="title"
                maxLength={180}
                name="title"
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="subtitle">
                Subtítulo
              </label>
              <input
                className="min-h-12 w-full rounded-lg border border-[var(--border-control)] px-4"
                defaultValue={values?.subtitle}
                id="subtitle"
                maxLength={240}
                name="subtitle"
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold" htmlFor="slug">
                  Slug proposto
                </label>
                <input
                  className="min-h-12 w-full rounded-lg border border-[var(--border-control)] px-4"
                  defaultValue={values?.proposedSlug}
                  id="slug"
                  name="proposedSlug"
                  onChange={(e) => updateField("proposedSlug", e.target.value)}
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  placeholder="titulo-da-materia"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold" htmlFor="contentKind">
                  Natureza
                </label>
                <select
                  className="min-h-12 w-full rounded-lg border border-[var(--border-control)] bg-white px-4"
                  defaultValue={values?.contentKind ?? "NEWS"}
                  id="contentKind"
                  name="contentKind"
                  onChange={(e) => updateField("contentKind", e.target.value)}
                >
                  <option value="NEWS">Notícia</option>
                  <option value="OPINION">Opinião</option>
                  <option value="COMMUNIQUE">Comunicado</option>
                  <option value="SPONSORED">Conteúdo patrocinado</option>
                  <option value="DEMONSTRATION">Conteúdo de demonstração</option>
                </select>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold" htmlFor="authorProfileId">Autor</label>
                <select
                  className="min-h-12 w-full rounded-lg border border-[var(--border-control)] bg-white px-4"
                  defaultValue={values?.authorProfileId ?? ""}
                  id="authorProfileId"
                  name="authorProfileId"
                  onChange={(e) => updateField("authorProfileId", e.target.value)}
                  required
                >
                  <option disabled value="">Selecione o autor</option>
                  {authors.map((author) => <option key={author.id} value={author.id}>{author.displayName}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold" htmlFor="categoryId">Editoria</label>
                <select
                  className="min-h-12 w-full rounded-lg border border-[var(--border-control)] bg-white px-4"
                  defaultValue={values?.categoryId ?? ""}
                  id="categoryId"
                  name="categoryId"
                  onChange={(e) => updateField("categoryId", e.target.value)}
                  required
                >
                  <option disabled value="">Selecione a editoria</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="summary">
                Resumo
              </label>
              <textarea
                className="min-h-28 w-full rounded-lg border border-[var(--border-control)] p-4 leading-7"
                defaultValue={values?.summary}
                id="summary"
                maxLength={360}
                name="summary"
                onChange={(e) => updateField("summary", e.target.value)}
                required
              />
            </div>
          </fieldset>
        </div>

        {/* Hero Image / Principal Media Section */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-5 md:p-7">
          <h2 className="mb-4 text-lg font-extrabold text-[var(--brand-purple-950)]">
            Imagem Principal (Destaque)
          </h2>
          <div className="flex flex-col gap-4">
            <input accept="image/*" className="hidden" onChange={handleHeroUpload} ref={heroInputRef} type="file" />
            {heroPreviewUrl ? (
              <div className="relative overflow-hidden rounded-lg border border-[var(--border-subtle)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Preview principal" className="max-h-64 w-full object-cover" src={heroPreviewUrl} />
                <button
                  className="absolute right-2 top-2 rounded bg-black/70 px-3 py-1 text-xs font-bold text-white hover:bg-black"
                  onClick={() => heroInputRef.current?.click()}
                  type="button"
                >
                  Trocar imagem
                </button>
              </div>
            ) : (
              <button
                className="flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[var(--border-control)] bg-[var(--surface-subtle)] p-6 text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--brand-purple-600)] hover:bg-purple-50/50"
                disabled={isUploadingHero}
                onClick={() => heroInputRef.current?.click()}
                type="button"
              >
                {isUploadingHero ? (
                  <Loader2 className="animate-spin text-[var(--brand-purple-800)]" size={24} />
                ) : (
                  <>
                    <ImagePlus className="text-[var(--brand-purple-800)]" size={28} />
                    <span>Clique para enviar a imagem de capa da matéria</span>
                  </>
                )}
              </button>
            )}

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-bold" htmlFor="heroAltText">Texto alternativo (Alt)</label>
                <input className="min-h-10 w-full rounded border border-[var(--border-control)] px-3 text-sm" defaultValue={values?.heroAltText} id="heroAltText" name="heroAltText" placeholder="Descrição para leitores de tela" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold" htmlFor="heroCaption">Legenda</label>
                <input className="min-h-10 w-full rounded border border-[var(--border-control)] px-3 text-sm" defaultValue={values?.heroCaption} id="heroCaption" name="heroCaption" placeholder="Legenda exibida com a foto" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold" htmlFor="heroCredit">Crédito fotográfico</label>
                <input className="min-h-10 w-full rounded border border-[var(--border-control)] px-3 text-sm" defaultValue={values?.heroCredit} id="heroCredit" name="heroCredit" placeholder="Foto: Nome do Fotógrafo / Agência" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-5 md:p-7">
          <label className="mb-4 block text-lg font-extrabold text-[var(--brand-purple-950)]" htmlFor="bodyText">
            Corpo da matéria
          </label>
          <RichTextEditor
            initialJson={values?.bodyJson}
            initialText={values?.bodyText}
            onChange={(json, text) => {
              updateField("bodyJson", json);
              updateField("bodyText", text);
            }}
          />
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-5">
          <h2 className="font-extrabold text-[var(--brand-purple-950)]">
            Fonte principal
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="sourceName">
                Nome da fonte
              </label>
              <input
                className="min-h-11 w-full rounded-lg border border-[var(--border-control)] px-3"
                defaultValue={values?.sourceName}
                id="sourceName"
                name="sourceName"
                onChange={(e) => updateField("sourceName", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="sourceUrl">
                URL, quando aplicável
              </label>
              <input
                className="min-h-11 w-full rounded-lg border border-[var(--border-control)] px-3"
                defaultValue={values?.sourceUrl}
                id="sourceUrl"
                name="sourceUrl"
                onChange={(e) => updateField("sourceUrl", e.target.value)}
                type="url"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-5">
          <h2 className="font-extrabold text-[var(--brand-purple-950)]">Contexto e transparência</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-bold" htmlFor="location">Localidade
              <input className="mt-2 min-h-11 w-full rounded-lg border border-[var(--border-control)] px-3 font-normal" defaultValue={values?.location} id="location" name="location" onChange={(e) => updateField("location", e.target.value)} />
            </label>
            <label className="block text-sm font-bold" htmlFor="sponsorDisclosure">Identificação de patrocínio
              <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--border-control)] p-3 font-normal" defaultValue={values?.sponsorDisclosure} id="sponsorDisclosure" name="sponsorDisclosure" />
            </label>
            <label className="flex min-h-11 items-center gap-3 text-sm font-bold"><input defaultChecked={values?.isExclusive} name="isExclusive" onChange={(e) => updateField("isExclusive", e.target.checked)} type="checkbox" /> Conteúdo exclusivo</label>
            <label className="flex min-h-11 items-center gap-3 text-sm font-bold"><input defaultChecked={values?.isSensitive} name="isSensitive" onChange={(e) => updateField("isSensitive", e.target.checked)} type="checkbox" /> Conteúdo sensível</label>
          </div>
        </div>

        <div className="sticky bottom-4 rounded-xl border border-[var(--border-subtle)] bg-white p-4 shadow-lg">
          <button
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-4 font-bold text-white hover:bg-[var(--brand-purple-950)]"
            type="submit"
          >
            <Save aria-hidden size={19} />
            {submitLabel}
          </button>
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-[var(--text-secondary)]">
            <Send aria-hidden size={15} />
            O envio para revisão é uma ação separada.
          </p>
        </div>
      </aside>
    </form>
  );
}
