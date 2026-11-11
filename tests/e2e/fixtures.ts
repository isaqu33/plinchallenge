import type { Page } from "@playwright/test";

const forecast = Array.from({ length: 16 }, (_, i) => {
  const dt = Date.UTC(2026, 10, 10, 0, 0, 0) / 1000 + i * 3 * 3600;
  const iso = new Date(dt * 1000).toISOString();
  return {
    dt,
    dt_txt: `${iso.slice(0, 10)} ${iso.slice(11, 19)}`,
    main: { temp: 20 + (i % 5), temp_min: 18, temp_max: 26 },
    weather: [{ icon: i % 4 === 0 ? "10d" : "01d", description: i % 4 === 0 ? "chuva leve" : "céu limpo" }],
    pop: i % 4 === 0 ? 0.7 : 0.1,
  };
});

export const weatherPayload = (name = "Brasília") => ({
  today: {
    name,
    dt: 1_794_000_000,
    timezone: -10800,
    weather: [{ icon: "01d", description: "céu limpo" }],
    main: { temp: 25.4, feels_like: 26, temp_min: 20, temp_max: 28, pressure: 1012, humidity: 55 },
    wind: { speed: 5, deg: 90, gust: 8 },
    clouds: { all: 10 },
    visibility: 10000,
    sys: { sunrise: 1_793_990_000, sunset: 1_794_030_000, country: "BR" },
  },
  forecast,
  air: { aqi: 2, components: { pm2_5: 8.1, pm10: 12.3, o3: 60.2, no2: 5.5, so2: 1.1, co: 200 } },
});

/** Intercepta as rotas internas e os serviços externos: os testes não dependem de rede nem de chave. */
export async function mockApis(page: Page, city = "Brasília") {
  await page.route("**/api/weather*", (route) => route.fulfill({ json: weatherPayload(city) }));
  await page.route("**/api/geocode*", (route) =>
    route.fulfill({
      json: [{ name: "Fortaleza", state: "Ceará", country: "BR", lat: -3.73, lon: -38.52 }],
    })
  );
  // tiles do mapa: PNG 1x1 transparente
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "base64"
  );
  await page.route(/\/api\/tiles\//, (route) => route.fulfill({ body: png, contentType: "image/png" }));
  await page.route("https://tile.openstreetmap.org/**", (route) =>
    route.fulfill({ body: png, contentType: "image/png" })
  );
}
