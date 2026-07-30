import sanitizeHtml from "sanitize-html";

const ARTICLE_ALLOWED_TAGS = [
  "p", "br", "h2", "h3", "h4", "blockquote", "strong", "em", "s",
  "ul", "ol", "li", "a", "figure", "figcaption", "img", "audio", "video", "source",
] as const;

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [...ARTICLE_ALLOWED_TAGS],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      audio: ["src", "controls", "preload"],
      video: ["src", "controls", "preload", "poster"],
      source: ["src", "type"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
      audio: ["http", "https"],
      video: ["http", "https"],
      source: ["http", "https"],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: {
          ...attributes,
          rel: attributes.target === "_blank" ? "noopener noreferrer" : "",
        },
      }),
    },
  }).trim();
}
