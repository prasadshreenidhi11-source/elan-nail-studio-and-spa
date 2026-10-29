import { useEffect, useRef, useState } from 'react'
import './Footer.css'

/* Put your logo file in /public and change this path. Until the file exists
   the browser shows the alt text, which is the "broken image" placeholder. */
const LOGO_SRC = '/logo.png'

const EXPLORE = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Pricing', '/pricing'],
  ['Contact Us', '/contact'],
]

const glow = (e) => {
  const b = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - b.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - b.top}px`)
}

const Icon = ({ id }) => (
  <svg className="ef-i" aria-hidden="true">
    <use href={`#${id}`} />
  </svg>
)

export default function Footer() {
  const rootRef = useRef(null)
  const [ready, setReady] = useState(false) // enables reveal-hidden state after mount
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null) // { ok: boolean, text: string }
  const [today, setToday] = useState(null) // 'open' | 'closed' | null

  useEffect(() => {
    setReady(true)

    // Open / closed indicator in India time
    const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
    const mins = ist.getHours() * 60 + ist.getMinutes()
    if (ist.getDay() === 1) setToday('closed')
    else if (mins >= 600 && mins < 1170) setToday('open')

    // Scroll reveal
    const els = rootRef.current.querySelectorAll('[data-r]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMsg({ ok: false, text: 'Please enter a valid email address.' })
      return
    }
    // TODO: send `email` to your newsletter service or API here.
    setMsg({ ok: true, text: 'Welcome to the club. Watch your inbox for something lovely.' })
    setEmail('')
  }

  return (
    <footer ref={rootRef} className={`elan-footer${ready ? ' ef-js' : ''}`}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="ef-g" x1="0" x2="1">
            <stop offset="0" stopColor="#c9766f" stopOpacity="0" />
            <stop offset=".3" stopColor="#c9766f" />
            <stop offset=".75" stopColor="#e08e83" />
            <stop offset="1" stopColor="#c9766f" stopOpacity="0" />
          </linearGradient>
          <symbol id="ef-ph" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></symbol>
          <symbol id="ef-ml" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></symbol>
          <symbol id="ef-pn" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></symbol>
          <symbol id="ef-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" /></symbol>
          <symbol id="ef-fb" viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></symbol>
          <symbol id="ef-ar" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></symbol>
          <symbol id="ef-up" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></symbol>
        </defs>
      </svg>

      <div className="ef-wrap">
        {/* 1. Main content */}
        <div className="ef-cols">
          <div data-r style={{ '--d': 1 }}>
            <a className="ef-logo" href="/">
              <img src={LOGO_SRC} alt="élan Nail Studio & Spa" width="200" height="72" />
            </a>
            <p className="ef-tag">
              We will help you rediscover the magic of Self-Care through bespoke luxury rituals and
              master craftsmanship.
            </p>
            <div className="ef-soc">
              <a href="https://www.facebook.com/elannailart/" aria-label="Facebook"><Icon id="ef-fb" /></a>
              <a href="https://www.instagram.com/elannailstudioandspa/" aria-label="Instagram"><Icon id="ef-ig" /></a>
            </div>
          </div>

          <nav data-r style={{ '--d': 2 }} aria-label="Explore">
            <h3>Explore</h3>
            <ul className="ef-links">
              {EXPLORE.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div data-r style={{ '--d': 3 }}>
            <h3>Contact</h3>
            <ul className="ef-ct">
              <li><a href="tel:+919483042996"><span className="ef-chip"><Icon id="ef-ph" /></span><span className="ef-t">+91 9483 042 996</span></a></li>
              <li><a href="tel:+919945155889"><span className="ef-chip"><Icon id="ef-ph" /></span><span className="ef-t">+91 9945 155 889</span></a></li>
              <li><a href="mailto:customerservice@elannailspa.com"><span className="ef-chip"><Icon id="ef-ml" /></span><span className="ef-t">customerservice@elannailspa.com</span></a></li>
              <li>
                <a className="ef-addr" href="https://goo.gl/maps/E9Ro8z79EN2bvvsRA">
                  <span className="ef-chip"><Icon id="ef-pn" /></span>
                  <span className="ef-t">Miraya Rose, Unit 7, Varthur Rd, Palm Meadows, Siddapura, Whitefield, Bengaluru, Karnataka 560 066</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="ef-hrs ef-glass" onPointerMove={glow} data-r style={{ '--d': 4 }}>
            <h3>Opening Hours</h3>
            <div className={`ef-row${today === 'open' ? ' ef-now' : ''}`}>
              <span className="ef-dot" />
              <span><b>Tue – Sun:</b> 10:00 am - 07:30 pm</span>
            </div>
            <div className={`ef-row ef-closed${today === 'closed' ? ' ef-now' : ''}`}>
              <span className="ef-dot" />
              <span>Closed on Monday</span>
            </div>
          </div>
        </div>

        {/* 2. Join Our Club, now below the content */}
        <section className="ef-club ef-glass" onPointerMove={glow} data-r aria-labelledby="ef-jc">
          <div>
            <h2 id="ef-jc">Join Our Club</h2>
            <p>Exclusive offers &amp; luxury pampering updates.</p>
          </div>
          <form className="ef-form" onSubmit={onSubmit} noValidate>
            <label htmlFor="ef-email" className="ef-sr">Email address</label>
            <input
              id="ef-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="ef-join" type="submit">Join <Icon id="ef-ar" /></button>
          </form>
          <p className={`ef-msg${msg?.ok ? ' ef-ok' : ''}`} role="status">{msg?.text}</p>
        </section>

        <div className="ef-div" data-r aria-hidden="true">
          <svg className="ef-sw" viewBox="0 0 200 26"><path d="M2 16C45 4 110 24 198 8" stroke="url(#ef-g)" /></svg>
        </div>
      </div>




      <div className="ef-wrap">
        <div className="ef-legal">
          <span>© {new Date().getFullYear()} élan Nail Studio &amp; Spa. All rights reserved.</span>
          <button className="ef-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <i><Icon id="ef-up" /></i>
          </button>
        </div>
      </div>
    </footer>
  )
}
