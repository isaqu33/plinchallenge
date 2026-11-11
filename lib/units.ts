export type Units = "metric" | "imperial";

export const cToF = (c: number) => (c * 9) / 5 + 32;

export function formatTempIn(celsius: number, units: Units): string {
  return units === "imperial" ? `${Math.round(cToF(celsius))} °F` : `${Math.round(celsius)} °C`;
}

/** A API devolve vento em m/s: metric → km/h, imperial → mph. */
export function formatWind(ms: number, units: Units): string {
  return units === "imperial" ? `${Math.round(ms * 2.23694)} mph` : `${Math.round(ms * 3.6)} km/h`;
}

export function formatVisibility(meters: number, units: Units): string {
  return units === "imperial"
    ? `${(meters / 1609.344).toFixed(1)} mi`
    : `${(meters / 1000).toFixed(1).replace(".0", "")} km`;
}

const COMPASS = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];
export function windDirection(deg: number): string {
  return COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}

export function parseUnits(raw: unknown): Units {
  return raw === "imperial" ? "imperial" : "metric";
}

const AQI_LABELS = ["Bom", "Razoável", "Moderado", "Ruim", "Muito ruim"] as const;
export const aqiLabel = (aqi: number) => AQI_LABELS[Math.min(Math.max(Math.round(aqi), 1), 5) - 1];
