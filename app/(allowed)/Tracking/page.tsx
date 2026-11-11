"use client";

import { useState } from "react";
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
    <div>
      <div className="flex w-full items-center justify-center">
        <div
          className="flex w-full max-w-[98%] items-center justify-center rounded-lg pb-2"
          style={{
            backgroundImage: "linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff)",
          }}
        >
          <div className="flex min-h-[650px] w-full max-w-[1800px] rounded-md">
            <div className="flex w-full flex-wrap items-center justify-around">
              <div className="flex w-full max-w-[400px] items-center justify-center overflow-hidden">
                <img src="/logorastreio.svg" alt="" className="min-w-full" />
              </div>
              <div className="mt-5 flex min-h-[300px] w-[83%] max-w-[500px] items-center justify-center rounded-lg p-9 md:mt-0">
                <CardTracking onSearch={search} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <div className="mt-3 flex min-h-[500px] w-full items-center justify-center border-t-2 border-b-[#A883BA]">
        {results ? (
          <div className="mt-5 flex w-full flex-wrap items-center justify-around">
            {results.map((item) => (
              <div
                key={item.cep + item.logradouro}
                className="m-1 w-full max-w-[600px] rounded-xl bg-[#121C32] p-2 hover:bg-[#121c3298]"
              >
                {FIELDS.map(([label, key]) => (
                  <div key={key} className="flex w-full justify-around">
                    <div className="w-[30%] font-bold text-white">{label}:</div>
                    <div className="w-[70%] font-bold text-[#D9DAFF]">{item[key]}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex w-full max-w-[400px] items-center justify-center overflow-hidden">
            <img src="/pesquisa.svg" alt="" className="min-w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
