import { describe, expect, it } from "vitest";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("bloqueia depois do limite e reabre na próxima janela", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("a", 10).ok).toBe(true);
    const blocked = check("a", 20);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBe(1);
    expect(check("a", 1001).ok).toBe(true);
  });
  it("conta cada chave separadamente", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("b", 0).ok).toBe(true);
    expect(check("a", 1).ok).toBe(false);
  });
  it("lê o IP do x-forwarded-for", () => {
    const req = new Request("http://x", { headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" } });
    expect(clientIp(req)).toBe("1.2.3.4");
    expect(clientIp(new Request("http://x"))).toBe("local");
  });
});
