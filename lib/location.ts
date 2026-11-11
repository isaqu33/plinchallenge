export interface Coords {
  latitude: number;
  longitude: number;
}

const KEY = "location";

export function isValidCoords(c: unknown): c is Coords {
  if (typeof c !== "object" || c === null) return false;
  const { latitude, longitude } = c as Record<string, unknown>;
  return (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  );
}

export function saveLocation(coords: Coords): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(coords));
  } catch {
    /* modo privado / storage bloqueado: segue sem persistir */
  }
}

export function loadLocation(): Coords | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidCoords(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
