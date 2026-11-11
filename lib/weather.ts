export interface ForecastEntry {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

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

/** "Terça, 7 de novembro" — `dt` vem da API em segundos (Unix). */
export function formatLongDate(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}

/** "07:05" — sempre com dois dígitos. */
export function formatTime(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function formatTemp(celsius: number): string {
  return `${Math.round(celsius)} °C`;
}

/** A API devolve uma previsão a cada 3 h; mantém só a primeira de cada dia. */
export function dailyForecast(list: ForecastEntry[]): ForecastEntry[] {
  const seen = new Set<string>();
  return list.filter((entry) => {
    const day = entry.dt_txt.split(" ")[0];
    if (seen.has(day)) return false;
    seen.add(day);
    return true;
  });
}
