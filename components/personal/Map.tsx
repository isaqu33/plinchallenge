import { MapPin } from "lucide-react";

interface MapProps {
  lat: number;
  lng: number;
}

/** OpenStreetMap embed: não precisa de chave nem de URL "mágica" do Google. */
export default function Mapa({ lat, lng }: MapProps) {
  const d = 0.01;
  const bbox = [lng - d, lat - d, lng + d, lat + d].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-3xl border bg-card">
      <iframe
        title="Mapa da sua localização"
        src={src}
        width="100%"
        height="300"
        loading="lazy"
        className="border-0"
      />
      <p className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
        {lat.toFixed(5)}, {lng.toFixed(5)}
      </p>
    </div>
  );
}
