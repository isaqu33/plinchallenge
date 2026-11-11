import { Droplets, Gauge, Wind } from "lucide-react";
import Mapa from "./Map";
import WeatherIcon from "./WeatherIcon";
import type { Coords } from "@/lib/location";
import { skyFor } from "@/lib/sky";
import type { WeatherToday } from "@/lib/weather-api";
import { formatLongDate, formatTemp, formatTime } from "@/lib/weather";

function Stat({ Icon, label, value }: { Icon: typeof Wind; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/20 p-4">
      <Icon className="mb-2 h-5 w-5 opacity-80" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default function Weathertoday({ today, coords }: { today: WeatherToday; coords: Coords }) {
  const { name, dt, weather, main, wind } = today;
  const sky = skyFor(weather[0].icon);

  return (
    <div className="space-y-4">
      <section
        className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${sky.gradient} p-6 text-white shadow-xl md:p-10`}
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold opacity-80">
              {formatLongDate(dt)} · atualizado às {formatTime(dt)}
            </p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight md:text-6xl">{name}</h1>
            <p className="mt-2 text-xl font-semibold capitalize opacity-90">{weather[0].description}</p>
          </div>
          <WeatherIcon code={weather[0].icon} className="h-24 w-24 drop-shadow-lg md:h-32 md:w-32" />
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
          <span className="text-7xl font-extrabold leading-none tracking-tighter md:text-9xl">
            {formatTemp(main.temp)}
          </span>
          <span className="pb-2 text-lg font-semibold opacity-85">
            Mín {formatTemp(main.temp_min)} · Máx {formatTemp(main.temp_max)}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <Stat Icon={Droplets} label="Umidade" value={`${main.humidity}%`} />
          <Stat Icon={Wind} label="Vento" value={`${wind.speed} m/s`} />
          <Stat Icon={Gauge} label="Pressão" value={`${main.pressure} hPa`} />
        </div>
      </section>

      <Mapa lat={coords.latitude} lng={coords.longitude} />
    </div>
  );
}
