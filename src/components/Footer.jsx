import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e) => {
      const r = footer.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <footer className="footer-section" id="contact" ref={footerRef}>
      <div className="footer-glow" />

      {/* EXPANDED LUXURY MAIN CONTENT AREA */}
      <div className="footer-container">
        
        {/* BRAND & LOGO COLUMN */}
        <div className="footer-col footer-col-brand">
          <a href="#home" className="footer-brand">
            <span className="footer-logo">élan</span>
            <span className="footer-subtitle">NAIL STUDIO & SPA</span>
          </a>
          <p className="footer-description">
            We will help you rediscover the magic of Self-Care through bespoke luxury rituals and master craftsmanship.
          </p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              FB
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              IG
            </a>
          </div>
        </div>

        {/* NAVIGATION COLUMN */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* CONTACT DETAILS COLUMN */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-links footer-contact-list">
            <li>
              <a href="tel:919483042996">
                <Phone className="footer-icon" size={14} /> +91 9483 042 996
              </a>
            </li>
            <li>
              <a href="tel:919945155889">
                <Phone className="footer-icon" size={14} /> +91 9945 155 889
              </a>
            </li>
            <li>
              <a href="mailto:customerservice@elannailspa.com">
                <Mail className="footer-icon" size={14} /> customerservice@elannailspa.com
              </a>
            </li>
            <li className="footer-address">
              <MapPin className="footer-icon" size={14} /> Miraya Rose, Unit 7, Varthur Rd, Palm Meadows, Siddapura, Whitefield, Bengaluru, Karnataka 560 066
            </li>
          </ul>
        </div>

        {/* OPENING HOURS & NEWSLETTER COLUMN */}
        <div className="footer-col">
          <h4>Opening Hours</h4>
          <div className="footer-hours">
            <p><strong>Tue - Sun:</strong> 10:00 am - 07:30 pm</p>
            <p className="footer-closed"><strong>Closed on Monday</strong></p>
          </div>

          <div className="newsletter-box">
            <h4>Join Our Club</h4>
            <p>Exclusive offers & luxury pampering updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="newsletter-row">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">
                <span>Join</span>
                <ArrowUpRight size={12} />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* INTERACTIVE GLASS CURSOR REVEAL GIANT BRANDING */}
      <div className="footer-spotlight-area">
        <h1 className="footer-giant-text footer-giant-base">
          ÉLAN NAIL STUDIO & SPA
        </h1>

        <h1
          className={`footer-giant-text footer-giant-reveal ${
            isHovered ? "is-visible" : ""
          }`}
          style={{
            WebkitMaskPosition: `${mousePos.x - 200}px ${mousePos.y - 100}px`,
            maskPosition: `${mousePos.x - 200}px ${mousePos.y - 100}px`,
          }}
        >
          ÉLAN NAIL STUDIO & SPA
        </h1>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} élan Nail Studio & Spa. All rights reserved.
        </p>

        <a href="#home" className="footer-back-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;