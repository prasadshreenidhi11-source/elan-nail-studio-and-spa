import React from "react";
import "./ServicesListSection.css";

const servicesData = [
  {
    id: "manicure",
    title: "Manicure",
    subtitle: "Xpress & Spa Manicures with precision care",
    description:
      "Whether you prefer a classic French manicure, a long-lasting gel application, or an indulgent spa treatment with organic scrubs, our expert manicurists shape, clean, and pamper your hands to perfection.",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80",
    benefits: [
      "Exfoliates, hydrates & softens skin",
      "Reduces stress with therapeutic massage",
      "Boosts blood flow & vital circulation",
    ],
  },
  {
    id: "pedicure",
    title: "Pedicure",
    subtitle: "Relaxing foot soaks & restorative care",
    description:
      "Treat your feet to an ultimate relaxation experience. Our pedicures feature warm herbal baths, gentle heel buffing, and specialized products to remove tension and bacteria while keeping heels soft.",
    image: "https://images.unsplash.com/photo-1778098221994-015e8abb4336?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    benefits: [
      "Promotes deep relaxation and calms the mind",
      "Improves foot hygiene and skin health",
      "Soothes tired arches and stiffness",
    ],
  },
  {
    id: "nail-extensions",
    title: "Nail Extensions",
    subtitle: "Acrylic & Soft Gel custom lengths",
    description:
      "Our experienced nail technicians offer custom acrylic and lightweight soft gel extensions tailored to your desired shape and length, combining high durability with a natural feel.",
    image: "https://images.unsplash.com/photo-1754799670410-b282791342c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    benefits: [
      "Long-lasting and highly durable solution",
      "Flawless apex shaping and custom fit",
      "Improves appearance of uneven or damaged nails",
    ],
  },
  {
    id: "nail-art",
    title: "Nail Artistry",
    subtitle: "Ombré, chrome powders & custom designs",
    description:
      "With a limitless array of colors, textures, and finishes, our artists bring your vision to life—from minimalist hand-painted lines to shimmering chrome, 3D charms, and intricate marbling.",
    image: "https://media.istockphoto.com/id/475371187/photo/nail-art-flower.webp?a=1&b=1&s=612x612&w=0&k=20&c=39ZfqKf6hgvGoMXycY0CUxY0RS0rvG8h-U7kWlrF7z0=",
    benefits: [
      "Express your unique personality and style",
      "Versatile choices: Ombré, Marbling, Embedments",
      "Meticulous hand-painted precision",
    ],
  },
  {
    id: "nail-finishes",
    title: "Nail Finishes",
    subtitle: "Glossy gel, dipping powder & French tips",
    description:
      "Give your nails a polished, vibrant look with our extensive finishes. From classic French gel to durable dipping powders, we safeguard your nails against chipping and breakage.",
    image: "https://media.istockphoto.com/id/959843610/photo/happy-girl-getting-her-nails-done-at-the-salon.webp?a=1&b=1&s=612x612&w=0&k=20&c=rbCfgtg43vwjeOqmoizUVsdsOR4LAE2FHWcQk9x--jU=",
    benefits: [
      "Protective layer prevents nail damage & chipping",
      "Mirror-smooth gloss and high durability",
      "Healthy, vibrant, clean appearance",
    ],
  },
  {
    id: "paraffin",
    title: "Paraffin Treatment",
    subtitle: "Deep moisturising warm wax therapy",
    description:
      "Experience our luxurious paraffin treatment using premium warm wax to deeply soften dry hands and feet while soothing joint stiffness and improving circulation.",
    image: "https://images.unsplash.com/photo-1713085085470-fba013d67e65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    benefits: [
      "Intensely softens and moisturises the skin",
      "Relieves joint pain and stiffness",
      "Enhances overall relaxation",
    ],
  },
  {
    id: "reflexology",
    title: "Relaxation & Reflexology",
    subtitle: "Holistic wellness with warm herbal balls",
    description:
      "Escape daily stress with our reflexology and targeted back-neck-shoulder massages. Using soothing herbal balls and natural oils, we restore balance to your body and mind.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
    benefits: [
      "Reduces tension and eliminates built-up toxins",
      "Calms the nervous system and improves well-being",
      "Deeply therapeutic herbal warmth",
    ],
  },
  {
    id: "hair-wash",
    title: "Hair Wash & Conditioning",
    subtitle: "Deluxe scalp cleansing & refreshing rinses",
    description:
      "Revitalize your hair with our deluxe cleansing and nourishing washes. Accompanied by a soothing scalp massage, we wash away impurities and restore natural shine.",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
    benefits: [
      "Deep cleansing removes buildup and excess oils",
      "Nourishing treatment strengthens hair strands",
      "Soothing scalp massage eases mental tension",
    ],
  },
  {
    id: "hair-spa",
    title: "Hair Spa Treatments",
    subtitle: "Intensive repair & scalp health therapy",
    description:
      "Pamper your hair with our customized hair spa rituals designed to moisturize the scalp, prevent dandruff, and repair damaged locks with rich deep-conditioning masks.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
    benefits: [
      "Improves scalp circulation to promote healthy growth",
      "Deep conditioning reduces breakage and split ends",
      "Prevents itching, dandruff, and seasonal hair fall",
    ],
  },
  {
    id: "hair-cuts",
    title: "Hair Cuts & Styling",
    subtitle: "Modern cuts & professional styling advice",
    description:
      "Our experienced stylists keep up with the latest trends to give you a classic trim or a bold new look tailored perfectly to your facial structure and lifestyle.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    benefits: [
      "Expert styling tailored to your unique features",
      "Professional advice on at-home hair maintenance",
      "Refreshed, healthy, and fashionable appearance",
    ],
  },
  {
    id: "waxing",
    title: "Waxing & Depilation",
    subtitle: "Advanced depilation for silky smooth skin",
    description:
      "Achieve silky-smooth skin from head to toe with our professional waxing and low-pain depilation options, followed by cooling post-care lotions.",
    image: "https://images.unsplash.com/photo-1700760933941-3a06a28fbf47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    benefits: [
      "Longer-lasting smoothness compared to shaving",
      "Gentle formulations suitable for sensitive skin",
      "Exfoliates dead skin cells during removal",
    ],
  },
  {
    id: "threading-tinting",
    title: "Facial Threading & Tinting",
    subtitle: "Precise eyebrow shaping & lash/brow tinting",
    description:
      "Enhance your natural features with eco-friendly facial threading and premium lash/brow tinting that defines your eyes and saves time on your daily makeup routine.",
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    benefits: [
      "Chemical-free precise hair removal for sensitive skin",
      "Long-lasting tints last 4 to 6 weeks",
      "Beautiful, defined brows without daily makeup",
    ],
  },
];

export default function ServicesListSection() {
  return (
    <section className="services-list-section" id="services-details">
      <div className="services-list-container">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={service.id}
              className={`service-item-row ${isEven ? "row-reversed" : ""}`}
            >
              <div className="service-item-image-col">
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="service-image-badge">✦ Signature Care</div>
                </div>
              </div>

              <div className="service-item-content-col">
                <span className="service-item-tag">0{index + 1} / ELAN MENU</span>
                <h2>{service.title}</h2>
                <p className="service-item-subtitle">{service.subtitle}</p>
                <p className="service-item-desc">{service.description}</p>

                <ul className="service-benefits-list">
                  {service.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="benefit-icon">✦</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-item-actions">
                  <a href="/pricing" className="service-book-cta">
  <span>Book Appointment</span>
  <span className="service-cta-arrow">↗</span>
</a>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}