import { expect, test } from "@playwright/test";
import { mockApis } from "./fixtures";

test.describe("clima", () => {
  test.use({ geolocation: { latitude: -15.79, longitude: -47.88 }, permissions: ["geolocation"] });

  test("da tela inicial ao clima usando a geolocalização", async ({ page }) => {
    await mockApis(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Ver o clima" }).click();
    await expect(page).toHaveURL(/\/climate$/);
    await expect(page.getByRole("heading", { level: 1, name: "Brasília" })).toBeVisible();
    await expect(page.getByText("25 °C").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Próximas horas" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Próximos dias" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Qualidade do ar" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Mapa do tempo" })).toBeVisible();
  });

  test("alterna entre °C e °F e lembra a escolha", async ({ page }) => {
    await mockApis(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Ver o clima" }).click();
    await page.getByRole("button", { name: "Usar °F e mph" }).click();
    await expect(page.getByText("78 °F").first()).toBeVisible();
    await page.reload();
    await expect(page.getByText("78 °F").first()).toBeVisible();
  });

  test("busca outra cidade e salva nos favoritos", async ({ page }) => {
    await mockApis(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Ver o clima" }).click();
    // a tela inicial também tem uma busca: espera a navegação para não digitar nela
    await expect(page).toHaveURL(/\/climate$/);
    await page.getByRole("combobox", { name: "Buscar cidade" }).fill("Fortaleza");
    await page.getByRole("option", { name: /Fortaleza, Ceará/ }).click();
    await page.getByRole("button", { name: "Salvar nos favoritos" }).click();
    await expect(page.getByRole("list", { name: "Cidades favoritas" })).toBeVisible();
    await page.reload();
    await expect(page.getByRole("list", { name: "Cidades favoritas" })).toBeVisible();
  });

  test("mostra erro e permite tentar de novo", async ({ page }) => {
    await page.route("**/api/weather*", (route) => route.fulfill({ status: 502, json: { error: "x" } }));
    await page.goto("/");
    await page.getByRole("button", { name: "Ver o clima" }).click();
    await expect(page.getByText("Não foi possível carregar o clima.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Tentar novamente" })).toBeVisible();
  });
});

test("sem permissão de GPS, dá para escolher uma cidade na tela inicial", async ({ page }) => {
  await mockApis(page, "Fortaleza");
  await page.goto("/");
  await page.getByRole("combobox", { name: "Buscar cidade" }).fill("Fortaleza");
  await page.getByRole("option", { name: /Fortaleza/ }).click();
  await expect(page).toHaveURL(/\/climate$/);
  await expect(page.getByRole("heading", { level: 1, name: "Fortaleza" })).toBeVisible();
});

test("sem localização salva, /climate volta para o início", async ({ page }) => {
  await page.goto("/climate");
  await expect(page).toHaveURL(/\/$/);
});
