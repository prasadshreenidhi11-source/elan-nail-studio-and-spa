import React from "react";
import PricingHero from "./PricingHero";
import "./Pricing.css";

const pricingSectionsData = [
  {
    id: "manicure",
    name: "Manicure",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80",
    items: [
      { title: "Xpress Manicure (Regular Polish)", price: "₹850" },
      { title: "Xpress Manicure (Gel Colour)", price: "₹1,500" },
      { title: "Spa Manicure (Regular Polish)", price: "₹1,250" },
      { title: "Spa Manicure (Gel Colour)", price: "₹1,900" },
      { title: "Kids Manicure (Regular Polish)", price: "₹500" },
      { title: "Kids Manicure (Gel Colour – Above 8 yrs)", price: "₹1,100" },
    ],
  },
  {
    id: "pedicure",
    name: "Pedicure",
    image: "https://images.unsplash.com/photo-1778098221994-015e8abb4336?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    items: [
      { title: "Xpress Pedicure (Regular Polish)", price: "₹1,050" },
      { title: "Xpress Pedicure (Gel Colour)", price: "₹1,700" },
      { title: "Spa Pedicure (Regular Polish)", price: "₹1,450" },
      { title: "Spa Pedicure (Gel Colour)", price: "₹2,100" },
      { title: "Kids Pedicure (Regular Polish)", price: "₹600" },
      { title: "Kids Pedicure (Gel Colour – Above 8 yrs)", price: "₹1,300" },
    ],
  },
  {
    id: "extensions",
    name: "Nail Extensions",
    image: "https://images.unsplash.com/photo-1772322586785-3a34772cbc61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    items: [
      { title: "Acrylic Extensions (Regular Polish)", price: "₹2,800" },
      { title: "Acrylic Extensions (Gel Colour)", price: "₹3,300" },
      { title: "Gel Extensions (Regular Polish)", price: "₹3,000" },
      { title: "Gel Extensions (Gel Colour)", price: "₹3,800" },
      { title: "Acrylic Overlay On Nails (Regular)", price: "₹2,100" },
      { title: "Acrylic Overlay On Nails (Gel)", price: "₹2,600" },
      { title: "Soft Gel Extension (Gel Polish)", price: "₹2,900" },
    ],
  },
  {
    id: "nail-art",
    name: "Nail Art",
    image: "https://images.unsplash.com/photo-1735236007245-9dc6e28bbe56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    note: "Featuring 1000 shades in Normal Lacquers / 600 shades in Gel Colours.",
    items: [
      { title: "Art - Simple Design", price: "₹200 / nail" },
      { title: "Art - Shaded / Multi-Coloured", price: "₹250 - ₹350 / nail" },
      { title: "Ombré With Gel", price: "₹200 / nail" },
      { title: "Marbling With Gel", price: "₹300 / nail" },
      { title: "Embellishments", price: "₹200 - ₹350 / nail" },
      { title: "Embedment In Gel", price: "₹300 / nail" },
    ],
  },
  {
    id: "nail-finishes",
    name: "Nail Finishes",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
    items: [
      { title: "Normal Polish", price: "₹300" },
      { title: "Gel Polish", price: "₹800" },
      { title: "French Gel", price: "₹1,000" },
      { title: "Dipping Powder", price: "₹1,500" },
      { title: "Chrome - Solid Colours", price: "₹1,500" },
    ],
  },
  {
    id: "facial-threading",
    name: "Facial Threading",
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    items: [
      { title: "Eyebrows", price: "₹100" },
      { title: "Upper Lip", price: "₹80" },
      { title: "Chin", price: "₹70" },
      { title: "Lower Lip", price: "₹80" },
      { title: "Forehead", price: "₹100" },
      { title: "Side Logs", price: "₹175" },
      { title: "Full Facial Threading", price: "₹500" },
    ],
  },
  {
    id: "waxing",
    name: "WAXING WITH ADVANCED DEPILATION SYSTEM",
    image: "https://plus.unsplash.com/premium_photo-1661431392914-e3fc8ff0e51a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    note: "Advanced depilation system for sensitive skin.",
    items: [
      { title: "Underarms", price: "₹350" },
      { title: "Upper Lip / Side Logs", price: "₹150" },
      { title: "Full Face", price: "₹650" },
      { title: "Bikini Line", price: "₹1,200" },
      { title: "Full Bikini Wax", price: "₹2,200" },
      { title: "Full Legs", price: "₹1,100" },
    ],
  },
  {
    id: "relaxation",
    name: "Relaxation & Reflexology",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    items: [
      { title: "Foot Reflexology (30 mins)", price: "₹900" },
      { title: "Foot Reflexology (40 mins)", price: "₹1,200" },
      { title: "Foot Reflexology (60 mins with herbal ball)", price: "₹1,800" },
      { title: "Back & Neck Shoulder Massage (20 mins)", price: "₹800" },
      { title: "Back & Neck Shoulder Massage (Herbal Ball)", price: "₹1,200" },
    ],
  },
  {
    id: "hair-wash-styling",
    name: "Hair Wash & Blow Dry",
    image: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    items: [
      { title: "Hair Wash / Blast Dry", price: "₹600" },
      { title: "Hair Wash with Blow Dry", price: "₹900" },
      { title: "Hair Wash with Curls Setting", price: "₹1,200" },
    ],
  },
  {
    id: "hair-spa-treatments",
    name: "Hair Spa Treatments",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
    items: [
      { title: "Damage Repair Hair Spa", price: "₹1,500" },
      { title: "Scalp Nourishment & Hydration Spa", price: "₹1,800" },
      { title: "Anti-Dandruff Intensive Treatment", price: "₹2,000" },
    ],
  },
  {
    id: "hair-cut-styling",
    name: "Hair Cut & Styling",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80",
    items: [
      { title: "Hair Cut – Trim / Short-Mid", price: "₹850" },
      { title: "Hair Cut – Style Change", price: "₹1,200" },
      { title: "Bang / Fringe Cut", price: "₹400" },
    ],
  },
  {
    id: "paraffin-treatment",
    name: "Paraffin Treatment",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    note: "Deep moisturizing and joint relief treatment.",
    items: [
      { title: "Paraffin Treatment (Hands / Feet pair)", price: "₹1,200" },
      { title: "Intense Hydrating Paraffin Mask", price: "₹1,500" },
    ],
  },
];

export default function Pricing() {
  return (
    <main className="elan-inner-page">
      {/* 3D Coverflow Hero Section */}
      <PricingHero />

      {/* Official Pricing Menu Section */}
      <section className="elan-pricing-menu-section" id="pricing-list">
        <div className="elan-pricing-container">
          
          <div className="elan-pricing-header">
            <span className="elan-pricing-eyebrow">✦ &nbsp; OFFICIAL PRICING MENU</span>
            <h2>
              Transparent Investment in <em>Your Self-Care</em>
            </h2>
            <p>
              Explore our complete menu breakdown for manicures, pedicures, extensions, hair care, and wellness services.
            </p>
          </div>

          {/* Sequential Stack of Categories */}
          <div className="elan-pricing-sequence-stack">
            {pricingSectionsData.map((section, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={section.id}
                  className={`elan-pricing-showcase-grid ${
                    isEven ? "flipped" : ""
                  }`}
                >
                  {/* Visual Card Image - Fixed Equal Height */}
                  <div className="elan-pricing-image-card">
                    <img src={section.image} alt={section.name} />
                    <div className="elan-pricing-img-overlay">
                      <span className="elan-img-badge">✦ ÉLAN SIGNATURE</span>
                      <h3>{section.name}</h3>
                      <p>Crafted with premium products and expert techniques.</p>
                    </div>
                  </div>

                  {/* Pricing List Card - Fixed Equal Height */}
                  <div className="elan-pricing-list-card">
                    <div className="elan-list-card-header">
                      <h3>{section.name} Rates</h3>
                      {section.note && (
                        <span className="elan-category-sub-note">{section.note}</span>
                      )}
                    </div>

                    <div className="elan-pricing-items-wrapper">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="elan-price-row">
                          <span className="elan-item-title">{item.title}</span>
                          <div className="elan-price-dots" aria-hidden="true" />
                          <strong className="elan-price-value">{item.price}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="elan-pricing-book-action">
                      <a href="/contact" className="elan-menu-book-btn">
  <span>Book {section.name} Session</span>
  <span className="elan-btn-arrow">↗</span>
</a>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Note Footer */}
          <div className="elan-pricing-note-box">
            <span>✦</span>
            <p>
              All prices include applicable taxes. To book your session at Miraya Rose, Whitefield, call us at <strong>+91 94830 42996</strong>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}