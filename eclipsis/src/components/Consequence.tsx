import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const consequences = [
  'No portfolio to share with recruiters',
  'No LinkedIn visibility in keyword searches',
  'No GitHub presence to prove you code',
  'No differentiation from 500 identical applicants',
]

export default function Consequence() {
  return (
    <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-label">The Honest Truth</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>What happens if you<br />do nothing?</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', padding: '28px 28px', marginBottom: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {consequences.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 15, color: 'var(--color-text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-border-medium)', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
          style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.5, marginBottom: 8 }}>
            The students getting opportunities<br />aren't always better.
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1.5, marginBottom: 32 }}>
            They're just easier to find.
          </p>
          <a href="#contact" className="btn-primary" style={{ padding: '14px 28px', fontSize: 14 }}>
            Make Yourself Discoverable <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
