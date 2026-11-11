import { dailyForecast, formatTemp, weekdayName, type ForecastEntry } from "@/lib/weather";

export default function WeatherWeeke({ data }: { data: ForecastEntry[] }) {
  const days = dailyForecast(data);

  return (
    <section className="mt-7 flex min-h-[500px] w-full items-center justify-center bg-black">
      <div className="flex w-full max-w-[1400px] flex-col items-center justify-center">
        <h2 className="w-full border-b-2 border-b-[#A883BA] font-extrabold text-[#A883BA]">
          Tempo durante a semana
        </h2>
        <div className="mt-5 flex w-full flex-wrap items-center justify-around">
          {days.map((p) => (
            <div
              key={p.dt}
              className="m-1 min-h-[200px] w-full max-w-[200px] rounded-xl bg-[#121C32] hover:bg-[#121c3298]"
            >
              <img
                src={`https://openweathermap.org/img/wn/${p.weather[0].icon}.png`}
                alt={`Ícone do clima: ${p.weather[0].description}`}
                className="w-[70px]"
              />
              <p className="w-full text-[20px] font-bold">{weekdayName(new Date(p.dt * 1000))}</p>
              <p className="w-full p-4 text-[40px] font-semibold">{formatTemp(p.main.temp)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
