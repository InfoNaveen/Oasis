import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const cases = [
  {
    client: 'Global Automotive',
    category: 'Robotics Integration',
    title: 'Automated Assembly Line Overhaul',
    desc: 'Re-engineered the primary assembly line with collaborative robotics and computer vision, reducing defect rates by 94% while increasing throughput by 30%.',
    metric: '94%',
    metricLabel: 'Defect Reduction'
  },
  {
    client: 'National Energy',
    category: 'Predictive Intelligence',
    title: 'Grid Failure Prediction System',
    desc: 'Deployed edge-AI models across 10,000+ sensor endpoints to predict mechanical failures 72 hours before occurrence, saving $4.2M annually in emergency maintenance.',
    metric: '72hr',
    metricLabel: 'Advanced Warning'
  },
  {
    client: 'Logistics Prime',
    category: 'Process Automation',
    title: 'Autonomous Warehouse Orchestration',
    desc: 'Integrated fleet management software with AGVs and robotic sorting arms, achieving fully autonomous night-shift operations across 3 major fulfillment centers.',
    metric: '100%',
    metricLabel: 'Autonomous Night Shift'
  }
]

export default function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  return (
    <section id="cases" ref={targetRef} style={{ height: '300vh', position: 'relative', background: 'var(--color-bg-primary)' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ position: 'absolute', top: 120, left: 'max(24px, calc((100vw - 1280px) / 2))', zIndex: 10 }}>
          <span className="label-mono">Selected Work</span>
          <h2 className="display-md" style={{ marginTop: 16 }}>
            Industrial <span className="gradient-accent-text">Transformation</span>
          </h2>
        </div>

        {/* Horizontal Scroll Content */}
        <motion.div style={{ x, display: 'flex', gap: 40, paddingLeft: 'max(24px, calc((100vw - 1280px) / 2))', paddingRight: 'max(24px, calc((100vw - 1280px) / 2))' }}>
          {cases.map((c, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{
                width: '80vw',
                maxWidth: 900,
                height: 500,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 60,
                border: '1px solid var(--color-border-medium)',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.boxShadow = '0 20px 60px -20px var(--color-glow)'
                const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement
                if(arrow) arrow.style.transform = 'translate(4px, -4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-medium)'
                e.currentTarget.style.boxShadow = 'none'
                const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement
                if(arrow) arrow.style.transform = 'translate(0, 0)'
              }}
            >
              {/* Abstract Background pattern */}
              <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%',
                background: 'linear-gradient(90deg, transparent, var(--color-glow))',
                clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
                  <span className="label-mono" style={{ padding: '6px 12px', background: 'var(--color-surface-3)', borderRadius: 100 }}>
                    {c.category}
                  </span>
                  <div className="arrow-icon" style={{ 
                    width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--color-border-medium)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.4s ease'
                  }}>
                    <ArrowUpRight size={24} color="var(--color-accent)" />
                  </div>
                </div>

                <div className="label-mono" style={{ color: 'var(--color-text-secondary)', marginBottom: 12 }}>{c.client}</div>
                <h3 className="display-md" style={{ marginBottom: 24, maxWidth: 600 }}>{c.title}</h3>
                <p className="body-lg" style={{ maxWidth: 500 }}>{c.desc}</p>
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <div className="display-lg" style={{ color: 'var(--color-accent)' }}>{c.metric}</div>
                <div className="label-mono" style={{ color: 'var(--color-text-secondary)' }}>{c.metricLabel}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #cases .glass-panel { padding: 24px !important; height: 400px !important; width: 90vw !important; }
        }
        @media (max-width: 480px) {
          #cases .glass-panel { padding: 20px !important; height: 360px !important; }
        }
      `}</style>
    </section>
  )
}
