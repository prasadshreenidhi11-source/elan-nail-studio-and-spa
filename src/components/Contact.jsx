import React, { useEffect } from "react";
import ContactHero from "./ContactHero";
import ContactInfoCards from "./ContactInfoCards";
import ContactBookingForm from "./ContactBookingForm";
import ContactVisualCard from "./ContactVisualCard";
import ContactMapBanner from "./ContactMapBanner";
import "./Contact.css";

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Grid: Info Cards, Booking Form & Visual Feature */}
      <section className="contact-main-section" id="contact-details">
        <div className="contact-grid-container">
          <ContactInfoCards />
          <ContactBookingForm />
          <ContactVisualCard />
        </div>
      </section>

      {/* Location Map Section */}
      <ContactMapBanner />
    </main>
  );
}