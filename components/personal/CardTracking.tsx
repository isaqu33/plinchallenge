"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCep, normalizeCep, validateCep, validateCepQuery, type CepQuery } from "@/lib/cep";

export type CepSearch = { mode: "cep"; cep: string } | { mode: "endereco"; query: CepQuery };

interface Props {
  onSearch: (search: CepSearch) => void;
  loading: boolean;
}

export function CardTracking({ onSearch, loading }: Props) {
  const [mode, setMode] = useState<CepSearch["mode"]>("cep");
  const [cep, setCep] = useState("");
  const [query, setQuery] = useState<CepQuery>({ uf: "", cidade: "", rua: "" });

  const error = mode === "cep" ? validateCep(cep) : validateCepQuery(query);
  const touched = mode === "cep" ? cep.length > 0 : query.uf || query.cidade || query.rua;
  const set = (field: keyof CepQuery) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery((q) => ({ ...q, [field]: e.target.value }));

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (error) return;
        onSearch(mode === "cep" ? { mode, cep: normalizeCep(cep) } : { mode, query });
      }}
    >
      <Card className="shadow-xl shadow-primary/5">
        <CardHeader>
          <CardTitle>CEP</CardTitle>
          <div
            className="mt-3 flex gap-1 rounded-full bg-secondary p-1"
            role="tablist"
            aria-label="Tipo de busca"
          >
            {(
              [
                ["cep", "Tenho o CEP"],
                ["endereco", "Busco pelo endereço"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  mode === id ? "bg-background shadow" : "text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <CardDescription className="pt-2">
            {mode === "cep"
              ? "Digite o CEP para ver o endereço completo."
              : "Informe UF, cidade e logradouro para descobrir os CEPs possíveis. Ex.: RS · Porto Alegre · Domingos"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {mode === "cep" ? (
            <div className="space-y-1">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                inputMode="numeric"
                placeholder="70040-010"
                value={formatCep(normalizeCep(cep))}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" maxLength={2} placeholder="DF, CE, RS" value={query.uf} onChange={set("uf")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Brasília, Fortaleza"
                  value={query.cidade}
                  onChange={set("cidade")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="rua">Logradouro (rua)</Label>
                <Input id="rua" placeholder="Domingos, Quadra 26" value={query.rua} onChange={set("rua")} />
              </div>
            </>
          )}
          {touched && error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="rounded-full px-6" disabled={!!error || loading}>
            {loading ? "Pesquisando..." : mode === "cep" ? "Buscar endereço" : "Pesquisar possíveis CEPs"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
