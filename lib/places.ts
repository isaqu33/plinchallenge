import type { Coords } from "./location";

export interface Place extends Coords {
  name: string;
}

const KEY = "favorites";
const MAX = 8;

const same = (a: Coords, b: Coords) =>
  Math.abs(a.latitude - b.latitude) < 0.05 && Math.abs(a.longitude - b.longitude) < 0.05;

export function parsePlaces(raw: unknown): Place[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (p): p is Place =>
        typeof p?.name === "string" &&
        typeof p?.latitude === "number" &&
        typeof p?.longitude === "number" &&
        Math.abs(p.latitude) <= 90 &&
        Math.abs(p.longitude) <= 180
    )
    .slice(0, MAX);
}

export const isFavorite = (list: Place[], c: Coords) => list.some((p) => same(p, c));

export function toggleFavorite(list: Place[], place: Place): Place[] {
  if (isFavorite(list, place)) return list.filter((p) => !same(p, place));
  return [place, ...list].slice(0, MAX);
}

export function loadFavorites(): Place[] {
  try {
    return parsePlaces(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  } catch {
    return [];
  }
}

export function saveFavorites(list: Place[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage bloqueado */
  }
}
