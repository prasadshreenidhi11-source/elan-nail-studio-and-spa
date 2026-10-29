import { useEffect, useRef, useState } from "react";
import "./WhyChooseUs.css";

/* ------------------------------------------------------------------
   CENTER IMAGE
   Save your picture as:   public/images/elan-center.jpg
   In code you reference it WITHOUT "public":   /images/elan-center.jpg
   (Vite / CRA serve everything inside /public from the site root.)
------------------------------------------------------------------- */
const CENTER_IMAGE = "/images/elan-center.jpg";
const CENTER_IMAGE_ALT = "A guest enjoying a relaxing treatment at Elan Hair Studio & Spa";

/* Placeholder – replace with your real number of happy customers */
const CUSTOMER_COUNT = 10000;
const YEARS = 12;

const benefits = [
  {
    number: "01",
    title: "12+ Years of Experience",
    description:
      "Over a decade of creating beautiful transformations with care, precision, and attention to detail.",
    icon: "years",
  },
  {
    number: "02",
    title: "Professional Staff",
    description:
      "Skilled professionals dedicated to exceptional service and a personalised experience.",
    icon: "caduceus",
  },
  {
    number: "03",
    title: "Luxury Within Reach",
    description:
      "Premium beauty and spa experiences designed to make your self-care moments special.",
    icon: "diamond",
  },
  {
    number: "04",
    title: "Satisfied Customers",
    description:
      "Thousands of guests trust Elan for care that feels personal, visit after visit.",
    icon: "heart",
    counter: true,
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* Counts from 0 to `target` once `active` becomes true */
function useCountUp(target, active, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }
    let raf;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, target, duration, delay]);

  return value;
}

function CardIcon({ type, years }) {
  if (type === "years") {
    return <span className="why-elan-card-stat">{years}</span>;
  }
  const paths = {
    caduceus: "M12 2v20M8 6c4-2 4 4 0 6s-4 4 0 6M16 6c-4-2-4 4 0 6s4 4 0 6",
    diamond: "M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 3v18",
    heart:
      "M12 21s-7.5-4.6-9.6-9.4C.9 8.2 3 5 6.2 5c2.2 0 3.9 1.2 5.8 3.4C13.9 6.2 15.6 5 17.8 5 21 5 23.1 8.2 21.6 11.6 19.5 16.4 12 21 12 21z",
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path pathLength="1" d={paths[type]} />
    </svg>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const exploreRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [pointerInside, setPointerInside] = useState(false);

  const years = useCountUp(YEARS, inView, 1400, 1300);
  const customers = useCountUp(CUSTOMER_COUNT, inView, 2400, 1400);

  /* Start every animation (and both counters) when the section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Highlight moves from card to card on its own; hovering/focusing takes over */
  useEffect(() => {
    if (!inView || pointerInside || prefersReducedMotion()) return undefined;
    const id = window.setInterval(
      () => setActiveCard((c) => (c + 1) % benefits.length),
      3500
    );
    return () => window.clearInterval(id);
  }, [inView, pointerInside]);

  /* Gentle 3D tilt on the center image */
  const handleTilt = (e) => {
    if (!canHover() || prefersReducedMotion() || !photoRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    photoRef.current.style.transform = `perspective(900px) rotateY(${
      x * 8
    }deg) rotateX(${-y * 8}deg)`;
  };
  const resetTilt = () => {
    if (photoRef.current) photoRef.current.style.transform = "";
  };

  /* Magnetic Explore button */
  const handleMagnet = (e) => {
    if (!canHover() || prefersReducedMotion() || !exploreRef.current) return;
    const r = exploreRef.current.getBoundingClientRect();
    exploreRef.current.style.transform = `translate(${
      (e.clientX - r.left - r.width / 2) * 0.25
    }px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  };
  const resetMagnet = () => {
    if (exploreRef.current) exploreRef.current.style.transform = "";
  };

  /* Soft spotlight that follows the pointer inside each card */
  const handleCardMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const handleExplore = () => {
window.location.href = "/about";
};


  const renderCard = (benefit, index, side) => (
    <article
      key={benefit.number}
      className={`why-elan-card from-${side}${
        activeCard === index ? " is-active" : ""
      }`}
      style={{ "--d": `${1 + index * 0.15}s` }}
      tabIndex={0}
      onMouseEnter={() => setActiveCard(index)}
      onFocus={() => setActiveCard(index)}
      onClick={() => setActiveCard(index)}
      onPointerMove={handleCardMove}
    >
      <div className="why-elan-card-header">
        <span className="why-elan-card-num">{benefit.number}</span>
        <span className="why-elan-card-icon">
          <CardIcon type={benefit.icon} years={years} />
        </span>
      </div>

      <div className="why-elan-card-body">
        {benefit.counter && (
          <div className="why-elan-card-counter">
            {customers.toLocaleString("en-IN")}+
          </div>
        )}
        <h4>{benefit.title}</h4>
        <p>{benefit.description}</p>
      </div>

      <div className="why-elan-card-footer">
        <span className="why-elan-card-more">LEARN MORE</span>
        <span className="why-elan-card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </article>
  );

  return (
    <section
      ref={sectionRef}
      className={`why-elan${inView ? " is-in" : ""}`}
      id="why-choose-us"
    >
      {/* Top Banner Row */}
      <div className="why-elan-top-row">
        <div className="why-elan-eyebrow">
          <span className="why-elan-sparkle" aria-hidden="true">✶</span>
          <span>THE ELAN EXPERIENCE</span>
        </div>
        <p className="why-elan-subtitle">
          A little time for yourself.
          <br />
          A world of difference.
        </p>
      </div>

      {/* Heading row */}
      <div className="why-elan-heading-row">
        <h2 className="why-elan-title">
          <span className="why-elan-line">
            <span>Feel the</span>
          </span>
          <span className="why-elan-line why-elan-serif-italic">
            <span>Elan difference.</span>
          </span>
        </h2>

        <div className="why-elan-section-intro">
          <div className="why-elan-lotus-icon">
            <svg
              width="42"
              height="38"
              viewBox="0 0 36 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d="M18 32C18 32 12 24 12 16C12 8 18 2 18 2C18 2 24 8 24 16C24 24 18 32 18 32Z"
              />
              <path
                pathLength="1"
                d="M18 32C18 32 6 28 2 19C-2 10 4 6 4 6C4 6 11 10 14 18C16 23.5 18 32 18 32Z"
              />
              <path
                pathLength="1"
                d="M18 32C18 32 30 28 34 19C38 10 32 6 32 6C32 6 25 10 22 18C20 23.5 18 32 18 32Z"
              />
            </svg>
          </div>
          <div className="why-elan-details-label">WHY CHOOSE ELAN</div>
          <h3 className="why-elan-details-title">
            <span className="why-elan-line">
              <span>More than a beauty appointment.</span>
            </span>
            <span className="why-elan-line">
              <span>It’s time to reconnect with yourself.</span>
            </span>
          </h3>
        </div>
      </div>

      {/* Orbit layout: 2 cards left · image circle · 2 cards right */}
      <div className="why-elan-orbit-grid">
        <div
          className="why-elan-col is-left"
          onMouseEnter={() => setPointerInside(true)}
          onMouseLeave={() => setPointerInside(false)}
          onFocus={() => setPointerInside(true)}
          onBlur={() => setPointerInside(false)}
        >
          {benefits.slice(0, 2).map((b, i) => renderCard(b, i, "left"))}
        </div>

        <div className="why-elan-center">
          <div
            className="why-elan-orbit"
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
          >
            <span className="why-elan-ring ring-a" aria-hidden="true" />
            <span className="why-elan-ring ring-b" aria-hidden="true" />

            <svg
              className="why-elan-orbit-text"
              viewBox="0 0 400 400"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="why-elan-circle"
                  d="M200,200 m-178,0 a178,178 0 1,1 356,0 a178,178 0 1,1 -356,0"
                />
              </defs>
              <text>
                <textPath
                  href="#why-elan-circle"
                  textLength="1110"
                  lengthAdjust="spacing"
                >
                  ELAN HAIR STUDIO &amp; SPA ✶ BEAUTY IN EVERY DETAIL ✶ YOUR
                  MOMENT, YOUR RITUAL. ✶
                </textPath>
              </text>
            </svg>

            <div className="why-elan-orbit-photo" ref={photoRef}>
              <div className="why-elan-orbit-img">
                <img src={CENTER_IMAGE} alt={CENTER_IMAGE_ALT} />
              </div>
            </div>
          </div>

          <button
            ref={exploreRef}
            className="why-elan-explore-pill"
            onClick={handleExplore}
            onPointerMove={handleMagnet}
            onPointerLeave={resetMagnet}
          >
            EXPLORE
          </button>
        </div>

        <div
          className="why-elan-col is-right"
          onMouseEnter={() => setPointerInside(true)}
          onMouseLeave={() => setPointerInside(false)}
          onFocus={() => setPointerInside(true)}
          onBlur={() => setPointerInside(false)}
        >
          {benefits.slice(2, 4).map((b, i) => renderCard(b, i + 2, "right"))}
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <footer className="why-elan-footer">
        <span className="why-elan-scroll-text">SCROLL TO EXPLORE</span>
        <div className="why-elan-scroll-pill">
          <span className="why-elan-scroll-dot" />
        </div>
      </footer>
    </section>
  );
}

export default WhyChooseUs;