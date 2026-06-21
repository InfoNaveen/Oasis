import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stats = ['50+ profiles shipped since 2024', '₹999 starting price', '5-day avg. delivery', '4.9★ client satisfaction']
const colleges = ['BMSCE','PESIT','Manipal','VTU','RVCE','BMS Institute of Technology','Christ University','Jain University']

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', background: 'transparent' }}>
      <div className="container dom-layer" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 820 }}>

          <motion.h1 className="display-hero" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{ marginBottom: 28, color: 'var(--color-text-primary)' }}>
            Your GitHub is gathering dust.<br />
            Your LinkedIn is embarrassing.<br />
            {/* accent text: single token, not a large bg block */}
            <span style={{ color: 'var(--color-accent)' }}>Let's fix that.</span>
          </motion.h1>

          <motion.p className="body-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            style={{ maxWidth: 580, marginBottom: 36, color: 'var(--color-text-secondary)' }}>
            We turn forgettable online profiles into digital identities that get recruiters, founders, and hiring managers to pay attention — in 5 days or less.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            {/* Primary CTA: bg-accent text-bg-primary */}
            <a href="#work" className="btn-primary" style={{ padding: '14px 28px', fontSize: 14, flex: '0 0 auto' }}>View Our Work <ArrowRight size={15} /></a>
            {/* Secondary CTA: border-border-medium text-text-primary hover:border-accent */}
            <a href="#contact" className="btn-ghost" style={{ padding: '14px 28px', fontSize: 14, flex: '0 0 auto' }}>Start a Conversation</a>
          </motion.div>

          {/* Stats bar — text-text-muted per spec */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0', marginBottom: 36, borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)', padding: '12px 0' }}>
            {stats.map((s, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginRight: 16, whiteSpace: 'nowrap' }}>
                {i > 0 && <span style={{ color: 'var(--color-accent)', marginRight: 16 }}>·</span>}{s}
              </span>
            ))}
          </motion.div>

          {/* // code comment element — text-code-comment font-mono per spec */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 32, padding: '10px 14px', border: '1px solid var(--color-border-medium)', borderLeft: '3px solid var(--color-accent)', borderRadius: '0 var(--r-md) var(--r-md) 0', background: 'rgba(201,162,109,0.04)', wordBreak: 'break-word' }}>
            <span style={{ color: 'var(--color-code-comment)' }}>{'// '}</span>
            <span style={{ color: 'var(--color-text-primary)' }}>Custom code. Zero templates. Deployed and indexed.</span>
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Trusted by students from:</p>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 32, animation: 'marquee 22s linear infinite', width: 'max-content' }}>
              {[...colleges, ...colleges].map((c, i) => (
                <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{c}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
