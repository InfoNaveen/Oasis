import { motion } from 'framer-motion'
import { ExternalLink, GitFork, Link, Globe } from 'lucide-react'

const team = [
  {
    name: 'Naveen Patil',
    role: 'Founder & Full-Stack Developer',
    initial: 'N',
    bio: 'Leads product development, client strategy, and execution at OASIS. A full-stack developer and AI Security Engineer with experience across hackathons, startups, and real-world client projects. Passionate about building high-converting digital experiences, scalable web applications, and helping students and early professionals establish a powerful online presence.',
    skills: ['Full-Stack Development','React & Next.js','Node.js & TypeScript','UI/UX Design','AI Security','Automation & AI Integration'],
    links: { portfolio: 'https://naveen-patil.vercel.app/', linkedin: 'https://linkedin.com/in/naveen-patil-builder', github: 'https://github.com/InfoNaveen' },
  },
  {
    name: 'Chinmay Muddapur',
    role: 'Co-Founder & UI/UX Engineer',
    initial: 'C',
    bio: "The reason OASIS projects look the way they do. Chinmay leads the visual and interaction design side of every build — turning rough ideas into interfaces people actually want to use. With a sharp eye for detail and a strong frontend engineering background, he bridges the gap between design and production code. If a client's site looks exceptional, Chinmay had his hands on it.",
    skills: ['UI/UX Design','Frontend Engineering','React & Tailwind CSS','Design Systems','Component Architecture','Open Source'],
    links: { portfolio: 'https://chinmay-ivory.vercel.app', linkedin: 'https://linkedin.com/in/chinmay-muddapur-441a3a320', github: 'https://github.com/chinmaymuddapur' },
  },
  {
    name: 'Preetam Hosamani',
    role: 'Co-Founder & Growth Lead',
    initial: 'P',
    bio: "The first person a new client talks to. Preetam owns client relationships, onboarding, and the pipeline that keeps OASIS running. He combines a strong technical background with a natural ability to understand what students and founders actually need — then translate that into a brief the team can execute on. If you've received a response from OASIS within 2 hours, that's Preetam.",
    skills: ['Client Strategy','Sales & Onboarding','DevOps','Technical Scoping','Project Management','Clean Code'],
    links: { portfolio: 'https://personal-website-e3xu.vercel.app', linkedin: 'https://linkedin.com/in/preetam-hosamani', github: 'https://github.com/preetamhosamani' },
  },
]

export default function Team() {
  return (
    <section id="team" className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
          <span className="section-label">The Team</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Built by developers,<br />for developers</h2>
          <p className="body-lg" style={{ maxWidth: 540, marginTop: 14 }}>Three engineers who got tired of watching talented students get overlooked because of weak online presence. So we built the fix.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="team-grid">
          {team.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-lg)', padding: '28px 24px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border-medium)')}>
              {/* Avatar: bg-surface-3 border-border-medium text-accent */}
              <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--color-accent)' }}>{m.initial}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 3 }}>{m.name}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{m.role}</p>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 18 }}>{m.bio}</p>

              {/* Skills label */}
              {i === 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Skills & Expertise</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {m.skills.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 8px', background: 'var(--color-surface-3)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '100px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {i > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
                  {m.skills.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 8px', background: 'var(--color-surface-3)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '100px' }}>{t}</span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                {[{ href: m.links.portfolio, Icon: Globe }, { href: m.links.linkedin, Icon: Link }, { href: m.links.github, Icon: GitFork }].map(({ href, Icon }, j) => (
                  <a key={j} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ width: 30, height: 30, borderRadius: 'var(--r-sm)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border-medium)' }}>
                    <Icon size={13} strokeWidth={1.5} />
                  </a>
                ))}
                <a href={m.links.portfolio} target="_blank" rel="noopener noreferrer"
                  style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-accent)', textDecoration: 'none', fontFamily: 'var(--font-mono)', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  View work <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.team-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
