"use client";

import { Droplets } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { useUnits } from "@/components/units-provider";
import { formatTempIn } from "@/lib/units";
import { formatTime, type ForecastEntry } from "@/lib/weather";

/** Próximas 24 h (8 previsões de 3 em 3 horas). */
export default function HourlyForecast({ data, timezone }: { data: ForecastEntry[]; timezone: number }) {
  const { units } = useUnits();
  const next = data.slice(0, 8);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Próximas horas</h2>
      <ul className="flex gap-3 overflow-x-auto pb-2">
        {next.map((h) => (
          <li
            key={h.dt}
            className="flex min-w-[96px] flex-col items-center gap-1 rounded-3xl border bg-card px-4 py-4 text-center"
          >
            <span className="text-sm font-bold text-muted-foreground">{formatTime(h.dt, timezone)}</span>
            <WeatherIcon code={h.weather[0].icon} className="my-1 h-8 w-8 text-primary" />
            <span className="text-lg font-extrabold">{formatTempIn(h.main.temp, units)}</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-sky-500">
              <Droplets className="h-3 w-3" aria-hidden="true" />
              {Math.round(h.pop * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
