import { expect, test } from "@playwright/test";

const cep = {
  cep: "70040-010",
  logradouro: "Praça dos Três Poderes",
  bairro: "Zona Cívico-Administrativa",
  localidade: "Brasília",
  uf: "DF",
  ibge: "5300108",
  ddd: "61",
  siafi: "9701",
};

test("busca por CEP", async ({ page }) => {
  await page.route("https://viacep.com.br/ws/70040010/json/", (r) => r.fulfill({ json: cep }));
  await page.goto("/Tracking");
  await page.getByLabel("CEP", { exact: true }).fill("70040010");
  await expect(page.getByLabel("CEP", { exact: true })).toHaveValue("70040-010");
  await page.getByRole("button", { name: "Buscar endereço" }).click();
  await expect(page.getByRole("heading", { name: "70040-010" })).toBeVisible();
  await expect(page.getByText("Praça dos Três Poderes")).toBeVisible();
});

test("busca por endereço", async ({ page }) => {
  await page.route("https://viacep.com.br/ws/RS/Porto%20Alegre/Domingos/json/", (r) =>
    r.fulfill({ json: [cep, { ...cep, cep: "90000-000" }] })
  );
  await page.goto("/Tracking");
  await page.getByRole("tab", { name: "Busco pelo endereço" }).click();
  await page.getByLabel("UF").fill("rs");
  await page.getByLabel("Cidade").fill("Porto Alegre");
  await page.getByLabel("Logradouro (rua)").fill("Domingos");
  await page.getByRole("button", { name: "Pesquisar possíveis CEPs" }).click();
  await expect(page.getByRole("article")).toHaveCount(2);
});

test("CEP inválido desabilita o botão e mostra a dica", async ({ page }) => {
  await page.goto("/Tracking");
  await page.getByLabel("CEP", { exact: true }).fill("123");
  await expect(page.getByText("O CEP tem 8 dígitos")).toBeVisible();
  await expect(page.getByRole("button", { name: "Buscar endereço" })).toBeDisabled();
});

test("CEP inexistente abre o aviso", async ({ page }) => {
  await page.route("https://viacep.com.br/ws/99999999/json/", (r) => r.fulfill({ json: { erro: "true" } }));
  await page.goto("/Tracking");
  await page.getByLabel("CEP", { exact: true }).fill("99999999");
  await page.getByRole("button", { name: "Buscar endereço" }).click();
  await expect(page.getByRole("alertdialog")).toContainText("Nenhum resultado");
});
