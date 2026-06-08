import BackgroundScene from './components/BackgroundScene'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Services from './components/Services'
import Showcase from './components/Showcase'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Team from './components/Team'
import Teach from './components/Teach'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { ArrowRight } from 'lucide-react'

function App() {
  return (
    <>
      <BackgroundScene />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Problem />
        <Services />
        <Showcase />
        <Pricing />
        <Process />
        <Team />
        <Teach />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      {/* Sticky mobile CTA */}
      <a href="#contact" className="show-mobile" style={{
        position: 'fixed', bottom: 16, right: 16, zIndex: 999,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'var(--color-accent)', color: 'var(--color-bg-primary)',
        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
        padding: '14px 22px', borderRadius: 'var(--r-xl)',
        textDecoration: 'none', boxShadow: '0 8px 32px var(--color-glow)',
        minHeight: 48,
      }}>
        Get Started <ArrowRight size={14} />
      </a>
    </>
  )
}

export default App
