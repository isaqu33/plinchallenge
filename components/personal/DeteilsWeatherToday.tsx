import { Sunrise, Sunset } from "lucide-react";
import AirQuality from "./AirQuality";
import type { AirForecastEntry, AirQuality as AirQualityData } from "@/lib/schemas";
import type { WeatherToday } from "@/lib/weather-api";
import { formatTime } from "@/lib/weather";

function SunCard({
  Icon,
  name,
  time,
  tz,
  tone,
}: {
  Icon: typeof Sunrise;
  name: string;
  time: number;
  tz: number;
  tone: string;
}) {
  return (
    <div className={`flex items-center gap-4 rounded-3xl bg-gradient-to-br ${tone} p-6 text-white shadow-lg`}>
      <Icon className="h-12 w-12 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold opacity-85">{name}</p>
        <p className="text-4xl font-extrabold tracking-tight">{formatTime(time, tz)}</p>
      </div>
    </div>
  );
}

export default function DeteilsWeatherToday({
  today,
  air,
  airForecast,
}: {
  today: WeatherToday;
  air: AirQualityData | null;
  airForecast: AirForecastEntry[];
}) {
  const { sys } = today;
  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-2">
      <div className="grid content-start gap-4">
        <SunCard
          Icon={Sunrise}
          name="Nascer do sol"
          time={sys.sunrise}
          tz={today.timezone}
          tone="from-amber-400 to-orange-500"
        />
        <SunCard
          Icon={Sunset}
          name="Pôr do sol"
          time={sys.sunset}
          tz={today.timezone}
          tone="from-orange-500 to-rose-600"
        />
      </div>
      {air && <AirQuality air={air} forecast={airForecast} />}
    </section>
  );
}
