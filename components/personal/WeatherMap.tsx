"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const LAYERS = [
  { id: "precipitation_new", label: "Chuva" },
  { id: "clouds_new", label: "Nuvens" },
  { id: "temp_new", label: "Temperatura" },
  { id: "wind_new", label: "Vento" },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

/** Mapa OpenStreetMap + camada meteorológica do OpenWeather (tiles via proxy /api/tiles, sem expor a chave). */
export default function WeatherMap({ lat, lng }: { lat: number; lng: number }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const overlay = useRef<L.TileLayer | null>(null);
  const marker = useRef<L.CircleMarker | null>(null);
  const [layer, setLayer] = useState<LayerId>("precipitation_new");

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { center: [lat, lng], zoom: 6, scrollWheelZoom: false });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 10,
      attribution: "© OpenStreetMap",
    }).addTo(m);
    marker.current = L.circleMarker([lat, lng], {
      radius: 8,
      color: "#fff",
      weight: 3,
      fillColor: "#7c3aed",
      fillOpacity: 1,
    }).addTo(m);
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
    };
    // cria uma vez; as mudanças de posição/camada são tratadas nos efeitos abaixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    map.current?.setView([lat, lng]);
    marker.current?.setLatLng([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (!map.current) return;
    overlay.current?.remove();
    overlay.current = L.tileLayer(`/api/tiles/${layer}/{z}/{x}/{y}`, { opacity: 0.75, maxZoom: 10 }).addTo(
      map.current
    );
  }, [layer]);

  return (
    <section className="overflow-hidden rounded-3xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 p-4">
        <h2 className="text-lg font-extrabold tracking-tight">Mapa do tempo</h2>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Camada do mapa">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={layer === l.id}
              onClick={() => setLayer(l.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                layer === l.id ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div ref={el} className="h-[340px] w-full" role="img" aria-label="Mapa meteorológico da sua região" />
    </section>
  );
}
