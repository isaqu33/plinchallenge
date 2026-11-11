import { dailyForecast, formatTemp, weekdayName, type ForecastEntry } from "@/lib/weather";

export default function WeatherWeeke({ data }: { data: ForecastEntry[] }) {
  const days = dailyForecast(data);

  return (
    <section className="mt-10">
      <h2 className="mb-4 border-b pb-2 text-2xl font-extrabold text-primary">Tempo durante a semana</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {days.map((p) => (
          <div
            key={p.dt}
            className="flex flex-col items-center rounded-2xl border bg-card p-4 text-center shadow-sm transition-colors hover:bg-accent"
          >
            <img
              src={`https://openweathermap.org/img/wn/${p.weather[0].icon}@2x.png`}
              alt={`Ícone do clima: ${p.weather[0].description}`}
              className="w-[70px]"
            />
            <p className="text-base font-bold">{weekdayName(new Date(p.dt * 1000))}</p>
            <p className="text-3xl font-semibold">{formatTemp(p.main.temp)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
