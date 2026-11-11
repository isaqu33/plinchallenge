import { NextResponse } from "next/server";
import { apiKey, limited, missingKey } from "@/lib/openweather";
import { createRateLimiter } from "@/lib/rate-limit";

/** Camadas gratuitas do OpenWeather (mapas meteorológicos). */
const LAYERS = new Set(["precipitation_new", "clouds_new", "temp_new", "wind_new", "pressure_new"]);
// um mapa carrega dezenas de tiles de uma vez: limite bem maior que o das outras rotas
const check = createRateLimiter({ limit: 600, windowMs: 60_000 });

type Ctx = { params: { layer: string; z: string; x: string; y: string } };

export async function GET(request: Request, { params }: Ctx) {
  const key = apiKey();
  if (!key) return missingKey();

  const blocked = limited(check, request);
  if (blocked) return blocked;

  const { layer, z, x, y } = params;
  const [zn, xn, yn] = [z, x, y].map(Number);
  const maxIndex = 2 ** zn;
  if (
    !LAYERS.has(layer) ||
    ![zn, xn, yn].every(Number.isInteger) ||
    zn < 0 ||
    zn > 10 ||
    xn < 0 ||
    yn < 0 ||
    xn >= maxIndex ||
    yn >= maxIndex
  ) {
    return NextResponse.json({ error: "Tile inválido." }, { status: 400 });
  }

  const res = await fetch(`https://tile.openweathermap.org/map/${layer}/${zn}/${xn}/${yn}.png?appid=${key}`, {
    next: { revalidate: 600 },
  }).catch(() => null);
  if (!res?.ok) return NextResponse.json({ error: "Tile indisponível." }, { status: 502 });

  return new NextResponse(res.body, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=600, s-maxage=600" },
  });
}
