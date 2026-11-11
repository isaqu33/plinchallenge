import { expect, test } from "@playwright/test";

test("formulário de contato valida e simula o envio", async ({ page }) => {
  await page.goto("/register");
  await page.waitForLoadState("networkidle"); // espera a hidratação antes de digitar
  await expect(page.getByText("o envio é simulado", { exact: false })).toBeVisible();
  const send = page.getByRole("button", { name: "Enviar" });
  await expect(send).toBeDisabled();
  await page.getByLabel("Nome").fill("Maria");
  await page.getByLabel("E-mail").fill("maria@exemplo.com");
  await page.getByLabel("Motivo do contato").fill("Gostei do projeto, parabéns!");
  await expect(send).toBeEnabled();
  await send.click();
  await expect(page.getByText("Mensagem registrada").first()).toBeVisible();
});

test("e-mail inválido mostra erro", async ({ page }) => {
  await page.goto("/register");
  await page.waitForLoadState("networkidle"); // espera a hidratação antes de digitar
  await page.getByLabel("E-mail").fill("nao-e-email");
  await page.getByLabel("Nome").click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});

test("página Sobre explica a origem do projeto", async ({ page }) => {
  await page.goto("/sobre");
  await expect(page.getByRole("heading", { name: "Sobre o projeto" })).toBeVisible();
  await expect(page.getByText("teste técnico").first()).toBeVisible();
});

test("tema escuro persiste depois de recarregar", async ({ page }) => {
  await page.goto("/sobre");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: /Ativar modo (escuro|claro)/ });
  const before = await html.evaluate((el) => el.classList.contains("dark"));
  await toggle.click();
  await expect(html).toHaveClass(before ? /^((?!dark).)*$/ : /dark/);
  await page.reload();
  expect(await html.evaluate((el) => el.classList.contains("dark"))).toBe(!before);
});

test("responde com os headers de segurança", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["x-frame-options"]).toBe("DENY");
  expect(res.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
});

test("API recusa coordenadas inválidas e cidade curta", async ({ request }) => {
  expect((await request.get("/api/weather?lat=999&lon=0")).status()).toBe(400);
  expect((await request.get("/api/weather?lat=&lon=")).status()).toBe(400);
  expect((await request.get("/api/geocode?q=a")).status()).toBe(400);
  expect((await request.get("/api/tiles/evil/1/0/0")).status()).toBe(400);
});
