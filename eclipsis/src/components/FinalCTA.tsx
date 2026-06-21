import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import DOMPurify from 'dompurify'
import { Send, CheckCircle } from 'lucide-react'

const EMAIL_SERVICE = 'service_t1eh0d2'
const EMAIL_TEMPLATE = 'template_p85yx0r'
const EMAIL_PUBLIC_KEY = 'rnUSdZeNbzBmDbPnW'

const packages = ['Starter — ₹999','Builder — ₹1,999','Pro — ₹3,999','Custom / Founders','Session Booking']
const sources = ['LinkedIn','Instagram','Friend / Referral','College','Hackathon','Google']

function sanitize(s: string, max: number) {
  return DOMPurify.sanitize(s.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).slice(0, max)
}
function validEmail(e: string) {
  return /^[^\s@<>"']{1,64}@[^\s@<>"']{1,253}\.[a-zA-Z]{2,}$/.test(e)
}

const lbl = { display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', marginBottom: 6 }

export default function FinalCTA() {
  const [form, setForm] = useState({ name: '', email: '', college: '', pkg: '', message: '', source: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (f: string, v: string) => { setForm(p => ({ ...p, [f]: v })); setErrors(e => ({ ...e, [f]: '' })) }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Enter your full name'
    if (!validEmail(form.email)) e.email = 'Enter a valid email'
    if (!form.pkg) e.pkg = 'Select a package'
    return e
  }

  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('sending')
    try {
      await emailjs.send(EMAIL_SERVICE, EMAIL_TEMPLATE, {
        from_name: sanitize(form.name, 80),
        from_email: sanitize(form.email, 120),
        from_college: sanitize(form.college, 100),
        package: sanitize(form.pkg, 50),
        message: sanitize(form.message, 600) || '(no details provided)',
        source: sanitize(form.source, 50),
        reply_to: sanitize(form.email, 120),
      }, EMAIL_PUBLIC_KEY)
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="cta-grid">
          {/* Left */}
          <div>
            <span className="section-label">Get Started</span>
            <h2 className="display-lg" style={{ marginTop: 8, marginBottom: 16 }}>
              Ready to get<br /><span className="grad-accent">discovered?</span>
            </h2>
            <p className="body-lg" style={{ marginBottom: 32 }}>
              Submit the form below. We review every message personally and reply within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {['No templates — every line is custom-built', 'Delivered in 3–7 working days', 'Not satisfied? We revise until you are — no questions asked'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-muted)' }}>
                  <CheckCircle size={14} color="var(--color-accent)" />{item}
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div style={{ marginTop: 28, padding: '18px 20px', background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderLeft: '3px solid var(--color-accent)', borderRadius: '0 var(--r-md) var(--r-md) 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 8 }}>Our Promise</div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                If you're not satisfied with the first delivery, we keep revising until you are. No extra charges. No hidden fees. No surprises.
              </p>
            </div>

            {/* Capacity urgency */}
            <div style={{ marginTop: 16, padding: '14px 20px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0, animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <div>
                <span style={{ fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 500 }}>We take 5 new clients per week to maintain quality.</span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>3 slots remaining this week.</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {status === 'sent' ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-accent)', borderRadius: 'var(--r-lg)', textAlign: 'center', padding: 48 }}>
                <CheckCircle size={40} color="var(--color-accent)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-text-primary)', marginBottom: 10 }}>Message sent!</h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Naveen will reply within 24 hours at {form.email}</p>
              </motion.div>
            ) : (
              <div style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-medium)', borderTop: '2px solid var(--color-accent)', borderRadius: 'var(--r-lg)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-row">
                  <div>
                    <label style={lbl}>Full Name *</label>
                    <input className={`input-field${errors.name ? ' error' : ''}`} placeholder="Your name" value={form.name} autoComplete="name" onChange={e => set('name', e.target.value)} inputMode="text" enterKeyHint="next" />
                    {errors.name && <span style={{ fontSize: 11, color: 'var(--color-error)', marginTop: 4, display: 'block' }}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={lbl}>Email *</label>
                    <input className={`input-field${errors.email ? ' error' : ''}`} placeholder="you@email.com" type="email" autoComplete="email" value={form.email} onChange={e => set('email', e.target.value)} inputMode="email" enterKeyHint="next" />
                    {errors.email && <span style={{ fontSize: 11, color: 'var(--color-error)', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                  </div>
                </div>
                <div>
                  <label style={lbl}>College / University</label>
                  <input className="input-field" placeholder="BMSCE, Bangalore" autoComplete="organization" value={form.college} onChange={e => set('college', e.target.value)} inputMode="text" enterKeyHint="next" />
                </div>
                <div>
                  <label style={lbl}>Package *</label>
                  <select className={`input-field${errors.pkg ? ' error' : ''}`} value={form.pkg} onChange={e => set('pkg', e.target.value)} style={{ appearance: 'none', cursor: 'pointer', minHeight: 48 }}>
                    <option value="">Select a package...</option>
                    {packages.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.pkg && <span style={{ fontSize: 11, color: 'var(--color-error)', marginTop: 4, display: 'block' }}>{errors.pkg}</span>}
                </div>
                <div>
                  <label style={lbl}>Tell us about yourself</label>
                  <textarea className="input-field" placeholder="Year of study, tech stack, goals, what you're applying for..." rows={4} value={form.message} onChange={e => set('message', e.target.value)} style={{ resize: 'vertical', minHeight: 100 }} maxLength={600} />
                </div>
                <div>
                  <label style={lbl}>How did you hear about us? (optional)</label>
                  <select className="input-field" value={form.source} onChange={e => set('source', e.target.value)} style={{ appearance: 'none', cursor: 'pointer', minHeight: 48 }}>
                    <option value="">Select...</option>
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {status === 'error' && (
                  <p style={{ fontSize: 13, color: 'var(--color-error)' }}>Something went wrong. Email us at <a href="mailto:naveen.a.patil7@gmail.com" style={{ color: 'var(--color-accent)' }}>naveen.a.patil7@gmail.com</a></p>
                )}
                <button className="btn-primary" onClick={submit} disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1, minHeight: 50, fontSize: 15 }}>
                  {status === 'sending' ? 'Sending...' : <><Send size={14} /> Send Message →</>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.cta-grid{grid-template-columns:1fr!important;gap:40px!important;}}@media(max-width:500px){.form-row{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
