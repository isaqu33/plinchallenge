import { NextResponse } from "next/server";
import { clientIp, createRateLimiter } from "./rate-limit";

export const OWM = "https://api.openweathermap.org";

export function apiKey(): string | null {
  return process.env.OPENWEATHER_API_KEY || null;
}

export function missingKey() {
  return NextResponse.json({ error: "OPENWEATHER_API_KEY não configurada." }, { status: 500 });
}

/** Aplica o limite; devolve a resposta 429 pronta quando estourou, ou null se pode seguir. */
export function limited(check: ReturnType<typeof createRateLimiter>, request: Request) {
  const result = check(clientIp(request));
  if (result.ok) return null;
  return NextResponse.json(
    { error: "Muitas requisições. Tente novamente em instantes." },
    { status: 429, headers: { "Retry-After": String(result.retryAfter) } }
  );
}
