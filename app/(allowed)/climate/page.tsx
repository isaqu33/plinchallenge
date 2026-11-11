"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CitySearch from "@/components/personal/CitySearch";
import DeteilsWeatherToday from "@/components/personal/DeteilsWeatherToday";
import HourlyForecast from "@/components/personal/HourlyForecast";
import WeatherWeeke from "@/components/personal/WeatherWeeke";
import Weathertoday from "@/components/personal/Weathertoday";
import { Skeleton } from "@/components/ui/skeleton";
import { loadLocation, saveLocation, type Coords } from "@/lib/location";
import { isFavorite, loadFavorites, saveFavorites, toggleFavorite, type Place } from "@/lib/places";
import { fetchWeather } from "@/lib/weather-api";

// Leaflet usa `window`: só carrega no cliente
const WeatherMap = dynamic(() => import("@/components/personal/WeatherMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-[420px] w-full rounded-3xl" />,
});

export default function Climate() {
  const router = useRouter();
  // Lido no efeito (não no render): evita o erro de hidratação servidor x cliente
  const [coords, setCoords] = useState<Coords | null>(null);
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
    const saved = loadLocation();
    if (saved) setCoords(saved);
    else router.replace("/");
  }, [router]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["weather", coords],
    queryFn: () => fetchWeather(coords!),
    enabled: coords !== null,
    staleTime: 10 * 60_000,
  });

  function go(c: Coords) {
    saveLocation({ latitude: c.latitude, longitude: c.longitude });
    setCoords({ latitude: c.latitude, longitude: c.longitude });
  }

  function toggle() {
    if (!coords || !data) return;
    const next = toggleFavorite(favorites, { name: data.today.name, ...coords });
    setFavorites(next);
    saveFavorites(next);
  }

  const chips = favorites.length > 0 && (
    <ul className="mb-4 flex flex-wrap gap-2" aria-label="Cidades favoritas">
      {favorites.map((p) => (
        <li key={`${p.latitude},${p.longitude}`}>
          <button
            type="button"
            onClick={() => go(p)}
            className="rounded-full border bg-card px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            {p.name}
          </button>
        </li>
      ))}
    </ul>
  );

  let body: React.ReactNode;
  if (isError) {
    body = (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-muted-foreground">
        <p>Não foi possível carregar o clima.</p>
        <button type="button" onClick={() => refetch()} className="font-semibold text-primary underline">
          Tentar novamente
        </button>
      </div>
    );
  } else if (!coords || isLoading || !data) {
    body = (
      <div className="space-y-4" aria-busy="true" aria-label="Carregando clima">
        <Skeleton className="h-[420px] w-full rounded-[2rem]" />
        <Skeleton className="h-[360px] w-full rounded-3xl" />
      </div>
    );
  } else {
    body = (
      <>
        <Weathertoday today={data.today} favorite={isFavorite(favorites, coords)} onToggleFavorite={toggle} />
        <HourlyForecast data={data.forecast} timezone={data.today.timezone} />
        <WeatherWeeke data={data.forecast} />
        <DeteilsWeatherToday today={data.today} air={data.air} />
        <div className="mt-10">
          <WeatherMap lat={coords.latitude} lng={coords.longitude} />
        </div>
      </>
    );
  }

  // A busca fica fora do `body`: não remonta (e não perde o que foi digitado) quando o clima termina de carregar.
  return (
    <>
      <CitySearch onSelect={go} className="mb-4" />
      {chips}
      {body}
    </>
  );
}
