"use client";

import { Cloud, Droplets, Eye, Gauge, Star, Thermometer, Wind } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { useUnits } from "@/components/units-provider";
import { skyFor } from "@/lib/sky";
import { formatTempIn, formatVisibility, formatWind, windDirection } from "@/lib/units";
import type { WeatherToday } from "@/lib/weather-api";
import { formatLongDate, formatTime } from "@/lib/weather";

function Stat({
  Icon,
  label,
  value,
  hint,
}: {
  Icon: typeof Wind;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-black/20 p-4">
      <Icon className="mb-2 h-5 w-5 opacity-80" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      {hint && <p className="text-xs opacity-75">{hint}</p>}
    </div>
  );
}

interface Props {
  today: WeatherToday;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export default function Weathertoday({ today, favorite, onToggleFavorite }: Props) {
  const { units } = useUnits();
  const { name, dt, timezone, weather, main, wind, visibility, clouds } = today;
  const sky = skyFor(weather[0].icon);

  return (
    <section
      className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${sky.gradient} p-6 text-white shadow-xl md:p-10`}
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-sm font-semibold opacity-80">
            {formatLongDate(dt, timezone)} · atualizado às {formatTime(dt, timezone)}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">{name}</h1>
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={favorite}
              aria-label={favorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
              className="rounded-full bg-black/20 p-2.5 transition-colors hover:bg-black/30"
            >
              <Star className={`h-5 w-5 ${favorite ? "fill-yellow-300 text-yellow-300" : ""}`} />
            </button>
          </div>
          <p className="mt-2 text-xl font-semibold capitalize opacity-90">{weather[0].description}</p>
        </div>
        <WeatherIcon code={weather[0].icon} className="h-24 w-24 drop-shadow-lg md:h-32 md:w-32" />
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
        <span className="text-7xl font-extrabold leading-none tracking-tighter md:text-9xl">
          {formatTempIn(main.temp, units)}
        </span>
        <span className="pb-2 text-lg font-semibold opacity-85">
          Mín {formatTempIn(main.temp_min, units)} · Máx {formatTempIn(main.temp_max, units)}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat Icon={Thermometer} label="Sensação" value={formatTempIn(main.feels_like, units)} />
        <Stat Icon={Droplets} label="Umidade" value={`${main.humidity}%`} />
        <Stat
          Icon={Wind}
          label="Vento"
          value={formatWind(wind.speed, units)}
          hint={
            [
              wind.deg !== undefined && windDirection(wind.deg),
              wind.gust && `rajadas ${formatWind(wind.gust, units)}`,
            ]
              .filter(Boolean)
              .join(" · ") || undefined
          }
        />
        <Stat Icon={Gauge} label="Pressão" value={`${main.pressure} hPa`} />
        {visibility !== undefined && (
          <Stat Icon={Eye} label="Visibilidade" value={formatVisibility(visibility, units)} />
        )}
        {clouds && <Stat Icon={Cloud} label="Nuvens" value={`${clouds.all}%`} />}
      </div>
      <span className="sr-only">
        Fuso horário UTC{timezone >= 0 ? "+" : ""}
        {timezone / 3600}
      </span>
    </section>
  );
}
