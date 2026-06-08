import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

const metrics = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 30, suffix: '%', label: 'Avg Efficiency Gains' },
  { value: 24, suffix: '/7', label: 'Intelligent Monitoring' }
]

function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, current => Math.floor(current))

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, spring, value])

  return (
    <span ref={ref} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
      <motion.span>{display}</motion.span>
      <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
    </span>
  )
}

export default function Metrics() {
  return (
    <section className="section" style={{ position: 'relative', borderTop: '1px solid var(--color-border-medium)', borderBottom: '1px solid var(--color-border-medium)' }}>
      {/* Background with grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, var(--color-bg-primary) 0%, transparent 20%, transparent 80%, var(--color-bg-primary) 100%)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="metrics-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
        }}>
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: 'center',
                padding: 32,
                background: 'var(--color-surface-2)',
                backdropFilter: 'blur(12px)',
                borderRadius: 'var(--r-xl)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'inset 0 1px 0 var(--color-border-subtle)'
              }}
            >
              <div className="display-lg" style={{ marginBottom: 8, fontWeight: 800 }}>
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </div>
              <div className="label-mono" style={{ color: 'var(--color-text-secondary)' }}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 640px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
          .metrics-grid > div { padding: 20px !important; }
        }
      `}</style>
    </section>
  )
}
