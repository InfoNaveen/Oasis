import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const credentials = [
  'AWS ImpactX Finalist',
  '10× Hackathon Finalist',
  'Open Source Contributor',
  'Full-Stack Developer',
  'AI Security Engineer',
]

export default function FounderStory() {
  return (
    <section id="founder-story" className="section" style={{ background: 'var(--color-surface-1)' }}>
      <div className="container">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
          <span className="section-label">Why OASIS Exists</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Why I Built OASIS</h2>
        </motion.div>

        {/* Credibility badges */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {credentials.map(c => (
            <span key={c} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
              padding: '5px 12px', background: 'var(--color-surface-3)',
              color: 'var(--color-accent)', border: '1px solid var(--color-border-medium)',
              borderRadius: '100px',
            }}>{c}</span>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' }} className="founder-grid">

          {/* Left — Avatar */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ position: 'sticky', top: 100 }}>
            <div style={{
              width: '100%', aspectRatio: '1', borderRadius: 'var(--r-lg)',
              background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, overflow: 'hidden',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 800,
                color: 'var(--color-accent)', opacity: 0.7,
              }}>N</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}>Naveen Patil</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Founder, OASIS</div>
            </div>
            <a href="https://naveen-patil.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--color-accent)', textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
              naveen-patil.vercel.app <ExternalLink size={10} />
            </a>
          </motion.div>

          {/* Right — Story content */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <article style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.85 }}>
              <p style={{ marginBottom: 20 }}>
                I'm Naveen Patil — a Computer Science student, builder, and hackathon competitor.
              </p>
              <p style={{ marginBottom: 20 }}>
                For years, I believed that if I became good enough, opportunities would naturally follow.
              </p>
              <p style={{ marginBottom: 20, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                I was wrong.
              </p>
              <p style={{ marginBottom: 20 }}>
                I watched talented developers build impressive projects, win hackathons, and learn valuable skills — yet still struggle to get noticed. Their GitHub profiles were incomplete. Their LinkedIn profiles told no story. Their portfolios either didn't exist or failed to showcase what they were capable of.
              </p>
              <p style={{ marginBottom: 20 }}>
                At the same time, I saw people with similar skill levels attract more interviews, recruiter messages, and opportunities simply because they presented themselves better online.
              </p>
              <p style={{ marginBottom: 24 }}>
                That's when I realized something:
              </p>

              {/* Highlighted quote block */}
              <blockquote style={{
                margin: '0 0 28px 0', padding: '20px 24px',
                borderLeft: '3px solid var(--color-accent)',
                background: 'rgba(201,162,109,0.04)',
                borderRadius: '0 var(--r-md) var(--r-md) 0',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
                  color: 'var(--color-accent)', lineHeight: 1.4, fontStyle: 'italic',
                }}>"The internet is the first interview."</span>
              </blockquote>

              <p style={{ marginBottom: 20 }}>
                Before anyone speaks to you, they search your name, open your LinkedIn, browse your GitHub, and form an opinion in minutes.
              </p>
              <p style={{ marginBottom: 20 }}>
                That opinion can open doors — or close them.
              </p>
              <p style={{ marginBottom: 24, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                That's why OASIS exists.
              </p>
              <p style={{ marginBottom: 20 }}>
                Not just as a web agency, but as a launchpad for ambitious students, developers, founders, and creators who deserve to be discovered.
              </p>
              <p style={{ marginBottom: 20 }}>
                We turn scattered achievements into a story people remember.
              </p>
              <p style={{ marginBottom: 6 }}>
                Because your work deserves more than a forgotten repository.<br />
                Your projects deserve more than a bullet point on a resume.
              </p>
              <p style={{ marginBottom: 28, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                OASIS helps talented people become impossible to ignore.
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 32 }}>
                Where Opportunities Find You.
              </p>

              {/* Signature */}
              <div style={{
                borderTop: '1px solid var(--color-border-subtle)', paddingTop: 24, marginBottom: 32,
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}>Naveen Patil</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>Founder, OASIS</div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-primary" style={{ padding: '14px 28px', fontSize: 14 }}>
                  Build My Digital Identity <ArrowRight size={14} />
                </a>
                <a href="#work" className="btn-ghost" style={{ padding: '14px 28px', fontSize: 14 }}>
                  View Our Work
                </a>
              </div>
            </article>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .founder-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .founder-grid > div:first-child { position: static !important; max-width: 180px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
