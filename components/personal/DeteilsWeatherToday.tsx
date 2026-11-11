import { Sunrise, Sunset } from "lucide-react";
import type { WeatherToday } from "@/lib/weather-api";
import { formatTime } from "@/lib/weather";

function SunCard({
  Icon,
  name,
  time,
  tone,
}: {
  Icon: typeof Sunrise;
  name: string;
  time: number;
  tone: string;
}) {
  return (
    <div className={`flex items-center gap-4 rounded-3xl bg-gradient-to-br ${tone} p-6 text-white shadow-lg`}>
      <Icon className="h-12 w-12 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold opacity-85">{name}</p>
        <p className="text-4xl font-extrabold tracking-tight">{formatTime(time)}</p>
      </div>
    </div>
  );
}

export default function DeteilsWeatherToday({ today }: { today: WeatherToday }) {
  const { sys } = today;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Sol</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <SunCard Icon={Sunrise} name="Nascer do sol" time={sys.sunrise} tone="from-amber-400 to-orange-500" />
        <SunCard Icon={Sunset} name="Pôr do sol" time={sys.sunset} tone="from-orange-500 to-rose-600" />
      </div>
    </section>
  );
}
