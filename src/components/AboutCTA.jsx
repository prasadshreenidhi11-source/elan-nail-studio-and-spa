import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutCTA.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Manicure & Pedicure",
  "Nail Extensions",
  "Nail Art",
  "Gel Nails",
  "Hair Styling",
  "Skin Care",
  "Lash & Brow",
  "Waxing",
];

export default function AboutCTA() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });
    setSubmitted(false);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      // 1. Reveal introduction copy
      gsap.fromTo(
        ".about-elan-cta-copy",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // 2. Reveal booking form card
      gsap.fromTo(
        ".about-elan-booking-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-elan-cta" id="book-appointment">
      {/* Background Atmosphere & Interior Glow */}
      <div className="about-elan-cta-bg-overlay" aria-hidden="true" />
      <div className="about-elan-cta-glow" aria-hidden="true" />

      {/* Top Header Accent */}
      <div className="about-elan-cta-top-bar">
        <div className="about-elan-header-brand">
          <span className="about-elan-brand-title">ÉLAN</span>
          <span className="about-elan-brand-sub">NAIL STUDIO & SPA</span>
        </div>
        <div className="about-elan-header-tagline">
          RELAX / REJUVENATE / REPEAT
        </div>
      </div>

      <div className="about-elan-cta-inner">
        {/* LEFT COLUMN: INTRODUCTION & FEATURES */}
        <div className="about-elan-cta-copy">
          <span className="about-elan-cta-eyebrow">
            <span>✳</span> YOUR MOMENT OF SELF-CARE
          </span>

          <h2>
            Your next
            <br />
            <em>self-care moment</em>
            <br />
            is just a click away.
          </h2>

          <p className="about-elan-cta-description">
            Beautiful nails, relaxing treatments and a little time just for you.
            Tell us what you have in mind, and let us take care of the rest.
          </p>

          <div className="about-elan-cta-note">
            <span className="about-elan-cta-note-icon">✦</span>
            <div>
              <strong>A little luxury. A lot of care.</strong>
              <span>Your beauty experience starts here.</span>
            </div>
          </div>

          {/* Feature Badges Grid */}
          <div className="about-elan-features-grid">
            <div className="about-elan-feature-item">
              <span className="about-elan-feature-icon">1</span>
              <span className="about-elan-feature-text">PREMIUM SERVICES</span>
            </div>
            <div className="about-elan-feature-item">
              <span className="about-elan-feature-icon">2</span>
              <span className="about-elan-feature-text">EXPERT THERAPISTS</span>
            </div>
            <div className="about-elan-feature-item">
              <span className="about-elan-feature-icon">3</span>
              <span className="about-elan-feature-text">LUXURY AMBIENCE</span>
            </div>
            <div className="about-elan-feature-item">
              <span className="about-elan-feature-icon">4</span>
              <span className="about-elan-feature-text">YOUR WELLNESS OUR PRIORITY</span>
            </div>
          </div>

          <div className="about-elan-cta-decoration" aria-hidden="true">
            <span>É</span>
            <div className="about-elan-cta-decoration-line" />
            <span>BEAUTY · CARE · CONFIDENCE</span>
          </div>

          <div className="about-elan-location-footer-note">
            <span>📍</span> Miraya Rose · Whitefield · Bengaluru
          </div>
        </div>

        {/* RIGHT COLUMN: PRO MAX GLASSBOOKING FORM */}
        <div className="about-elan-cta-interactive-area">
          <div className="about-elan-booking-card">
            
            {/* Action pill button header */}
            <div className="about-elan-card-badge-top">
              <span>BOOK AN APPOINTMENT</span>
            </div>

            <div className="about-elan-booking-heading">
              <h3>
                Book your <em>appointment.</em>
              </h3>
              <p>
                Share a few details and we&apos;ll help you plan your visit.
              </p>
            </div>

            {submitted ? (
              <div className="about-elan-booking-success" role="status">
                <span className="about-elan-success-icon">✓</span>
                <h4>Thank you, {formData.name}!</h4>
                <p>
                  Your appointment request has been completed in this demo.
                  Please contact the salon directly to confirm your booking.
                </p>
                <button
                  type="button"
                  className="about-elan-booking-reset"
                  onClick={resetForm}
                >
                  Make another request <span>↗</span>
                </button>
              </div>
            ) : (
              <form className="about-elan-booking-form" onSubmit={handleSubmit}>
                <div className="about-elan-form-row">
                  <label>
                    Your name <span>*</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label>
                    Phone number <span>*</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                    />
                  </label>
                </div>

                <label>
                  Email address <span>*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  Choose your service <span>*</span>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a treatment
                    </option>
                    {services.map((service) => (
                      <option value={service} key={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="about-elan-form-row">
                  <label>
                    Preferred date <span>*</span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toLocaleDateString("en-CA")}
                      required
                    />
                  </label>

                  <label>
                    Preferred time <span>*</span>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Choose a time
                      </option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                    </select>
                  </label>
                </div>

                <label>
                  Anything you&apos;d like us to know?
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us about your preferences (optional)"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </label>

                <button className="about-elan-booking-submit" type="submit">
                  <span>Book Appointment</span>
                  <span className="about-elan-submit-arrow">↗</span>
                </button>

                <p className="about-elan-booking-disclaimer">
                  Your request is not confirmed until the salon confirms it.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}