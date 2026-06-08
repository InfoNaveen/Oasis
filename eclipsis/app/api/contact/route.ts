import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { Resend } from 'resend';
import { ratelimit, getIP } from '@/lib/ratelimit';
import { validateCsrfToken } from '@/app/api/csrf/route';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'hello@oasis.agency';
const HONEYPOT_FIELD_NAME = process.env.HONEYPOT_FIELD_NAME || 'honeypot';

// ──────────────────────────────────────────────────────────────
// Sanitization helpers
// ──────────────────────────────────────────────────────────────
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

function hashIP(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

// ──────────────────────────────────────────────────────────────
// Server-side validation (mirrors client rules exactly)
// ──────────────────────────────────────────────────────────────
interface ContactFormData {
  name: string;
  email: string;
  college: string;
  package: string;
  message: string;
  honeypot: string;
  source: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const VALID_PACKAGES = ['Starter', 'Builder', 'Pro', 'Custom', 'Session'];

function validateForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be 2–100 characters.' });
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address.' });
  }

  if (data.college && data.college.length > 200) {
    errors.push({ field: 'college', message: 'College name too long.' });
  }

  if (!data.package || !VALID_PACKAGES.includes(data.package)) {
    errors.push({ field: 'package', message: 'Please select a valid package.' });
  }

  if (!data.message || data.message.length < 10 || data.message.length > 2000) {
    errors.push({ field: 'message', message: 'Message must be 10–2000 characters.' });
  }

  return errors;
}

// ──────────────────────────────────────────────────────────────
// Email HTML template
// ──────────────────────────────────────────────────────────────
function buildEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0e0d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#1f1c19;border:1px solid #333;border-radius:12px;padding:32px;">
    <h1 style="color:#c9a26d;font-size:20px;margin:0 0 24px;font-family:monospace;">OASIS — New Inquiry</h1>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="color:#888;font-size:12px;padding:8px 0;border-bottom:1px solid #333;text-transform:uppercase;letter-spacing:0.08em;">Name</td>
        <td style="color:#e8e4dc;font-size:14px;padding:8px 0;border-bottom:1px solid #333;text-align:right;">${data.name}</td>
      </tr>
      <tr>
        <td style="color:#888;font-size:12px;padding:8px 0;border-bottom:1px solid #333;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
        <td style="color:#e8e4dc;font-size:14px;padding:8px 0;border-bottom:1px solid #333;text-align:right;">${data.email}</td>
      </tr>
      ${data.college ? `<tr>
        <td style="color:#888;font-size:12px;padding:8px 0;border-bottom:1px solid #333;text-transform:uppercase;letter-spacing:0.08em;">College</td>
        <td style="color:#e8e4dc;font-size:14px;padding:8px 0;border-bottom:1px solid #333;text-align:right;">${data.college}</td>
      </tr>` : ''}
      <tr>
        <td style="color:#888;font-size:12px;padding:8px 0;border-bottom:1px solid #333;text-transform:uppercase;letter-spacing:0.08em;">Package</td>
        <td style="color:#c9a26d;font-size:14px;padding:8px 0;border-bottom:1px solid #333;text-align:right;font-weight:600;">${data.package}</td>
      </tr>
      <tr>
        <td style="color:#888;font-size:12px;padding:8px 0;border-bottom:1px solid #333;text-transform:uppercase;letter-spacing:0.08em;">Source</td>
        <td style="color:#e8e4dc;font-size:14px;padding:8px 0;border-bottom:1px solid #333;text-align:right;">${data.source || 'Not specified'}</td>
      </tr>
    </table>
    <div style="margin-top:24px;">
      <p style="color:#888;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="color:#e8e4dc;font-size:14px;line-height:1.7;margin:0;">${data.message}</p>
    </div>
    <p style="color:#555;font-size:11px;margin-top:32px;text-align:center;">Submitted via oasis.agency contact form</p>
  </div>
</body>
</html>`;
}

// ──────────────────────────────────────────────────────────────
// POST /api/contact
// ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // ── Step 1: CSRF token validation ─────────────────────
    const csrfHeader = request.headers.get('x-csrf-token');
    const csrfCookie = request.cookies.get('csrf_token')?.value;

    if (!validateCsrfToken(csrfHeader, csrfCookie)) {
      return NextResponse.json(
        { success: false, message: 'Security validation failed. Please refresh the page and try again.' },
        { status: 403 }
      );
    }

    // ── Step 2: Parse body ────────────────────────────────
    let body: ContactFormData;
    try {
      const rawBody = await request.json() as Record<string, unknown>;
      body = rawBody as unknown as ContactFormData;
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request format.' },
        { status: 400 }
      );
    }

    // ── Step 3: Honeypot check ────────────────────────────
    // Return 200 silently — never signal to bots they were caught
    const honeypotValue = (body as unknown as Record<string, unknown>)[HONEYPOT_FIELD_NAME];
    if (honeypotValue && typeof honeypotValue === 'string' && honeypotValue.length > 0) {
      return NextResponse.json(
        { success: true, message: 'Thank you! We will get back to you shortly.' },
        { status: 200 }
      );
    }

    // ── Step 4: Rate limiting ─────────────────────────────
    const ip = getIP(request);
    const { success: rateLimitOk, remaining, reset } = await ratelimit.limit(ip);

    if (!rateLimitOk) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter > 0 ? retryAfter : 60),
            'X-RateLimit-Remaining': String(remaining),
          },
        }
      );
    }

    // ── Step 5: Server-side field validation ──────────────
    const errors = validateForm(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Please check your form fields and try again.' },
        { status: 400 }
      );
    }

    // ── Step 6: Input sanitization ────────────────────────
    const sanitized: ContactFormData = {
      name: stripHtml(body.name),
      email: stripHtml(body.email).toLowerCase(),
      college: stripHtml(body.college || ''),
      package: stripHtml(body.package),
      message: stripHtml(body.message),
      honeypot: '',
      source: stripHtml(body.source || ''),
    };

    // ── Step 7: Send email via Resend ─────────────────────
    const emailResult = await resend.emails.send({
      from: 'noreply@oasis.agency',
      to: CONTACT_EMAIL_TO,
      replyTo: sanitized.email,
      subject: `New OASIS inquiry — ${sanitized.package} — ${sanitized.name}`,
      html: buildEmailHtml(sanitized),
    });

    if (emailResult.error) {
      console.error(`[CONTACT] Email send failed: ${emailResult.error.message}`);
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again or DM us on LinkedIn.' },
        { status: 500 }
      );
    }

    // ── Step 8: Logging (safe fields only) ────────────────
    console.log(
      `[CONTACT] ${new Date().toISOString()} | IP(hash): ${hashIP(ip)} | Package: ${sanitized.package} | RateLimit remaining: ${remaining}`
    );

    // ── Step 9: Success response ──────────────────────────
    return NextResponse.json(
      { success: true, message: 'Thank you! We will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    // Never expose stack traces or internal errors
    console.error('[CONTACT] Unexpected error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again or DM us on LinkedIn.' },
      { status: 500 }
    );
  }
}
