"use client";

import { Loader2, MapPin, Search } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchCities, type GeoResult } from "@/lib/weather-api";

interface Props {
  onSelect: (place: { name: string; latitude: number; longitude: number }) => void;
  className?: string;
}

const label = (r: GeoResult) => [r.name, r.state, r.country].filter(Boolean).join(", ");

/** Busca de cidade com debounce de 350 ms; cancela a requisição anterior ao digitar. */
export default function CitySearch({ onSelect, className }: Props) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "empty" | "error">("idle");
  const listId = useId();

  useEffect(() => {
    const q = term.trim();
    if (q.length < 2) {
      setResults([]);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("loading");
      try {
        const found = await searchCities(q, controller.signal);
        setResults(found);
        setStatus(found.length ? "idle" : "empty");
      } catch (e) {
        if ((e as Error).name !== "AbortError") setStatus("error");
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  function pick(r: GeoResult) {
    onSelect({ name: r.name, latitude: r.lat, longitude: r.lon });
    setTerm("");
    setResults([]);
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls={listId}
        aria-label="Buscar cidade"
        placeholder="Buscar outra cidade…"
        autoComplete="off"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="h-12 rounded-full pl-11 pr-11"
      />
      {status === "loading" && (
        <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      )}

      {(results.length > 0 || status === "empty" || status === "error") && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border bg-popover p-1 text-popover-foreground shadow-xl"
        >
          {results.map((r) => (
            <li key={`${r.lat},${r.lon}`} role="option" aria-selected="false">
              <button
                type="button"
                onClick={() => pick(r)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-accent"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {label(r)}
              </button>
            </li>
          ))}
          {status === "empty" && (
            <li className="px-3 py-2.5 text-sm text-muted-foreground">Nenhuma cidade encontrada.</li>
          )}
          {status === "error" && (
            <li className="px-3 py-2.5 text-sm text-destructive">Não foi possível buscar agora.</li>
          )}
        </ul>
      )}
    </div>
  );
}
