"use client";

import { Check, Copy, MapPin } from "lucide-react";
import { useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import { CardTracking, type CepSearch } from "@/components/personal/CardTracking";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { searchByCep, searchCeps, type Cep } from "@/lib/cep";

const FIELDS: [string, keyof Cep][] = [
  ["Logradouro", "logradouro"],
  ["Bairro", "bairro"],
  ["Localidade", "localidade"],
  ["UF", "uf"],
  ["IBGE", "ibge"],
  ["DDD", "ddd"],
  ["SIAFI", "siafi"],
];

function CepCard({ item }: { item: Cep }) {
  const [copied, setCopied] = useState(false);
  const mapQuery = encodeURIComponent(`${item.logradouro}, ${item.localidade}, ${item.uf}, Brasil`);

  async function copy() {
    try {
      await navigator.clipboard.writeText(item.cep);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bloqueado (http, permissões): sem feedback */
    }
  }

  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm">
      <header className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary">{item.cep}</h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={copy}
            aria-label={`Copiar CEP ${item.cep}`}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <a
            href={`https://www.openstreetmap.org/search?query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir no mapa"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <MapPin className="h-4 w-4" />
          </a>
        </div>
      </header>
      <dl>
        {FIELDS.map(([label, key]) =>
          item[key] ? (
            <div key={key} className="flex justify-between gap-4 py-1 text-sm">
              <dt className="font-semibold text-muted-foreground">{label}</dt>
              <dd className="text-right font-semibold">{item[key]}</dd>
            </div>
          ) : null
        )}
      </dl>
    </article>
  );
}

export default function Tracking() {
  const [results, setResults] = useState<Cep[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  async function search(s: CepSearch) {
    setLoading(true);
    try {
      const ceps =
        s.mode === "cep"
          ? [await searchByCep(s.cep)].filter((c): c is Cep => c !== null)
          : await searchCeps(s.query);
      if (ceps.length === 0) {
        setResults(null);
        setShowAlert(true);
      } else {
        setResults(ceps);
      }
    } catch {
      setResults(null);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 pb-4">
      <div className="mx-auto max-w-xl">
        <PageTitle title="Buscar CEP" subtitle="Consulte um CEP ou descubra o CEP de um endereço." />
        <CardTracking onSearch={search} loading={loading} />
      </div>

      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ops! ):</AlertDialogTitle>
            <AlertDialogDescription>
              Nenhum resultado para os dados informados. Confira o CEP (ou UF, cidade e logradouro) e tente
              novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section aria-live="polite">
        {results && (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((item) => (
              <CepCard key={item.cep + item.logradouro} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
