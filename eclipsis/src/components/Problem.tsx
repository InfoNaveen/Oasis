import { motion } from 'framer-motion'

const cards = [
  { icon: '👁️', title: '"Your portfolio looks like a Wix template from 2019"', body: "Recruiters see hundreds of identical portfolios. Generic = rejected. If your site isn't memorable in 3 seconds, they've already moved on." },
  { icon: '💀', title: '"Your LinkedIn headline says \'Student at [College]\'"', body: "That's not a headline. That's a missed opportunity. Recruiters search by keywords, skills, and roles — not college names." },
  { icon: '🕳️', title: '"Your GitHub has 3 repos, all named \'test\' or \'project1\'"', body: 'Your GitHub IS your portfolio to a technical recruiter. Empty pins and zero READMEs signal zero seriousness.' },
]

export default function Problem() {
  return (
    <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <span className="section-label">The brutal truth</span>
          <h2 className="display-lg" style={{ marginTop: 8, color: 'var(--color-text-primary)' }}>The brutal truth about<br />your online presence</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--color-border-subtle)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }} className="prob-grid">
          {cards.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--color-surface-1)', padding: '32px 28px', borderLeft: '3px solid var(--color-accent)' }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12, lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{c.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 40, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-accent)' }}>
          We fix all three. Fast. Affordably. Personally.
        </motion.p>
      </div>
      <style>{`@media(max-width:900px){.prob-grid{grid-template-columns:1fr!important;}}@media(max-width:600px){.prob-grid{gap:1px!important;}}`}</style>
    </section>
  )
}
