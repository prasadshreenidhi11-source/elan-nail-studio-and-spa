import React from "react";

export default function ContactInfoCards() {
  return (
    <div className="info-cards-col">
      <div className="info-card">
        <div className="info-card-img">
          <img src="/images/contact-call.jpg" alt="Call Us" />
        </div>
        <div className="info-card-text">
          <h3>Call Us</h3>
          <p className="highlight-text">+91 98430 42996</p>
          <p className="sub-text">We're available during our business hours.</p>
        </div>
        <span className="card-arrow">→</span>
      </div>

      <div className="info-card">
        <div className="info-card-img">
          <img src="/images/contact-email.jpg" alt="Email Us" />
        </div>
        <div className="info-card-text">
          <h3>Email Us</h3>
          <p className="highlight-text">customerservice@elannailspa.com</p>
          <p className="sub-text">We'll get back to you within 24 hours.</p>
        </div>
        <span className="card-arrow">→</span>
      </div>

      <div className="info-card">
        <div className="info-card-img">
          <img src="/images/contact-visit.jpg" alt="Visit Us" />
        </div>
        <div className="info-card-text">
          <h3>Visit Us</h3>
          <p className="highlight-text">Miraya Rose, Unit 7, Varthur Road, Siddapura, Whitefield, Bengaluru</p>
        </div>
        <span className="card-arrow">→</span>
      </div>

      <div className="info-card">
        <div className="info-card-img">
        <img src="/images/contact-hours.jpg" alt="Opening Hours" />
        </div>
        <div className="info-card-text">
          <h3>Opening Hours</h3>
          <p className="highlight-text">Tue - Sun 10:00am - 7:30pm</p>
          <p className="sub-text">Mon - Closed</p>
        </div>
        <span className="card-arrow">→</span>
      </div>
    </div>
  );
}