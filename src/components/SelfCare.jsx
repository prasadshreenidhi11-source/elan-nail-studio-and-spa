import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SelfCare.css";

gsap.registerPlugin(ScrollTrigger);

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

export default function SelfCare() {
  const sectionRef = useRef(null);
  const [activeService, setActiveService] = useState(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  const videoRef = useRef(null);
  const closeTimerRef = useRef(null);

  const selectService = (service) => {
    window.clearTimeout(closeTimerRef.current);
    setActiveService(service);
    setIsOrbitPaused(true);
  };

  const closePreview = () => {
    window.clearTimeout(closeTimerRef.current);
    setActiveService(null);
    setIsOrbitPaused(false);
  };

  const handleServiceLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      closeTimerRef.current = window.setTimeout(() => {
        setIsOrbitPaused(false);
      }, 250);
    }
  };

  // GSAP Responsive ScrollTrigger setup
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    // 1. DESKTOP & TABLETS (Width > 768px): Pinned step-through on scroll
    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800", // Pinned scroll length
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      services.forEach((service, index) => {
        tl.to(
          {},
          {
            onStart: () => {
              setActiveService(service);
              setIsOrbitPaused(true);
            },
            onReverseComplete: () => {
              if (index === 0) {
                setActiveService(null);
                setIsOrbitPaused(false);
              }
            },
          },
          index * 0.2
        );
      });
    });

    // 2. MOBILE PHONES (Width <= 768px): Smooth standard reveal (no pinning)
    mm.add("(max-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        onEnter: () => {
          if (!activeService) {
            setActiveService(services[0]); // Auto-open first service on scroll
          }
        },
      });
    });

    return () => mm.revert();
  }, []);

  // Video autoplay management
  useEffect(() => {
    if (!activeService || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.play().catch(() => {});

    return () => video.pause();
  }, [activeService]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="selfcare-section" id="self-care">
      <div className="selfcare-background-glow" />

      <div className="selfcare-layout">
        {/* LEFT INTRODUCTION */}
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

          <a href="#services" className="selfcare-explore-button">
            <span>EXPLORE OUR SERVICES</span>
            <span className="selfcare-button-arrow">↗</span>
          </a>
        </div>

        {/* CENTER ORBIT */}
        <div className="selfcare-orbit-area">
          <div
            className={`selfcare-orbit ${
              isOrbitPaused ? "orbit-paused" : ""
            }`}
          >
            <div className="selfcare-orbit-ring selfcare-ring-one" />
            <div className="selfcare-orbit-ring selfcare-ring-two" />

            <span className="selfcare-orbit-dot orbit-dot-one" />
            <span className="selfcare-orbit-dot orbit-dot-two" />
            <span className="selfcare-orbit-dot orbit-dot-three" />

            <div className="selfcare-orbit-center">
              <span className="selfcare-brand">ELAN</span>
              <span className="selfcare-center-divider" />
              <h3>SELF-CARE</h3>
              <p>BEAUTY&nbsp; · &nbsp;WELLNESS&nbsp; · &nbsp;YOU</p>
            </div>

            {services.map((service, index) => (
              <div
                key={service.id}
                className={`selfcare-orbit-track orbit-track-${index + 1}`}
              >
                <button
                  type="button"
                  className={`selfcare-orbit-item ${
                    activeService?.id === service.id ? "is-selected" : ""
                  }`}
                  onMouseEnter={() => selectService(service)}
                  onMouseLeave={handleServiceLeave}
                  onFocus={() => selectService(service)}
                  onBlur={handleServiceLeave}
                  onClick={() => {
                    if (activeService?.id === service.id) {
                      closePreview();
                    } else {
                      selectService(service);
                    }
                  }}
                  aria-label={`Preview ${service.title}`}
                  aria-pressed={activeService?.id === service.id}
                >
                  <span className="selfcare-image-orbit">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <span className="selfcare-image-overlay">
                      <span>↗</span>
                    </span>
                  </span>

                  <span className="selfcare-orbit-label">
                    <span className="selfcare-label-dot" />
                    {service.title}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* VIDEO PREVIEW */}
        <div
          className={`selfcare-preview ${
            activeService ? "preview-visible" : ""
          }`}
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover)").matches) {
              window.clearTimeout(closeTimerRef.current);
              setIsOrbitPaused(true);
            }
          }}
          onMouseLeave={handleServiceLeave}
          aria-hidden={!activeService}
        >
          {activeService ? (
            <>
              <div className="selfcare-preview-video">
                <video
                  key={activeService.id}
                  ref={videoRef}
                  src={activeService.video}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="metadata"
                />

                <div className="selfcare-video-topline">
                  <span>{activeService.title}</span>
                  <button
                    type="button"
                    className="selfcare-preview-close"
                    onClick={closePreview}
                    aria-label="Close video preview"
                  >
                    ×
                  </button>
                </div>

                <span className="selfcare-video-corner">
                  ELAN BEAUTY EXPERIENCE
                </span>
              </div>

              <div className="selfcare-preview-details">
                <div>
                  <h4>{activeService.title}</h4>
                  <p>{activeService.subtitle}</p>
                </div>

                <a href="#services" onClick={closePreview}>
                  EXPLORE SERVICE <span>→</span>
                </a>
              </div>
            </>
          ) : (
            <div className="selfcare-preview-placeholder">
              <span className="selfcare-placeholder-icon">✳</span>
              <p>Discover your next ritual.</p>
              <span>TAP A SERVICE</span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="selfcare-bottom-bar">
        <div className="selfcare-pagination">
          <span className="pagination-active" />
          <span />
          <span />
          <span />
        </div>

        <p>BEAUTY RITUALS &nbsp; · &nbsp; ENDLESS POSSIBILITIES</p>

        <a href="#services" className="selfcare-scroll-link">
          <span className="selfcare-scroll-circle">↓</span>
          <span>SCROLL TO EXPLORE</span>
        </a>
      </div>
    </section>
  );
}