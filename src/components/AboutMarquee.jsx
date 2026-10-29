import React from "react";
import "./AboutMarquee.css";

const marqueePhrases = [
  "Indulge in pure self-care",
  "Your sanctuary awaits",
  "Book your moment of tranquility",
  "Elevate your everyday ritual",
  "Experience flawless artistry",
];

export default function AboutMarquee() {
  return (
    <div className="about-marquee-section" aria-hidden="true">
      <div className="about-marquee-track">
        {/* Render twice to ensure an infinite seamless loop */}
        {[0, 1].map((setIndex) => (
          <div className="about-marquee-set" key={setIndex}>
            {marqueePhrases.map((phrase, i) => (
              <span key={`${setIndex}-${i}`} className="about-marquee-item">
                {phrase} <span className="about-marquee-star">✶</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}