import { NextResponse } from "next/server";
import { isValidCoords } from "@/lib/location";
import { apiKey, limited, missingKey, OWM } from "@/lib/openweather";
import { createRateLimiter } from "@/lib/rate-limit";
import { airQualitySchema, forecastEntrySchema, weatherTodaySchema } from "@/lib/schemas";
import { z } from "zod";

const check = createRateLimiter({ limit: 30, windowMs: 60_000 });
const CACHE = { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" };

export async function GET(request: Request) {
  const key = apiKey();
  if (!key) return missingKey();

  const blocked = limited(check, request);
  if (blocked) return blocked;

  const params = new URL(request.url).searchParams;
  const coords = { latitude: Number(params.get("lat")), longitude: Number(params.get("lon")) };
  if (!isValidCoords(coords) || params.get("lat") === "" || params.get("lon") === "") {
    return NextResponse.json({ error: "Coordenadas inválidas." }, { status: 400 });
  }

  // Sempre em °C e m/s: a conversão para °F / km/h / mph é feita no cliente (cache único por local).
  const qs = `lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=pt_br&appid=${key}`;
  const opts = { next: { revalidate: 600 } };
  try {
    const [today, forecast, air] = await Promise.all([
      fetch(`${OWM}/data/2.5/weather?${qs}`, opts),
      fetch(`${OWM}/data/2.5/forecast?${qs}`, opts),
      // a qualidade do ar é um extra: se falhar, o resto da página continua funcionando
      fetch(
        `${OWM}/data/2.5/air_pollution?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`,
        opts
      ).catch(() => null),
    ]);
    if (!today.ok || !forecast.ok) {
      return NextResponse.json({ error: "Falha no provedor de clima." }, { status: 502 });
    }

    let airQuality = null;
    if (air?.ok) {
      const item = ((await air.json()) as { list?: { main: { aqi: number }; components: unknown }[] })
        .list?.[0];
      const parsed = airQualitySchema.safeParse(item && { aqi: item.main.aqi, components: item.components });
      airQuality = parsed.success ? parsed.data : null;
    }

    const body = {
      today: weatherTodaySchema.parse(await today.json()),
      forecast: z.array(forecastEntrySchema).parse(((await forecast.json()) as { list: unknown }).list),
      air: airQuality,
    };
    return NextResponse.json(body, { headers: CACHE });
  } catch {
    // rede fora, ou o provedor mudou o formato da resposta (falha do Zod)
    return NextResponse.json({ error: "Provedor de clima indisponível." }, { status: 502 });
  }
}
