import { NextResponse } from "next/server";
import { apiKey, limited, missingKey, OWM } from "@/lib/openweather";
import { createRateLimiter } from "@/lib/rate-limit";
import { geoResultSchema } from "@/lib/schemas";
import { z } from "zod";

const check = createRateLimiter({ limit: 60, windowMs: 60_000 });

export async function GET(request: Request) {
  const key = apiKey();
  if (!key) return missingKey();

  const blocked = limited(check, request);
  if (blocked) return blocked;

  const q = (new URL(request.url).searchParams.get("q") ?? "").trim();
  if (q.length < 2 || q.length > 80) {
    return NextResponse.json({ error: "Digite ao menos 2 letras." }, { status: 400 });
  }

  try {
    const res = await fetch(`${OWM}/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${key}`, {
      next: { revalidate: 86_400 },
    });
    if (!res.ok) return NextResponse.json({ error: "Falha na busca de cidades." }, { status: 502 });
    const results = z.array(geoResultSchema).parse(await res.json());
    return NextResponse.json(results, { headers: { "Cache-Control": "public, s-maxage=86400" } });
  } catch {
    return NextResponse.json({ error: "Busca de cidades indisponível." }, { status: 502 });
  }
}
