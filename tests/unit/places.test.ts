import { describe, expect, it } from "vitest";
import { isFavorite, parsePlaces, toggleFavorite, type Place } from "@/lib/places";

const sp: Place = { name: "São Paulo", latitude: -23.55, longitude: -46.63 };
const rio: Place = { name: "Rio", latitude: -22.9, longitude: -43.2 };

describe("favoritos", () => {
  it("adiciona e remove", () => {
    const added = toggleFavorite([], sp);
    expect(isFavorite(added, sp)).toBe(true);
    expect(toggleFavorite(added, sp)).toEqual([]);
  });
  it("considera coordenadas muito próximas como o mesmo lugar", () => {
    expect(isFavorite([sp], { latitude: -23.56, longitude: -46.64 })).toBe(true);
  });
  it("limita a 8 e mantém o mais recente primeiro", () => {
    let list: Place[] = [];
    for (let i = 0; i < 10; i++)
      list = toggleFavorite(list, { name: `c${i}`, latitude: i * 5, longitude: i * 5 });
    expect(list).toHaveLength(8);
    expect(list[0].name).toBe("c9");
  });
  it("ignora lixo vindo do localStorage", () => {
    expect(parsePlaces("x")).toEqual([]);
    expect(parsePlaces([sp, { name: 1 }, { name: "x", latitude: 999, longitude: 0 }, rio])).toEqual([
      sp,
      rio,
    ]);
  });
});
