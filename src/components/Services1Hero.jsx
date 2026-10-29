import React, { useState } from "react";
import "./Services1Hero.css";

// 5 High-resolution Spa Interior & Ambience imagery from Unsplash
const coverflowImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    title: "Serene Sanctuary",
    subtitle: "Calming atmosphere & ambient lighting",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
    title: "Therapeutic Lounges",
    subtitle: "Pure relaxation for body & mind",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80",
    title: "Luxury Aesthetics",
    subtitle: "Premium essential oils & organic care",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80",
    title: "Holistic Environment",
    subtitle: "Designed for total peace and comfort",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1788940571581-baaec3400bbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Refined Pampering",
    subtitle: "Experience luxury in every detail",
  },
];

export default function Services1Hero() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center image active

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? coverflowImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === coverflowImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="services1-hero-section">
      {/* Background Atmosphere & Glows */}
      <div className="services1-hero-bg-overlay" aria-hidden="true" />
      <div className="services1-hero-glow-left" aria-hidden="true" />
      <div className="services1-hero-glow-right" aria-hidden="true" />

      <div className="services1-hero-container">
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="services1-hero-left">
          <div className="services1-hero-eyebrow">
            <span className="services1-hero-star">✳</span>
            <span>EXPERIENCE LUXURY WELLNESS</span>
          </div>

          <h1 className="services1-hero-title">
            Discover Our Extensive Menu Of{" "}
            <em>Revitalising Beauty &amp; Relaxation Services</em>
          </h1>

          <p className="services1-hero-subtitle">
            Immerse yourself in a haven of peace and elegance. From tailored nail treatments
            and soothing spa therapies to rejuvenating skin care, explore our complete list of signature services crafted to elevate your senses.
          </p>

          <div className="services1-hero-cta-group">
            <a href="#services-menu" className="services1-hero-btn-primary">
              <span>Explore Menu</span>
              <span className="services1-hero-btn-arrow">↓</span>
            </a>

            <div className="services1-hero-stats">
              <div className="services1-hero-stat-item">
                <strong>25+</strong>
                <span>Custom Treatments</span>
              </div>
              <div className="services1-hero-stat-divider" />
              <div className="services1-hero-stat-item">
                <strong>100%</strong>
                <span>Organic &amp; Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D COVERFLOW GALLERY */}
        <div className="services1-hero-right">
          <div className="services1-coverflow-wrapper">
            <div className="services1-coverflow-stage">
              {coverflowImages.map((img, idx) => {
                // Calculate position relative to the active card
                let offset = idx - activeIndex;

                // Handle looping offset logic
                if (offset < -2) offset += coverflowImages.length;
                if (offset > 2) offset -= coverflowImages.length;

                let cardClass = "services1-coverflow-card";
                if (offset === 0) cardClass += " is-active";
                else if (offset === -1) cardClass += " is-prev-1";
                else if (offset === 1) cardClass += " is-next-1";
                else if (offset === -2) cardClass += " is-prev-2";
                else if (offset === 2) cardClass += " is-next-2";
                else cardClass += " is-hidden";

                return (
                  <div
                    key={img.id}
                    className={cardClass}
                    onClick={() => setActiveIndex(idx)}
                    style={{ zIndex: 10 - Math.abs(offset) }}
                  >
                    <img src={img.url} alt={img.title} />
                    <div className="services1-coverflow-overlay">
                      <h4>{img.title}</h4>
                      <p>{img.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coverflow Navigation Controls */}
            <div className="services1-coverflow-controls">
              <button
                className="services1-coverflow-nav-btn"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                ←
              </button>

              <div className="services1-coverflow-dots">
                {coverflowImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`services1-coverflow-dot ${
                      idx === activeIndex ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>

              <button
                className="services1-coverflow-nav-btn"
                onClick={handleNext}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}