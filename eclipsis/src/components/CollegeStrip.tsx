const colleges = [
  'BMSCE', 'PESIT', 'Manipal', 'VTU', 'RVCE',
  'BMS Institute of Technology', 'Christ University', 'Jain University',
]

export default function CollegeStrip() {
  return (
    <div style={{ padding: '20px 0', borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-1)' }}>
      <div className="container">
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--color-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
          textAlign: 'center', marginBottom: 12,
        }}>
          Students from these colleges trust us
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px 0' }}>
          {colleges.map((name, i) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{name}</span>
              {i < colleges.length - 1 && (
                <span style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: 'var(--color-accent)', margin: '0 16px', flexShrink: 0, opacity: 0.6 }} />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
