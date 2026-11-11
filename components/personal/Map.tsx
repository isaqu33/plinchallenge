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
    <div className="w-full overflow-hidden rounded-2xl border bg-card">
      <iframe
        title="Mapa da sua localização"
        src={src}
        width="100%"
        height="320"
        loading="lazy"
        className="border-0"
      />
      <div className="flex justify-around gap-2 p-3 text-sm">
        <span className="font-semibold">Latitude: {lat.toFixed(5)}</span>
        <span className="font-semibold">Longitude: {lng.toFixed(5)}</span>
      </div>
    </div>
  );
}
