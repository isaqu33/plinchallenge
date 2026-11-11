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

/** Só dígitos, no máximo 8 (aceita "70040-010"). */
export function normalizeCep(input: string): string {
  return input.replace(/\D/g, "").slice(0, 8);
}

export function formatCep(digits: string): string {
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function validateCep(input: string): string | null {
  return normalizeCep(input).length === 8 ? null : "O CEP tem 8 dígitos (ex.: 70040-010).";
}

/** Busca direta por CEP. Devolve null quando o ViaCEP responde `{ erro: true }`. */
export async function searchByCep(input: string): Promise<Cep | null> {
  const res = await fetch(`https://viacep.com.br/ws/${normalizeCep(input)}/json/`);
  if (!res.ok) throw new Error("Falha ao consultar o ViaCEP.");
  const data = (await res.json()) as Cep & { erro?: boolean | string };
  return data.erro ? null : data;
}
