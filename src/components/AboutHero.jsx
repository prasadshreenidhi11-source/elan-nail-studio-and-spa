import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AboutHero.css";

const HERO_IMAGE = "/images/elan-hero-broken.png";

export default function AboutHero() {
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const frameRef = useRef(null);

  // Parallax scroll drift for the hero image
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (heroImgRef.current) {
          const y = Math.min(window.scrollY, 900);
          heroImgRef.current.style.transform = `translateY(${y * 0.08}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Combined Cursor Interaction: Leaves shake AND Image zooms/pans toward cursor
  useEffect(() => {
    const section = heroRef.current;
    const frame = frameRef.current;
    const img = heroImgRef.current;
    if (!section || !frame || !img) return;

    const leaves = section.querySelectorAll(".hero-bg-leaf");

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      // 1. Shake/tilt background leaves
      leaves.forEach((leaf, index) => {
        const speed = (index + 1) * 12;
        gsap.to(leaf, {
          x: xPos * speed,
          y: yPos * speed,
          rotation: xPos * (index % 2 === 0 ? 20 : -20),
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // 2. Smooth zoom & pan effect on the hero image container
      gsap.to(img, {
        scale: 1.12, // Zoom in effect on hover/move
        x: xPos * -25, // Subtle parallax shift opposite to cursor
        y: yPos * -25,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Reset image zoom and position smoothly when cursor leaves the hero section
      gsap.to(img, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="about-hero-section">
      {/* Interactive Background Leaves Layer */}
      <div className="about-hero-leaves-layer" aria-hidden="true">
        <div className="hero-bg-leaf leaf-1">🍃</div>
        <div className="hero-bg-leaf leaf-2">🌿</div>
        <div className="hero-bg-leaf leaf-3">🍂</div>
        <div className="hero-bg-leaf leaf-4">🍃</div>
      </div>

      <div className="about-hero-wrap">
        <div className="about-hero-grid">
          
          {/* Left Column: Content */}
          <div className="about-hero-copy">
            <span className="about-hero-tag">ELAN NAIL STUDIO AND SPA</span>
            
            <h1 className="about-hero-title">
              <span className="about-hero-line">ELAN NAIL</span>
              <span className="about-hero-line ab-italic">STUDIO &amp; SPA</span>
            </h1>

            <div className="about-hero-subtitle-box">
              <h3>BOOK YOUR APPOINTMENT</h3>
              <p>
                Experience world-class nail care and mindful spa indulgence in a tranquil, 
                sanitized sanctuary crafted for your ultimate relaxation.
              </p>
            </div>

            <a href="/pricing" className="about-hero-btn">
  BOOK NOW
</a>

          </div>

          {/* Right Column: Broken Asymmetrical Frame Image with Zoom */}
          <div className="about-hero-pic-container">
            <div ref={frameRef} className="about-hero-broken-frame">
              <img ref={heroImgRef} src={HERO_IMAGE} alt="Elan Nail Studio and Spa" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}