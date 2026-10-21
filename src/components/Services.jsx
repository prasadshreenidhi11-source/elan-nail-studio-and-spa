import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Manicure",
    category: "THE ART OF DETAIL",
    description:
      "Whether you prefer a classic French manicure or a bold and trendy design, our manicurists can create any look you desire with their expert techniques.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/manicure.mp4",
    anchor: "manicure",
  },
  {
    number: "02",
    title: "Pedicure",
    category: "A MOMENT FOR YOURSELF",
    description:
      "Treat your feet to a relaxing experience. Our special products and thoughtful techniques make every pedicure feel like a little escape.",
    image:
      "https://images.unsplash.com/photo-1664643411326-6c589531be3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoSrc: "/pedicure.mp4",
    anchor: "pedicure",
  },
  {
    number: "03",
    title: "Nail Art",
    category: "YOUR STYLE, YOUR STORY",
    description:
      "Explore colours, shapes, and textures that let your personality shine through expressive, beautifully finished nail art.",
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/nail-art.mp4",
    anchor: "nail-art",
  },
  {
    number: "04",
    title: "Waxing",
    category: "SMOOTH & CONFIDENT",
    description:
      "From eyebrows to legs, our waxing services help you enjoy a smooth, polished finish with attentive care.",
    image:
      "https://plus.unsplash.com/premium_photo-1661431392914-e3fc8ff0e51a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoSrc: "/waxing.mp4",
    anchor: "waxing",
  },
  {
    number: "05",
    title: "Hair Spa",
    category: "A RITUAL FOR YOUR HAIR",
    description:
      "Indulge in a luxurious hair spa treatment with expert care and quality products for beautifully conditioned, radiant-looking hair.",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/hair-spa.mp4",
    anchor: "hair-spa",
  },
  {
    number: "06",
    title: "Hair Cuts",
    category: "A FRESH PERSPECTIVE",
    description:
      "Our stylists bring together modern trends and thoughtful technique to help you find a cut that feels uniquely yours.",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/hair-cuts.mp4",
    anchor: "hair-cuts",
  },
  {
    number: "07",
    title: "Eyelash Tinting",
    category: "LET YOUR EYES SPEAK",
    description:
      "Enhance the appearance of your lashes with a carefully applied tint performed by our beauty technicians.",
    image:
      "https://images.unsplash.com/photo-1639629509821-c54cdd984227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoSrc: "/eyelash-tinting.mp4",
    anchor: "eye-lash",
  },
  {
    number: "08",
    title: "Relaxation Services",
    category: "SLOW DOWN & RESET",
    description:
      "Escape the everyday in a peaceful setting created for unwinding, restoring your sense of calm, and taking time for yourself.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/relaxation.mp4",
    anchor: "relaxation",
  },
  {
    number: "09",
    title: "Nail Extensions",
    category: "LENGTH WITH PERSONALITY",
    description:
      "Discover personalised nail extensions shaped around your preferred length, finish, and individual style.",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/nail-extensions.mp4",
    anchor: "nail-extension",
  },
  {
    number: "10",
    title: "Paraffin Treatment",
    category: "A TOUCH OF LUXURY",
    description:
      "Enjoy a comforting paraffin treatment designed to leave hands or feet feeling pampered and cared for.",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/paraffin-treatment.mp4",
    anchor: "paraffin-treatment",
  },
  {
    number: "11",
    title: "Facial Threading",
    category: "PRECISION & CARE",
    description:
      "Experience a traditional hair-removal technique delivered with precision and attention to detail.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/facial-threading.mp4",
    anchor: "facial-threading",
  },
  {
    number: "12",
    title: "Hair Wash",
    category: "A REFRESHING FINISH",
    description:
      "Refresh your routine with a relaxing hair wash and attentive salon care, leaving you ready for your next style.",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85",
    videoSrc: "/hair-wash.mp4",
    anchor: "hair-wash",
  },
];

function LusionServiceCard({ service, index }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <article className="elan-lusion-card" data-index={index}>
      <div className="elan-lusion-card-inner">
        {/* FRONT FACE */}
        <div className="elan-lusion-face elan-lusion-front">
          <div className="elan-lusion-front-outline" />
          <div className="elan-lusion-topline">
            <span className="elan-lusion-number">{service.number}</span>
            <span className="elan-lusion-sparkle">
              <Sparkles size={16} />
            </span>
          </div>

          <div className="elan-lusion-front-bottom">
            <span>{service.category}</span>
            <h3>{service.title}</h3>

            <div className="elan-lusion-front-hint">
              <span>EXPLORE SERVICE</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="elan-lusion-face elan-lusion-back">
          <div className="elan-lusion-back-media">
            <img src={service.image} alt={service.title} loading="lazy" />
            <video
              ref={videoRef}
              src={service.videoSrc}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <div className="elan-lusion-back-shade" />
          </div>

          <div className="elan-lusion-back-content">
            <div className="elan-lusion-back-top">
              <span>{service.number}</span>
              <span>{service.category}</span>
            </div>

            <div className="elan-lusion-back-copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <a className="elan-lusion-book" href="#booking">
                <span>Book this service</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const grid = gridRef.current;

    if (!section || !trigger || !grid) return;

    const isDesktop = window.innerWidth > 760;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      if (isDesktop) {
        const cards = gsap.utils.toArray(".elan-lusion-card");
        const inners = gsap.utils.toArray(".elan-lusion-card-inner");

        cards.forEach((card, index) => {
          const rot = (index - 5.5) * 3;
          const xOff = (index - 5.5) * 4;
          const yOff = index * 2;

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            left: "50%",
            top: "50%",
            position: "absolute",
            rotationZ: rot,
            x: xOff,
            y: yOff,
            zIndex: 12 - index,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "+=350%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cards, {
          xPercent: 0,
          yPercent: 0,
          left: "auto",
          top: "auto",
          position: "relative",
          rotationZ: 0,
          x: 0,
          y: 0,
          stagger: 0.05,
          duration: 1.5,
          ease: "power2.inOut",
        });

        tl.to(
          inners,
          {
            rotateY: 180,
            stagger: 0.08,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=0.8"
        );
      } else {
        // MOBILE & TABLET FLIP & CASCADE ANIMATION (No vertical pin block)
        const cards = gsap.utils.toArray(".elan-lusion-card");

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Flip each card automatically as it enters the mobile viewport
        const inners = gsap.utils.toArray(".elan-lusion-card-inner");
        inners.forEach((inner) => {
          gsap.to(inner, {
            rotateY: 180,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: inner,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="elan-services-section elan-lusion-services"
    >
      <div ref={triggerRef} className="elan-lusion-trigger">
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

          <div className="elan-lusion-stage">
            <div ref={gridRef} className="elan-lusion-grid">
              {services.map((service, index) => (
                <LusionServiceCard
                  key={service.number}
                  service={service}
                  index={index}
                />
              ))}
            </div>
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