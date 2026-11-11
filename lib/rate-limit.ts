export interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfter: number;
}

/** Janela fixa em memória, por chave (IP). Suficiente para uma instância; em várias, use Redis. */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>();

  return function check(key: string, now = Date.now()): RateLimitResult {
    // limpeza oportunista para o Map não crescer sem parar
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    }
    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    return {
      ok: bucket.count <= limit,
      remaining: Math.max(0, limit - bucket.count),
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}
