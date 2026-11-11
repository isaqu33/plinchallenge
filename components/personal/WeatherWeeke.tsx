import WeatherIcon from "./WeatherIcon";
import { dailyForecast, formatTemp, weekdayName, type ForecastEntry } from "@/lib/weather";

export default function WeatherWeeke({ data }: { data: ForecastEntry[] }) {
  const days = dailyForecast(data);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Próximos dias</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {days.map((p) => (
          <div
            key={p.dt}
            className="flex flex-col items-center gap-1 rounded-3xl border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-sm font-bold text-muted-foreground">{weekdayName(new Date(p.dt * 1000))}</p>
            <WeatherIcon code={p.weather[0].icon} className="my-2 h-10 w-10 text-primary" />
            <p className="text-2xl font-extrabold">{formatTemp(p.main.temp)}</p>
            <p className="text-xs capitalize text-muted-foreground">{p.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
