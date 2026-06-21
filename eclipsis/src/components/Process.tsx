import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Submit', time: '5 min', desc: 'Fill a short form with your goals, tech stack, and package. No sales call. No lengthy onboarding.' },
  { num: '02', title: 'We Build', time: '3–7 days', desc: 'Your profile is handled personally by a developer on the team — not a template, not outsourced.' },
  { num: '03', title: 'Review & Refine', time: 'Your call', desc: 'Preview via a private link. Give feedback. We revise until you\'re 100% happy — no "out of scope" surprises.' },
  { num: '04', title: 'Go Live', time: 'Done', desc: 'Deployed, indexed, and recruiter-ready. We stay available for 7 days post-delivery for any tweaks.' },
]

export default function Process() {
  return (
    <section id="process" className="section" style={{ background: 'var(--color-surface-1)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">How It Works</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Four steps. One week. Done.</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="process-grid">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ position: 'relative' }}>
              {i < steps.length - 1 && (
                <div className="proc-line" style={{ position: 'absolute', top: 22, left: '60%', width: '80%', height: 1, background: `linear-gradient(90deg,var(--color-border-medium),transparent)`, zIndex: 0 }} />
              )}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  {/* num in accent per spec */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 400, color: 'var(--color-accent)', lineHeight: 1 }}>{step.num}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>{step.time}</div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: 44, padding: '14px 20px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)', borderLeft: '3px solid var(--color-accent)', borderRadius: '0 var(--r-md) var(--r-md) 0', display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <span style={{ color: 'var(--color-code-comment)' }}>{'// '}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>1:1 work — Naveen personally handles every project. No outsourcing. Ever.</span>
        </motion.div>
      </div>
      <style>{`@media(max-width:900px){.process-grid{grid-template-columns:repeat(2,1fr)!important;}.proc-line{display:none!important;}}@media(max-width:500px){.process-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
