// HOW TO RUN:
// npm install -g k6
// k6 run load-test.js
// Cloud: k6 cloud load-test.js

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const contactErrors = new Rate('contact_form_errors');
const ttfb = new Trend('time_to_first_byte', true);

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

const CONTACT_PAYLOAD = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  college: 'BMSCE Bangalore',
  package: 'Builder',
  message:
    'I am a final year CS student looking to build my portfolio before placements.',
  honeypot: '',
  source: 'LinkedIn',
});

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// ──────────────────────────────────────────────
// Thresholds — test fails if any are breached
// ──────────────────────────────────────────────
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<800', 'p(99)<1500'],
    http_req_failed: ['rate<0.01'],
    http_req_waiting: ['p(95)<200'],
  },

  scenarios: {
    // ── Scenario A: Baseline ──────────────────
    baseline: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '5s',
      exec: 'baseline',
    },

    // ── Scenario B: Stress ────────────────────
    stress_ramp_up: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '5s',
      startTime: '40s',
      exec: 'stress',
    },

    // ── Scenario C: Spike ─────────────────────
    spike: {
      executor: 'constant-vus',
      vus: 200,
      duration: '30s',
      gracefulStop: '5s',
      startTime: '4m30s',
      exec: 'spike',
    },
  },
};

// ──────────────────────────────────────────────
// Helper: hit all three endpoints
// ──────────────────────────────────────────────
function hitEndpoints(tag) {
  group(`${tag} — GET /`, () => {
    const res = http.get(`${BASE_URL}/`, { tags: { name: 'homepage' } });
    check(res, {
      'homepage status 200': (r) => r.status === 200,
      'homepage body present': (r) => r.body.length > 0,
    });
    ttfb.add(res.timings.waiting, { endpoint: 'homepage' });
  });

  group(`${tag} — GET /#pricing`, () => {
    const res = http.get(`${BASE_URL}/#pricing`, {
      tags: { name: 'pricing_anchor' },
    });
    check(res, {
      'pricing anchor status 200': (r) => r.status === 200,
    });
    ttfb.add(res.timings.waiting, { endpoint: 'pricing_anchor' });
  });

  group(`${tag} — POST /api/contact`, () => {
    const res = http.post(`${BASE_URL}/api/contact`, CONTACT_PAYLOAD, {
      headers: HEADERS,
      tags: { name: 'contact_form' },
    });
    const ok = check(res, {
      'contact status 2xx or 429': (r) =>
        r.status === 200 || r.status === 429,
      'contact returns JSON': (r) => {
        try {
          JSON.parse(r.body);
          return true;
        } catch {
          return false;
        }
      },
    });
    contactErrors.add(!ok);
    ttfb.add(res.timings.waiting, { endpoint: 'contact_form' });
  });
}

// ──────────────────────────────────────────────
// Scenario executors
// ──────────────────────────────────────────────
export function baseline() {
  hitEndpoints('Baseline');
  sleep(1);
}

export function stress() {
  hitEndpoints('Stress');
  sleep(0.5);
}

export function spike() {
  hitEndpoints('Spike');
  sleep(0.3);
}

// ──────────────────────────────────────────────
// Summary at end of run
// ──────────────────────────────────────────────
export function handleSummary(data) {
  const p50 = data.metrics.http_req_duration.values['p(50)'].toFixed(2);
  const p95 = data.metrics.http_req_duration.values['p(95)'].toFixed(2);
  const p99 = data.metrics.http_req_duration.values['p(99)'].toFixed(2);
  const errRate =
    (data.metrics.http_req_failed.values.rate * 100).toFixed(2) + '%';
  const rps = data.metrics.http_reqs.values.rate.toFixed(2);
  const ttfbP95 = data.metrics.time_to_first_byte
    ? data.metrics.time_to_first_byte.values['p(95)'].toFixed(2)
    : 'N/A';

  return {
    stdout: `
╔══════════════════════════════════════════════════╗
║                OASIS LOAD TEST RESULTS            ║
╠══════════════════════════════════════════════════╣
║  p50 Response Time:    ${p50.padStart(8)} ms              ║
║  p95 Response Time:    ${p95.padStart(8)} ms              ║
║  p99 Response Time:    ${p99.padStart(8)} ms              ║
║  Error Rate:           ${errRate.padStart(8)}               ║
║  Requests/sec:         ${rps.padStart(8)}                  ║
║  TTFB p95:             ${String(ttfbP95).padStart(8)} ms              ║
╚══════════════════════════════════════════════════╝
`,
  };
}
