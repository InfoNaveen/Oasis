# OASIS — Where Opportunities Find You

**Digital Identity Agency for Students & Early-Stage Developers**

> We build internship-ready digital identities — portfolio sites, LinkedIn overhauls, GitHub profiles, and resume refinements — for students and early-stage developers who want to be discovered.

**Live Domain:** `oasis.agency`  
**Repository:** [github.com/InfoNaveen/Oasis](https://github.com/InfoNaveen/Oasis)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [What's Built](#whats-built)
- [Component Breakdown](#component-breakdown)
- [Security Implementation](#security-implementation)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Performance](#performance)
- [Color & Design System](#color--design-system)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [What's Next](#whats-next)
- [Team](#team)

---

## Project Overview

OASIS is a premium single-page agency website built to convert student visitors into paying clients. It serves as the digital storefront for a service that helps students and early professionals build visible, recruiter-ready online presences — portfolio websites, LinkedIn profiles, GitHub profiles, and resumes.

The site is designed with a **mobile-first** philosophy since 80% of visitors arrive from Instagram, LinkedIn, WhatsApp, or X on their phones.

### Business Offerings

| Package | Price | What's Included |
|---------|-------|-----------------|
| Starter | ₹499 | LinkedIn rewrite, GitHub README setup, Resume formatting review, 3-day delivery, 1 revision |
| Builder | ₹899 | Everything in Starter + Portfolio website (deployed + custom domain), SEO meta tags + OG, 5-day delivery, 2 revisions |
| Pro | ₹1,299 | Everything in Builder + GitHub project build (real, deployed), Full LinkedIn optimization, ATS CV + resume design, Priority 7-day delivery, Unlimited revisions |
| Custom | Contact | Founders, teams, bulk orders — custom scope |
| Sessions | ₹299/hr | 1:1 teaching — Web Dev, React, Git, Hackathon prep, Career clarity |

---

## Tech Stack

### Frontend (Active — Vite)

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2 | UI component library |
| **TypeScript** | 5.7 | Type-safe development |
| **Vite** | 8.0 | Build tool & dev server |
| **Tailwind CSS** | 4.2 | Utility-first CSS (via `@tailwindcss/vite` plugin) |
| **Framer Motion** | 12.38 | Animations & micro-interactions |
| **Three.js** | 0.184 | 3D background scene (`@react-three/fiber` + `@react-three/drei`) |
| **Lucide React** | 1.16 | Icon library |
| **EmailJS** | 4.4 | Client-side email sending (contact form) |
| **DOMPurify** | 3.4 | XSS prevention — input sanitization on client |

### Backend (Prepared — Next.js Ready)

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | API routes for contact form (prepared, not yet active) |
| **Resend** | Transactional email delivery |
| **Upstash Redis** | Rate limiting (3 submissions/hour/IP) |
| **Vercel Analytics** | Production analytics + Speed Insights |

### Fonts

| Font | Weight | Usage |
|------|--------|-------|
| Syne | 400–800 | Display headings |
| Inter | 300–600 | Body text |
| JetBrains Mono | 400–500 | Code elements, labels, badges |

---

## Architecture

```
ECLIPSIS-Business/
├── eclipsis/                      # Main OASIS website
│   ├── src/
│   │   ├── components/            # 18 React components
│   │   │   ├── canvas/
│   │   │   │   └── HeroCanvas.tsx # Three.js 3D background
│   │   │   ├── Navbar.tsx         # Sticky nav + mobile hamburger
│   │   │   ├── Hero.tsx           # Above-the-fold hero
│   │   │   ├── Problem.tsx        # Pain point cards
│   │   │   ├── Services.tsx       # Service grid
│   │   │   ├── Showcase.tsx       # Client work showcase
│   │   │   ├── Pricing.tsx        # Pricing cards
│   │   │   ├── Process.tsx        # 4-step process
│   │   │   ├── Team.tsx           # Team member cards
│   │   │   ├── Teach.tsx          # Teaching sessions + pricing
│   │   │   ├── Testimonials.tsx   # Marquee testimonials
│   │   │   ├── FAQ.tsx            # Accordion FAQ
│   │   │   ├── FinalCTA.tsx       # Contact form
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   ├── ScrollStory.tsx    # Scroll-driven storytelling
│   │   │   ├── CaseStudies.tsx    # Horizontal scroll case studies
│   │   │   ├── Metrics.tsx        # Animated counters
│   │   │   ├── CollegeStrip.tsx   # Trust badge strip
│   │   │   └── BackgroundScene.*  # 3D animated background
│   │   ├── App.tsx                # Root component + section ordering
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Global styles + design tokens
│   ├── app/                       # Next.js API routes (prepared)
│   │   ├── api/
│   │   │   ├── contact/route.ts   # Contact form endpoint
│   │   │   └── csrf/route.ts      # CSRF token generation
│   │   ├── loading.tsx            # Loading skeleton
│   │   ├── error.tsx              # Error boundary
│   │   ├── not-found.tsx          # 404 page
│   │   └── sitemap.ts             # Dynamic sitemap
│   ├── lib/
│   │   └── ratelimit.ts           # Upstash rate limiter
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── robots.txt
│   ├── .github/workflows/
│   │   └── security.yml           # CI security audit
│   ├── index.html                 # Vite entry HTML
│   ├── vite.config.ts             # Vite configuration
│   ├── tsconfig.json              # TypeScript config
│   ├── vercel.json                # Vercel deployment config
│   └── package.json
│
└── AnimatedBackground/            # Standalone 3D background prototype
```

### Section Rendering Order (App.tsx)

```
BackgroundScene (3D animated canvas — fixed behind all content)
Navbar (sticky, glassmorphism on scroll)
  ↓
Hero → Problem → Services → Showcase → Pricing → Process → Team → Teach → Testimonials → FAQ → FinalCTA
  ↓
Footer
Sticky Mobile CTA (fixed bottom-right, mobile only)
```

---

## What's Built

### Fully Implemented

- **Complete single-page website** with 18 sections
- **3D animated background** using Three.js (floating particles, wireframe geometry, ambient lighting)
- **Sticky navigation** with glassmorphism effect on scroll
- **Mobile hamburger menu** with full-screen overlay, body scroll lock, backdrop click-to-close
- **Contact form** with:
  - Client-side validation (name, email, package required)
  - DOMPurify sanitization on every field
  - EmailJS integration for email delivery
  - Success/error states with animated feedback
  - Mobile keyboard optimization (inputMode, enterKeyHint)
  - iOS zoom prevention (16px minimum font-size)
- **FAQ accordion** with smooth expand/collapse animations
- **Testimonial marquee** — two infinite-scrolling rows
- **Animated counters** in Metrics section (spring physics)
- **Scroll-driven storytelling** section with progress tracking
- **Horizontal scroll case studies** (Framer Motion useScroll)
- **Responsive pricing cards** with featured "Most Popular" highlight
- **Team member cards** with skill badges and social links
- **Teaching sessions section** with pricing sidebar
- **Custom CTA card** for founders/teams/bulk orders
- **SEO meta tags** — title, description, keywords, Open Graph
- **robots.txt** with sitemap reference
- **sitemap.ts** for dynamic sitemap generation
- **Security hardening** (see Security section below)
- **Mobile-first responsive design** — optimized for 320px to desktop
- **Accessibility features** — ARIA labels, focus-visible, prefers-reduced-motion
- **GitHub Actions CI** — automated security audit on PR

---

## Component Breakdown

| Component | Lines | Description | Mobile Behavior |
|-----------|-------|-------------|-----------------|
| Navbar | 117 | Sticky header, announcement bar, mobile menu | Full-screen menu, body scroll lock, 44px touch targets |
| Hero | 66 | Headline, CTAs, stats bar, trust marquee | Responsive padding, wrapping stats, `clamp()` typography |
| Problem | 38 | 3 pain-point cards | Stacks to 1 column at 900px |
| Services | 46 | 6 service cards in grid | 1fr at 900px, 2col at 901–1100px |
| Showcase | 83 | Browser mockup + metrics + strip | Stacks at 768px |
| Pricing | 79 | 3 pricing cards + custom CTA | Stacks at 768px, full-width CTAs |
| Process | 48 | 4-step process with connecting lines | 2col at 900px, 1col at 500px, lines hidden |
| Team | 97 | 3 team member cards | Stacks at 900px |
| Teach | 90 | Session cards + sticky pricing sidebar | Unsticks sidebar at 900px |
| Testimonials | 66 | Dual-row marquee | Cards min-width 260px, horizontal scroll |
| FAQ | 60 | 10-item accordion | 52px button height, 30x30 toggle icon |
| FinalCTA | 139 | Contact form + value props | Stacks at 768px, form fields stack at 500px |
| Footer | 98 | Brand, links, socials, copyright | Single column at 768px, 44px social icons |
| ScrollStory | 231 | Scroll-driven panels with abstract visuals | Visual area shrinks to 220px at 480px |
| CaseStudies | 136 | Horizontal scroll case study cards | 90vw width, 360px height at 480px |
| Metrics | 86 | 4 animated counter cards | 2col at 1024px, 1col at 640px |
| CollegeStrip | 31 | Trust badge text strip | Flex-wrap with dot separators |
| BackgroundScene | — | Three.js 3D canvas | Reduced particle count on mobile |

---

## Security Implementation

The security architecture follows a defense-in-depth approach across 4 parts:

### Part 0 — Foundation
- `.gitignore` excludes `.env`, `.env.local`, `.env.production`
- `vercel.json` rewrites `.env*` URLs to 404
- HTTP → HTTPS redirect enforced via Vercel config
- `.env.example` template with placeholder values (no real secrets)

### Part 1 — Contact Form
- **Client-side:** DOMPurify strips all HTML tags from every field before submission
- **Server-side (prepared):** HTML stripping, field length limits, strict validation
- **Honeypot field** traps bots (returns 200 silently to avoid detection)
- **CSRF protection:** HMAC-signed tokens with 1-hour expiry, stored in httpOnly cookies
- **Rate limiting:** 3 submissions per hour per IP via Upstash Redis sliding window

### Part 2 — API Hardening
- All error responses return generic messages (no stack traces)
- IP addresses logged as SHA-256 hashes only (privacy)
- Strict input validation mirrors client-side rules
- Content-Type enforcement
- `Cache-Control: no-store` on all API routes

### Part 3 — Supply Chain & CI
- `audit-ci` configured via `audit-ci.json`
- `prebuild` script runs `npm audit --audit-level=high` before every build
- GitHub Actions workflow runs security audit on every push and PR
- PR comments auto-generated with audit results
- Build fails if high/critical vulnerabilities detected

### Part 4 — Headers & Infra
- Static assets: `Cache-Control: public, max-age=31536000, immutable`
- HTML: `Cache-Control: no-cache`
- API: `Cache-Control: no-store`
- `robots.txt` blocks `/api/*` and `/_next/*`

---

## Mobile Responsiveness

### Breakpoint Strategy

| Breakpoint | Target Devices | Key Changes |
|-----------|---------------|-------------|
| 320px | iPhone SE (1st gen) | Minimum padding 12px, smallest typography |
| 360px | Small Android | Container padding 12px |
| 375px | iPhone SE (2nd/3rd gen) | — |
| 390px | iPhone 13/14/15 | — |
| 414px | iPhone Plus, Galaxy | — |
| 480px | Large phones | Section padding 48px, display-lg scaling |
| 768px | Tablets | Container padding 20px, desktop nav visible, section padding 64px |
| 1024px | iPad Pro | Metrics grid 2 columns |
| 1200px+ | Desktop | Full layout |

### Mobile-Specific Features
- **Touch targets:** Minimum 44×44px on all interactive elements (WCAG compliant)
- **iOS zoom prevention:** All inputs set to `font-size: 16px`
- **Body scroll lock:** Prevents background scrolling when mobile menu is open
- **Keyboard optimization:** `inputMode` and `enterKeyHint` on form fields
- **Overflow prevention:** `overflow-x: hidden` on body, `max-width: 100%` on all media
- **Sticky CTA:** Fixed "Get Started" button at bottom-right on mobile only
- **Reduced motion:** `prefers-reduced-motion` media query disables animations
- **Focus states:** `focus-visible` outlines on buttons and inputs

### Tested Viewports
- 320×568 (iPhone SE 1st gen)
- 375×667 (iPhone SE 2nd/3rd gen)
- 390×844 (iPhone 13/14/15)
- 412×915 (Samsung Galaxy)
- 768×1024 (iPad)
- 1024×1366 (iPad Pro)

---

## Performance

### Build Output

| File | Size | Gzipped |
|------|------|---------|
| `index.html` | 1.79 KB | 0.75 KB |
| CSS | 6.49 KB | 1.96 KB |
| `vendor` (React + ReactDOM) | 184.92 KB | 58.21 KB |
| `motion` (Framer Motion) | 132.22 KB | 43.30 KB |
| App bundle | 1,025.87 KB | 279.17 KB |

### Optimizations
- **Code splitting:** React/ReactDOM and Framer Motion extracted into separate chunks
- **Font preconnect:** `<link rel="preconnect">` for Google Fonts
- **Lazy animations:** Framer Motion `viewport={{ once: true }}` prevents re-animation
- **CSS containment:** Section-level `position: relative` for paint optimization
- **Three.js:** Reduced particle count and geometry on mobile

### Vite Configuration
- `@vitejs/plugin-react` with Fast Refresh
- `@tailwindcss/vite` for zero-config Tailwind integration
- Manual chunk splitting for optimal caching

---

## Color & Design System

### Color Tokens (21 CSS Custom Properties)

All colors are defined as CSS custom properties in `:root` within `index.css`. No hardcoded hex/rgba values exist in components — everything references these tokens.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0f0e0d` | Page background |
| `--color-surface-1` | `#161412` | Card backgrounds, footer |
| `--color-surface-2` | `#1f1c19` | Nested cards, form fields |
| `--color-surface-3` | `#2a2623` | Badges, icon backgrounds |
| `--color-accent` | `#c9a26d` | Primary gold accent |
| `--color-accent-secondary` | `#e8e4dc` | Secondary accent |
| `--color-accent-tertiary` | `#8c5a4b` | Tertiary accent |
| `--color-text-primary` | `#e8e4dc` | Headlines, primary text |
| `--color-text-secondary` | `#a8a095` | Body text, descriptions |
| `--color-text-muted` | `#7a7267` | Labels, timestamps |
| `--color-border-subtle` | `#2a2623` | Dividers, subtle borders |
| `--color-border-medium` | `#3d3732` | Card borders, inputs |
| `--color-border-strong` | `#524840` | Scrollbar hover |
| `--color-code-comment` | `#7a7267` | Code comment styling |
| `--color-code-keyword` | `#c9a26d` | Code keywords |
| `--color-code-string` | `#8c9e7a` | Code string values |
| `--color-success` | `#7a9e7a` | Success states |
| `--color-warning` | `#c9a26d` | Warning states |
| `--color-error` | `#c96d6d` | Error states |
| `--color-info` | `#6d8cc9` | Info states |
| `--color-glow` | `rgba(201,162,109,0.15)` | Ambient glow effects |

### Typography Scale

| Class | Font | Size | Usage |
|-------|------|------|-------|
| `.display-hero` | Syne 800 | `clamp(2.6rem, 6vw, 5.5rem)` | Hero headline |
| `.display-xl` | Syne 700 | `clamp(2rem, 4.5vw, 3.8rem)` | Extra-large headings |
| `.display-lg` | Syne 700 | `clamp(1.7rem, 3.2vw, 2.8rem)` | Section headings |
| `.display-md` | Syne 700 | `clamp(1.3rem, 2.4vw, 2rem)` | Sub-headings |
| `.body-xl` | Inter 400 | `clamp(1.05rem, 1.6vw, 1.125rem)` | Large body text |
| `.body-lg` | Inter 400 | `clamp(1rem, 1.4vw, 1.0625rem)` | Body text |
| `.mono` | JetBrains Mono | `0.75rem` | Code/label elements |
| `.label-mono` | JetBrains Mono | `0.75rem` uppercase | Section labels, tags |

### Radius System

| Token | Value |
|-------|-------|
| `--r-sm` | 4px |
| `--r-md` | 6px |
| `--r-lg` | 10px |
| `--r-xl` | 14px |

---

## Getting Started

### Prerequisites
- **Node.js** 20+ (LTS recommended)
- **npm** 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/InfoNaveen/Oasis.git
cd Oasis/eclipsis

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build (runs audit first) |
| `npm run preview` | Preview production build locally |
| `npm run audit:check` | Run audit-ci vulnerability check |
| `npm run next:dev` | Start Next.js dev server (for API routes) |
| `npm run next:build` | Build Next.js production app |
| `npm run next:start` | Start Next.js production server |

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
# Email
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=hello@oasis.agency

# Security
CSRF_SECRET=your-random-secret-string
HONEYPOT_FIELD_NAME=honeypot

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

---

## Deployment

### Current Stack: Vite (Static)
The frontend is a static site built with Vite. Deploy to any static hosting:
- **Vercel** (recommended — `vercel.json` already configured)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

```bash
npm run build
# Upload dist/ folder to your host
```

### Future: Next.js (Full-Stack)
When you're ready to activate the API routes (contact form, CSRF, rate limiting):

```bash
# Install Next.js dependencies (already in package.json)
npm install

# Start Next.js
npm run next:dev
```

This enables:
- `/api/contact` — Server-side form handling with Resend
- `/api/csrf` — CSRF token generation
- Rate limiting via Upstash Redis
- Server-side rendering for loading states, error boundaries, 404 pages

### Vercel Deployment
```bash
npx vercel --prod
```

The `vercel.json` is pre-configured with:
- HTTP → HTTPS redirect
- Static asset caching (1 year, immutable)
- API route cache-control: no-store
- `.env` file access blocked via rewrites

---

## What's Next

### Not Yet Active
- [ ] Next.js API routes (code written, needs `next` runtime activation)
- [ ] Server-side contact form (currently using client-side EmailJS)
- [ ] CSRF token integration on frontend
- [ ] Upstash Redis rate limiting (needs Redis instance)
- [ ] Vercel Analytics + Speed Insights (needs Vercel deployment)
- [ ] Resend email delivery (needs API key)

### Recommended Next Steps
1. **Deploy to Vercel** — config is ready, just needs `npx vercel --prod`
2. **Set up Upstash Redis** — free tier is sufficient for rate limiting
3. **Configure Resend** — add `RESEND_API_KEY` to environment
4. **Add real testimonials** — current ones are placeholder
5. **Add real case study data** — CaseStudies section uses placeholder industrial data
6. **Code splitting** — app bundle is ~1MB, consider lazy-loading Three.js canvas
7. **Add blog/content section** — for SEO and organic traffic
8. **Payment integration** — Razorpay or Stripe for online payments

---

## Team

| Name | Role | Links |
|------|------|-------|
| **Naveen Patil** | Founder & Full-Stack Developer | [Portfolio](https://naveen-patil.vercel.app) · [LinkedIn](https://linkedin.com/in/naveen-patil-builder) · [GitHub](https://github.com/InfoNaveen) |
| **Chinmay Muddapur** | Co-Founder & UI/UX Engineer | [Portfolio](https://chinmay-ivory.vercel.app) · [LinkedIn](https://linkedin.com/in/chinmay-muddapur-441a3a320) · [GitHub](https://github.com/chinmaymuddapur) |
| **Preetam Hosamani** | Co-Founder & Growth Lead | [Portfolio](https://personal-website-e3xu.vercel.app) · [LinkedIn](https://linkedin.com/in/preetam-hosamani) · [GitHub](https://github.com/preetamhosamani) |

---

**Built with clean code, shipped with purpose.**
