import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./SelfCare.css";

const services = [
  {
    id: "hair-spa",
    title: "Hair Spa",
    subtitle: "Rejuvenate your hair. Refresh your soul.",
    image:
      "https://images.unsplash.com/photo-1560869713-bf165a9cfac1?w=600&auto=format&fit=crop&q=60",
    video: "/videos/hair-wash.mp4",
  },
  {
    id: "nail-art",
    title: "Nail Art",
    subtitle: "Little details. Beautiful expressions.",
    image:
      "https://images.unsplash.com/photo-1772322586702-73125782bd99?w=600&auto=format&fit=crop&q=60",
    video: "/videos/nail-art.mp4",
  },
  {
    id: "haircut",
    title: "Haircuts",
    subtitle: "Your style, beautifully redefined.",
    image:
      "https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?w=600&auto=format&fit=crop&q=60",
    video: "/videos/haircut.mp4",
  },
  {
    id: "lashes",
    title: "Eyelash Tinting",
    subtitle: "A little detail makes a big difference.",
    image:
      "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=600&auto=format&fit=crop&q=60",
    video: "/videos/eyelash-tinting.mp4",
  },
  {
    id: "waxing",
    title: "Waxing",
    subtitle: "Smooth care. A fresh feeling.",
    image:
      "https://plus.unsplash.com/premium_photo-1661431392914-e3fc8ff0e51a?w=600&auto=format&fit=crop&q=60",
    video: "/videos/waxing.mp4",
  },
];

const N = services.length;
const DWELL = 5200; // ms each service stays in front before the flow moves on
const mod = (n) => ((n % N) + N) % N;

export default function SelfCare() {
  const layoutRef = useRef(null);
  const areaRef = useRef(null);
  const stageRef = useRef(null);
  const wmRef = useRef(null);
  const previewRef = useRef(null);
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const cardRefs = useRef([]);
  const chipBarRefs = useRef([]);
  const api = useRef({});
  const st = useRef({
    pos: 0, target: 0, spread: 0, t: 0, engaged: false,
    lineFor: -1, center: 0, w: 190, W: 500, gap: 0.5,
    touchTimer: null, vidCall: null,
  }).current;

  const [center, setCenter] = useState(0);
  const [live, setLive] = useState(false);
  const [shown, setShown] = useState(null);

  useEffect(() => {
    const layout = layoutRef.current, area = areaRef.current, stage = stageRef.current;
    const wm = wmRef.current, preview = previewRef.current, box = boxRef.current;
    const video = videoRef.current, svg = svgRef.current, path = pathRef.current, dot = dotRef.current;
    if (!layout || !area || !stage || !preview || !box || !video || !svg || !path || !dot) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    st.spread = rm ? 1 : 0;
    st.engaged = false;
    st.lineFor = -1;
    st.t = 0;

    /* ---------- sizing: neighbours always stay inside the column ---------- */
    const measure = () => {
      const c = cardRefs.current[0];
      st.w = c ? c.offsetWidth : 190;
      st.W = stage.clientWidth;
      st.gap = Math.max(0.25, Math.min(0.8, (st.W / 2 - st.w / 2 - 8) / (2.1 * st.w)));
    };

    /* ---------- leader line geometry ----------
       Layout: cover flow sits top-right, video preview sits below.
       The line drops from the bottom of the centre card to the top of the video. */
    const geometry = () => {
      const card = cardRefs.current[st.center];
      if (!card) return null;
      const L = layout.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const p = preview.getBoundingClientRect();
      if (!L.width || !c.width) return null;
      svg.setAttribute("viewBox", `0 0 ${L.width} ${L.height}`);

      const sx = c.left - L.left + c.width / 2;
      const sy = c.bottom - L.top + 2;
      const ex = p.left - L.left + p.width / 2;
      const ey = p.top - L.top - 10;
      if (ey - sy < 12) return null;
      const my = (sy + ey) / 2;
      return { d: `M ${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`, ex, ey };
    };

    const hideLine = (fast) => {
      gsap.killTweensOf([path, dot]);
      if (st.vidCall) st.vidCall.kill();
      gsap.to(path, {
        strokeDashoffset: path.getTotalLength() || 1,
        duration: rm ? 0 : fast ? 0.2 : 0.45,
        ease: "power2.in",
      });
      gsap.to(dot, { opacity: 0, scale: 0, duration: rm ? 0 : 0.2 });
    };

    const playVideo = (i) => {
      const s = services[i];
      if (video.getAttribute("src") !== s.video) {
        video.pause();
        video.src = s.video;
        video.load();
      }
      // play() itself starts the download, so never wait for "canplay" here
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };

    const stopVideo = () => {
      video.pause();
      if (video.getAttribute("src")) {
        video.removeAttribute("src");
        video.load(); // poster returns
      }
    };

    const showLine = () => {
      const g = geometry();
      if (!g) return;
      path.setAttribute("d", g.d);
      dot.setAttribute("cx", g.ex);
      dot.setAttribute("cy", g.ey);
      const len = path.getTotalLength();
      gsap.killTweensOf([path, dot]);
      gsap.set(path, { opacity: 1, strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, { strokeDashoffset: 0, duration: rm ? 0 : 0.7, ease: "power2.inOut" });
      gsap.fromTo(dot, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: rm ? 0 : 0.25, delay: rm ? 0 : 0.55, ease: "back.out(2)" });
      const idx = st.center;
      st.t = 0;
      setLive(true);
      setShown(idx);
      st.vidCall = gsap.delayedCall(rm ? 0 : 0.5, () => {
        if (st.lineFor === idx) playVideo(idx);
      });
    };

    /* ---------- engage / release (cursor stops the flow) ---------- */
    // Hovering (or focusing) only HOLDS the flow on the current image.
    const engage = () => {
      if (st.engaged) return;
      st.engaged = true;
      st.t = 0;
    };
    const release = () => {
      if (!st.engaged) return;
      st.engaged = false;
      st.t = 0;
    };
    api.current = { engage, release };

    let leaveTimer;
    const enter = (e) => {
      if (e.pointerType === "touch") return;
      clearTimeout(leaveTimer);
      engage();
    };
    const leave = (e) => {
      if (e.pointerType === "touch") return;
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(release, 220);
    };
    const outside = (e) => {
      if (!area.contains(e.target) && !preview.contains(e.target)) release();
    };
    const parallax = (e) => {
      if (!wm) return;
      const r = area.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      wm.style.transform = `translate(calc(-50% + ${-px * 40}px), -50%)`;
    };
    [area, preview].forEach((el) => {
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
    });
    area.addEventListener("pointermove", parallax);
    document.addEventListener("pointerdown", outside);

    /* ---------- cover flow loop ---------- */
    const tick = (time, dt) => {
      st.pos += (st.target - st.pos) * (rm ? 1 : 0.09);

      if (!st.engaged && !rm && st.lineFor === st.center) {
        st.t += dt;
        if (st.t > DWELL) {
          st.t = 0;
          st.target += 1;
        }
      }

      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = mod(i - st.pos + N / 2) - N / 2;
        const a = Math.abs(d);
        const op = Math.max(0, Math.min(1, 2.5 - a)) * (1 - Math.min(a, 2) * 0.1) * Math.min(1, st.spread * 1.4);
        el.style.visibility = op < 0.01 ? "hidden" : "visible";
        el.style.opacity = op;
        el.style.zIndex = 100 - Math.round(a * 10);
        el.style.transform = `translate3d(${d * st.w * st.gap * st.spread}px,${a * a * 5}px,${-a * 140 * st.spread}px) rotateY(${-d * 34 * st.spread}deg) scale(${1 - Math.min(a, 2) * 0.04})`;
      }

      // progress bar under the active chip = time left before the flow moves on
      for (let i = 0; i < N; i++) {
        const bar = chipBarRefs.current[i];
        if (!bar) continue;
        const f = i === st.center && st.lineFor === st.center ? Math.min(1, st.t / DWELL) : 0;
        bar.style.transform = `scaleX(${f})`;
      }

      const c = mod(Math.round(st.target));
      if (c !== st.center) {
        st.center = c;
        setCenter(c);
      }

      // Whenever an image settles in front: draw the line, then play its video.
      const settled = Math.abs(st.target - st.pos) < 0.015;
      if (!settled && st.lineFor !== -1) {
        hideLine(true);
        st.lineFor = -1;
        stopVideo();
        setLive(false);
      } else if (settled && st.spread > 0.98 && st.lineFor !== st.center) {
        st.lineFor = st.center;
        showLine();
      }
    };

    const onResize = () => {
      measure();
      if (st.lineFor !== -1) {
        const g = geometry();
        if (g) {
          path.setAttribute("d", g.d);
          dot.setAttribute("cx", g.ex);
          dot.setAttribute("cy", g.ey);
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 });
        }
      }
    };

    measure();
    gsap.set(path, { opacity: 0, strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(dot, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.ticker.add(tick);
    window.addEventListener("resize", onResize);

    const fan = rm ? null : gsap.to(st, { spread: 1, duration: 1.6, delay: 0.2, ease: "power3.out" });
    const intro = rm ? null : gsap.fromTo(preview, { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3, ease: "power3.out" });

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(st.touchTimer);
      if (fan) fan.kill();
      if (intro) intro.kill();
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerdown", outside);
      area.removeEventListener("pointermove", parallax);
      [area, preview].forEach((el) => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      });
      gsap.killTweensOf([path, dot, preview]);
      if (st.vidCall) st.vidCall.kill();
      st.engaged = false;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Click, tap or keyboard focus brings a card to the centre and engages it */
  const select = (i) => {
    const d = mod(i - st.pos + N / 2) - N / 2;
    st.target = Math.round(st.pos + d);
    if (api.current.engage) api.current.engage();
    clearTimeout(st.touchTimer);
    if (window.matchMedia("(hover: none)").matches) {
      st.touchTimer = setTimeout(() => api.current.release && api.current.release(), 9000);
    }
  };

  const active = shown !== null ? services[shown] : null;

  return (
    <section className="selfcare-section" id="self-care">
      <div className="selfcare-background-glow" />

      <div className="selfcare-layout" ref={layoutRef}>
        <svg ref={svgRef} className="selfcare-connector-svg" aria-hidden="true" preserveAspectRatio="none">
          <path ref={pathRef} className="selfcare-connector-path" d="" />
          <circle ref={dotRef} className="selfcare-connector-dot" cx="0" cy="0" r="3" />
        </svg>

        {/* TOP-LEFT: introduction */}
        <div className="selfcare-intro">
          <div className="selfcare-eyebrow">
            <span className="selfcare-eyebrow-line" />
            YOUR MOMENT. YOUR RITUAL.
          </div>

          <h2 className="selfcare-intro-heading">
            We will help you
            <br />
            rediscover the magic of
            <br />
            <span>Self-Care.</span>
          </h2>

          <p className="selfcare-intro-description">
            Treat yourself to rejuvenating hair treatments, soothing
            massages, expert waxing, and exquisite nail care.
          </p>

          <div className="selfcare-chips" role="group" aria-label="Choose a service">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={`selfcare-chip ${center === index ? "is-active" : ""}`}
                onClick={() => select(index)}
                aria-pressed={center === index}
              >
                <span>{service.title.toUpperCase()}</span>
                <i className="selfcare-chip-bar" ref={(el) => (chipBarRefs.current[index] = el)} />
              </button>
            ))}
          </div>

         <a href="/services" className="selfcare-explore-button">
  <span>EXPLORE OUR SERVICES</span>
  <span className="selfcare-button-arrow">↗</span>
</a>
        </div>

        {/* TOP-RIGHT: cover flow cards */}
        <div
          className="selfcare-orbit-area"
          ref={areaRef}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget) && api.current.release) api.current.release();
          }}
        >
          <div className="selfcare-orbit" ref={stageRef} role="group" aria-label="Self-care services cover flow">
            <span className="selfcare-watermark" ref={wmRef} aria-hidden="true">ÉLAN</span>

            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                ref={(el) => (cardRefs.current[index] = el)}
                className={`selfcare-flow-card ${center === index ? "is-center" : ""} ${live && center === index ? "is-selected" : ""}`}
                onClick={() => select(index)}
                onFocus={() => select(index)}
                aria-label={`Preview ${service.title}`}
                aria-pressed={live && center === index}
              >
                <img src={service.image} alt="" loading={index < 3 ? "eager" : "lazy"} draggable={false} />
                <span className="selfcare-flow-caption">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <span>{service.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM: video preview */}
        <div className="selfcare-preview" ref={previewRef}>
          <div className="selfcare-preview-video" ref={boxRef}>
            <video
              ref={videoRef}
              poster={services[center].image}
              muted
              playsInline
              loop
              preload="metadata"
              aria-label={active ? `${active.title} video preview` : "Self-care video preview"}
            />

            <div className="selfcare-video-topline">
              <span>{active ? active.title : "ELAN SELF-CARE"}</span>
            </div>

            <span className="selfcare-video-corner">ELAN BEAUTY EXPERIENCE</span>
          </div>

          <div className="selfcare-preview-details">
            <div>
              <h4>{active ? active.title : "Discover your next ritual"}</h4>
              <p>{active ? active.subtitle : "Beauty rituals · Endless possibilities"}</p>
            </div>

            <a href="/services">
  EXPLORE SERVICE <span>→</span>
</a>
          </div>
        </div>
      </div>

      <div className="selfcare-bottom-bar">
        <div className="selfcare-pagination">
          {services.map((service, index) => (
            <span key={service.id} className={center === index ? "pagination-active" : ""} />
          ))}
        </div>

        <p>BEAUTY RITUALS &nbsp; · &nbsp; ENDLESS POSSIBILITIES</p>

        <a href="/services" className="selfcare-scroll-link">
  <span className="selfcare-scroll-circle">↓</span>
  <span>SCROLL TO EXPLORE</span>
</a>
      </div>
    </section>
  );
}
