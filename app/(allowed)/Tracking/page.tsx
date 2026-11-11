"use client";

import { useState } from "react";
import PageHero from "@/components/layout/PageHero";
import { CardTracking } from "@/components/personal/CardTracking";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { searchCeps, type Cep, type CepQuery } from "@/lib/cep";

const FIELDS: [string, keyof Cep][] = [
  ["CEP", "cep"],
  ["Logradouro", "logradouro"],
  ["Bairro", "bairro"],
  ["Localidade", "localidade"],
  ["UF", "uf"],
  ["IBGE", "ibge"],
  ["DDD", "ddd"],
  ["SIAFI", "siafi"],
];

export default function Tracking() {
  const [results, setResults] = useState<Cep[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  async function search(query: CepQuery) {
    setLoading(true);
    try {
      const ceps = await searchCeps(query);
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
    <div className="space-y-10">
      <PageHero image="/logorastreio.svg" imageFirst>
        <CardTracking onSearch={search} loading={loading} />
      </PageHero>

      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ops! ):</AlertDialogTitle>
            <AlertDialogDescription>
              Nenhum CEP encontrado para os dados informados. Verifique UF, cidade e logradouro e tente
              novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section aria-live="polite">
        {results ? (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((item) => (
              <dl key={item.cep + item.logradouro} className="rounded-2xl border bg-card p-5 shadow-sm">
                {FIELDS.map(([label, key]) => (
                  <div key={key} className="flex justify-between gap-4 py-1 text-sm">
                    <dt className="font-semibold text-muted-foreground">{label}</dt>
                    <dd className="text-right font-semibold">{item[key]}</dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-6">
            <img src="/pesquisa.svg" alt="" className="w-full max-w-[320px] opacity-90" />
          </div>
        )}
      </section>
    </div>
  );
}
