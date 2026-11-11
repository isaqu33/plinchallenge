import type { ForecastEntry } from "./schemas";

export type { ForecastEntry };

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function weekdayName(date: Date): string {
  return WEEKDAYS[date.getUTCDay()];
}

/**
 * `tz` = deslocamento da cidade em segundos (campo `timezone` da API). Sem ele, usa o fuso do navegador.
 * Com ele, desloca o instante e lê em UTC: o horário mostrado é o da cidade, não o de quem está olhando.
 */
function cityDate(unixSeconds: number, tz?: number): Date {
  return new Date((unixSeconds + (tz ?? 0)) * 1000);
}

/** "Terça, 7 de novembro" — `dt` vem da API em segundos (Unix). */
export function formatLongDate(unixSeconds: number, tz?: number): string {
  if (tz === undefined) {
    const d = new Date(unixSeconds * 1000);
    return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
  }
  const d = cityDate(unixSeconds, tz);
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} de ${MONTHS[d.getUTCMonth()]}`;
}

/** "07:05" — sempre com dois dígitos. */
export function formatTime(unixSeconds: number, tz?: number): string {
  if (tz === undefined) {
    return new Date(unixSeconds * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }
  const d = cityDate(unixSeconds, tz);
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}

export function formatTemp(celsius: number): string {
  return `${Math.round(celsius)} °C`;
}

export interface DaySummary {
  dt: number;
  day: string;
  min: number;
  max: number;
  /** maior probabilidade de chuva do dia (0–1) */
  pop: number;
  icon: string;
  description: string;
}

/**
 * A API devolve uma previsão a cada 3 h. Agrupa por dia: mínima/máxima reais,
 * maior chance de chuva e o ícone da previsão mais próxima do meio-dia.
 */
export function dailyForecast(list: ForecastEntry[]): DaySummary[] {
  const groups = new Map<string, ForecastEntry[]>();
  for (const entry of list) {
    const day = entry.dt_txt.split(" ")[0];
    groups.set(day, [...(groups.get(day) ?? []), entry]);
  }
  return [...groups.entries()].map(([day, entries]) => {
    const noon = entries.reduce((best, e) => {
      const dist = (x: ForecastEntry) => Math.abs(Number(x.dt_txt.slice(11, 13)) - 12);
      return dist(e) < dist(best) ? e : best;
    });
    const temps = entries.flatMap((e) => [e.main.temp_min ?? e.main.temp, e.main.temp_max ?? e.main.temp]);
    return {
      dt: noon.dt,
      day,
      min: Math.min(...temps),
      max: Math.max(...temps),
      pop: Math.max(...entries.map((e) => e.pop)),
      icon: noon.weather[0].icon,
      description: noon.weather[0].description,
    };
  });
}
