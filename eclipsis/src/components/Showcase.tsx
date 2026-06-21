import { motion } from 'framer-motion'

const metrics = [
  { val: '↑ 4×', label: 'profile views (within 60 days)' },
  { val: '0 → 3', label: 'live projects in under a week' },
]
const strip = [
  { icon: '🏆', text: 'Clients have received internship offers within 3 weeks of delivery' },
  { icon: '📩', text: '4 out of 5 clients report more recruiter messages within 30 days' },
  { icon: '⚡', text: 'Average delivery: 5 working days from submission' },
]

function BrowserMockup() {
  return (
    <div style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
      <div style={{ background: 'var(--color-surface-2)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--color-border-subtle)' }}>
        {['#c96d6d','#c9a26d','#7a9e7a'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: 'var(--color-bg-primary)', borderRadius: 'var(--r-sm)', padding: '4px 10px', fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>naveen-patil.vercel.app</div>
      </div>
      <div style={{ padding: '24px 20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-code-comment)', marginBottom: 8 }}>// available for internships</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 6 }}>
          Hi, I'm <span style={{ color: 'var(--color-accent)' }}>Naveen Patil</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 16 }}>Full-Stack Developer · Bengaluru</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 11, padding: '5px 12px', background: 'var(--color-accent)', color: 'var(--color-bg-primary)', borderRadius: 'var(--r-sm)', fontWeight: 600 }}>View Work</span>
          <span style={{ fontSize: 11, padding: '5px 12px', border: '1px solid var(--color-border-medium)', color: 'var(--color-text-secondary)', borderRadius: 'var(--r-sm)' }}>GitHub</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
          {[['DevTracker','React · TypeScript'],['QuickCV','Next.js · AI'],['HackBoard','React · Firebase'],['PortfolioV3','Next.js · Framer']].map(([name, stack], i) => (
            <div key={name} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-subtle)', borderTop: `2px solid var(--color-accent)`, borderRadius: 'var(--r-sm)', padding: '10px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 3 }}>{name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-muted)' }}>{stack}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <section id="work" className="section" style={{ background: 'var(--color-surface-1)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
          <span className="section-label">Our Work</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>See what we deliver</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 56 }} className="showcase-grid">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <BrowserMockup />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {metrics.map((m, i) => (
                <div key={i} style={{ padding: '24px 28px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)', borderLeft: '3px solid var(--color-accent)', borderRadius: '0 var(--r-lg) var(--r-lg) 0' }}>
                  {/* Price/metric values use text-accent font-mono per spec */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 400, color: 'var(--color-accent)', lineHeight: 1 }}>{m.val}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 6 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--color-border-subtle)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }} className="strip-grid">
          {strip.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ background: 'var(--color-surface-1)', padding: '24px 20px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.showcase-grid{grid-template-columns:1fr!important;}.strip-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
