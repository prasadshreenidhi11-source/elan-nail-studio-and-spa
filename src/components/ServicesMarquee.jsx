import React from "react";
import "./ServicesMarquee.css";

const servicesList = [
  "Manicure",
  "Pedicure",
  "Nail Extensions",
  "Nail Art",
  "Nail Finishes",
  "Gel Polish",
  "Paraffin Treatment",
  "Relaxation & Reflexology",
  "Hair Spa & Wash",
  "Hair Cuts",
  "Waxing & Depilation",
  "Facial Threading & Tinting",
];

export default function ServicesMarquee() {
  // Duplicate array 3x for uninterrupted smooth infinite scrolling
  const marqueeItems = [...servicesList, ...servicesList, ...servicesList];

  return (
    <div className="services-marquee-section" aria-label="Services highlights">
      <div className="services-marquee-track">
        {marqueeItems.map((service, index) => (
          <div key={`${service}-${index}`} className="services-marquee-item">
            <span className="services-marquee-text">{service}</span>
            <span className="services-marquee-star" aria-hidden="true">
              ✶
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}