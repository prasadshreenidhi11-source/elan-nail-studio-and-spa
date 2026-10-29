import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    "number": "01",
    "title": "Manicure",
    "category": "THE ART OF DETAIL",
    "description": "Whether you prefer a classic French manicure or a bold and trendy design, our manicurists can create any look you desire with their expert techniques.",
    "image": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/manicure.mp4",
    "anchor": "manicure"
  },
  {
    "number": "02",
    "title": "Pedicure",
    "category": "A MOMENT FOR YOURSELF",
    "description": "Treat your feet to a relaxing experience. Our special products and thoughtful techniques make every pedicure feel like a little escape.",
    "image": "https://images.unsplash.com/photo-1664643411326-6c589531be3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "videoSrc": "/pedicure.mp4",
    "anchor": "pedicure"
  },
  {
    "number": "03",
    "title": "Nail Art",
    "category": "YOUR STYLE, YOUR STORY",
    "description": "Explore colours, shapes, and textures that let your personality shine through expressive, beautifully finished nail art.",
    "image": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/nail-art.mp4",
    "anchor": "nail-art"
  },
  {
    "number": "04",
    "title": "Waxing",
    "category": "SMOOTH & CONFIDENT",
    "description": "From eyebrows to legs, our waxing services help you enjoy a smooth, polished finish with attentive care.",
    "image": "https://plus.unsplash.com/premium_photo-1661431392914-e3fc8ff0e51a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "videoSrc": "/waxing.mp4",
    "anchor": "waxing"
  },
  {
    "number": "05",
    "title": "Hair Spa",
    "category": "A RITUAL FOR YOUR HAIR",
    "description": "Indulge in a luxurious hair spa treatment with expert care and quality products for beautifully conditioned, radiant-looking hair.",
    "image": "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/hair-spa.mp4",
    "anchor": "hair-spa"
  },
  {
    "number": "06",
    "title": "Hair Cuts",
    "category": "A FRESH PERSPECTIVE",
    "description": "Our stylists bring together modern trends and thoughtful technique to help you find a cut that feels uniquely yours.",
    "image": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/hair-cuts.mp4",
    "anchor": "hair-cuts"
  },
  {
    "number": "07",
    "title": "Eyelash Tinting",
    "category": "LET YOUR EYES SPEAK",
    "description": "Enhance the appearance of your lashes with a carefully applied tint performed by our beauty technicians.",
    "image": "https://images.unsplash.com/photo-1639629509821-c54cdd984227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "videoSrc": "/eyelash-tinting.mp4",
    "anchor": "eye-lash"
  },
  {
    "number": "08",
    "title": "Relaxation Services",
    "category": "SLOW DOWN & RESET",
    "description": "Escape the everyday in a peaceful setting created for unwinding, restoring your sense of calm, and taking time for yourself.",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/relaxation.mp4",
    "anchor": "relaxation"
  },
  {
    "number": "09",
    "title": "Nail Extensions",
    "category": "LENGTH WITH PERSONALITY",
    "description": "Discover personalised nail extensions shaped around your preferred length, finish, and individual style.",
    "image": "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/nail-extensions.mp4",
    "anchor": "nail-extension"
  },
  {
    "number": "10",
    "title": "Paraffin Treatment",
    "category": "A TOUCH OF LUXURY",
    "description": "Enjoy a comforting paraffin treatment designed to leave hands or feet feeling pampered and cared for.",
    "image": "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/paraffin-treatment.mp4",
    "anchor": "paraffin-treatment"
  },
  {
    "number": "11",
    "title": "Facial Threading",
    "category": "PRECISION & CARE",
    "description": "Experience a traditional hair-removal technique delivered with precision and attention to detail.",
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/facial-threading.mp4",
    "anchor": "facial-threading"
  },
  {
    "number": "12",
    "title": "Hair Wash",
    "category": "A REFRESHING FINISH",
    "description": "Refresh your routine with a relaxing hair wash and attentive salon care, leaving you ready for your next style.",
    "image": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85",
    "videoSrc": "/hair-wash.mp4",
    "anchor": "hair-wash"
  }
];

const N = services.length || 1;
const mod = (n) => ((n % N) + N) % N;
const pad = (n) => String(n).padStart(2, "0");

export default function Services() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const cardRefs = useRef([]);
  const glowRef = useRef(null);
  const curRef = useRef(null);
  const markRef = useRef(null);
  const s = useRef({ pos: 0, target: 0, spread: 0, drop: 0, open: -1, center: -1, w: 300, vis: 3.6, gap: 0.8 });
  const [center, setCenter] = useState(0);
  const [detail, setDetail] = useState(null);
  const [open, setOpen] = useState(false);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closePanel = () => {
    s.current.open = -1;
    setOpen(false);
  };

  const openService = (i) => {
    const st = s.current;
    if (st.open === i) return closePanel();
    const d = mod(i - st.pos + N / 2) - N / 2;
    st.target = Math.round(st.pos + d);
    st.open = i;
    setDetail(i);
    setOpen(true);
  };

  const go = (k) => {
    s.current.target = Math.round(s.current.target) + k;
  };

  /* Carousel engine: drag, wheel, momentum, curved 3D layout */
  useEffect(() => {
    const st = s.current;
    const stage = stageRef.current;
    const rm = reduced();
    st.spread = rm ? 1 : 0;

    const measure = () => {
      const c = cardRefs.current[0];
      const W = window.innerWidth;
      st.w = c ? c.offsetWidth : 300;
      st.vis = W < 760 ? 2.6 : 3.6;
      st.gap = W < 760 ? 0.72 : 0.8;
    };
    measure();
    window.addEventListener("resize", measure);

    let mx = 0, my = 0, gx = 0, gy = 0, cx = 0, cy = 0, sw = 1;
    const mv = (e) => {
      const r = stage.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; sw = r.width;
      if (curRef.current) curRef.current.style.opacity = 1;
    };
    const lv = () => { if (curRef.current) curRef.current.style.opacity = 0; };
    stage.addEventListener("pointermove", mv);
    stage.addEventListener("pointerleave", lv);

    const tick = () => {
      st.pos += (st.target - st.pos) * (rm ? 1 : 0.09);
      st.drop += ((st.open >= 0 ? 1 : 0) - st.drop) * (rm ? 1 : 0.1);
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = mod(i - st.pos + N / 2) - N / 2;
        const a = Math.abs(d);
        if (a > st.vis) {
          el.style.visibility = "hidden";
          continue;
        }
        const sel = i === st.open;
        const dy = a * a * 6 + (sel ? st.drop * 34 : 0);
        const sc = 1 - Math.min(a, 3) * 0.05 + (sel ? st.drop * 0.03 : 0);
        let op = Math.max(0, 1 - a * 0.2) * Math.min(1, st.spread * 1.4);
        if (st.open >= 0 && !sel) op *= 1 - st.drop * 0.45;
        el.style.visibility = "visible";
        el.style.transform = `translate3d(${d * st.w * st.gap * st.spread}px,${dy}px,${-a * 130 * st.spread}px) rotateY(${-d * 24 * st.spread}deg) rotateZ(${d * 2}deg) scale(${sc})`;
        el.style.opacity = op;
        el.style.zIndex = 100 - Math.round(a * 10) + (sel ? 50 : 0);
      }
      gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08; cx += (mx - cx) * 0.25; cy += (my - cy) * 0.25;
      if (glowRef.current) glowRef.current.style.transform = `translate(${gx}px,${gy}px)`;
      if (curRef.current) curRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      if (markRef.current) markRef.current.style.transform = `translate(calc(-50% + ${-(mx / sw - 0.5) * 60}px),-50%)`;
      const c = mod(Math.round(st.target));
      if (c !== st.center) {
        st.center = c;
        setCenter(c);
        if (st.open >= 0 && st.open !== c) {
          st.open = c;
          setDetail(c);
        }
      }
    };
    gsap.ticker.add(tick);

    let down = false, sx = 0, lx = 0, t0 = 0, moved = 0, vel = 0, startEl = null;
    const pd = (e) => {
      if (e.button > 0) return;
      down = true; sx = lx = e.clientX; t0 = st.target; moved = 0; vel = 0; startEl = e.target;
    };
    const pm = (e) => {
      if (!down) return;
      const u = st.w * st.gap;
      moved = Math.max(moved, Math.abs(e.clientX - sx));
      vel = (e.clientX - lx) / u;
      lx = e.clientX;
      st.target = t0 - (e.clientX - sx) / u;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      if (moved < 6) {
        const c = startEl && startEl.closest && startEl.closest("[data-card]");
        if (c) openService(+c.dataset.i);
      } else st.target = Math.round(st.target - vel * 6);
    };
    const pc = () => {
      down = false;
      st.target = Math.round(st.target);
    };

    let acc = 0;
    const wheel = (e) => {
      const v = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const currentTarget = s.current.target;
      const maxTarget = N - 1; // Service 12 index (11)

      // 1. If at the last service (12) and user scrolls DOWN/FORWARD -> Let page scroll down naturally
      if (currentTarget >= maxTarget && v > 0) {
        return; 
      }

      // 2. If at the first service (01) and user scrolls UP/BACKWARD -> Let page scroll up naturally
      if (currentTarget <= 0 && v < 0) {
        return; 
      }

      // 3. Otherwise, capture scroll to move sideways through cards
      e.preventDefault();
      acc += v;
      if (Math.abs(acc) > 60) {
        go(acc > 0 ? 1 : -1);
        acc = 0;
      }
    };

    const key = (e) => {
      if (e.key === "Escape") closePanel();
    };

    stage.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    window.addEventListener("pointercancel", pc);
    stage.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);

    const ctx = gsap.context(() => {
      if (!rm) {
        gsap.to(st, {
          spread: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: stage, start: "top 80%", once: true },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      stage.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      window.removeEventListener("pointercancel", pc);
      stage.removeEventListener("wheel", wheel);
      stage.removeEventListener("pointermove", mv);
      stage.removeEventListener("pointerleave", lv);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Detail panel: slides down, video plays, copy staggers in */
  useEffect(() => {
    const p = panelRef.current;
    if (!p) return;
    const rm = reduced();
    let timer;
    gsap.killTweensOf(p);
    if (open) {
      gsap.set(p, { visibility: "visible" });
      gsap.to(p, { height: "auto", opacity: 1, duration: rm ? 0 : 0.9, ease: "power3.out" });
      if (!rm) {
        gsap.fromTo(p.querySelector(".elan-lusion-detail-media"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut" });
        gsap.fromTo(p.querySelectorAll("[data-anim]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, delay: 0.2, ease: "power3.out" });
      }
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        const pr = v.play();
        if (pr && pr.catch) pr.catch(() => {});
      }
      timer = setTimeout(() => p.scrollIntoView({ behavior: "smooth", block: "nearest" }), 350);
    } else {
      gsap.to(p, {
        height: 0, opacity: 0, duration: rm ? 0 : 0.6, ease: "power3.inOut",
        onComplete: () => {
          gsap.set(p, { visibility: "hidden" });
          const v = p.querySelector("video");
          if (v) v.pause();
          setDetail(null);
        },
      });
    }
    return () => clearTimeout(timer);
  }, [open, detail]);

  const sv = detail !== null ? services[detail] : null;

  return (
    <section ref={sectionRef} id="services" className="elan-services-section elan-lusion-services">
      <div className="elan-lusion-trigger">
        <div className="elan-services-container">
          <header className="elan-services-heading">
            <div className="elan-services-heading-main">
              <div className="eyebrow dark-eyebrow">
                <span className="eyebrow-line" />
                THE ÉLAN TREATMENT COLLECTION
              </div>
              <h2>
                Discover your
                <br />
                <span className="serif-italic">kind of beautiful.</span>
              </h2>
            </div>
            <div className="elan-services-intro">
              <p>
                Twelve ways to pause, recharge, and feel a little more like
                yourself. Find the treatment that feels right for you.
              </p>
              <span className="elan-services-count">
                <span>12</span> SIGNATURE SERVICES
              </span>
            </div>
          </header>

          <div
            ref={stageRef}
            className="elan-lusion-stage"
            tabIndex={0}
            role="group"
            aria-label="Services carousel. Drag, scroll sideways or use the arrow keys."
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            <span ref={markRef} className="elan-lusion-mark" aria-hidden="true">ÉLAN</span>
            <span ref={glowRef} className="elan-lusion-glow" aria-hidden="true" />
            <span ref={curRef} className="elan-lusion-cursor" aria-hidden="true">Drag</span>
            {services.map((service, i) => (
              <button
                key={service.number}
                type="button"
                data-card
                data-i={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="elan-lusion-card"
                aria-label={`${service.title}. Open details`}
                aria-expanded={open && detail === i}
                onClick={(e) => { if (e.detail === 0) openService(i); }}
              >
                <img src={service.image} alt="" loading="lazy" draggable={false} />
                <span className="elan-lusion-shade" />
                <span className="elan-lusion-front-outline" />
                <span className="elan-lusion-topline">
                  <span className="elan-lusion-number">{service.number}</span>
                  <span className="elan-lusion-sparkle"><Sparkles size={16} /></span>
                </span>
                <span className="elan-lusion-front-bottom">
                  <span className="elan-lusion-cat">{service.category}</span>
                  <span className="elan-lusion-title">{service.title}</span>
                  <span className="elan-lusion-front-hint">
                    <span>EXPLORE SERVICE</span>
                    <ArrowUpRight size={14} />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="elan-lusion-controls">
            <button type="button" className="elan-lusion-arrow" onClick={() => go(-1)} aria-label="Previous service"><ArrowLeft size={18} /></button>
            <span className="elan-lusion-counter">{pad(center + 1)} / {pad(N)}</span>
            <button type="button" className="elan-lusion-arrow" onClick={() => go(1)} aria-label="Next service"><ArrowRight size={18} /></button>
            <span className="elan-lusion-progress"><span style={{ width: `${((center + 1) / N) * 100}%` }} /></span>
          </div>

          <div ref={panelRef} className="elan-lusion-detail" aria-live="polite">
            {sv && (
              <div className="elan-lusion-detail-inner">
                <div className="elan-lusion-detail-media">
                  <img src={sv.image} alt={sv.title} />
                  <video
                    key={sv.number}
                    ref={videoRef}
                    src={sv.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    onPlaying={(e) => e.currentTarget.classList.add("is-playing")}
                  />
                  <span className="elan-lusion-shade" />
                </div>
                <div className="elan-lusion-detail-copy">
                  <div data-anim className="elan-lusion-detail-top">
                    <span>{sv.number}</span>
                    <span>{sv.category}</span>
                    <button type="button" className="elan-lusion-close" onClick={closePanel} aria-label="Close details"><X size={16} /></button>
                  </div>
                  <div className="elan-lusion-detail-text">
                    <h3 data-anim>{sv.title}</h3>
                    <p data-anim>{sv.description}</p>
                  </div>
                  <a data-anim className="elan-lusion-book" href="/pricing">
                    <span>Book this service</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            )}
          </div>

          <footer className="elan-services-footer">
            <span>YOUR BEAUTY. YOUR RITUAL. YOUR MOMENT.</span>
            <a href="#booking">
              Find your treatment
              <ArrowUpRight size={16} />
            </a>
          </footer>
        </div>
      </div>
    </section>
  );
}