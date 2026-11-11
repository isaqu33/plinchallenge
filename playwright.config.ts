import { defineConfig, devices } from "@playwright/test";

const PORT = 3200; // fora da faixa dos outros projetos e da porta do Docker (3100)

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], channel: process.env.PW_CHANNEL } }],
  webServer: {
    // chave falsa: as chamadas ao OpenWeather são interceptadas nos testes (page.route)
    // roda o artefato "standalone" (o mesmo da imagem Docker de produção)
    command: `npm run build && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public && PORT=${PORT} HOSTNAME=127.0.0.1 node .next/standalone/server.js`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: { OPENWEATHER_API_KEY: "e2e-fake-key" },
  },
});
