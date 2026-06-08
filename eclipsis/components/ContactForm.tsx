'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────
interface FormField {
  name: string;
  email: string;
  college: string;
  package: string;
  message: string;
  honeypot: string;
  source: string;
}

interface FieldError {
  name?: string;
  email?: string;
  college?: string;
  package?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ──────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────
const INITIAL_FIELDS: FormField = {
  name: '',
  email: '',
  college: '',
  package: '',
  message: '',
  honeypot: '',
  source: '',
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const VALID_PACKAGES = ['Starter', 'Builder', 'Pro', 'Custom', 'Session'];
const HONEYPOT_FIELD_NAME = 'honeypot';

const SOURCE_OPTIONS = [
  '',
  'LinkedIn',
  'Instagram',
  'College friend',
  'Google Search',
  'GitHub',
  'Other',
];

// ──────────────────────────────────────────────────────────────
// Client-side validation (mirrors server rules exactly)
// ──────────────────────────────────────────────────────────────
function validateFields(fields: FormField): FieldError {
  const errors: FieldError = {};

  if (!fields.name || fields.name.trim().length < 2 || fields.name.trim().length > 100) {
    errors.name = 'Name must be 2–100 characters.';
  }

  if (!fields.email || !EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (fields.college && fields.college.trim().length > 200) {
    errors.college = 'College name too long.';
  }

  if (!fields.package || !VALID_PACKAGES.includes(fields.package)) {
    errors.package = 'Please select a package.';
  }

  if (!fields.message || fields.message.trim().length < 10 || fields.message.trim().length > 2000) {
    errors.message = 'Message must be 10–2000 characters.';
  }

  return errors;
}

// ──────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [fields, setFields] = useState<FormField>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // ── Fetch CSRF token on mount ────────────────────────────
  useEffect(() => {
    async function fetchCsrf() {
      try {
        const res = await fetch('/api/csrf', { credentials: 'same-origin' });
        if (res.ok) {
          const data = await res.json();
          setCsrfToken(data.csrfToken);
        }
      } catch {
        // Silently fail — server will reject if token is missing
      }
    }
    fetchCsrf();
  }, []);

  // ── Field change handler ─────────────────────────────────
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      if (errors[name as keyof FieldError]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  // ── Form submission ──────────────────────────────────────
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Client-side validation
      const fieldErrors = validateFields(fields);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        return;
      }

      setStatus('submitting');
      setErrorMessage('');

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'same-origin',
          body: JSON.stringify(fields),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus('success');
        } else if (res.status === 429) {
          setStatus('error');
          setErrorMessage(data.message || 'Too many submissions. Please try again later.');
        } else {
          setStatus('error');
          setErrorMessage(data.message || 'Something went wrong. Please try again or DM us on LinkedIn.');
        }
      } catch {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again or DM us on LinkedIn.');
      }
    },
    [fields, csrfToken]
  );

  // ── Reset form (only on explicit click) ──────────────────
  const handleReset = useCallback(() => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  }, []);

  // ── Success state ────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 24px',
        background: 'var(--color-surface-2, #1f1c19)',
        border: '1px solid var(--color-border-medium, #333)',
        borderRadius: 'var(--r-lg, 12px)',
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(201,162,109,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent, #c9a26d)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ color: 'var(--color-text-primary, #e8e4dc)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          Message received
        </h3>
        <p style={{ color: 'var(--color-text-secondary, #999)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          We will get back to you within 24 hours. Check your inbox.
        </p>
        <button
          type="button"
          onClick={handleReset}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-medium, #333)',
            color: 'var(--color-accent, #c9a26d)',
            padding: '10px 24px',
            borderRadius: 'var(--r-md, 8px)',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  // ── Form render ──────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    background: 'var(--color-surface-3, #2a2723)',
    border: '1px solid var(--color-border-medium, #333)',
    borderRadius: 'var(--r-md, 8px)',
    color: 'var(--color-text-primary, #e8e4dc)',
    fontSize: 14,
    fontFamily: 'var(--font-body, inherit)',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontFamily: 'var(--font-mono, monospace)',
    color: 'var(--color-text-muted, #666)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#e85d5d',
    marginTop: 4,
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* ── Full Name ────────────────────────────────────── */}
      <div>
        <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={fields.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          placeholder="Your name"
          style={{ ...inputStyle, borderColor: errors.name ? '#e85d5d' : undefined }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent, #c9a26d)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = errors.name ? '#e85d5d' : 'var(--color-border-medium, #333)')}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}
      </div>

      {/* ── Email ────────────────────────────────────────── */}
      <div>
        <label htmlFor="contact-email" style={labelStyle}>Email *</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          required
          placeholder="you@college.edu"
          style={{ ...inputStyle, borderColor: errors.email ? '#e85d5d' : undefined }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent, #c9a26d)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? '#e85d5d' : 'var(--color-border-medium, #333)')}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      {/* ── College/University (optional) ────────────────── */}
      <div>
        <label htmlFor="contact-college" style={labelStyle}>College / University</label>
        <input
          id="contact-college"
          type="text"
          name="college"
          value={fields.college}
          onChange={handleChange}
          maxLength={200}
          placeholder="BMSCE, IIT Bombay, etc."
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent, #c9a26d)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-medium, #333)')}
        />
        {errors.college && <p style={errorStyle}>{errors.college}</p>}
      </div>

      {/* ── Package (required select) ────────────────────── */}
      <div>
        <label htmlFor="contact-package" style={labelStyle}>Package *</label>
        <select
          id="contact-package"
          name="package"
          value={fields.package}
          onChange={handleChange}
          required
          style={{ ...inputStyle, borderColor: errors.package ? '#e85d5d' : undefined, cursor: 'pointer' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent, #c9a26d)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = errors.package ? '#e85d5d' : 'var(--color-border-medium, #333)')}
        >
          <option value="">Select a package</option>
          {VALID_PACKAGES.map((pkg) => (
            <option key={pkg} value={pkg}>{pkg}</option>
          ))}
        </select>
        {errors.package && <p style={errorStyle}>{errors.package}</p>}
      </div>

      {/* ── Message ──────────────────────────────────────── */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Message *</label>
        <textarea
          id="contact-message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Tell us about your project, timeline, and goals..."
          style={{ ...inputStyle, resize: 'vertical', minHeight: 100, borderColor: errors.message ? '#e85d5d' : undefined }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent, #c9a26d)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = errors.message ? '#e85d5d' : 'var(--color-border-medium, #333)')}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          {errors.message ? <p style={errorStyle}>{errors.message}</p> : <span />}
          <span style={{ fontSize: 10, color: 'var(--color-text-muted, #666)' }}>
            {fields.message.length}/2000
          </span>
        </div>
      </div>

      {/* ── How did you hear about us? (optional) ────────── */}
      <div>
        <label htmlFor="contact-source" style={labelStyle}>How did you hear about us?</label>
        <select
          id="contact-source"
          name="source"
          value={fields.source}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent, #c9a26d)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-medium, #333)')}
        >
          <option value="">Select (optional)</option>
          {SOURCE_OPTIONS.filter(Boolean).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* ── Honeypot — opacity:0 + position:absolute + tabIndex={-1} ── */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, overflow: 'hidden' }}
      >
        <label htmlFor={`hp-${HONEYPOT_FIELD_NAME}`}>Do not fill this</label>
        <input
          id={`hp-${HONEYPOT_FIELD_NAME}`}
          type="text"
          name={HONEYPOT_FIELD_NAME}
          tabIndex={-1}
          autoComplete="off"
          value={fields.honeypot}
          onChange={handleChange}
        />
      </div>

      {/* ── Error message ────────────────────────────────── */}
      {status === 'error' && errorMessage && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(232,93,93,0.08)',
          border: '1px solid rgba(232,93,93,0.25)',
          borderRadius: 'var(--r-md, 8px)',
          color: '#e85d5d',
          fontSize: 13,
        }}>
          {errorMessage}
        </div>
      )}

      {/* ── Submit button ────────────────────────────────── */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          width: '100%',
          padding: '14px 24px',
          background: status === 'submitting' ? 'rgba(201,162,109,0.5)' : 'var(--color-accent, #c9a26d)',
          color: '#0f0e0d',
          border: 'none',
          borderRadius: 'var(--r-md, 8px)',
          fontSize: 14,
          fontWeight: 700,
          fontFamily: 'var(--font-body, inherit)',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background 0.15s, opacity 0.15s',
        }}
      >
        {status === 'submitting' ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
