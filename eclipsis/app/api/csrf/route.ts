import { NextRequest, NextResponse } from 'next/server';
import { createHmac, randomBytes } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'fallback-dev-secret-change-me';
const TOKEN_EXPIRY_SECONDS = 3600; // 1 hour

// ──────────────────────────────────────────────────────────────
// GET /api/csrf
// Generates a signed CSRF token, sets it as an httpOnly cookie,
// and returns it in the JSON body for the frontend to use.
// ──────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const randomPart = randomBytes(32).toString('hex');
    const timestamp = Date.now().toString(36);
    const payload = `${timestamp}.${randomPart}`;

    const hmac = createHmac('sha256', CSRF_SECRET);
    hmac.update(payload);
    const signature = hmac.digest('hex');

    const token = `${payload}.${signature}`;

    const response = NextResponse.json(
      { csrfToken: token },
      { status: 200 }
    );

    response.cookies.set('csrf_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRY_SECONDS,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// ──────────────────────────────────────────────────────────────
// Validation helper — used by /api/contact
// ──────────────────────────────────────────────────────────────
export function validateCsrfToken(
  tokenFromHeader: string | null,
  tokenFromCookie: string | undefined
): boolean {
  if (!tokenFromHeader || !tokenFromCookie) return false;
  if (tokenFromHeader !== tokenFromCookie) return false;

  // Verify the HMAC signature
  const parts = tokenFromHeader.split('.');
  if (parts.length !== 3) return false;

  const [timestamp, randomPart, providedSignature] = parts;
  const payload = `${timestamp}.${randomPart}`;

  const hmac = createHmac('sha256', CSRF_SECRET);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');

  if (providedSignature !== expectedSignature) return false;

  // Check expiry
  const tokenTime = parseInt(timestamp, 36);
  const now = Date.now();
  if (now - tokenTime > TOKEN_EXPIRY_SECONDS * 1000) return false;

  return true;
}
