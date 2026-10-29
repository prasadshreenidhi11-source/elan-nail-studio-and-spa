import React, { useState, useRef, useEffect } from "react";
import "./Testimonials.css";

const testimonials = [
  // Manicure & Pedicure
  {
    name: "August Eric Borne",
    service: "Manicure & Pedicure",
    review:
      "The only place that I feel comfortable getting my mani and pedi done is Elan Nail Studio and Spa. Nice salon and very clean too. Staff are friendly, they know what they’re doing and always with a smile. I highly recommend this salon!",
    initials: "AB",
  },
  {
    name: "Kavya Ramesh",
    service: "Manicure & Pedicure",
    review:
      "I brought my mother here for a full mani-pedi treatment. The level of care, hygiene, and attention to detail was unparalleled. Our cuticles were treated gently and the polish finish lasted over three weeks!",
    initials: "KR",
  },
  {
    name: "Ananya Deshmukh",
    service: "Manicure & Pedicure",
    review:
      "An absolute haven of tranquility! The spa manicure includes a rich massage that melts away stress. The scrub and hydration mask left my hands incredibly soft and glowing.",
    initials: "AD",
  },
  {
    name: "Samantha Reed",
    service: "Manicure & Pedicure",
    review:
      "Cleanliness is my top priority when visiting any spa, and Elan exceeded every expectation. Sterilized tools, warm hospitality, and flawless nail shaping every single visit.",
    initials: "SR",
  },
  {
    name: "Pooja Hegde",
    service: "Manicure & Pedicure",
    review:
      "The manicure and pedicure combo is pure luxury. The staff takes time with every step without rushing. Truly the gold standard for pampering in the city!",
    initials: "PH",
  },

  // Gel Nails
  {
    name: "Parbbonni Bhowmik",
    service: "Gel Nails",
    review:
      "To me they are the most professional experts in gel nails. I have been there thrice in spite of the fact that I need to travel 18km from my residence. I can’t find any other nail salon that matches their expertise. Absolutely love their service.",
    initials: "PB",
  },
  {
    name: "Meera Kapoor",
    service: "Gel Nails",
    review:
      "My gel polish stayed pristine with zero chipping or dulling for a full month! The shine is high-gloss and the application is thin and natural. Worth every penny.",
    initials: "MK",
  },
  {
    name: "Tanya Sharma",
    service: "Gel Nails",
    review:
      "The precision during cuticle work and gel curing is unmatched. No burning under the light, no lifting at the edges. I will never go anywhere else for gel nails!",
    initials: "TS",
  },
  {
    name: "Rhea Singhania",
    service: "Gel Nails",
    review:
      "Elan's collection of gel shades is unbelievable! From translucent nudes to vibrant metallic tones, they have everything. The finish is mirror-smooth.",
    initials: "RS",
  },
  {
    name: "Natasha Varma",
    service: "Gel Nails",
    review:
      "Gel overlay removed and reapplied with zero damage to my original nails. Their technicians prioritize nail health above everything else. 10/10 service!",
    initials: "NV",
  },

  // Nail Extensions
  {
    name: "Ritika Birla",
    service: "Nail Extensions",
    review:
      "I got nail extensions done here and it being my first time, the experience was amazing! The staff is really nice and very professional. Just loved the experience.",
    initials: "RB",
  },
  {
    name: "Sneha Nair",
    service: "Nail Extensions",
    review:
      "I opted for subtle almond acrylic extensions. They felt surprisingly lightweight and completely natural. I received so many compliments during my wedding week!",
    initials: "SN",
  },
  {
    name: "Divya Menon",
    service: "Nail Extensions",
    review:
      "The shape and apex they create on gel extensions is pure art. No chunky thickness, just sleek, elegant, durable nails that withstand daily work.",
    initials: "DM",
  },
  {
    name: "Farah Khan",
    service: "Nail Extensions",
    review:
      "Extremely hygienic extension process. They use fresh files and buffers for every client. The extension longevity is remarkable with zero lift after 3 weeks.",
    initials: "FK",
  },
  {
    name: "Sanjana Roy",
    service: "Nail Extensions",
    review:
      "Best extension technicians in town! They listened carefully to my desired length and shape. The finished acrylic set looked even better than my Pinterest inspiration.",
    initials: "SR",
  },

  // Nail Care
  {
    name: "Erin Masias",
    service: "Nail Care",
    review:
      "The best nail studio in Whitefield. The ambience, customer service and quality of products make it worth it. I've always received prompt service and friendly, quality care.",
    initials: "EM",
  },
  {
    name: "Shreya Ghoshal",
    service: "Nail Care",
    review:
      "My damaged, brittle nails transformed after just two care sessions at Elan. Their strengthening oil treatment and therapeutic massage restored my natural shine.",
    initials: "SG",
  },
  {
    name: "Alisha Patel",
    service: "Nail Care",
    review:
      "A soothing experience every time! They focus heavily on nail health, skin hydration, and gentle cuticle maintenance rather than just aesthetic coats.",
    initials: "AP",
  },
  {
    name: "Bhavna Iyer",
    service: "Nail Care",
    review:
      "Every product used smells divine and feels ultra-hydrating. The nail care regimen rejuvenated my dry hands after months of sanitizer overuse.",
    initials: "BI",
  },
  {
    name: "Deepika Rao",
    service: "Nail Care",
    review:
      "If you care about long-term healthy natural nails, Elan is the place. Thorough assessment, customized care kits, and serene ambience.",
    initials: "DR",
  },

  // Nail Art & Salon Experience
  {
    name: "Rajni Devaiah",
    service: "Nail Art & Salon Experience",
    review:
      "Loved the ambience, neat and clean surroundings, and beautiful colour themes. The staff were pleasant and did a very fine nail art. Next time I would love to take an appointment!",
    initials: "RD",
  },
  {
    name: "Preeti Kennedy",
    service: "Nail Art & Extensions",
    review:
      "I've been using Elan for about 10 years. Having used some of the other franchises I can say Elan is definitely the best nail salon in Bangalore. The entire team is very professional and the whole experience is very relaxing.",
    initials: "PK",
  },
  {
    name: "Isha Dutt",
    service: "Nail Art & Salon Experience",
    review:
      "Hand-painted minimalist line art executed with microscopic perfection! The nail artist took her time and duplicated the exact design I requested.",
    initials: "ID",
  },
  {
    name: "Aakanksha Joshi",
    service: "Nail Art & Salon Experience",
    review:
      "From 3D charms to chrome powders and subtle gradient ombré, their art repertoire is vast. The aesthetic coffee bar and soft lounge lighting make it a 5-star experience.",
    initials: "AJ",
  },
  {
    name: "Trisha Sen",
    service: "Nail Art & Salon Experience",
    review:
      "The salon atmosphere instantly calms your mind. Warm welcome drink, ambient relaxing soundscape, and world-class nail art talent.",
    initials: "TS",
  },

  // Pedicure & Foot Massage
  {
    name: "Jalyssa Roycroft",
    service: "Pedicure & Foot Massage",
    review:
      "These ladies do a wonderful job. Skilled nail technicians and quality products. The atmosphere is nice and they do their best to make you feel comfortable and pampered!",
    initials: "JR",
  },
  {
    name: "Nandini Reddy",
    service: "Pedicure & Foot Massage",
    review:
      "The reflexology foot massage during the pedicure relief felt heavenly after a long week of work. Softened cracked heels completely and felt incredibly relaxing.",
    initials: "NR",
  },
  {
    name: "Siddharth Verma",
    service: "Pedicure & Foot Massage",
    review:
      "As a man visiting a nail spa for the first time, I felt completely comfortable. The foot soak, scrub, and massage were deeply therapeutic. Highly recommend to all men!",
    initials: "SV",
  },
  {
    name: "Monika Das",
    service: "Pedicure & Foot Massage",
    review:
      "Relaxing plush massage chairs, warm herbal foot baths, and impeccable nail shaping. My feet feel brand new!",
    initials: "MD",
  },
  {
    name: "Zoya Sheikh",
    service: "Pedicure & Foot Massage",
    review:
      "The scrub, essential oil massage, and hot towel wrapping made this the best pedicure experience in my life. Pure luxury!",
    initials: "ZS",
  },
];

const filterCategories = [
  "All",
  "Manicure & Pedicure",
  "Gel Nails",
  "Nail Extensions",
  "Nail Care",
  "Nail Art",
  "Pedicure & Foot Massage",
];

function TestimonialCard({ testimonial }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    }
  };

  return (
    <article
      ref={cardRef}
      className="testimonial-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="testimonial-card-glow" />
      <div className="testimonial-card-top">
        <span className="testimonial-quote-mark" aria-hidden="true">
          “
        </span>

        <div className="testimonial-stars" aria-label="5 out of 5 stars">
          ★★★★★
        </div>
      </div>

      <p className="testimonial-review">{testimonial.review}</p>

      <div className="testimonial-card-divider" />

      <div className="testimonial-author">
        <div className="testimonial-avatar" aria-hidden="true">
          {testimonial.initials}
        </div>

        <div className="testimonial-author-details">
          <h3>{testimonial.name}</h3>
          <span>{testimonial.service}</span>
        </div>

        <span className="testimonial-verified" aria-label="Customer review">
          ✦
        </span>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const marqueeTrackRef = useRef(null);

  const filteredTestimonials = testimonials.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.service.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  // Duplicate items 3x for seamless infinite marquee loop
  const marqueeList = [
    ...filteredTestimonials,
    ...filteredTestimonials,
    ...filteredTestimonials,
  ];

  const handleScrollPrev = () => {
    if (marqueeTrackRef.current) {
      marqueeTrackRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const handleScrollNext = () => {
    if (marqueeTrackRef.current) {
      marqueeTrackRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section className="testimonials-section" id="testimonials">
      {/* Motion Ambient Background Aura */}
      <div className="aura-bg-layer" aria-hidden="true">
        <div className="aura-blob aura-blob-1"></div>
        <div className="aura-blob aura-blob-2"></div>
      </div>

      <div className="testimonials-heading">
        <span className="testimonials-eyebrow">
          ✳ &nbsp; A LITTLE LOVE FROM OUR CLIENTS
        </span>

        <h2>
          Kind words.
          <br />
          <span>Beautiful experiences.</span>
        </h2>

        <p>
          Every visit has a story. Here’s what our lovely clients have to say
          about their Elan experience.
        </p>

        {/* Filter Badges */}
        <div className="testimonials-filters" role="tablist">
          {filterCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedFilter === category ? "active" : ""
              }`}
              onClick={() => setSelectedFilter(category)}
              role="tab"
              aria-selected={selectedFilter === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Auto Marquee Container */}
      <div className="testimonials-marquee-wrapper">
        <button
          className="nav-btn marquee-nav-btn prev-btn"
          onClick={handleScrollPrev}
          aria-label="Scroll left"
        >
          ←
        </button>

        <div className="testimonials-marquee" ref={marqueeTrackRef}>
          <div className="testimonials-track">
            {marqueeList.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${testimonial.service}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>

        <button
          className="nav-btn marquee-nav-btn next-btn"
          onClick={handleScrollNext}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="testimonials-bottom">
        <span>
          <span className="testimonials-bottom-star">✳</span>
          BEAUTY IS BETTER WHEN SHARED
        </span>

        <a
href="/about"
className="testimonials-cta"

>

<span>Discover Elan</span> <span className="testimonials-cta-arrow" aria-hidden="true">
↗ </span> </a>

      </div>
    </section>
  );
}