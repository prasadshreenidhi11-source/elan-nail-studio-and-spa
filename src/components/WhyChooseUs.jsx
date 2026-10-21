import { useEffect, useRef, useState } from "react";
import "./WhyChooseUs.css";

const videoScenes = [
  {
    id: 1,
    label: "Hair Wash",
    src: "/videos/hair-wash.mp4",
  },
  {
    id: 2,
    label: "Nail Art",
    src: "/videos/nail-art.mp4",
  },
  {
    id: 3,
    label: "Eyelash Tinting",
    src: "/videos/eyelash-tinting.mp4",
  },
  {
    id: 4,
    label: "Haircut",
    src: "/videos/haircut.mp4",
  },
];

const benefits = [
  {
    number: "01",
    title: "12+ Years of Experience",
    description:
      "Over a decade of creating beautiful transformations with care, precision, and attention to detail.",
  },
  {
    number: "02",
    title: "Professional Staff",
    description:
      "Skilled professionals dedicated to exceptional service and a personalised experience.",
  },
  {
    number: "03",
    title: "Luxury Within Reach",
    description:
      "Premium beauty and spa experiences designed to make your self-care moments special.",
  },
];

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [activeScene, setActiveScene] = useState(0);
  const [zoomProgress, setZoomProgress] = useState(0);

  // Scroll-driven cinematic zoom animation.
  useEffect(() => {
    let frameId;

    const updateAnimation = () => {
      const section = sectionRef.current;
      const video = videoRef.current;

      if (!section || !video) return;

      const sectionRect = section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight - window.innerHeight;

      const rawProgress =
        scrollDistance > 0
          ? -sectionRect.top / scrollDistance
          : 0;

      const progress = Math.min(1, Math.max(0, rawProgress));

      setZoomProgress((previous) =>
        Math.abs(previous - progress) > 0.002
          ? progress
          : previous
      );

      // Measure the original position without the animated transform.
      const previousMoveX =
        video.style.getPropertyValue("--video-move-x");

      const previousMoveY =
        video.style.getPropertyValue("--video-move-y");

      const previousScale =
        video.style.getPropertyValue("--video-scale");

      video.style.setProperty("--video-move-x", "0px");
      video.style.setProperty("--video-move-y", "0px");
      video.style.setProperty("--video-scale", "1");

      const originalRect = video.getBoundingClientRect();

      video.style.setProperty(
        "--video-move-x",
        previousMoveX || "0px"
      );

      video.style.setProperty(
        "--video-move-y",
        previousMoveY || "0px"
      );

      video.style.setProperty(
        "--video-scale",
        previousScale || "1"
      );

      // Final video position.
      const targetCenterX = window.innerWidth * 0.5;
      const targetCenterY = window.innerHeight * 0.4;

      const originalCenterX =
        originalRect.left + originalRect.width / 2;

      const originalCenterY =
        originalRect.top + originalRect.height / 2;

      const moveX =
        (targetCenterX - originalCenterX) * progress;

      const moveY =
        (targetCenterY - originalCenterY) * progress;

      // Zoom amount.
      const scale = 1 + progress * 0.5;

      video.style.setProperty(
        "--video-move-x",
        `${moveX}px`
      );

      video.style.setProperty(
        "--video-move-y",
        `${moveY}px`
      );

      video.style.setProperty("--video-scale", scale);

      video.style.setProperty(
        "--video-radius",
        `${Math.max(8, 30 - progress * 22)}px`
      );

      video.style.setProperty("--zoom-progress", progress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateAnimation);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Automatically change scenes every three seconds.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveScene(
        (current) => (current + 1) % videoScenes.length
      );
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="why-elan"
      id="why-choose-us"
      ref={sectionRef}
    >
      <div className="why-elan-sticky">
        <div className="why-elan-inner">
          {/* Main heading */}
          <div
            className="why-elan-heading"
            style={{
              opacity: Math.max(
                0.15,
                1 - zoomProgress * 1.5
              ),
              filter: `blur(${zoomProgress * 8}px)`,
              transition:
                "filter 0.15s linear, opacity 0.15s linear",
            }}
          >
            <div className="why-elan-eyebrow">
              <span className="why-elan-dot" />
              THE ELAN EXPERIENCE
            </div>

            <h2>
              Feel the
              <br />
              <span>Elan difference.</span>
            </h2>

            <p className="why-elan-intro">
              A little time for yourself.
              <br />
              A world of difference.
            </p>
          </div>

          <div className="why-elan-content">
            {/* Cinematic video window */}
            <div
              className={`why-elan-video-shell ${
                zoomProgress > 0.08 ? "is-zooming" : ""
              }`}
              ref={videoRef}
            >
              <div className="why-elan-video-stage">
                {videoScenes.map((scene, index) => (
                  <div
                    className={`why-elan-video-scene ${
                      activeScene === index ? "is-active" : ""
                    }`}
                    key={scene.id}
                    aria-hidden={activeScene !== index}
                  >
                    <video
                      className="why-elan-video"
                      src={scene.src}
                      muted
                      autoPlay
                      playsInline
                      loop
                      preload="metadata"
                      aria-label={`Elan ${scene.label} video`}
                    />
                  </div>
                ))}

                <div className="why-elan-video-overlay" />

                <div className="why-elan-video-topline">
                  <span>ELAN NAIL STUDIO & SPA</span>
                  <span>BEAUTY IN EVERY DETAIL</span>
                </div>

                <div className="why-elan-video-bottomline">
                  <span>YOUR MOMENT. YOUR RITUAL.</span>
                  <span>
                    0{activeScene + 1} / 04
                  </span>
                </div>

                <div className="why-elan-video-progress">
                  {videoScenes.map((scene, index) => (
                    <span
                      key={scene.id}
                      className={
                        activeScene === index ? "is-active" : ""
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits content */}
            <div
              className="why-elan-details"
              style={{
                "--details-opacity": Math.max(
                  0.15,
                  1 - zoomProgress * 1.5
                ),
                "--details-blur": `${zoomProgress * 8}px`,
              }}
            >
              <div className="why-elan-details-label">
                WHY CHOOSE ELAN
              </div>

              <p className="why-elan-details-copy">
                More than a beauty appointment.
                <br />
                It's time to reconnect with yourself.
              </p>

              <div className="why-elan-benefits">
                {benefits.map((benefit) => (
                  <article
                    className="why-elan-benefit"
                    key={benefit.number}
                  >
                    <span className="why-elan-benefit-number">
                      {benefit.number}
                    </span>

                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>

                    <span className="why-elan-benefit-arrow">
                      ↗
                    </span>
                  </article>
                ))}
              </div>

              <a
                className="why-elan-cta"
                href="#"
                onClick={(event) => event.preventDefault()}
              >
                <span>DISCOVER THE ELAN EXPERIENCE</span>
                <span className="why-elan-cta-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="why-elan-scroll-indicator"
            style={{
              opacity: 1 - zoomProgress,
            }}
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="why-elan-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;