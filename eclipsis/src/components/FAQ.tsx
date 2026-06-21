import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: "Will my portfolio look like everyone else's?", a: "No. Every portfolio is built from scratch based on your stack, goals, and personality. We don't use templates — if it looks generic, we haven't done our job." },
  { q: "I have nothing to put in a portfolio yet.", a: "That's exactly what the Project Build service is for. We design and build you a real, deployable project from scratch — documented, clean, and 100% yours to explain in any interview." },
  { q: "What if I'm not happy with the result?", a: "We revise until you're satisfied — no revision limits on the Pro package, and at least 1–2 rounds on every other plan. We stand behind the work." },
  { q: "How do I pay?", a: "After you submit the form and we confirm your package, we share a secure payment link. We accept UPI, cards, and net banking." },
  { q: "Can I start with Starter and upgrade later?", a: "Yes. Upgrade at any time and we credit what you've already paid toward the higher package. No penalties." },
  { q: "How are the teaching sessions conducted?", a: "All sessions are online via Google Meet or Zoom. 1:1 sessions are fully personalized to your level. Group batches are capped at 6 people so everyone gets attention." },
  { q: "I'm from a non-CS branch. Can you still help?", a: "Absolutely. We've worked with ECE, Mechanical, and MBA students. If you want to break into tech or build a stronger digital presence, your branch doesn't matter — your willingness to show up does." },
  { q: "I'm a founder, not a student. Can you help me?", a: "Yes — early-stage founders are a big part of who we work with. A polished LinkedIn and portfolio matters just as much when you're fundraising or hiring. Message us for a custom scope." },
  { q: "Do you work with teams or colleges?", a: "Yes. If you're a club, college society, or startup team that wants a group of profiles built, we offer bulk pricing. DM or email us for details." },
  { q: "How quickly will I see results?", a: "Delivery takes 3–7 days depending on your package. Many clients report increased recruiter engagement within 2–4 weeks of going live." },
  { q: "Why is OASIS so affordable?", a: "Because we're a student-first agency. Our goal is helping ambitious students build a professional online presence without paying agency-level pricing. We keep costs low by working directly — no middlemen, no overhead, no unnecessary meetings." },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="section" style={{ background: 'var(--color-surface-1)' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">FAQ</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>Everything you're wondering about</h2>
        </motion.div>
        {/* Divider: border-border-subtle per spec */}
        <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--color-border-subtle)' : 'none', background: isOpen ? 'var(--color-surface-2)' : 'transparent', borderLeft: isOpen ? '2px solid var(--color-accent)' : '2px solid transparent', transition: 'all 0.2s' }}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', minHeight: 52 }}>
                  {/* Question: text-text-primary */}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: isOpen ? 600 : 400, color: 'var(--color-text-primary)', paddingRight: 16 }}>{faq.q}</span>
                  {/* +/- indicator: text-accent per spec */}
                  <div style={{ width: 30, height: 30, borderRadius: 'var(--r-sm)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0, transition: 'all 0.2s' }}>
                    {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
                      <div style={{ padding: '0 22px 18px' }}>
                        {/* Answer: text-text-secondary per spec */}
                        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
