import React, { useState, useEffect } from "react";
import "./AboutStory.css";

/* Add your spa/salon images inside public/images/ */
const coverImages = [
  { id: 1, src: "/images/about-story.jpg", alt: "Elan Nail Studio Interior" },
  { id: 2, src: "/images/elan-hero-broken.png", alt: "Spa Treatment at Elan" },
  { id: 3, src: "/images/about-store.jpg", alt: "Professional Nail Art" },
];

export default function AboutStory() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic Cover Flow rotation every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about-story-section">
      <div className="about-story-wrap">
        <div className="about-story-grid">
          
          {/* Left Column: Automatic Cover Flow Carousel */}
          <div className="about-coverflow-container">
            <div className="about-coverflow-track">
              {coverImages.map((img, idx) => {
                // Determine position relative to active slide for cover flow effect
                let positionStyle = "next-slide";
                if (idx === currentIndex) {
                  positionStyle = "active-slide";
                } else if (
                  idx === (currentIndex - 1 + coverImages.length) % coverImages.length
                ) {
                  positionStyle = "prev-slide";
                }

                return (
                  <div
                    key={img.id}
                    className={`about-coverflow-card ${positionStyle}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <img src={img.src} alt={img.alt} />
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Dots */}
            <div className="about-coverflow-dots">
              {coverImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`about-dot ${currentIndex === idx ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Story & Vision/Mission Content */}
          <div className="about-story-content">
            <span className="about-story-label">Our Story</span>
            
            <h2 className="about-story-h2">
              Experience the art of nail care and spa indulgence with our{" "}
              <em>Talented Professionals.</em>
            </h2>

            <p className="about-story-text">
              From the beginning, we knew that we wanted to offer top-notch nail care 
              services and exquisite spa treatments to our clients. We were thrilled 
              when we quickly became a go-to destination for both locals and visitors, 
              and our salon’s reputation for quality and professionalism made us a top 
              player in the beauty industry.
            </p>

            <p className="about-story-text">
              Today, Elan Nail Studio and Spa continues to be a beloved destination 
              for anyone looking to indulge in a little pampering. We are grateful 
              for the support of our loyal clients, and we are excited to continue 
              providing exceptional service for many years to come.
            </p>

            {/* Vision & Mission Cards Grid */}
            <div className="about-vm-grid">
              <div className="about-vm-card">
                <span className="about-card-num">01</span>
                <h3>Our Vision</h3>
                <p>
                  We are committed to offering a welcoming and relaxing environment 
                  that promotes self-care and allows our clients to unwind and recharge.
                </p>
              </div>

              <div className="about-vm-card">
                <span className="about-card-num">02</span>
                <h3>Our Mission</h3>
                <p>
                  We strive to continuously improve and innovate our services and offerings, 
                  while maintaining our commitment to exceptional quality and personalised attention.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}