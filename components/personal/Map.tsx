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
    <div className="w-full rounded-lg bg-white p-3">
      <iframe
        title="Mapa da sua localização"
        src={src}
        width="100%"
        height="400"
        loading="lazy"
        className="border-0"
      />
      <div className="mt-2 flex w-full flex-col items-center justify-center rounded-sm bg-[#D9DAFF] p-2">
        <h2 className="font-extrabold text-[#5A3E51]">Suas informações de localização:</h2>
        <span className="m-2 flex w-[70%] items-center justify-center rounded-lg bg-white font-semibold text-black">
          Latitude: {lat.toFixed(5)}
        </span>
        <span className="m-2 flex w-[70%] items-center justify-center rounded-lg bg-white font-semibold text-black">
          Longitude: {lng.toFixed(5)}
        </span>
      </div>
    </div>
  );
}
