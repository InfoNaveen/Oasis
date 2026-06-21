import { motion } from 'framer-motion'
import { Layout, Users, Code2, FileText, Hammer, Layers } from 'lucide-react'

const services = [
  { icon: Layout,   title: 'Portfolio Websites',       badge: 'Most Popular', desc: 'A personal site built from scratch — fast, SEO-ready, and deployed on your own domain. Designed so recruiters stop scrolling when they land on it.' },
  { icon: Users,    title: 'LinkedIn Optimization',    badge: null,           desc: 'Complete rewrite of your headline, about section, experience, and skills — keyword-tuned for recruiter search and ATS. Clients have seen up to 4× profile views within 30 days.' },
  { icon: Code2,    title: 'GitHub Enhancement',       badge: null,           desc: 'Profile README, pinned repos, and project descriptions that read like product launches. We turn a blank GitHub into proof that you build real things.' },
  { icon: FileText, title: 'Resume & CV Refinement',   badge: null,           desc: 'ATS-friendly resume with quantified wins and strong action verbs. We rewrite bullets so achievements land — not just responsibilities.' },
  { icon: Hammer,   title: 'Project Build for GitHub', badge: 'New',          desc: 'A real, deployed project for your portfolio, hackathon, or resume. Clean code, proper documentation, and ready to walk an interviewer through.' },
  { icon: Layers,   title: 'Full Digital Makeover',    badge: 'Best Value',   desc: 'All five services bundled — portfolio, LinkedIn, GitHub, resume, and a project. One transformation, every platform covered. Our most chosen package during placement season.' },
]

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
          <span className="section-label">Services</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Everything you need<br />to stand out online</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 12, maxWidth: 520 }}>Not just design. Strategy, copywriting, deployment, and optimization — done for you.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--color-border-subtle)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }} className="svc-grid">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ background: 'var(--color-surface-1)', padding: '28px 24px', position: 'relative', transition: 'background 0.2s, border-color 0.2s', cursor: 'default', border: '0 solid var(--color-border-subtle)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-surface-1)')}>
              {/* Badge — bg-surface-3 text-accent font-mono per spec */}
              {s.badge && (
                <span style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px', background: 'var(--color-surface-3)', color: 'var(--color-accent)', border: '1px solid var(--color-border-medium)' }}>{s.badge}</span>
              )}
              {/* Icon area — text-accent */}
              <div style={{ width: 38, height: 38, borderRadius: 'var(--r-md)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--color-accent)' }}>
                <s.icon size={17} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.svc-grid{grid-template-columns:1fr!important;}}@media(min-width:901px) and (max-width:1100px){.svc-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </section>
  )
}
