import React from 'react';
import './ContactHero.css';

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <div className="contact-hero-container">
        {/* Left Content Side */}
        <div className="contact-hero-content">
          <span className="contact-hero-subtitle">LET'S STAY CONNECTED</span>
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-description">
            We'd love to hear from you. Whether you have a question, want to book an appointment or just want to say hello — we're always here for you.
          </p>
          
          <div className="contact-hero-location">
            <svg 
              className="location-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span>Miraya Rose · Whitefield · Bengaluru</span>
          </div>

          <a href="#contact-details" className="scroll-down-btn">
            <span className="scroll-icon">↓</span>
            <span>Scroll Down</span>
          </a>
        </div>

        {/* Right Image Side with Zoom Animation */}
        <div className="contact-hero-image-wrapper">
          <div className="contact-hero-image-container">
            {/* 
              Image src is intentionally left blank/broken as requested.
              Replace src="" with your actual image path when ready.
            */}
            <img 
  src="/images/contact-hero.jpg" 
  alt="ÉLAN Luxury Salon Interior" 
  className="contact-hero-img zoom-animation" 
/>
            <div className="hero-image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;