# Status da implementação

Atualizado em 2026-07-30.

## Concluído (Release 1, 2, 3 e 4)

- **Fundação do monorepositório**: pnpm workspaces, Next.js App Router, TypeScript strict, Vitest, Tailwind, UI Kit (`@triunfo/ui`), SEO (`@triunfo/seo`).
- **Banco de dados e modelo lógico**: Prisma ORM, enums de status editorial (`DRAFT/IN_REVIEW/CHANGES_REQUESTED/APPROVED`), `PublicationStatus`, `WorkingCopy`, `ArticleRevision`, `YouTubeVideo`, `Program`, `Presenter`, `ScheduleSlot`, `TouristSpot`, `Event`, `Podcast` e `PodcastEpisode`.
- **Autenticação e RBAC**: Sessão revogável, guards por permissões (`article.edit`, `article.submit`, `article.review`, `article.approve`, `article.publish`).
- **CMS e Editoria (Admin)**: Formulário de matérias, autosave transparente com debounce de 2.5s, upload de mídias (`/api/media/upload`), imagem principal (Hero Image), editor rico TipTap.
- **Workflow Editorial e Auditoria**: Fila do revisor (`/admin/editorial`), ações de transição, componente visual [`EditorialTimeline`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/components/admin/editorial-timeline.tsx) com histórico de revisões.
- **Módulos Administrativos do Ecossistema**:
  - `/admin/youtube`: Gerenciamento de vídeos do canal com extração automática de ID e ordenação.
  - `/admin/programacao`: Gerenciamento da grade de programação da rádio e locutores.
  - `/admin/turismo`: Cadastro e edição de atrativos turísticos e estabelecimentos de Triunfo.
  - `/admin/eventos`: Gerenciamento da agenda cultural e festividades de Triunfo.
  - `/admin/podcasts`: Gestão de podcasts originais e episódios gravados.
- **Portal Público e SEO**:
  - Homepage (`/`) com matérias publicadas, notícias, agenda, guia turístico, podcasts e vídeos do YouTube dinâmicos.
  - Página da Notícia ([`/noticias/[slug]`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/%28public%29/noticias/%5Bslug%5D/page.tsx)) com dados estruturados JSON-LD e OpenGraph.
  - Banner Artístico Cultural dos Caretas de Triunfo ([`ArtisticBanner`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/components/site/artistic-banner.tsx)).
  - Central de Notícias e Busca ([`/noticias`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/%28public%29/noticias/page.tsx)).
  - Grade de Programação da Rádio ([`/programacao`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/%28public%29/programacao/page.tsx)).
  - Guia de Turismo ([`/turismo`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/%28public%29/turismo/page.tsx)).
  - Agenda de Eventos ([`/eventos`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/%28public%29/eventos/page.tsx)).
  - Podcasts & Episódios ([`/podcasts`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/%28public%29/podcasts/page.tsx)).
  - Sitemap XML ([`/sitemap.xml`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/sitemap.ts)), RSS 2.0 ([`/feed.xml`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/feed.xml/route.ts)) e JSON Feed 1.1 ([`/feed.json`](file:///c:/Users/Cristiano%20D.%20Borges/Downloads/Triunfo-FM/apps/web/src/app/feed.json/route.ts)).

## Qualidade e Testes

- **TypeScript Typecheck**: 0 erros (`tsc --noEmit` aprovado).
- **Testes Unitários**: 23 testes passados em 5 suítes Vitest (100% de sucesso).

## Próximos passos opcionais (Expansões Futuras)

- Testes E2E com Playwright em ambiente PostgreSQL em container Docker.
- Módulos avançados de Anúncios / Monetização (Release 5).
- Deploy de produção na infraestrutura final.
