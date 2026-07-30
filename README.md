# Triunfo FM 87,9

Monólito modular para o portal público e o painel editorial da Triunfo FM.

## Estado atual

A implementação começou pela vertical:

`login → criação → revisão → aprovação → publicação → homepage → notícia`

Rádio, turismo, eventos, podcasts e publicidade permanecem fora desta entrega.

## Pré-requisitos

- Node.js 24+
- pnpm 11+
- PostgreSQL 17
- Docker Desktop, opcionalmente, para PostgreSQL, MinIO e Mailpit locais

## Configuração local

1. Copie `.env.example` para `.env`.
2. Substitua os segredos de desenvolvimento.
3. Inicie os serviços com `docker compose up -d`, quando Docker estiver disponível.
4. Execute `pnpm install`.
5. Execute `pnpm db:generate`.
6. Execute `pnpm db:migrate`.
7. Execute `pnpm db:seed`.
8. Execute `pnpm dev`.

O portal abre em `http://localhost:3000` e o painel em
`http://localhost:3000/admin`.

Integrações opcionais podem permanecer vazias no ambiente local.

## Validações

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`

## Documentação

- `docs/architecture.md`
- `docs/data-model.md`
- `docs/design-system.md`
- `docs/editorial-workflow.md`
- `docs/seo-geo.md`
- `IMPLEMENTATION_PLAN.md`
- `DECISIONS.md`
