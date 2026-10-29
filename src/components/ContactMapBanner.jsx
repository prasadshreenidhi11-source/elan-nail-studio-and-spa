import React from "react";

export default function ContactMapBanner() {
  return (
    <section className="location-banner-section">
      <div className="location-banner-container">
        <div className="map-placeholder">
          <iframe
            title="ÉLAN Location Map"
            src="https://maps.google.com/maps?q=Miraya%20Rose%20Whitefield%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="location-info-block">
          <span className="loc-tag">OUR LOCATION</span>
          <h2>Find Us In Whitefield</h2>
          <p>
            Step into our serene space at Miraya Rose, Whitefield — where luxury, care and beauty come together.
          </p>
          <div className="loc-address">
            <span className="pin-icon">📍</span>
            <span>Miraya Rose, Unit 7, Varthur Road, Siddapura, Whitefield, Bengaluru</span>
          </div>
          <a
            href="https://maps.google.com/?q=Miraya+Rose+Whitefield+Bengaluru"
            target="_blank"
            rel="noreferrer"
            className="directions-btn"
          >
            Get Directions →
          </a>
        </div>
        <div className="location-side-img">
          {/* Replace src="" with your actual storefront image path */}
          <div className="location-side-img">
  <img src="/images/storefront.jpg" alt="ÉLAN Storefront" />
  <div className="store-tag">Luxury. Care. You.</div>
</div>
          <div className="store-tag">Luxury. Care. You.</div>
        </div>
      </div>
    </section>
  );
}