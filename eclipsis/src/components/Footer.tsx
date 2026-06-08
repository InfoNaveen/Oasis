import { GitFork, Link, Globe, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Team', href: '#team' },
  { label: 'Learn', href: '#learn' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Globe, href: 'https://naveen-patil.vercel.app', label: 'Website' },
  { icon: GitFork, href: 'https://github.com/InfoNaveen', label: 'GitHub' },
  { icon: Link, href: 'https://linkedin.com/in/naveen-patil-builder', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:naveen.a.patil7@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-1)', padding: '64px 0 36px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%,50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, var(--color-glow), transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, marginBottom: 56 }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>OASIS</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--color-accent)', textTransform: 'uppercase', marginTop: 2 }}>Agency</span>
            </a>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)', maxWidth: 340, lineHeight: 1.75, marginBottom: 22 }}>
              Where opportunities find you. Built by Naveen Patil, Chinmay Muddapur, and Preetam Hosamani — for students who want to be discovered.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.background = 'var(--color-surface-2)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border-medium)'; e.currentTarget.style.background = 'var(--color-surface-3)' }}>
                  <s.icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-primary)', letterSpacing: '0.12em', marginBottom: 18, textTransform: 'uppercase' }}>Navigation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {navLinks.map(link => (
                  <a key={link.label} href={link.href} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-primary)', letterSpacing: '0.12em', marginBottom: 18, textTransform: 'uppercase' }}>Connect</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  { label: 'naveen-patil.vercel.app', href: 'https://naveen-patil.vercel.app' },
                  { label: 'chinmay-ivory.vercel.app', href: 'https://chinmay-ivory.vercel.app' },
                  { label: 'personal-website-e3xu.vercel.app', href: 'https://personal-website-e3xu.vercel.app' },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: 11, fontFamily: 'var(--font-mono)', transition: 'color 0.15s', wordBreak: 'break-all' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            © 2026 OASIS · Built with clean code, shipped with purpose.
          </div>
          <a href="https://naveen-patil.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: 'var(--color-accent)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
            naveen-patil.vercel.app
          </a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </footer>
  )
}
