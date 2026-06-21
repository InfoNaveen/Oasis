import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  { name: 'Starter', price: '₹499', featured: false, desc: 'The essentials before applications open. LinkedIn, GitHub, and resume — covered in 3 days.',
    features: ['LinkedIn rewrite (headline + about + skills)', 'GitHub README setup', 'Resume formatting review', '3-day delivery', '1 revision round'], cta: 'Get Starter' },
  { name: 'Builder', price: '₹899', featured: true, desc: 'The complete package for placement season. Portfolio + profiles + resume — all interview-ready.',
    features: ['Everything in Starter', 'Portfolio website (deployed + custom domain)', 'SEO meta tags + Open Graph', '5-day delivery', '2 revision rounds'], cta: 'Get Builder' },
  { name: 'Pro', price: '₹1,299', featured: false, desc: 'Full transformation for final-year students and early founders who need every platform covered.',
    features: ['Everything in Builder', 'GitHub project build (real, deployed)', 'Full LinkedIn optimization + recommendations strategy', 'ATS CV + resume design', 'Priority 7-day delivery', 'Unlimited revisions (within scope)'], cta: 'Get Pro' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-label">Pricing</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Transparent pricing.<br />No subscriptions. No surprises.</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 12 }}>One-time payment. Results in days, not weeks.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="price-grid">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ background: 'var(--color-surface-2)', border: `1px solid ${plan.featured ? 'var(--color-accent)' : 'var(--color-border-medium)'}`, borderRadius: 'var(--r-lg)', padding: '28px 24px', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'border-color 0.2s' }}
              onMouseEnter={e => { if (!plan.featured) e.currentTarget.style.borderColor = 'var(--color-accent)' }}
              onMouseLeave={e => { if (!plan.featured) e.currentTarget.style.borderColor = 'var(--color-border-medium)' }}>
              {plan.featured && (
                <>
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'var(--color-accent)', color: 'var(--color-bg-primary)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '100px', fontWeight: 700, whiteSpace: 'nowrap' }}>★ Most Popular</div>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--color-accent)', borderRadius: 'var(--r-lg) var(--r-lg) 0 0' }} />
                </>
              )}

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: plan.featured ? 'var(--color-accent)' : 'var(--color-text-muted)', marginBottom: 6 }}>{plan.name}</div>
              {/* Price value: text-accent font-mono per spec */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 40, fontWeight: 400, color: 'var(--color-accent)', lineHeight: 1, marginBottom: 10 }}>{plan.price}</div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>{plan.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    {/* → arrow: text-accent font-mono */}
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', marginTop: 1, flexShrink: 0 }}>→</span>{f}
                  </div>
                ))}
              </div>

              {plan.featured
                ? <a href="#contact" className="btn-primary" style={{ justifyContent: 'center' }}>{plan.cta} <ArrowRight size={13} /></a>
                : <a href="#contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '11px 20px', borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: 'var(--font-body)', background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-medium)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-medium)'; e.currentTarget.style.color = 'var(--color-text-primary)' }}>
                    {plan.cta} <ArrowRight size={13} />
                  </a>
              }
              <div style={{ marginTop: 12, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)' }}>🔒 HTTPS + sanitized code, always.</div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>🔒 Every package ships with HTTPS, sanitized contact forms, and clean code — always.</p>

          {/* Value comparison */}
          <div style={{ padding: '18px 28px', background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>// value comparison</div>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              A freelance designer charges ₹2,000+ for just a portfolio site. A LinkedIn coach charges ₹1,500+ per session. With OASIS, you get both — plus GitHub, resume, and a real project — starting at <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>₹499</span>.
            </p>
          </div>

          <div style={{ marginTop: 4, padding: '18px 32px', background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: 'var(--color-text-primary)', fontWeight: 500 }}>Need something custom? Founders, teams, and bulk orders welcome.</span>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: 'var(--color-accent)', color: 'var(--color-bg-primary)', borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Message us <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.price-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
