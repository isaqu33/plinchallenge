"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import DeteilsWeatherToday from "@/components/personal/DeteilsWeatherToday";
import WeatherWeeke from "@/components/personal/WeatherWeeke";
import Weathertoday from "@/components/personal/Weathertoday";
import { Skeleton } from "@/components/ui/skeleton";
import { loadLocation, type Coords } from "@/lib/location";
import { fetchWeather } from "@/lib/weather-api";

export default function Climate() {
  const router = useRouter();
  // Lido no efeito (não no render): evita o erro de hidratação servidor x cliente
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    const saved = loadLocation();
    if (saved) setCoords(saved);
    else router.replace("/");
  }, [router]);

  const { data, isLoading, isError } = useQuery(["weather", coords], () => fetchWeather(coords!), {
    enabled: coords !== null,
  });

  if (isError) {
    return (
      <p className="flex min-h-[400px] items-center justify-center">
        Não foi possível carregar o clima. Tente novamente.
      </p>
    );
  }

  if (!coords || isLoading || !data) {
    return (
      <div className="flex min-h-[800px] w-full items-center justify-center space-x-4" aria-busy="true">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          {Array.from({ length: 12 }, (_, i) => (
            <Skeleton key={i} className={i % 2 ? "h-4 w-[200px]" : "h-4 w-[250px]"} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Weathertoday today={data.today} coords={coords} />
      <WeatherWeeke data={data.forecast} />
      <DeteilsWeatherToday today={data.today} />
    </>
  );
}
