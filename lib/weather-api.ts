import type { Coords } from "./location";
import type { ForecastEntry } from "./weather";

export interface WeatherToday {
  name: string;
  dt: number;
  weather: { icon: string; description: string }[];
  main: { temp: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
}

export interface WeatherResponse {
  today: WeatherToday;
  forecast: ForecastEntry[];
}

/** Chama o proxy interno (/api/weather): a chave do OpenWeather fica só no servidor. */
export async function fetchWeather({ latitude, longitude }: Coords): Promise<WeatherResponse> {
  const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
  if (!res.ok) throw new Error("Não foi possível carregar o clima.");
  return res.json();
}
