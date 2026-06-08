import type { NextConfig } from 'next';

// ──────────────────────────────────────────────────────────────
// Content-Security-Policy
// ──────────────────────────────────────────────────────────────
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// ──────────────────────────────────────────────────────────────
// Security headers applied to ALL routes
// ──────────────────────────────────────────────────────────────
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

// ──────────────────────────────────────────────────────────────
// Next.js Configuration
// ──────────────────────────────────────────────────────────────
const nextConfig: NextConfig = {
  // ── Headers ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // ── Image Optimization (PART 3.8) ──────────────────────
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
  },

  // ── Performance ────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  // ── Redirects: force HTTPS in production ───────────────
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://:host/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
