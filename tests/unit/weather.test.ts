import { describe, expect, it } from "vitest";
import { dailyForecast, formatTemp, weekdayName, type ForecastEntry } from "@/lib/weather";

const entry = (dt_txt: string, temp = 20): ForecastEntry => ({
  dt: Date.parse(dt_txt.replace(" ", "T") + "Z") / 1000,
  dt_txt,
  main: { temp },
  weather: [{ icon: "01d", description: "céu limpo" }],
});

describe("dailyForecast", () => {
  it("mantém só a primeira previsão de cada dia", () => {
    const list = [entry("2026-11-10 12:00:00"), entry("2026-11-10 15:00:00"), entry("2026-11-11 00:00:00")];
    expect(dailyForecast(list).map((e) => e.dt_txt)).toEqual(["2026-11-10 12:00:00", "2026-11-11 00:00:00"]);
  });
  it("lista vazia continua vazia", () => expect(dailyForecast([])).toEqual([]));
});

describe("formatTemp / weekdayName", () => {
  it("arredonda a temperatura", () => expect(formatTemp(21.6)).toBe("22 °C"));
  it("nomeia o dia da semana", () => expect(weekdayName(new Date("2026-11-10T12:00:00Z"))).toBe("Terça"));
});
