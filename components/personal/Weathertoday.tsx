import { Card } from "@/components/ui/card";
import Mapa from "./Map";
import type { Coords } from "@/lib/location";
import type { WeatherToday } from "@/lib/weather-api";
import { formatLongDate, formatTemp, formatTime } from "@/lib/weather";

export default function Weathertoday({ today, coords }: { today: WeatherToday; coords: Coords }) {
  const { name, dt, weather, main } = today;
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className="flex w-full max-w-[98%] items-center justify-center rounded-lg pb-2"
        style={{
          backgroundImage: "linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff)",
        }}
      >
        <div className="min-h-[650px] w-full max-w-[1700px] rounded-md">
          <div className="flex flex-wrap items-center justify-around">
            <div className="flex w-full max-w-[500px] items-end justify-center">
              <div className="flex w-full flex-col items-center justify-center">
                <h1 className="text-[50px] font-extrabold text-white md:text-[90px]">{name}</h1>
                <div className="flex w-full items-center justify-around">
                  <span className="min-w-[150px] font-bold text-white">{formatLongDate(dt)}</span>
                  <span className="min-w-[150px] font-bold text-white">Atualizado às {formatTime(dt)}</span>
                </div>
                <Card className="mt-[20px]">
                  <Mapa lat={coords.latitude} lng={coords.longitude} />
                </Card>
              </div>
            </div>

            <div className="flex max-w-[500px] flex-wrap items-center justify-center">
              <div className="mt-1 flex w-full max-w-[400px] items-center justify-center overflow-hidden">
                <img src="/Weather.svg" alt="" className="min-w-full" />
              </div>
              <div
                className="mt-5 min-h-[300px] w-[83%] max-w-[500px] rounded-lg p-9 md:mt-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right top, #5a3e51, #6f4e68, #835e82, #96709d, #a883ba)",
                }}
              >
                <div className="flex h-[100px] w-full justify-between">
                  <div className="flex w-[100px] items-center justify-center rounded-xl bg-white p-5 font-bold text-black">
                    Hoje
                  </div>
                  <div className="flex items-center justify-center rounded-xl p-5 text-[28px] font-extrabold capitalize text-white md:text-[40px]">
                    {weather[0].description}
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="flex w-[150px] items-center justify-center overflow-hidden">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                      alt={weather[0].description}
                      className="min-w-full"
                    />
                  </div>
                  <div className="flex w-full items-center justify-center rounded-lg text-[50px] font-bold">
                    {formatTemp(main.temp)}
                  </div>
                  <div className="flex w-full justify-around rounded-lg bg-[#a883ba]">
                    <span className="p-2 font-bold">Mínima: {formatTemp(main.temp_min)}</span>
                    <span className="p-2 font-bold">Máxima: {formatTemp(main.temp_max)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
