"use client";

import { Droplets } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { useUnits } from "@/components/units-provider";
import { formatTempIn } from "@/lib/units";
import { dailyForecast, weekdayName, type ForecastEntry } from "@/lib/weather";

export default function WeatherWeeke({ data }: { data: ForecastEntry[] }) {
  const { units } = useUnits();
  const days = dailyForecast(data);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Próximos dias</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {days.map((d) => (
          <div
            key={d.day}
            className="flex flex-col items-center gap-1 rounded-3xl border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-sm font-bold text-muted-foreground">{weekdayName(new Date(d.dt * 1000))}</p>
            <WeatherIcon code={d.icon} className="my-2 h-10 w-10 text-primary" />
            <p className="text-xl font-extrabold">
              {formatTempIn(d.max, units)}
              <span className="ml-1 text-sm font-semibold text-muted-foreground">
                {formatTempIn(d.min, units)}
              </span>
            </p>
            <p className="text-xs capitalize text-muted-foreground">{d.description}</p>
            <p className="flex items-center gap-1 text-xs font-semibold text-sky-500">
              <Droplets className="h-3 w-3" aria-hidden="true" />
              {Math.round(d.pop * 100)}%{d.rainMm > 0 && ` · ${d.rainMm.toFixed(1)} mm`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
