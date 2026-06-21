import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const forYou = [
  'Students applying for internships',
  'Final years entering placement season',
  'Hackathon builders who need a showcase',
  'Open source contributors building visibility',
  'Early startup founders raising or hiring',
  'Career switchers breaking into tech',
]

const notFor = [
  'People looking for generic template portfolios',
  'People who aren\'t ready to invest in their profile',
]

export default function Audience() {
  return (
    <section id="audience" className="section" style={{ background: 'var(--color-surface-1)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
          <span className="section-label">Who This Is For</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Built for ambitious people<br />who refuse to be invisible</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="audience-grid">
          {/* For You */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', padding: '28px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 18 }}>OASIS is for you if...</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {forYou.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <Check size={15} color="var(--color-accent)" strokeWidth={2} style={{ flexShrink: 0 }} />{item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Not For */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', padding: '28px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 18 }}>Not a fit if...</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {notFor.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-muted)' }}>
                  <X size={15} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.5 }} />{item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--color-surface-3)', borderRadius: 'var(--r-md)', border: '1px solid var(--color-border-subtle)' }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                We're a small team that works with a handful of clients each week. If you're serious about standing out, we'll give you our full attention.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.audience-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
