import { describe, expect, it } from "vitest";
import { skyFor } from "@/lib/sky";

describe("skyFor", () => {
  it("diferencia dia e noite", () => {
    expect(skyFor("01d").icon).toBe("sun");
    expect(skyFor("01n").icon).toBe("moon");
    expect(skyFor("01n").gradient).not.toBe(skyFor("01d").gradient);
  });
  it("mapeia chuva, tempestade e neve", () => {
    expect(skyFor("10d").icon).toBe("rain");
    expect(skyFor("11n").icon).toBe("storm");
    expect(skyFor("13d").icon).toBe("snow");
  });
  it("código desconhecido cai num padrão", () => expect(skyFor("99x").icon).toBe("cloud-sun"));
});
