import { randomUUID } from "node:crypto";

import { hashPassword } from "better-auth/crypto";

import { prisma } from "../src/client";

const DEMO_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "TriunfoFM-Dev-879!";

const roles = [
  "SUPER_ADMIN",
  "ADMIN",
  "DIRETOR",
  "EDITOR_CHEFE",
  "EDITOR",
  "REVISOR",
  "REDATOR",
  "LOCUTOR",
  "PRODUTOR",
  "FOTOGRAFO",
  "COMERCIAL",
  "ANALISTA",
  "COLABORADOR",
  "ANUNCIANTE",
] as const;

const grants = [
  ["article", "view", "ANY"],
  ["article", "create", "ANY"],
  ["article", "create", "OWN"],
  ["article", "edit", "ANY"],
  ["article", "edit", "OWN"],
  ["article", "review", "ANY"],
  ["article", "review", "ASSIGNED"],
  ["article", "request_changes", "ANY"],
  ["article", "request_changes", "ASSIGNED"],
  ["article", "submit", "ANY"],
  ["article", "submit", "OWN"],
  ["article", "approve", "ANY"],
  ["article", "publish", "ANY"],
  ["article", "unpublish", "ANY"],
  ["article", "preview", "ANY"],
  ["article", "preview", "ASSIGNED"],
  ["article", "preview", "OWN"],
  ["article", "delete", "ANY"],
  ["article", "restore", "ANY"],
  ["media", "view", "ANY"],
  ["media", "create", "ANY"],
  ["homepage", "manage", "ANY"],
  ["audit", "view", "ANY"],
  ["user", "manage", "ANY"],
  ["role", "manage", "ANY"],
] as const;

const roleGrantKeys: Readonly<Record<string, readonly string[]>> = {
  SUPER_ADMIN: grants.map(([resource, action, scope]) => `${resource}.${action}:${scope}`),
  EDITOR_CHEFE: [
    "article.view:ANY",
    "article.create:ANY",
    "article.edit:ANY",
    "article.review:ANY",
    "article.request_changes:ANY",
    "article.submit:ANY",
    "article.approve:ANY",
    "article.publish:ANY",
    "article.unpublish:ANY",
    "article.preview:ANY",
    "article.delete:ANY",
    "article.restore:ANY",
    "media.view:ANY",
    "media.create:ANY",
    "homepage.manage:ANY",
    "audit.view:ANY",
  ],
  EDITOR: [
    "article.view:ANY",
    "article.create:ANY",
    "article.edit:ANY",
    "article.review:ANY",
    "article.request_changes:ANY",
    "article.submit:ANY",
    "article.approve:ANY",
    "article.publish:ANY",
    "article.unpublish:ANY",
    "article.preview:ANY",
    "media.view:ANY",
  ],
  REVISOR: [
    "article.view:ANY",
    "article.review:ASSIGNED",
    "article.request_changes:ASSIGNED",
    "article.preview:ASSIGNED",
    "media.view:ANY",
  ],
  REDATOR: [
    "article.view:ANY",
    "article.create:OWN",
    "article.edit:OWN",
    "article.submit:OWN",
    "article.preview:OWN",
    "media.view:ANY",
  ],
};

async function seedUser(
  email: string,
  name: string,
  roleKey: string,
  passwordHash: string,
) {
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, status: "ACTIVE", emailVerified: true, deletedAt: null },
    create: { name, email, status: "ACTIVE", emailVerified: true },
  });
  await prisma.account.upsert({
    where: { providerId_accountId: { providerId: "credential", accountId: user.id } },
    update: { password: passwordHash },
    create: {
      id: randomUUID(),
      providerId: "credential",
      accountId: user.id,
      userId: user.id,
      password: passwordHash,
    },
  });
  const role = await prisma.role.findUniqueOrThrow({ where: { key: roleKey } });
  const current = await prisma.userRole.findFirst({
    where: { userId: user.id, roleId: role.id, revokedAt: null },
  });
  if (!current) {
    await prisma.userRole.create({ data: { userId: user.id, roleId: role.id } });
  }
  return user;
}

async function main() {
  if (process.env.NODE_ENV === "production" && !process.env.SEED_ADMIN_PASSWORD) {
    throw new Error("SEED_ADMIN_PASSWORD is required when seeding in production.");
  }

  for (const key of roles) {
    await prisma.role.upsert({
      where: { key },
      update: { name: key.replaceAll("_", " "), isSystem: true, deletedAt: null },
      create: { key, name: key.replaceAll("_", " "), isSystem: true },
    });
  }

  const permissionByKey = new Map<string, string>();
  for (const [resource, action, scope] of grants) {
    const permission = await prisma.permission.upsert({
      where: { resource_action_scope: { resource, action, scope } },
      update: {},
      create: { resource, action, scope },
    });
    permissionByKey.set(`${resource}.${action}:${scope}`, permission.id);
  }

  for (const [roleKey, keys] of Object.entries(roleGrantKeys)) {
    const role = await prisma.role.findUniqueOrThrow({ where: { key: roleKey } });
    for (const key of keys) {
      const permissionId = permissionByKey.get(key);
      if (!permissionId) continue;
      const current = await prisma.rolePermission.findFirst({
        where: { roleId: role.id, permissionId, revokedAt: null },
      });
      if (!current) await prisma.rolePermission.create({ data: { roleId: role.id, permissionId } });
    }
  }

  const passwordHash = await hashPassword(DEMO_PASSWORD);
  const admin = await seedUser(
    "admin@triunfofm.local",
    "Administrador — Conteúdo de demonstração",
    "SUPER_ADMIN",
    passwordHash,
  );
  const editor = await seedUser(
    "editor@triunfofm.local",
    "Editor — Conteúdo de demonstração",
    "EDITOR",
    passwordHash,
  );
  const reviewer = await seedUser(
    "revisor@triunfofm.local",
    "Revisor — Conteúdo de demonstração",
    "REVISOR",
    passwordHash,
  );
  const writer = await seedUser(
    "redator@triunfofm.local",
    "Redator — Conteúdo de demonstração",
    "REDATOR",
    passwordHash,
  );

  const writerProfile = await prisma.authorProfile.upsert({
    where: { userId: writer.id },
    update: {
      slug: "redacao-demonstracao",
      displayName: "Redação de demonstração",
      bio: "Perfil fictício exclusivo do ambiente local.",
    },
    create: {
      userId: writer.id,
      slug: "redacao-demonstracao",
      displayName: "Redação de demonstração",
      bio: "Perfil fictício exclusivo do ambiente local.",
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "noticias" },
    update: { name: "Notícias", isActive: true, deletedAt: null },
    create: { name: "Notícias", slug: "noticias" },
  });
  for (const [name, slug] of [
    ["Cidade", "cidade"],
    ["Esportes", "esportes"],
    ["Política", "politica"],
    ["Cultura", "cultura"],
  ] as const) {
    await prisma.category.upsert({
      where: { slug },
      update: { name, isActive: true, deletedAt: null },
      create: { name, slug, parentId: category.id },
    });
  }
  const demoTag = await prisma.tag.upsert({
    where: { slug: "demonstracao" },
    update: { name: "Demonstração", deletedAt: null },
    create: { name: "Demonstração", slug: "demonstracao" },
  });

  const demoSlug = "conteudo-de-demonstracao-fluxo-editorial";
  let article = await prisma.article.findUnique({ where: { publicSlug: demoSlug } });
  if (!article) {
    const timestamp = new Date();
    article = await prisma.article.create({
      data: {
        editorialStatus: "DRAFT",
        publicationStatus: "NEVER_PUBLISHED",
        primaryAuthorProfileId: writerProfile.id,
        assignedReviewerId: reviewer.id,
        assignedEditorId: editor.id,
        createdById: writer.id,
        updatedById: writer.id,
        workingCopy: {
          create: {
            title: "Conteúdo de demonstração: fluxo editorial da Triunfo FM",
            proposedSlug: demoSlug,
            summary: "Matéria fictícia criada apenas para validar o fluxo editorial no ambiente local.",
            bodyJson: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Este conteúdo é demonstrativo e não relata um acontecimento real.",
                    },
                  ],
                },
              ],
            },
            bodyHtml:
              "<p>Este conteúdo é demonstrativo e não relata um acontecimento real. Ele existe somente para validar criação, revisão, aprovação e publicação.</p>",
            authorProfileId: writerProfile.id,
            categoryId: category.id,
            contentKind: "DEMONSTRATION",
            tagIds: [demoTag.id],
            sources: [
              {
                sourceClass: "PRIMARY",
                kind: "WEBSITE",
                name: "Fonte reservada para demonstração",
                url: "https://example.invalid/triunfo-fm-demo",
                isOfficial: false,
              },
            ],
            mediaUsages: [],
            seoDraft: {
              seoTitle: "Conteúdo de demonstração | Triunfo FM",
              metaDescription: "Página fictícia para validação técnica do fluxo editorial.",
            },
            geoDraft: {
              shortAnswer: "Este é um conteúdo fictício de validação técnica.",
              keyFacts: ["Não representa uma notícia real."],
            },
            updatedById: writer.id,
            lastAutosavedAt: timestamp,
          },
        },
      },
    });

    const revision = await prisma.articleRevision.create({
      data: {
        articleId: article.id,
        version: 1,
        title: "Conteúdo de demonstração: fluxo editorial da Triunfo FM",
        slug: demoSlug,
        summary: "Matéria fictícia criada apenas para validar o fluxo editorial no ambiente local.",
        bodyJson: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Este conteúdo é demonstrativo e não relata um acontecimento real.",
                },
              ],
            },
          ],
        },
        bodyHtml:
          "<p>Este conteúdo é demonstrativo e não relata um acontecimento real. Ele existe somente para validar criação, revisão, aprovação e publicação.</p>",
        authorProfileId: writerProfile.id,
        categoryId: category.id,
        contentKind: "DEMONSTRATION",
        contentHash: "0".repeat(64),
        createdById: writer.id,
        createdAt: timestamp,
        tags: { create: { tagId: demoTag.id } },
        sources: {
          create: {
            sourceClass: "PRIMARY",
            kind: "WEBSITE",
            name: "Fonte reservada para demonstração",
            url: "https://example.invalid/triunfo-fm-demo",
          },
        },
        seoMetadata: {
          create: {
            seoTitle: "Conteúdo de demonstração | Triunfo FM",
            metaDescription: "Página fictícia para validação técnica do fluxo editorial.",
          },
        },
        geoMetadata: {
          create: {
            shortAnswer: "Este é um conteúdo fictício de validação técnica.",
            keyFacts: ["Não representa uma notícia real."],
            verifiedById: editor.id,
            lastVerifiedAt: timestamp,
          },
        },
      },
    });
    await prisma.articleReview.create({
      data: {
        articleId: article.id,
        revisionId: revision.id,
        reviewerId: reviewer.id,
        decision: "ENDORSED",
        comment: "Endosso de demonstração para o ambiente local.",
      },
    });
    await prisma.articleApproval.create({
      data: {
        articleId: article.id,
        revisionId: revision.id,
        approvedById: editor.id,
        note: "Aprovação de demonstração para o ambiente local.",
      },
    });
    article = await prisma.article.update({
      where: { id: article.id },
      data: {
        editorialStatus: "APPROVED",
        publicationStatus: "PUBLISHED",
        publicSlug: demoSlug,
        currentRevisionId: revision.id,
        approvedRevisionId: revision.id,
        publishedRevisionId: revision.id,
        firstPublishedAt: timestamp,
        publishedAt: timestamp,
        updatedById: editor.id,
      },
    });
    await prisma.articleWorkflowEvent.create({
      data: {
        articleId: article.id,
        revisionId: revision.id,
        fromEditorialStatus: "APPROVED",
        toEditorialStatus: "APPROVED",
        fromPublicationStatus: "NEVER_PUBLISHED",
        toPublicationStatus: "PUBLISHED",
        action: "PUBLISH_DEMONSTRATION",
        actorUserId: editor.id,
      },
    });
  }

  await prisma.homepageSection.upsert({
    where: { key: "LATEST_NEWS" },
    update: { isActive: true, position: 0 },
    create: {
      key: "LATEST_NEWS",
      type: "LATEST_NEWS",
      title: "Últimas notícias",
      sourceMode: "AUTOMATIC",
      position: 0,
      config: { limit: 8 },
    },
  });
  const featured = await prisma.homepageSection.upsert({
    where: { key: "FEATURED_NEWS" },
    update: { isActive: true, position: 1 },
    create: {
      key: "FEATURED_NEWS",
      type: "FEATURED_NEWS",
      title: "Destaques",
      sourceMode: "MANUAL",
      position: 1,
    },
  });
  await prisma.homepageItem.upsert({
    where: {
      sectionId_articleId_device: {
        sectionId: featured.id,
        articleId: article.id,
        device: "ALL",
      },
    },
    update: { position: 0 },
    create: { sectionId: featured.id, articleId: article.id, position: 0 },
  });

  await prisma.auditLog.create({
    data: {
      actorType: "SYSTEM",
      actorUserId: admin.id,
      action: "DEMONSTRATION_SEED_COMPLETED",
      resourceType: "Seed",
      resourceId: "release-1",
      metadata: { contentIsDemonstration: true },
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Seed failed.");
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
