import { describe, expect, it } from "vitest";
import { aqiLabel, formatTempIn, formatVisibility, formatWind, parseUnits, windDirection } from "@/lib/units";

describe("units", () => {
  it("converte temperatura", () => {
    expect(formatTempIn(20, "metric")).toBe("20 °C");
    expect(formatTempIn(20, "imperial")).toBe("68 °F");
    expect(formatTempIn(-40, "imperial")).toBe("-40 °F");
  });
  it("converte vento e visibilidade", () => {
    expect(formatWind(10, "metric")).toBe("36 km/h");
    expect(formatWind(10, "imperial")).toBe("22 mph");
    expect(formatVisibility(10000, "metric")).toBe("10 km");
    expect(formatVisibility(1609.344, "imperial")).toBe("1.0 mi");
  });
  it("direção do vento", () => {
    expect(windDirection(0)).toBe("N");
    expect(windDirection(350)).toBe("N");
    expect(windDirection(90)).toBe("L");
    expect(windDirection(225)).toBe("SO");
    expect(windDirection(-90)).toBe("O");
  });
  it("parseUnits cai em metric", () => {
    expect(parseUnits("imperial")).toBe("imperial");
    expect(parseUnits("x")).toBe("metric");
    expect(parseUnits(null)).toBe("metric");
  });
  it("rótulo do AQI", () => {
    expect(aqiLabel(1)).toBe("Bom");
    expect(aqiLabel(5)).toBe("Muito ruim");
    expect(aqiLabel(9)).toBe("Muito ruim");
  });
});
