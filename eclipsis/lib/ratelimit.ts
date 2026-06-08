import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ──────────────────────────────────────────────────────────────
// Rate limiter: 3 submissions per hour per IP
// ──────────────────────────────────────────────────────────────
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '3600 s'),
  analytics: true,
  prefix: 'oasis:contact',
});

// ──────────────────────────────────────────────────────────────
// Extract client IP from Vercel request headers
// ──────────────────────────────────────────────────────────────
export function getIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list; take the first
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  return 'anonymous';
}
