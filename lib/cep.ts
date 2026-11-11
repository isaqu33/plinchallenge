export interface Cep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  ddd: string;
  siafi: string;
}

export interface CepQuery {
  uf: string;
  cidade: string;
  rua: string;
}

/** O ViaCEP exige UF com 2 letras e cidade/logradouro com pelo menos 3 caracteres. */
export function validateCepQuery({ uf, cidade, rua }: CepQuery): string | null {
  if (!/^[A-Za-z]{2}$/.test(uf.trim())) return "UF deve ter 2 letras (ex.: DF).";
  if (cidade.trim().length < 3) return "Informe a cidade (mínimo 3 letras).";
  if (rua.trim().length < 3) return "Informe o logradouro (mínimo 3 letras).";
  return null;
}

export function buildCepUrl({ uf, cidade, rua }: CepQuery): string {
  const seg = (s: string) => encodeURIComponent(s.trim());
  return `https://viacep.com.br/ws/${seg(uf.toUpperCase())}/${seg(cidade)}/${seg(rua)}/json/`;
}

export async function searchCeps(query: CepQuery): Promise<Cep[]> {
  const res = await fetch(buildCepUrl(query));
  if (!res.ok) throw new Error("Falha ao consultar o ViaCEP.");
  const data: unknown = await res.json();
  return Array.isArray(data) ? (data as Cep[]) : [];
}
