import { describe, expect, it } from "vitest";
import { dailyForecast, formatTemp, weekdayName, type ForecastEntry } from "@/lib/weather";

const entry = (dt_txt: string, temp = 20): ForecastEntry => ({
  dt: Date.parse(dt_txt.replace(" ", "T") + "Z") / 1000,
  dt_txt,
  main: { temp },
  weather: [{ icon: "01d", description: "céu limpo" }],
  pop: 0,
});

describe("dailyForecast", () => {
  it("agrupa por dia com mínima, máxima e maior chance de chuva", () => {
    const list = [
      { ...entry("2026-11-10 09:00:00", 18), pop: 0.1 },
      { ...entry("2026-11-10 12:00:00", 25), pop: 0.6 },
      { ...entry("2026-11-10 21:00:00", 15), pop: 0.2 },
      entry("2026-11-11 00:00:00", 14),
    ];
    const days = dailyForecast(list);
    expect(days.map((d) => d.day)).toEqual(["2026-11-10", "2026-11-11"]);
    expect(days[0]).toMatchObject({ min: 15, max: 25, pop: 0.6 });
  });
  it("soma o volume de chuva do dia", () => {
    const list = [
      { ...entry("2026-11-10 09:00:00"), rain: { "3h": 1.5 } },
      { ...entry("2026-11-10 12:00:00"), rain: { "3h": 2 } },
      entry("2026-11-10 15:00:00"),
    ];
    expect(dailyForecast(list)[0].rainMm).toBeCloseTo(3.5);
  });
  it("usa a previsão mais próxima do meio-dia para o ícone", () => {
    const list = [
      { ...entry("2026-11-10 03:00:00"), weather: [{ icon: "01n", description: "noite" }] },
      { ...entry("2026-11-10 12:00:00"), weather: [{ icon: "01d", description: "dia" }] },
    ];
    expect(dailyForecast(list)[0].icon).toBe("01d");
  });
  it("lista vazia continua vazia", () => expect(dailyForecast([])).toEqual([]));
});

describe("formatTemp / weekdayName", () => {
  it("arredonda a temperatura", () => expect(formatTemp(21.6)).toBe("22 °C"));
  it("nomeia o dia da semana", () => expect(weekdayName(new Date("2026-11-10T12:00:00Z"))).toBe("Terça"));
});

import { formatLongDate, formatTime } from "@/lib/weather";

describe("fuso da cidade", () => {
  // 2026-11-10 12:00 UTC
  const noon = Date.UTC(2026, 10, 10, 12, 0, 0) / 1000;
  it("mostra o horário local da cidade, independente do navegador", () => {
    expect(formatTime(noon, -10800)).toBe("09:00"); // Brasília (UTC-3)
    expect(formatTime(noon, 32400)).toBe("21:00"); // Tóquio (UTC+9)
  });
  it("a data também acompanha o fuso (vira o dia)", () => {
    expect(formatLongDate(noon + 12 * 3600, 0)).toBe("Quarta, 11 de novembro");
    expect(formatLongDate(noon + 12 * 3600, -10800)).toBe("Terça, 10 de novembro");
  });
});
