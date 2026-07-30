# Registro de decisões

Formato: ADR leve  
Data-base: 2026-07-29  
Escopo: Fase 0

## Como ler

- `Aceita`: orienta a implementação seguinte.
- `Provisória`: válida até evidência/insumo oficial.
- `Pendente`: decisão deliberadamente adiada, com critério de resolução.
- Alterações futuras devem preservar o histórico e adicionar nova decisão, não reescrever silenciosamente o motivo original.

## D-001 — Fonte canônica da especificação

Status: Aceita.

Decisão: adotar `docs/MASTER_SPEC.md` como fonte interna. O conteúdo foi originado do anexo UTF-8 de 1.579 linhas, cujo SHA-256 original é `4FCEA0542D63C5B7FDAB1FC554D158D7FF7216CFF864504F37FF5F3F55C1434D`.

Motivo: o caminho solicitado não existia no diagnóstico inicial. A especificação precisava ficar dentro do projeto e em Markdown.

Consequência: futuras mudanças de escopo devem alterar esse arquivo conscientemente e registrar a decisão.

## D-002 — Esta execução termina na Fase 0

Status: Aceita.

Decisão: criar somente documentação, diagnóstico e modelo lógico. Não inicializar aplicação, banco, migrations, dependências, servidor, testes ou deploy.

Motivo: restrição explícita do solicitante.

## D-003 — Vertical editorial antes da amplitude

Status: Aceita.

Decisão: a primeira release funcional é login → criação → revisão → aprovação → publicação → homepage → notícia.

Consequência: rádio, turismo, eventos, podcasts, publicidade e analytics não entram antes do E2E editorial.

## D-004 — Monólito modular com um único app Next.js

Status: Aceita.

Decisão: portal, painel e API ficam inicialmente em `apps/web`, separados por route groups, layouts, módulos, cache e guards.

Motivo: sessão única, deploy simples e transação local entre CMS/publicação/auditoria.

Consequência: não criar `apps/admin` agora. Extração futura exige evidência operacional.

## D-005 — Monorepo pnpm sem orquestrador adicional inicialmente

Status: Aceita.

Decisão: pnpm workspaces organiza app e pacotes. Turborepo só entra se o CI justificar cache/orquestração adicional.

Consequência: menos ferramenta na fundação e lockfile único.

## D-006 — Stack principal

Status: Aceita.

Decisão: Next.js App Router, React, TypeScript strict, Tailwind, componentes acessíveis, PostgreSQL, Prisma, Zod, React Hook Form, TipTap, storage S3-compatible, Vitest e Playwright.

Consequência: versões exatas serão fixadas na Fase 1 após verificar compatibilidade corrente; esta decisão não autoriza upgrade automático.

## D-007 — Separar workflow de publicação

Status: Aceita.

Decisão:

- `EditorialStatus`: `DRAFT/IN_REVIEW/CHANGES_REQUESTED/APPROVED`;
- `PublicationStatus`: `NEVER_PUBLISHED/SCHEDULED/PUBLISHED/UNPUBLISHED/ARCHIVED`.

Motivo: uma matéria pode continuar no ar enquanto uma atualização está em revisão.

Consequência: UI pode exibir dois badges; consulta pública nunca depende de um status único.

## D-008 — Working copy, revisões e ponteiro público

Status: Aceita.

Decisão: autosave altera `ArticleWorkingCopy`; checkpoints criam `ArticleRevision` imutável; o portal lê `publishedRevisionId`.

Consequência: restaurar cria nova revisão. Alteração aprovada/publicada não é sobrescrita.

## D-009 — PostgreSQL/Prisma com SQL complementar

Status: Aceita.

Decisão: PostgreSQL é a fonte de verdade; Prisma é ORM. Checks, índices parciais, unicidade case-insensitive e full-text podem usar migration SQL revisada.

Consequência: `schema.prisma` sozinho não é considerado o contrato completo do banco.

## D-010 — Boundary de autenticação e sessão revogável

Status: Aceita para o contrato; Pendente para o adapter.

Decisão: autenticação própria do painel, sessão revogável, recuperação segura e adapter encapsulado em `packages/auth`. Auth.js ou equivalente deve provar suporte ao App Router e ao contrato no spike inicial.

Critério: login por credencial segura, sessão em PostgreSQL ou revogação equivalente, cookies seguros, Prisma e manutenção ativa.

Consequência: nomes técnicos de tabelas do adapter não contaminam o domínio antes do spike.

## D-011 — RBAC contextual e segregação de funções

Status: Aceita.

Decisão: permissão combina recurso, ação e `OWN/ASSIGNED/ANY`, mais estado/revisão alvo. `ADMIN` não publica automaticamente. Autor não segue atalho normal para autoaprovar/publicar.

Consequência: autorização é testada no servidor em toda mutação; esconder botão não é controle de segurança.

## D-012 — TipTap JSON canônico e HTML derivado

Status: Aceita.

Decisão: corpo canônico é JSON estruturado; HTML é gerado e sanitizado no servidor com allowlist.

Consequência: HTML arbitrário, script, style, SVG/iframe não autorizado não é persistido como fonte.

## D-013 — Mídia em S3-compatible

Status: Aceita.

Decisão: bytes em object storage; metadados e relações no PostgreSQL. MinIO é o default local; fornecedor de produção fica abstrato.

Consequência: disco local nunca é armazenamento definitivo.

## D-014 — Server Components e regras reutilizadas

Status: Aceita.

Decisão: Server Components por padrão. Server Actions/Route Handlers chamam os mesmos casos de uso; `/api/v1` não duplica negócio.

Consequência: Prisma não é usado diretamente por componente ou route UI.

## D-015 — Cache pós-commit

Status: Aceita.

Decisão: páginas públicas usam cache por tags; publicação/retirada invalida após commit e mantém TTL de segurança.

Consequência: falha de cache é observável e retentável, sem desfazer o banco. Outbox só entra quando necessário.

## D-016 — SEO/GEO versionados

Status: Aceita.

Decisão: SEO, GEO, fontes, tags e usos de mídia pertencem à revisão. Metadata, HTML e JSON-LD derivam da revisão publicada.

Consequência: editores não inserem JSON-LD arbitrário. GEO vazio é aceito; fatos inventados não.

## D-017 — Nenhuma publicação automática por IA

Status: Aceita.

Decisão: sugestão de IA não cria transição, aprovação, fonte ou publicação.

Consequência: toda sugestão exige revisão humana e fica identificável na trilha apropriada.

## D-018 — Design tokens provisórios e acessíveis

Status: Provisória.

Decisão: roxos `#2B0757/#46117F/#6322A3` e dourado `#F2A900` orientam a base. Dourado sobre branco não é texto funcional. WCAG 2.2 AA é o baseline.

Motivo: os PNGs confirmam a família cromática, mas não há manual oficial.

Consequência: tokens podem ser refinados com kit de marca, preservando semântica e contraste.

## D-019 — Ativos originais preservados

Status: Aceita.

Decisão: não editar nem renomear os quatro ativos nesta fase. Na implementação, criar derivados web com nomes normalizados.

Consequência: solicitar vetor, lockup horizontal/vertical, versões sem glow, favicon e confirmação do selo “30 anos”.

## D-020 — Datas em UTC, operação em America/Recife

Status: Aceita.

Decisão: persistir instantes em UTC e exibir/receber horários editoriais em `America/Recife`.

Consequência: agendamento converte explicitamente e testes cobrem fronteiras de data.

## D-021 — Nenhum dado institucional inventado

Status: Aceita.

Decisão: telefone, endereço, domínio, CNPJ, redes, equipe, apresentadores, músicas, notícias e anunciantes permanecem vazios/configuráveis até confirmação.

Consequência: seed usa somente “Conteúdo de demonstração” claramente rotulado.

## D-022 — Modelo inicial restrito à vertical

Status: Aceita.

Decisão: documentar módulos futuros, mas não criar migrations/tabelas genéricas sem uso real.

Consequência: não haverá entidade polimórfica `Content` prematura. Cada futura vertical preserva foreign keys e ownership.

## D-023 — Homepage mínima antes do builder

Status: Aceita.

Decisão: a primeira vertical usa `LATEST_NEWS` automático e `FEATURED_NEWS` manual. Builder completo fica para a release seguinte.

Consequência: publicação já valida exibição pública sem antecipar toda a ferramenta de composição.

## D-024 — Soft delete seletivo

Status: Aceita.

Decisão: entidades operacionais podem usar soft delete; revisões, fontes versionadas, transições e auditoria são append-only.

Consequência: LGPD é tratada com minimização, retenção e anonimização, não apagando a história editorial necessária.

## Pendências não bloqueantes da Fase 0

| Tema | Decisão necessária | Momento |
|---|---|---|
| Auth | adapter/biblioteca e schema técnico | início da Fase 1 |
| Hosting | fornecedor, domínio e ambientes | antes de homologação |
| Marca | vetores, cores oficiais, selo “30 anos” e licenças | antes do acabamento visual |
| Institucional | contatos, redes, propriedade e responsáveis | antes de conteúdo real |
| Editorial | política de correções, fontes e overrides | antes do go-live |
| Segurança | retenção, RPO/RTO e 2FA | antes de produção |
| Rádio | URLs de stream e metadados | release de rádio |
| Analytics/ads | consentimento e fornecedores | release de monetização |

Nenhuma dessas pendências autoriza inventar valores. Elas não impedem a documentação da Fase 0.
