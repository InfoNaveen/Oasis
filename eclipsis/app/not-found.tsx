import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0e0d',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'ui-monospace, "JetBrains Mono", "Fira Code", monospace',
          fontSize: 'clamp(80px, 15vw, 140px)',
          fontWeight: 800,
          color: '#c9a26d',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        404
      </span>

      <p
        style={{
          fontFamily: 'ui-monospace, "JetBrains Mono", "Fira Code", monospace',
          fontSize: 14,
          color: '#666',
          marginTop: 12,
          letterSpacing: '0.04em',
        }}
      >
        // page not found
      </p>

      <p
        style={{
          fontSize: 16,
          color: '#999',
          marginTop: 16,
          maxWidth: 360,
          lineHeight: 1.6,
        }}
      >
        This page doesn&apos;t exist or was moved.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: 32,
          padding: '12px 28px',
          background: '#c9a26d',
          color: '#0f0e0d',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'opacity 0.15s',
        }}
      >
        Back to homepage
      </Link>
    </div>
  );
}
