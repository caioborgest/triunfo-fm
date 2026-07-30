"use client";

import { useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading2, ImagePlus, Italic, List, ListOrdered, Loader2, Redo2, Undo2 } from "lucide-react";

interface RichTextEditorProps {
  initialJson?: string | undefined;
  initialText?: string | undefined;
  onChange?: (json: string, text: string) => void;
}

const buttons = [
  { label: "Negrito", icon: Bold, active: "bold", run: (editor: NonNullable<ReturnType<typeof useEditor>>) => editor.chain().focus().toggleBold().run() },
  { label: "Itálico", icon: Italic, active: "italic", run: (editor: NonNullable<ReturnType<typeof useEditor>>) => editor.chain().focus().toggleItalic().run() },
  { label: "Título nível 2", icon: Heading2, active: "heading", run: (editor: NonNullable<ReturnType<typeof useEditor>>) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: "Lista com marcadores", icon: List, active: "bulletList", run: (editor: NonNullable<ReturnType<typeof useEditor>>) => editor.chain().focus().toggleBulletList().run() },
  { label: "Lista numerada", icon: ListOrdered, active: "orderedList", run: (editor: NonNullable<ReturnType<typeof useEditor>>) => editor.chain().focus().toggleOrderedList().run() },
] as const;

function textToContent(text?: string) {
  if (!text) return undefined;
  return {
    type: "doc",
    content: text.split(/\n{2,}/).map((paragraph) => ({
      type: "paragraph",
      content: paragraph.trim() ? [{ type: "text", text: paragraph.trim() }] : undefined,
    })),
  };
}

export function RichTextEditor({ initialJson, initialText, onChange }: RichTextEditorProps) {
  const [bodyJson, setBodyJson] = useState("");
  const [bodyText, setBodyText] = useState(initialText ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ inline: true, HTMLAttributes: { class: "rounded-lg max-w-full my-4" } }),
    ],
    content: initialJson ? JSON.parse(initialJson) : textToContent(initialText),
    editorProps: {
      attributes: {
        class: "prose-editor min-h-[420px] px-4 py-3 leading-8 focus:outline-none",
        "aria-label": "Corpo da matéria",
      },
    },
    onCreate: ({ editor: instance }) => {
      const json = JSON.stringify(instance.getJSON());
      const txt = instance.getText({ blockSeparator: "\n\n" });
      setBodyJson(json);
      setBodyText(txt);
      onChange?.(json, txt);
    },
    onUpdate: ({ editor: instance }) => {
      const json = JSON.stringify(instance.getJSON());
      const txt = instance.getText({ blockSeparator: "\n\n" });
      setBodyJson(json);
      setBodyText(txt);
      onChange?.(json, txt);
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Falha no upload");
      }

      const media = await response.json();
      editor.chain().focus().setImage({ src: media.publicUrl, alt: file.name }).run();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao carregar imagem.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border-control)] bg-white focus-within:ring-2 focus-within:ring-[var(--brand-purple-600)]">
      <div aria-label="Formatação do texto" className="flex flex-wrap items-center gap-1 border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-2" role="toolbar">
        {buttons.map(({ active, icon: Icon, label, run }) => (
          <button
            aria-label={label}
            aria-pressed={editor?.isActive(active) ?? false}
            className="grid size-11 place-items-center rounded-md hover:bg-white aria-pressed:bg-[var(--brand-purple-800)] aria-pressed:text-white"
            disabled={!editor}
            key={label}
            onClick={() => editor && run(editor)}
            type="button"
          >
            <Icon aria-hidden size={18} />
          </button>
        ))}

        <input
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          ref={fileInputRef}
          type="file"
        />

        <button
          aria-label="Inserir Imagem"
          className="flex size-11 items-center justify-center rounded-md hover:bg-white disabled:opacity-50"
          disabled={!editor || isUploading}
          onClick={() => fileInputRef.current?.click()}
          title="Inserir imagem no corpo da matéria"
          type="button"
        >
          {isUploading ? <Loader2 className="animate-spin" size={18} /> : <ImagePlus aria-hidden size={18} />}
        </button>

        <span aria-hidden className="mx-1 w-px bg-[var(--border-subtle)]" />
        <button aria-label="Desfazer" className="grid size-11 place-items-center rounded-md hover:bg-white" disabled={!editor?.can().undo()} onClick={() => editor?.chain().focus().undo().run()} type="button"><Undo2 aria-hidden size={18} /></button>
        <button aria-label="Refazer" className="grid size-11 place-items-center rounded-md hover:bg-white" disabled={!editor?.can().redo()} onClick={() => editor?.chain().focus().redo().run()} type="button"><Redo2 aria-hidden size={18} /></button>
      </div>
      <EditorContent editor={editor} />
      <input name="bodyJson" type="hidden" value={bodyJson} />
      <input name="bodyText" type="hidden" value={bodyText} />
    </div>
  );
}
