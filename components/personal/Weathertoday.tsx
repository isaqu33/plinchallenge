import Mapa from "./Map";
import type { Coords } from "@/lib/location";
import type { WeatherToday } from "@/lib/weather-api";
import { formatLongDate, formatTemp, formatTime } from "@/lib/weather";

export default function Weathertoday({ today, coords }: { today: WeatherToday; coords: Coords }) {
  const { name, dt, weather, main } = today;
  return (
    <section className="rounded-3xl bg-gradient-to-br from-primary/15 via-secondary to-background p-6 md:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <h1 className="text-5xl font-extrabold md:text-7xl">{name}</h1>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              {formatLongDate(dt)} · Atualizado às {formatTime(dt)}
            </p>
          </div>
          <Mapa lat={coords.latitude} lng={coords.longitude} />
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
              Hoje
            </span>
            <span className="text-xl font-extrabold capitalize md:text-3xl">{weather[0].description}</span>
          </div>
          <div className="flex flex-col items-center py-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
              className="w-[130px]"
            />
            <div className="text-6xl font-extrabold">{formatTemp(main.temp)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center text-sm font-semibold">
            <div className="rounded-xl bg-secondary p-3">Mínima: {formatTemp(main.temp_min)}</div>
            <div className="rounded-xl bg-secondary p-3">Máxima: {formatTemp(main.temp_max)}</div>
          </div>
          <img src="/Weather.svg" alt="" className="mx-auto mt-6 hidden w-[260px] sm:block" />
        </div>
      </div>
    </section>
  );
}
