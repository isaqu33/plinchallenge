import { describe, expect, it } from "vitest";
import { buildCepUrl, validateCepQuery } from "@/lib/cep";

describe("validateCepQuery", () => {
  it("aceita uma consulta válida", () =>
    expect(validateCepQuery({ uf: "RS", cidade: "Porto Alegre", rua: "Domingos" })).toBeNull());
  it("rejeita UF inválida", () =>
    expect(validateCepQuery({ uf: "R", cidade: "Porto Alegre", rua: "Domingos" })).toMatch(/UF/));
  it("rejeita cidade e rua curtas", () => {
    expect(validateCepQuery({ uf: "DF", cidade: "Br", rua: "Domingos" })).toMatch(/cidade/i);
    expect(validateCepQuery({ uf: "DF", cidade: "Brasília", rua: "Q" })).toMatch(/logradouro/i);
  });
});

describe("buildCepUrl", () => {
  it("codifica acentos e espaços e põe a UF em maiúsculas", () => {
    expect(buildCepUrl({ uf: "df", cidade: "Brasília", rua: "Quadra 26" })).toBe(
      "https://viacep.com.br/ws/DF/Bras%C3%ADlia/Quadra%2026/json/"
    );
  });
});
