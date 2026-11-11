"use client";

import { useUnits } from "@/components/units-provider";

export default function UnitToggle() {
  const { units, setUnits } = useUnits();
  const imperial = units === "imperial";
  return (
    <button
      type="button"
      onClick={() => setUnits(imperial ? "metric" : "imperial")}
      aria-label={imperial ? "Usar °C e km/h" : "Usar °F e mph"}
      title={imperial ? "Usar °C e km/h" : "Usar °F e mph"}
      className="h-10 min-w-10 rounded-full px-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {imperial ? "°F" : "°C"}
    </button>
  );
}
