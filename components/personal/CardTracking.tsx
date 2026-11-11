"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateCepQuery, type CepQuery } from "@/lib/cep";

interface Props {
  onSearch: (query: CepQuery) => void;
  loading: boolean;
}

export function CardTracking({ onSearch, loading }: Props) {
  const [query, setQuery] = useState<CepQuery>({ uf: "", cidade: "", rua: "" });
  const error = validateCepQuery(query);
  const touched = query.uf || query.cidade || query.rua;
  const set = (field: keyof CepQuery) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery((q) => ({ ...q, [field]: e.target.value }));

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!error) onSearch(query);
      }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>CEP</CardTitle>
          <CardDescription>
            Informe UF, cidade e logradouro para descobrir os CEPs possíveis. Todos os campos são
            obrigatórios.
            <br />
            Exemplo: UF: RS · Cidade: Porto Alegre · Rua: Domingos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
          {touched && error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!!error || loading}>
            {loading ? "Pesquisando..." : "Pesquisar possíveis CEPs"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
