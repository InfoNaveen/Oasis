import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const transformations = [
  {
    category: 'LinkedIn Headline',
    before: 'Student at XYZ College | Looking for opportunities',
    after: 'Full-Stack Developer · React & Node.js · Building tools that help students get hired',
    impact: 'Keyword-rich, role-specific, recruiter-searchable',
  },
  {
    category: 'Portfolio Website',
    before: 'No website — or a Wix template with "Welcome to my portfolio"',
    after: 'Custom-built site deployed on a personal domain with SEO, analytics, and a project showcase',
    impact: 'Indexed by Google, memorable in 3 seconds',
  },
  {
    category: 'GitHub Profile',
    before: '3 repos named "test", "project1", "assignment" — no READMEs, no pins',
    after: 'Profile README, 3 pinned repos with descriptions, clean commit history, contribution graph',
    impact: 'Looks actively maintained, interview-ready',
  },
]

export default function Results() {
  return (
    <section id="results" className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
          <span className="section-label">The Transformation</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>What "before" and "after"<br />actually looks like</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 12, maxWidth: 520 }}>Real examples of how OASIS transforms a student's online presence. Every line below is something we actually deliver.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {transformations.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
              {/* Category header */}
              <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>{t.category}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-accent)', letterSpacing: '0.08em', padding: '3px 10px', background: 'var(--color-surface-3)', borderRadius: '100px', border: '1px solid var(--color-border-medium)' }}>{t.impact}</span>
              </div>
              {/* Before / After grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0 }} className="result-row">
                <div style={{ padding: '20px 24px', borderRight: '1px solid var(--color-border-subtle)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 10 }}>Before</div>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{t.before}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', color: 'var(--color-accent)' }}>
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
                <div style={{ padding: '20px 24px', background: 'rgba(201,162,109,0.03)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 10 }}>After OASIS</div>
                  <p style={{ fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.65, fontWeight: 500 }}>{t.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}
          style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="#pricing" className="btn-primary" style={{ padding: '14px 28px', fontSize: 14 }}>
            See What You Get <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
      <style>{`@media(max-width:700px){.result-row{grid-template-columns:1fr!important;}.result-row > div:nth-child(2){padding:8px 0!important;transform:rotate(90deg);}.result-row > div:first-child{border-right:none!important;border-bottom:1px solid var(--color-border-subtle);}}`}</style>
    </section>
  )
}
