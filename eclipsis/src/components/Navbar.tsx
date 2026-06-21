import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Results', href: '#results' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Team', href: '#team' },
  { label: 'Learn', href: '#learn' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [topBar, setTopBar] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeMenu = useCallback(() => setOpen(false), [])

  return (
    <>
      <AnimatePresence>
        {topBar && (
          <motion.div initial={{ height: 'auto' }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-secondary)', textAlign: 'center', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', padding: '7px 16px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <span style={{ color: 'var(--color-accent)' }}>🚀 Now accepting April–June cohort</span> — 3 slots left this week
            <button onClick={() => setTopBar(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 18, lineHeight: 1, padding: '4px 8px', minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Dismiss announcement">×</button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: topBar ? 36 : 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 16px',
          background: scrolled || open ? 'rgba(15,14,13,0.95)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-subtle)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-accent)', marginRight: 2 }}>//</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>OASIS</span>
          </a>

          <nav style={{ display: 'flex', gap: 0, alignItems: 'center' }} className="hide-mobile">
            {links.map(l => (
              <a key={l.label} href={l.href} style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500, padding: '8px 14px', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                {l.label}
              </a>
            ))}
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginLeft: 16, padding: '9px 20px', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--r-md)', color: 'var(--color-text-primary)', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-medium)'; e.currentTarget.style.color = 'var(--color-text-primary)' }}>
              Get Started <ArrowRight size={13} />
            </a>
          </nav>

          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="show-mobile" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile overlay + menu */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                onClick={closeMenu}
                style={{ position: 'fixed', inset: 0, top: 64, background: 'rgba(0,0,0,0.5)', zIndex: 998 }} />
              {/* Menu panel */}
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, background: 'rgba(15,14,13,0.98)', backdropFilter: 'blur(16px)', zIndex: 999, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {links.map(l => (
                    <a key={l.label} href={l.href} onClick={closeMenu}
                      style={{ color: 'var(--color-text-secondary)', fontSize: 16, fontWeight: 500, padding: '16px 0', textDecoration: 'none', borderBottom: '1px solid var(--color-border-subtle)', display: 'block', minHeight: 48 }}>
                      {l.label}
                    </a>
                  ))}
                  <a href="#contact" className="btn-primary" onClick={closeMenu} style={{ marginTop: 20, justifyContent: 'center', padding: '16px 24px', fontSize: 15 }}>
                    Get Started <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
