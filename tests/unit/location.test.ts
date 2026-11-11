import { describe, expect, it } from "vitest";
import { isValidCoords } from "@/lib/location";

describe("isValidCoords", () => {
  it("aceita coordenadas válidas, inclusive zero", () => {
    expect(isValidCoords({ latitude: -16.0, longitude: -47.99 })).toBe(true);
    expect(isValidCoords({ latitude: 0, longitude: 0 })).toBe(true);
  });
  it("rejeita fora do intervalo, tipos errados e nulos", () => {
    expect(isValidCoords({ latitude: 91, longitude: 0 })).toBe(false);
    expect(isValidCoords({ latitude: "1", longitude: 0 })).toBe(false);
    expect(isValidCoords(null)).toBe(false);
  });
});
