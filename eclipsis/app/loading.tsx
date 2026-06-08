export default function Loading() {
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
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Logo pulse */}
        <span
          style={{
            fontFamily: 'ui-monospace, "JetBrains Mono", "Fira Code", monospace',
            fontSize: 14,
            fontWeight: 700,
            color: '#c9a26d',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            animation: 'oasis-pulse 1.8s ease-in-out infinite',
          }}
        >
          OASIS //
        </span>

        {/* Skeleton bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <div
            style={{
              width: 180,
              height: 3,
              background: 'linear-gradient(90deg, transparent 0%, #333 50%, transparent 100%)',
              borderRadius: 2,
              animation: 'oasis-shimmer 1.5s ease-in-out infinite',
            }}
          />
          <div
            style={{
              width: 120,
              height: 3,
              background: 'linear-gradient(90deg, transparent 0%, #333 50%, transparent 100%)',
              borderRadius: 2,
              animation: 'oasis-shimmer 1.5s ease-in-out infinite 0.2s',
            }}
          />
          <div
            style={{
              width: 80,
              height: 3,
              background: 'linear-gradient(90deg, transparent 0%, #333 50%, transparent 100%)',
              borderRadius: 2,
              animation: 'oasis-shimmer 1.5s ease-in-out infinite 0.4s',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes oasis-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes oasis-shimmer {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
