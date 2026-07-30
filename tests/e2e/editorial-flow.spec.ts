import { test, expect } from "@playwright/test";

test.describe("Fluxo Editorial E2E - Release 1 Gate", () => {
  test("deve exibir a página inicial pública e os elementos principais da rádio", async ({ page }) => {
    await page.goto("/");

    // Verificar se a marca e título aparecem
    await expect(page).toHaveTitle(/Triunfo FM 87,9/i);
    await expect(page.getByText("Triunfo FM 87,9")).toBeVisible();

    // Verificar presença das seções públicas essenciais
    await expect(page.getByText("Últimas Notícias")).toBeVisible();
    await expect(page.getByText("Descubra Triunfo")).toBeVisible();
  });

  test("deve redirecionar usuário não autenticado ao tentar acessar o /admin", async ({ page }) => {
    await page.goto("/admin");
    // Deve redirecionar para a página de login
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Login/i })).toBeVisible();
  });

  test("deve realizar login no painel administrativo", async ({ page }) => {
    await page.goto("/admin/login");

    // Preencher credenciais de demonstração
    await page.getByLabel(/E-mail/i).fill("editor@triunfofm.com.br");
    await page.getByLabel(/Senha/i).fill("TriunfoFM-Dev-879!");
    await page.getByRole("button", { name: /Entrar/i }).click();

    // Deve redirecionar ao dashboard admin ou mostrar o formulário/dashboard
    await page.waitForURL(/\/admin/);
    await expect(page.getByText("Painel Editorial")).toBeVisible();
  });

  test("deve permitir ao Redator abrir o formulário de criação de notícia", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/E-mail/i).fill("redator@triunfofm.com.br");
    await page.getByLabel(/Senha/i).fill("TriunfoFM-Dev-879!");
    await page.getByRole("button", { name: /Entrar/i }).click();

    await page.goto("/admin/conteudos/novo");
    await expect(page.getByText(/Nova Matéria/i)).toBeVisible();
    await expect(page.getByLabel(/Título/i)).toBeVisible();
  });

  test("deve permitir ao Revisor acessar a fila de revisão editorial", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/E-mail/i).fill("revisor@triunfofm.com.br");
    await page.getByLabel(/Senha/i).fill("TriunfoFM-Dev-879!");
    await page.getByRole("button", { name: /Entrar/i }).click();

    await page.goto("/admin/editorial");
    await expect(page.getByText(/Fila de Revisão/i)).toBeVisible();
  });
});
