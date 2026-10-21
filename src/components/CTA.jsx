import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CTA.css";

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

export default function CTA() {
  const sectionRef = useRef(null);
  const cardStackRef = useRef(null);

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
  const [isSpread, setIsSpread] = useState(false); // Tracks if photos should spread/fade

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
    setIsSpread(false); // Return cards back when submitted
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

  // Close spread state if user clicks completely outside the interactive area
  useEffect(() => {
    function handleClickOutside(event) {
      const interactiveArea = document.querySelector(".elan-cta-interactive-area");
      if (interactiveArea && !interactiveArea.contains(event.target)) {
        setIsSpread(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      // 1. Reveal introduction copy
      gsap.fromTo(
        ".elan-cta-copy",
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

      // 2. Fan out the image cards initially
      gsap.fromTo(
        ".elan-cta-card-item",
        { rotate: 0, x: 0, opacity: 0 },
        {
          rotate: (index) => (index - 1) * 12,
          x: (index) => (index - 1) * 18,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      // 3. Animate decorative line
      gsap.fromTo(
        ".elan-cta-leader-line",
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        }
      );

      // 4. Reveal booking form
      gsap.fromTo(
        ".elan-booking-card",
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
    <section ref={sectionRef} className="elan-cta" id="book-appointment">
      <div className="elan-cta-glow" aria-hidden="true" />

      <div className="elan-cta-inner">
        {/* LEFT COLUMN: INTRODUCTION */}
        <div className="elan-cta-copy">
          <span className="elan-cta-eyebrow">
            <span>✳</span> YOUR MOMENT OF SELF-CARE
          </span>

          <h2>
            Your next
            <br />
            <em>self-care moment</em>
            <br />
            is just a click away.
          </h2>

          <p className="elan-cta-description">
            Beautiful nails, relaxing treatments and a little time just for you.
            Tell us what you have in mind, and let us take care of the rest.
          </p>

          <div className="elan-cta-note">
            <span className="elan-cta-note-icon">✦</span>
            <div>
              <strong>A little luxury. A lot of care.</strong>
              <span>Your beauty experience starts here.</span>
            </div>
          </div>

          <div className="elan-cta-decoration" aria-hidden="true">
            <span>É</span>
            <div className="elan-cta-decoration-line" />
            <span>BEAUTY · CARE · CONFIDENCE</span>
          </div>
        </div>

        {/* RIGHT COLUMN: IMAGE CARDS + BOOKING FORM */}
        {/* We dynamically append `is-spread` here when user interacts */}
        <div className={`elan-cta-interactive-area ${isSpread ? "is-spread" : ""}`}>
          {/* THREE IMAGE CARDS */}
          <div
            ref={cardStackRef}
            className="elan-cta-card-stack"
            aria-hidden="true"
          >
            <svg
              className="elan-cta-leader-svg"
              viewBox="0 0 400 400"
              aria-hidden="true"
            >
              <path
                className="elan-cta-leader-line"
                d="M 50 150 Q 150 100 280 180"
                stroke="rgba(179, 139, 88, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="200"
                fill="none"
              />
            </svg>

            <div className="elan-cta-card-item card-1">
              <img
                src="https://images.unsplash.com/photo-1639629509821-c54cdd984227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                alt=""
                loading="lazy"
              />
            </div>

            <div className="elan-cta-card-item card-2">
              <img
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85"
                alt=""
                loading="lazy"
              />
            </div>

            <div className="elan-cta-card-item card-3">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85"
                alt=""
                loading="lazy"
              />
            </div>
          </div>

          {/* BOOKING FORM CARD */}
          <div className="elan-booking-card">
            <div className="elan-booking-heading">
              <span className="elan-booking-eyebrow">
                LET&apos;S PLAN YOUR VISIT
              </span>

              <h3>
                Book your <em>appointment.</em>
              </h3>

              <p>
                Share a few details and we&apos;ll help you plan your visit.
              </p>
            </div>

            {submitted ? (
              <div className="elan-booking-success" role="status">
                <span className="elan-success-icon">✓</span>

                <h4>Thank you, {formData.name}!</h4>

                <p>
                  Your appointment request has been completed in this demo.
                  Please contact the salon directly to confirm your booking.
                </p>

                <button
                  type="button"
                  className="elan-booking-reset"
                  onClick={resetForm}
                >
                  Make another request <span>↗</span>
                </button>
              </div>
            ) : (
              <form
                className="elan-booking-form"
                onSubmit={handleSubmit}
                onFocus={() => setIsSpread(true)} // Triggers spreading when any field is focused
              >
                <div className="elan-form-row">
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
                      placeholder="Your phone number"
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

                <div className="elan-form-row">
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

                <button className="elan-booking-submit" type="submit">
                  <span>booking</span>
                </button>

                <p className="elan-booking-disclaimer">
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