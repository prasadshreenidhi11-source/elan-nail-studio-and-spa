import React, { useState } from "react";
import "./PricingHero.css";

const pricingCoverflowImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80",
    title: "Nail Care & Extensions",
    subtitle: "Transparent packages & gel finishes",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1519415387727-a1b4db1b6033?auto=format&fit=crop&w=1000&q=80",
    title: "Deluxe Spa Pedicures",
    subtitle: "Herbal soaks & foot reflexology",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
    title: "Signature Spa Therapies",
    subtitle: "Value-packed pampering sessions",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80",
    title: "Hair Care & Scalp Spa",
    subtitle: "Deep conditioning & scalp treatments",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    title: "Facial Threading & Waxing",
    subtitle: "Precision brow & depilation services",
  },
];

export default function PricingHero() {
  const [activeIndex, setActiveIndex] = useState(2); // Center card active

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? pricingCoverflowImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === pricingCoverflowImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="pricing-hero-section">
      <div className="pricing-hero-container">
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="pricing-hero-left">
          <div className="pricing-hero-eyebrow">
            <span className="pricing-hero-star">✦</span>
            <span>TRANSPARENT LUXURY CARE</span>
          </div>

          <h1 className="pricing-hero-title">
            Simple &amp; Clear Pricing For <em>Your Self-Care Moments</em>
          </h1>

          <p className="pricing-hero-subtitle">
            Explore our comprehensive price list for all nail care, spa pedicures, extensions, reflexology, and hair therapies. Premium pampering with no hidden costs.
          </p>

          <div className="pricing-hero-actions">
            <a href="#pricing-list" className="pricing-hero-cta-btn">
              <span>EXPLORE PRICE LIST</span>
              <span className="pricing-hero-btn-arrow">↘</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D COVERFLOW GALLERY */}
        <div className="pricing-hero-right">
          <div className="pricing-coverflow-wrapper">
            <div className="pricing-coverflow-stage">
              {pricingCoverflowImages.map((img, idx) => {
                let offset = idx - activeIndex;

                if (offset < -2) offset += pricingCoverflowImages.length;
                if (offset > 2) offset -= pricingCoverflowImages.length;

                let cardClass = "pricing-coverflow-card";
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
                    <div className="pricing-coverflow-overlay">
                      <h4>{img.title}</h4>
                      <p>{img.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="pricing-coverflow-controls">
              <button
                className="pricing-coverflow-nav-btn"
                onClick={handlePrev}
                aria-label="Previous treatment"
              >
                ←
              </button>

              <div className="pricing-coverflow-dots">
                {pricingCoverflowImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`pricing-coverflow-dot ${
                      idx === activeIndex ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>

              <button
                className="pricing-coverflow-nav-btn"
                onClick={handleNext}
                aria-label="Next treatment"
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