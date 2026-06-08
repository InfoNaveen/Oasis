import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const storySections = [
  {
    id: '01',
    title: 'AI Automation',
    desc: 'Transform manual workflows into intelligent, self-optimizing processes. We engineer custom AI agents that execute complex cognitive tasks with 99.9% accuracy.',
    visualType: 'grid',
  },
  {
    id: '02',
    title: 'Robotics Integration',
    desc: 'Deploy advanced robotic systems for physical automation. From collaborative arms to autonomous mobile robots, we build the physical layer of the future.',
    visualType: 'rings',
  },
  {
    id: '03',
    title: 'Industrial Intelligence',
    desc: 'Unlock predictive capabilities. Our machine learning models analyze sensor data in real-time to predict failures before they happen, maximizing uptime.',
    visualType: 'mesh',
  },
  {
    id: '04',
    title: 'Workflow Optimization',
    desc: 'End-to-end process orchestration. We connect fragmented systems into a unified, high-velocity engine that drives enterprise scale.',
    visualType: 'particles',
  },
]

function StoryPanel({ data, index, progress }: { data: typeof storySections[0], index: number, progress: any }) {
  // Each panel has a specific active window within the total scroll progress
  // Progress goes from 0 to 1 over the whole container.
  const start = index * 0.25
  const end = start + 0.25
  const peak = start + 0.125

  // Opacity peaks in the middle of the active window
  const opacity = useTransform(
    progress,
    [start - 0.1, peak, end + 0.1],
    [0, 1, 0]
  )

  // Subtle Y translation
  const y = useTransform(
    progress,
    [start, end],
    [100, -100]
  )

  // Scale effect for the visual
  const scale = useTransform(
    progress,
    [start, peak, end],
    [0.8, 1, 1.2]
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div className="container story-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* Text Content */}
        <motion.div style={{ y, pointerEvents: 'auto' }}>
          <div style={{
            display: 'inline-block',
            marginBottom: 24,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4rem',
              fontWeight: 800,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '2px var(--color-border-medium)',
            }}>
              {data.id}
            </span>
          </div>
          <h2 className="display-lg" style={{ marginBottom: 24 }}>
            {data.title}
          </h2>
          <p className="body-xl" style={{ maxWidth: 480 }}>
            {data.desc}
          </p>
        </motion.div>

        {/* Visual Content */}
        <div className="story-visual" style={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div style={{ scale, width: '100%', height: '100%' }}>
             <AbstractVisual type={data.visualType} />
          </motion.div>
        </div>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .story-grid .display-lg { font-size: 1.5rem !important; }
          .story-grid .body-xl { font-size: 0.875rem !important; }
          .story-visual { height: 280px !important; }
        }
        @media (max-width: 480px) {
          .story-grid { gap: 20px !important; }
          .story-grid > div:first-child > div:first-child { font-size: 2.5rem !important; }
          .story-visual { height: 220px !important; }
        }
      `}</style>
    </motion.div>
  )
}

function AbstractVisual({ type }: { type: string }) {
  // CSS-only abstract visuals
  if (type === 'grid') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(rgba(201,162,109,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,109,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(45deg)',
        borderRadius: 20,
        boxShadow: '0 0 40px rgba(201,162,109,0.1) inset',
      }} />
    )
  }
  if (type === 'rings') {
    return (
      <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>
        {[1, 2, 3].map((i) => (
          <motion.div key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: 'linear', direction: i % 2 === 0 ? 'reverse' : 'normal' }}
            style={{
              position: 'absolute', inset: i * 20,
              border: '2px solid rgba(201,162,109,0.3)',
              borderRadius: '50%',
              borderTopColor: 'var(--color-accent)',
            }}
          />
        ))}
      </div>
    )
  }
  if (type === 'mesh') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(201,162,109,0.15) 0%, transparent 50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          width: 200, height: 200, border: '1px solid var(--color-accent)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          boxShadow: '0 0 40px rgba(201,162,109,0.25)',
          animation: 'rotate-slow 10s linear infinite',
        }} />
      </div>
    )
  }
  return (
     <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'center', justifyContent: 'center' }}>
       {Array.from({ length: 40 }).map((_, i) => (
         <motion.div key={i}
           animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.8, 0.2] }}
           transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
           style={{ width: 10, height: 10, background: 'var(--color-accent)', borderRadius: '50%' }}
         />
       ))}
     </div>
  )
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })
  const progressHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '400vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
      }}>
        
        {/* Background gradient linked to scroll */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 100%, rgba(201,162,109,0.03) 0%, transparent 60%)',
        }} />

        {/* Progress Bar Container */}
        <div style={{
          position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)',
          width: 2, height: 200, background: 'var(--color-border-medium)', zIndex: 10,
        }} className="progress-track">
          <motion.div style={{
            width: '100%', height: progressHeight, background: 'var(--color-accent)',
            boxShadow: '0 0 10px var(--color-glow)',
          }} />
        </div>

        {storySections.map((section, i) => (
          <StoryPanel key={section.id} data={section} index={i} progress={smoothProgress} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .progress-track { display: none; }
        }
      `}</style>
    </section>
  )
}
