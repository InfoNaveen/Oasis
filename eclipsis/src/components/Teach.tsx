import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

const sessions = [
  { tag: '// web',       level: 'Beginner',     title: 'Web Dev Fundamentals',  desc: 'HTML, CSS, JS from scratch. Build your first real webpage — not a tutorial clone — by the end of the session.' },
  { tag: '// react',     level: 'Beginner',     title: 'React for Beginners',   desc: "Components, props, state, hooks. You'll understand every line of code in your own portfolio by the end." },
  { tag: '// hackathon', level: 'Intermediate', title: 'Hackathon Readiness',   desc: 'How to pick an idea, structure a team, build an MVP in 24hrs, present it convincingly, and actually place.' },
  { tag: '// project',   level: 'Intermediate', title: 'College Project Prep',  desc: 'We plan your project end to end — tech stack, architecture, documentation, viva prep, and GitHub presentation.' },
  { tag: '// github',    level: 'Beginner',     title: 'Git & GitHub Mastery',  desc: 'Commits, branches, PRs, README writing — and how to make your profile look actively maintained even if you just started.' },
  { tag: '// career',    level: 'Intermediate', title: 'Tech Career Clarity',   desc: 'Resume strategy, LinkedIn positioning, what recruiters actually look for, and a concrete plan to crack your first internship.' },
]
const pricing = [
  { label: 'Intro call', price: 'Free', free: true },
  { label: '1:1 session (1hr)', price: '₹299', free: false },
  { label: 'Bundle — 4 sessions', price: '₹999', free: false },
  { label: 'Group batch (per person)', price: '₹149', free: false },
  { label: 'College project prep', price: '₹599', free: false },
]

export default function Teach() {
  return (
    <section id="learn" className="section" style={{ background: 'var(--color-surface-1)' }}>
      <div className="container">
        <div style={{ marginBottom: 52 }}>
          <span className="section-label">1:1 &amp; Group Sessions</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Beyond the build —<br /><span style={{ color: 'var(--color-accent)' }}>I teach you to own it.</span></h2>
          <p className="body-lg" style={{ maxWidth: 500, marginTop: 14 }}>Not just deliverables. If you want to understand what you're shipping, I'll walk you through it. Live sessions, real projects, zero fluff.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }} className="teach-grid">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 1, background: 'var(--color-border-subtle)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
            {sessions.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{ background: 'var(--color-surface-2)', padding: '22px 20px', position: 'relative', transition: 'background 0.2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}>
                <span style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '100px', background: 'var(--color-surface-3)', color: s.level === 'Beginner' ? 'var(--color-code-string)' : 'var(--color-accent)', border: '1px solid var(--color-border-medium)' }}>{s.level}</span>
                {/* // tag: text-code-comment font-mono */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-code-comment)', letterSpacing: '0.06em', marginBottom: 10 }}>{s.tag}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} style={{ position: 'sticky', top: 88 }}>
            <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)', borderTop: '2px solid var(--color-accent)', borderRadius: 'var(--r-lg)', padding: '24px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Slots filling fast</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0, animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 500 }}>Currently accepting students</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-text-primary)', lineHeight: 1.2, marginBottom: 18 }}>Book a free 15-min intro call</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
                {['1:1 personalized sessions','Group batches available','Flexible timing, online'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={13} color="var(--color-accent)" strokeWidth={1.5} />{item}
                  </div>
                ))}
              </div>
              <a href="mailto:naveen.a.patil7@gmail.com?subject=Session%20Inquiry" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 18 }}>
                Schedule a Call <ArrowRight size={13} />
              </a>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-code-comment)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>// session pricing</div>
              {pricing.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400, color: row.free ? 'var(--color-success)' : 'var(--color-accent)' }}>{row.price}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Or DM on LinkedIn — reply within 2hrs</span>
                <div style={{ marginTop: 4 }}>
                  <a href="https://linkedin.com/in/naveen-patil-builder" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-accent)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                    linkedin.com/in/naveen-patil-builder
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){
          .teach-grid{grid-template-columns:1fr!important;}
          .teach-grid > div:last-child { position: static !important; top: auto !important; }
        }
      `}</style>
    </section>
  )
}
