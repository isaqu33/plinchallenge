import { NextResponse } from "next/server";
import { isValidCoords } from "@/lib/location";

const BASE = "https://api.openweathermap.org/data/2.5";

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENWEATHER_API_KEY não configurada." }, { status: 500 });
  }

  const params = new URL(request.url).searchParams;
  const coords = { latitude: Number(params.get("lat")), longitude: Number(params.get("lon")) };
  if (!isValidCoords(coords) || params.get("lat") === "" || params.get("lon") === "") {
    return NextResponse.json({ error: "Coordenadas inválidas." }, { status: 400 });
  }

  const qs = `lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=pt_br&appid=${apiKey}`;
  try {
    const [today, forecast] = await Promise.all([
      fetch(`${BASE}/weather?${qs}`, { next: { revalidate: 600 } }),
      fetch(`${BASE}/forecast?${qs}`, { next: { revalidate: 600 } }),
    ]);
    if (!today.ok || !forecast.ok) {
      return NextResponse.json({ error: "Falha no provedor de clima." }, { status: 502 });
    }
    const forecastJson = await forecast.json();
    return NextResponse.json({ today: await today.json(), forecast: forecastJson.list });
  } catch {
    return NextResponse.json({ error: "Provedor de clima indisponível." }, { status: 502 });
  }
}
