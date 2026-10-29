import React, { useState } from "react";

export default function ContactBookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    services: [],
    date: "",
    hour: "",
    minute: "",
    ampm: "AM"
  });

  const servicesList = [
    "MANICURE",
    "PEDICURE",
    "NAIL ART",
    "WAXING",
    "HAIR SPA",
    "HAIR CUTS",
    "EYELASH TINTING",
    "GEL POLISH",
    "NAIL EXTENSIONS",
    "RELAXATION & REFLEXOLOGY SERVICES"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceName) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(serviceName);
      if (isSelected) {
        return {
          ...prev,
          services: prev.services.filter((item) => item !== serviceName)
        };
      } else {
        return { ...prev, services: [...prev.services, serviceName] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Form Submitted:", formData);
    alert("Thank you! Your appointment request has been submitted.");
  };

  return (
    <div className="booking-form-card">
      <span className="form-tagline">BOOK AN APPOINTMENT</span>
      <h2 className="form-title">Your Self-Care Journey Awaits</h2>
      <p className="form-sub">
        Fill in the details below and we'll confirm your appointment shortly. We can't wait to pamper you!
      </p>

      <form onSubmit={handleSubmit} className="appointment-form">
        {/* 1. Full Name */}
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 2. Email & Phone Row */}
        <div className="form-row">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* 3. Service Checkbox Selection Grid */}
        <div className="form-group service-checkbox-section">
          <label className="section-label">Service</label>
          <div className="services-checkbox-grid">
            {servicesList.map((service) => (
              <label key={service} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <span className="service-text">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Date & Time Selectors */}
        <div className="form-row date-time-row">
          <div className="form-group">
            <label className="section-label">DATE *</label>
            <input
              type="date"
              name="date"
              placeholder="Choose A Date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="section-label">Time (10am - 7:30pm)</label>
            <div className="time-select-inputs">
              <input
                type="text"
                name="hour"
                placeholder="Hr"
                maxLength="2"
                value={formData.hour}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="minute"
                placeholder="Min"
                maxLength="2"
                value={formData.minute}
                onChange={handleInputChange}
              />
              <select
                name="ampm"
                value={formData.ampm}
                onChange={handleInputChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Location Notice */}
        <div className="form-location-notice">
          <strong>Location:</strong> Miraya Rose, Siddapura, Whitefield, Bengaluru
        </div>

        {/* 6. Submit Button */}
        <button type="submit" className="submit-btn">
          BOOK AN APPOINTMENT <span>→</span>
        </button>
      </form>
    </div>
  );
}