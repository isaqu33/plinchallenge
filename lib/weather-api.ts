import type { Coords } from "./location";
import { geoResultSchema, weatherResponseSchema, type GeoResult, type WeatherResponse } from "./schemas";
import { z } from "zod";

export type { WeatherResponse, WeatherToday, GeoResult } from "./schemas";

/** Chama o proxy interno (/api/weather): a chave do OpenWeather fica só no servidor. */
export async function fetchWeather({ latitude, longitude }: Coords): Promise<WeatherResponse> {
  const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
  if (!res.ok) throw new Error("Não foi possível carregar o clima.");
  return weatherResponseSchema.parse(await res.json());
}

export async function searchCities(q: string, signal?: AbortSignal): Promise<GeoResult[]> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`, { signal });
  if (!res.ok) throw new Error("Não foi possível buscar cidades.");
  return z.array(geoResultSchema).parse(await res.json());
}
