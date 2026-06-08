import { motion } from 'framer-motion'

const testimonials = [
  { quote: "Got my first internship offer 2 weeks after Naveen rebuilt my LinkedIn and portfolio. The quality of work was genuinely impressive.", author: "Ananya S.", role: "CS Student, Manipal" },
  { quote: "My GitHub went from empty to having 3 real projects with proper READMEs. Recruiters actually reach out to me now.", author: "Rahul M.", role: "ECE Student, VTU" },
  { quote: "Honestly the best ₹799 I've spent. My portfolio looks like it was made by a professional agency.", author: "Priya K.", role: "MCA Student, Bangalore" },
  { quote: "The resume rewrite alone was worth it. My ATS score improved significantly and I started getting more callbacks.", author: "Arjun T.", role: "B.Tech Final Year" },
  { quote: "Naveen is really responsive and does the work himself. No templates, everything felt custom and thoughtful.", author: "Sneha R.", role: "CS Student, BMSCE" },
  { quote: "Got featured on LinkedIn after the optimization. Profile views went up noticeably in the first month.", author: "Kiran P.", role: "Hackathon Winner, PESIT" },
  { quote: "Came in with zero projects and a blank GitHub. Left with a deployed portfolio and 2 real repos. Naveen's pace and quality is unreal.", author: "Rohan D.", role: "IT Student, RV College" },
  { quote: "Used OASIS before placement season. My profile went from generic to genuinely impressive. First offer came in 3 weeks later.", author: "Meghna L.", role: "Final Year CSE, PES University" },
]

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--r-lg)', padding: '24px', minWidth: 260, maxWidth: 340, flexShrink: 0, margin: '0 8px' }}>
      {/* Quote mark: text-accent font-mono per spec */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: 'var(--color-accent)', lineHeight: 1, marginBottom: 12, opacity: 0.6 }}>"</div>
      {/* Quote text: text-text-primary */}
      <p style={{ fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--color-border-subtle)', paddingTop: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 'var(--r-sm)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--color-accent)', flexShrink: 0 }}>
          {t.author[0]}
        </div>
        <div>
          {/* Author name: text-text-primary */}
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.author}</div>
          {/* Author subtitle: text-text-muted */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const row1 = testimonials.slice(0, 4)
  const row2 = testimonials.slice(4)

  return (
    <section className="section" style={{ background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Testimonials</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>From invisible to interview-ready</h2>
        </motion.div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', animation: 'marquee 28s linear infinite', width: 'max-content' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
          {[...row1, ...row1].map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', animation: 'marquee 32s linear infinite reverse', width: 'max-content' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
          {[...row2, ...row2].map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  )
}
