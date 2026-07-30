type TipTapMark = { type?: string; attrs?: Record<string, unknown> };
type TipTapNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: TipTapMark[];
  content?: TipTapNode[];
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeLink(attrs?: Record<string, unknown>): string | null {
  if (typeof attrs?.href !== "string") return null;
  try {
    const url = new URL(attrs.href);
    return ["http:", "https:"].includes(url.protocol) ? escapeHtml(url.toString()) : null;
  } catch {
    return null;
  }
}

function applyMarks(value: string, marks: TipTapMark[] = []): string {
  return marks.reduce((html, mark) => {
    if (mark.type === "bold") return `<strong>${html}</strong>`;
    if (mark.type === "italic") return `<em>${html}</em>`;
    if (mark.type === "strike") return `<s>${html}</s>`;
    if (mark.type === "code") return `<code>${html}</code>`;
    if (mark.type === "link") {
      const href = safeLink(mark.attrs);
      return href ? `<a href="${href}" rel="noopener noreferrer">${html}</a>` : html;
    }
    return html;
  }, value);
}

function renderNode(node: TipTapNode): string {
  if (node.type === "text") return applyMarks(escapeHtml(node.text ?? ""), node.marks);
  if (node.type === "hardBreak") return "<br>";
  if (node.type === "horizontalRule") return "<hr>";

  const content = (node.content ?? []).map(renderNode).join("");
  if (node.type === "doc") return content;
  if (node.type === "paragraph") return `<p>${content}</p>`;
  if (node.type === "blockquote") return `<blockquote>${content}</blockquote>`;
  if (node.type === "bulletList") return `<ul>${content}</ul>`;
  if (node.type === "orderedList") return `<ol>${content}</ol>`;
  if (node.type === "listItem") return `<li>${content}</li>`;
  if (node.type === "heading") {
    const level = node.attrs?.level === 3 ? 3 : 2;
    return `<h${level}>${content}</h${level}>`;
  }
  return content;
}

export function parseTipTapJson(value: string): TipTapNode {
  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || (parsed as TipTapNode).type !== "doc") {
    throw new Error("Documento editorial inválido.");
  }
  return parsed as TipTapNode;
}

export function renderTipTapHtml(document: TipTapNode): string {
  return renderNode(document);
}
