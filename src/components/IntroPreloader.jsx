import { useEffect, useId, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import './IntroPreloader.css'

/* ------------------------------------------------------------------ *
 *  All timing lives here (seconds). Override per use with the         *
 *  `config` prop, e.g. <IntroPreloader config={{ fill: 2.6 }} />      *
 * ------------------------------------------------------------------ */
export const PRELOADER_CONFIG = {
  intro: 0.8, // logo fade-in
  fill: 3.0, // liquid rises from bottom to top
  hold: 0.55, // pause on the finished dark logo
  reveal: 1.0, // fade into the website
  wave: 2.6, // seconds for one wave period to travel (lower = faster)
  maxWait: 6, // never wait longer than this for `ready` after the fill ends
  fontWait: 1.2, // never wait longer than this for web fonts
}

const STORAGE_KEY = 'elan-intro-seen'
const VIEW_W = 800
const PERIOD = 400 // wave period in SVG units
const START_Y = 296 // liquid surface below the subtitle
const END_Y = 26 // liquid surface above the tallest letter (accent on É)

const hasSeen = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}
const markSeen = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* private mode: ignore */
  }
}

/* Builds a sine-like wave (Q/T curves) wider than the viewBox so it can
   slide by exactly one period without ever exposing an edge.            */
function buildWave(amp) {
  const half = PERIOD / 2
  const start = -PERIOD
  const end = VIEW_W + PERIOD
  let d = `M${start} 0 q${half / 2} ${-amp} ${half} 0`
  for (let x = start + half; x < end; x += half) d += ' t' + half + ' 0'
  const crest = d
  return { fill: `${d} V520 H${start} Z`, crest }
}

export default function IntroPreloader({
  ready = true, // set true when the page/hero is actually ready to be shown
  onReveal, // fires as the fade-out begins (start hero entrance animations here)
  onComplete, // fires once, after the preloader is fully gone
  oncePerSession = true,
  config,
}) {
  const cfg = useMemo(() => ({ ...PRELOADER_CONFIG, ...config }), [config])
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const clipId = `elan-clip-${uid}`
  const gradId = `elan-liquid-${uid}`

  const rootRef = useRef(null)
  const readyRef = useRef(ready)
  const revealRef = useRef(null)
  const animDoneRef = useRef(false)
  const completedRef = useRef(false)
  const cbRef = useRef({ onReveal, onComplete })
  cbRef.current = { onReveal, onComplete }

  const [gone, setGone] = useState(() => oncePerSession && hasSeen())

  const front = useMemo(() => buildWave(13), [])
  const back = useMemo(() => buildWave(9), [])

  // Already seen this session: skip, but still tell the app it may proceed.
  useEffect(() => {
    if (gone && !completedRef.current) {
      completedRef.current = true
      cbRef.current.onComplete?.()
    }
  }, [gone])

  // Website became ready after the animation had already finished.
  useEffect(() => {
    readyRef.current = ready
    if (ready && animDoneRef.current) revealRef.current?.()
  }, [ready])

  useEffect(() => {
    if (gone) return undefined

    const html = document.documentElement
    html.classList.add('elan-pre-lock')

    let cancelled = false
    let ctx

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const start = () => {
      if (cancelled || !rootRef.current) return
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(rootRef.current)
        const logo = q('.elan-pre__logo')
        const rise = q('.elan-pre__rise')
        const slosh = q('.elan-pre__slosh')
        const amp = q('.elan-pre__amp')
        const back = q('.elan-pre__slosh--back')

        let revealed = false

        const finish = () => {
          html.classList.remove('elan-pre-lock')
          markSeen()
          setGone(true)
          if (!completedRef.current) {
            completedRef.current = true
            cbRef.current.onComplete?.()
          }
        }

        const reveal = () => {
          if (revealed) return
          revealed = true
          cbRef.current.onReveal?.()
          gsap
            .timeline({ onComplete: finish })
            .to(logo, {
              opacity: 0,
              scale: reduce ? 1 : 1.035,
              duration: cfg.reveal * 0.7,
              ease: 'power2.in',
              transformOrigin: '50% 50%',
            })
            .to(
              rootRef.current,
              { opacity: 0, duration: cfg.reveal, ease: 'power2.inOut' },
              `-=${cfg.reveal * 0.45}`,
            )
        }
        revealRef.current = reveal

        const animationFinished = () => {
          animDoneRef.current = true
          if (readyRef.current) reveal()
          else gsap.delayedCall(cfg.maxWait, reveal) // never wait forever
        }

        gsap.set(logo, { opacity: 0 })

        if (reduce) {
          // Calm version: no wave, no travelling surface, just a soft crossfade.
          gsap.set(rise, { y: END_Y })
          gsap
            .timeline({ onComplete: animationFinished })
            .to(logo, { opacity: 1, duration: 0.6, ease: 'power1.out' })
            .to({}, { duration: 0.6 })
          return
        }

        // Endless wave travel: exactly one period, so the loop is seamless.
        gsap.to(slosh, { x: -PERIOD, duration: cfg.wave, ease: 'none', repeat: -1 })
        gsap.fromTo(
          back,
          { x: -PERIOD * 0.5 },
          { x: -PERIOD * 0.5 + PERIOD, duration: cfg.wave * 1.35, ease: 'none', repeat: -1 },
        )
        // Tiny vertical bob on the back layer for organic movement.
        gsap.to(back, { y: 3, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

        gsap.set(rise, { y: START_Y })

        const tl = gsap.timeline({ onComplete: animationFinished })
        tl.to(logo, { opacity: 1, duration: cfg.intro, ease: 'power2.out' })
        tl.addLabel('fill', '+=0.1')
        // One continuous rise: the surface never jumps between levels.
        tl.to(rise, { y: END_Y, duration: cfg.fill, ease: 'power1.inOut' }, 'fill')
        // The surface calms as the vessel nears full.
        tl.to(
          amp,
          { scaleY: 0.3, svgOrigin: '0 0', duration: cfg.fill * 0.38, ease: 'power1.in' },
          `fill+=${cfg.fill * 0.62}`,
        )
        tl.to({}, { duration: cfg.hold })
      }, rootRef)
    }

    // Wait for web fonts (capped) so the letterforms do not swap mid-animation.
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    Promise.race([
      fontsReady,
      new Promise((resolve) => setTimeout(resolve, cfg.fontWait * 1000)),
    ]).then(start, start)

    return () => {
      cancelled = true
      revealRef.current = null
      animDoneRef.current = false
      html.classList.remove('elan-pre-lock')
      if (ctx) ctx.revert() // kills every tween, timeline and delayedCall
    }
  }, [gone, cfg])

  if (gone) return null

  /* The same two <text> elements are drawn twice: once as the pale vessel,
     once as the clipPath that confines the liquid to the letter shapes.   */
  const Words = () => (
    <>
      <text className="elan-pre__title" x="407" y="190" textAnchor="middle">
        ÉLAN
      </text>
      <text className="elan-pre__sub" x="405" y="268" textAnchor="middle">
        NAIL STUDIO &amp; SPA
      </text>
    </>
  )

  return (
    <div
      ref={rootRef}
      className="elan-pre"
      role="status"
      aria-live="polite"
      aria-label="Loading Élan Nail Studio and Spa"
    >
      <svg
        className="elan-pre__logo"
        viewBox={`0 0 ${VIEW_W} 320`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <Words />
          </clipPath>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a352b" />
            <stop offset="0.45" stopColor="#382720" />
            <stop offset="1" stopColor="#241a15" />
          </linearGradient>
        </defs>

        {/* Empty vessel: light champagne letters */}
        <g className="elan-pre__vessel">
          <Words />
        </g>

        {/* Liquid, visible only inside the letter shapes */}
        <g clipPath={`url(#${clipId})`}>
          <g className="elan-pre__rise">
            <g className="elan-pre__slosh elan-pre__slosh--back" opacity="0.55">
              <g className="elan-pre__amp">
                <path d={back.fill} fill="#5a4034" />
              </g>
            </g>
            <g className="elan-pre__slosh">
              <g className="elan-pre__amp">
                <path d={front.fill} fill={`url(#${gradId})`} />
                <path
                  d={front.crest}
                  fill="none"
                  stroke="#B58A55"
                  strokeOpacity="0.55"
                  strokeWidth="1.6"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
