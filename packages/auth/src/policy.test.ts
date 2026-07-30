import { describe, expect, it } from "vitest";

import { InvalidPermissionError, PermissionDeniedError } from "./errors";
import {
  assertPermission,
  can,
  deduplicateGrants,
  type Actor,
} from "./policy";

const actor: Actor = {
  id: "user-redator",
  name: "Redator de demonstração",
  email: "redator@example.test",
  roleKeys: ["REDATOR"],
  grants: [
    { resource: "article", action: "create", scope: "OWN" },
    { resource: "article", action: "edit", scope: "OWN" },
    { resource: "article", action: "view", scope: "ASSIGNED" },
  ],
};

describe("policy RBAC", () => {
  it("aceita uma capability de rota quando existe ao menos um escopo", () => {
    expect(can(actor, "article.create")).toBe(true);
  });

  it("aceita acesso ao recurso próprio", () => {
    expect(
      can(actor, "article.edit", {
        ownerId: actor.id,
      }),
    ).toBe(true);
  });

  it("recusa usar OWN para editar recurso de outra pessoa", () => {
    expect(
      can(actor, "article.edit", {
        ownerId: "another-user",
      }),
    ).toBe(false);
  });

  it("aceita escopo ASSIGNED somente quando o ator está atribuído", () => {
    expect(
      can(actor, "article.view", {
        assignedUserIds: [actor.id],
      }),
    ).toBe(true);
    expect(
      can(actor, "article.view", {
        assignedUserIds: ["another-user"],
      }),
    ).toBe(false);
  });

  it("permite que ANY cubra OWN e ASSIGNED", () => {
    const editor: Actor = {
      ...actor,
      roleKeys: ["EDITOR"],
      grants: [{ resource: "article", action: "edit", scope: "ANY" }],
    };

    expect(can(editor, "article.edit:OWN")).toBe(true);
    expect(can(editor, "article.edit:ASSIGNED")).toBe(true);
    expect(can(editor, "article.edit:ANY")).toBe(true);
  });

  it("não trata ASSIGNED como OWN implicitamente", () => {
    expect(can(actor, "article.view:OWN")).toBe(false);
  });

  it("lança erro estável ao negar uma permissão", () => {
    expect(() => assertPermission(actor, "article.publish:ANY")).toThrow(
      PermissionDeniedError,
    );
  });

  it("rejeita strings de permissão ambíguas", () => {
    expect(() => can(actor, "article")).toThrow(InvalidPermissionError);
    expect(() => can(actor, "article.edit:ADMIN")).toThrow(
      InvalidPermissionError,
    );
  });

  it("remove grants duplicados de memberships diferentes", () => {
    expect(
      deduplicateGrants([
        actor.grants[0]!,
        actor.grants[0]!,
        actor.grants[1]!,
      ]),
    ).toHaveLength(2);
  });
});
