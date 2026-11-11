import { aqiLabel } from "@/lib/units";
import type { AirForecastEntry, AirQuality as AirQualityData } from "@/lib/schemas";

const TONES = ["bg-emerald-500", "bg-lime-500", "bg-yellow-500", "bg-orange-500", "bg-red-600"];

const POLLUTANTS: [keyof AirQualityData["components"], string][] = [
  ["pm2_5", "PM2,5"],
  ["pm10", "PM10"],
  ["o3", "O₃"],
  ["no2", "NO₂"],
  ["so2", "SO₂"],
  ["co", "CO"],
];

export default function AirQuality({
  air,
  forecast = [],
}: {
  air: AirQualityData;
  forecast?: AirForecastEntry[];
}) {
  return (
    <section className="rounded-3xl border bg-card p-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Qualidade do ar</h2>
      <div className="flex items-center gap-4">
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold text-white ${TONES[air.aqi - 1]}`}
        >
          {air.aqi}
        </span>
        <div>
          <p className="text-xl font-bold">{aqiLabel(air.aqi)}</p>
          <p className="text-sm text-muted-foreground">Índice de 1 (bom) a 5 (muito ruim)</p>
        </div>
      </div>
      <div className="mt-5 flex gap-1" aria-hidden="true">
        {TONES.map((tone, i) => (
          <span
            key={tone}
            className={`h-2 flex-1 rounded-full ${tone} ${i + 1 === air.aqi ? "" : "opacity-25"}`}
          />
        ))}
      </div>
      {forecast.length > 1 && (
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Próximas 24 horas</h3>
          <ul className="flex items-end gap-1.5" aria-label="Previsão da qualidade do ar">
            {forecast.map((f) => (
              <li key={f.dt} className="flex flex-1 flex-col items-center gap-1 text-xs">
                <span
                  className={`w-full rounded-md ${TONES[f.aqi - 1]}`}
                  style={{ height: `${f.aqi * 12 + 8}px` }}
                  title={`${aqiLabel(f.aqi)} (${f.aqi})`}
                />
                <span className="text-muted-foreground">
                  {new Date(f.dt * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit" })}h
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        {POLLUTANTS.map(([key, label]) => (
          <div key={key} className="rounded-xl bg-secondary p-3">
            <dt className="font-semibold text-muted-foreground">{label}</dt>
            <dd className="text-lg font-bold">
              {air.components[key].toFixed(1)} <span className="text-xs font-medium">µg/m³</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
