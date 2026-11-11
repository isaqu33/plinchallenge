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

import { formatCep, normalizeCep, validateCep } from "@/lib/cep";

describe("CEP direto", () => {
  it("normaliza e formata", () => {
    expect(normalizeCep("70040-010")).toBe("70040010");
    expect(normalizeCep("700400101234")).toBe("70040010");
    expect(formatCep("70040010")).toBe("70040-010");
    expect(formatCep("700")).toBe("700");
  });
  it("valida 8 dígitos", () => {
    expect(validateCep("70040-010")).toBeNull();
    expect(validateCep("1234")).not.toBeNull();
  });
});
