import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Scissors, 
  Palette, 
  Droplet, 
  Flame, 
  ChevronRight,
  Sliders,
  Check
} from 'lucide-react';
import './ProductsShowcase.css';

const SERVICES = [
  {
    id: 'nail-art',
    num: '01',
    title: 'Nail Art',
    subtitle: 'A little colour. A lot of character.',
    description: 'Experiment with signature ÉLAN nail colors, glossy glazes, and bespoke finishes.',
    icon: Palette,
    optionsLabel: 'Select Polish & Nail Look',
    options: [
      { 
        id: 'rose', 
        name: 'Nude Rose', 
        hex: '#bf7770', 
        benefit: 'Classic Sheer Elegance',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80' 
      },
      { 
        id: 'berry', 
        name: 'Berry Noir', 
        hex: '#4a1525', 
        benefit: 'Deep Burgundy Drama',
        image: 'https://images.unsplash.com/photo-1571666612432-ccfcafff3930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' 
      },
      { 
        id: 'pearl', 
        name: 'Pearl Glaze', 
        hex: '#f4ede2', 
        benefit: 'Iridescent Chrome Shimmer',
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80' 
      },
      { 
        id: 'emerald', 
        name: 'Emerald Lustre', 
        hex: '#1b4332', 
        benefit: 'Rich Jewel-Toned Polish',
        image: 'https://images.unsplash.com/photo-1688583417770-ff6cc18071dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' 
      },
      { 
        id: 'gold', 
        name: 'Gold Leaf', 
        hex: '#d4af37', 
        benefit: 'Bespoke Foil Accents',
        image: 'https://images.unsplash.com/photo-1769687209448-025548dfca8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' 
      }
    ]
  },
  {
    id: 'hair-styling',
    num: '02',
    title: 'Hair Styling',
    subtitle: 'Your hair, your signature.',
    description: 'Explore rich hair tones, soft dimension, and glossy blowouts curated by master stylists.',
    icon: Scissors,
    optionsLabel: 'Select Hair Style & Tone',
    options: [
      { 
        id: 'blonde', 
        name: 'Honey Blonde Balayage', 
        hex: '#e6c88b', 
        benefit: 'Sun-Kissed Dimensional Glow',
        image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80' 
      },
      { 
        id: 'espresso', 
        name: 'Espresso Wave', 
        hex: '#2b1b17', 
        benefit: 'Rich Glossy Brunette Waves',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpaFsyUWtZWfUAnDuZ1a0ybGAWFmiSRY4Hv5fUqf-JJA&s=10' 
      },
      { 
        id: 'auburn', 
        name: 'Auburn Glow', 
        hex: '#a34828', 
        benefit: 'Warm Copper & Bronze Tones',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbsgf0VZrh1cFp6ylaNtDXmNAELNP_SM0pPzkqui3Alg&s=10' 
      },
      { 
        id: 'platinum', 
        name: 'Platinum Sleek', 
        hex: '#f0ede6', 
        benefit: 'Icy Glass-Finish Straight',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc2ZQQVe0rIEfFV8koUp0F47CMLrFB3bDw8BwA6rFC5w&s=10' 
      },
      { 
        id: 'velvet', 
        name: 'Velvet Black', 
        hex: '#111113', 
        benefit: 'Deep Onyx Mirror Shine',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd85gFFTZzw1ROdczkNJHm5RBgIGHqYKjLZm_ugp4Hcw&s=10'
      }
    ]
  },
  {
    id: 'skin-care',
    num: '03',
    title: 'Skin Care',
    subtitle: 'Make room for your glow.',
    description: 'Experience customized elixirs, targeted serums, and soothing mask rituals.',
    icon: Droplet,
    optionsLabel: 'Select Skin Ritual',
    options: [
      { 
        id: 'serum', 
        name: 'Hydrating Glow Serum', 
        hex: '#bf7770', 
        benefit: '+84% Immediate Moisture Boost',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80' 
      },
      { 
        id: 'elixir', 
        name: 'Rosehip Elixir', 
        hex: '#d4af37', 
        benefit: 'Deep Radiance & Oil Nourishment',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdJkgDkFMkSaMizlOsl3C-hfEbCXo9X1BKe-gPJ5xJA&s=10' 
      },
      { 
        id: 'charcoal', 
        name: 'Charcoal Detox Mask', 
        hex: '#3a3330', 
        benefit: 'Pore Clarifying & Purifying Spa',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKy16ZhTGinOvHOOorAN9U2O1nrDPkk_IR1r_S4DKUHg&s=10' 
      },
      { 
        id: 'botanical', 
        name: 'Golden Botanical Oil', 
        hex: '#88a070', 
        benefit: 'Soothing Barrier Renewal Massage',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXUG4XVxLpwMSX_59whHlxr4HCLGj4HIe17TSVf00AqA&s=10' 
      }
    ]
  },
  {
    id: 'lash-brow',
    num: '04',
    title: 'Lash & Brow',
    subtitle: 'The beauty is in the details.',
    description: 'Preview handcrafted eyelash extensions and precision brow architecture.',
    icon: Eye,
    optionsLabel: 'Select Lash & Brow Style',
    options: [
      { 
        id: 'natural', 
        name: 'Natural Feathered Lash', 
        hex: '#4a3d36', 
        benefit: 'Soft Daily Volume & Natural Lift',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlaYNml1tW3uWx_otpfltfxRtQMyH4OtHYlbR6_VSGg&s=10' 
      },
      { 
        id: 'cateye', 
        name: 'Cat-Eye Volume', 
        hex: '#1c1715', 
        benefit: 'Elongated Outer Corner Flutter',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGpJrD1wn_0C6nOCuK8DsT7GBc32ndRlVsUN7SrmGlNw&s=10' 
      },
      { 
        id: 'bold', 
        name: 'Bold Defined Arch', 
        hex: '#2b221e', 
        benefit: 'Sculpted Brow Tint & Full Volume',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNC8Q7DHFzEAVeeGeBIuto2JOC4nNmSxC9lmq54Fzoiw&s=10' 
      },
      { 
        id: 'wispy', 
        name: 'Soft Wispy Flutter', 
        hex: '#68574d', 
        benefit: 'Textured Hybrid Lash Design',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAk3lABInzdh07vh-fa_9oGdvPyK7t0ificbRT4CXDGw&s=10'
      }
    ]
  },
  {
    id: 'waxing',
    num: '05',
    title: 'Waxing',
    subtitle: 'Feel good in your own skin.',
    description: 'Explore soothing botanical waxes and nourishing post-smooth skin polishes.',
    icon: Flame,
    optionsLabel: 'Select Waxing Formula',
    options: [
      { 
        id: 'honey', 
        name: 'Warm Honey Gel', 
        hex: '#c8963e', 
        benefit: 'Hydrating Smooth Gel Peel',
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&q=80' 
      },
      { 
        id: 'lavender', 
        name: 'Lavender Calming Wax', 
        hex: '#8b7ca8', 
        benefit: 'Sensitive Skin Botanical Blend',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnrteFUiTdtZmsrorrYAT2n8gOslAhZdVo5Ci6tt7IQ&s' 
      },
      { 
        id: 'aloe', 
        name: 'Aloe Soothing Polish', 
        hex: '#6a9c78', 
        benefit: 'Cooling Post-Wax Hydration',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisAXb5JOdpt7vVfetbAF6_YKlMhs0ynQpsT7Igs5_jQ&s=10' 
      },
      { 
        id: 'pearl', 
        name: 'Golden Pearl Wax', 
        hex: '#d4af37', 
        benefit: 'Luxury Low-Temperature Hard Wax',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbHKO8IW62dgNeE5xqbBZGfSarrJT3qQmoSCDrdfmT-w&s=10' 
      }
    ]
  }
];

export default function ProductsShowcase() {
  const [activeServiceId, setActiveServiceId] = useState('nail-art');
  const [selectedOptions, setSelectedOptions] = useState({
    'nail-art': SERVICES[0].options[0],
    'hair-styling': SERVICES[1].options[0],
    'skin-care': SERVICES[2].options[0],
    'lash-brow': SERVICES[3].options[0],
    'waxing': SERVICES[4].options[0]
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentService = SERVICES.find((s) => s.id === activeServiceId);
  const currentOption = selectedOptions[activeServiceId] || currentService.options[0];

  const handleOptionSelect = (option) => {
    if (selectedOptions[activeServiceId].id === option.id) return;
    setIsTransitioning(true);
    setSelectedOptions((prev) => ({
      ...prev,
      [activeServiceId]: option
    }));
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handleServiceClick = (serviceId) => {
    if (activeServiceId === serviceId) return;
    setIsTransitioning(true);
    setActiveServiceId(serviceId);
    setTimeout(() => setIsTransitioning(false), 250);
  };

  return (
    <section className="products-showcase" id="products">
      <div className="products-showcase-inner">
        
        {/* HEADER SECTION */}
        <div className="products-header">
          <div>
            <div className="products-eyebrow">
              <span className="products-eyebrow-line"></span>
              THE ELAN EDIT · BEAUTY & SELF-CARE
            </div>
            <h2 className="products-title">
              A world of <span className="products-title-italic">possibilities.</span>
            </h2>
          </div>
          <p className="products-intro">
            Every detail matters. Explore our world of beauty rituals and find the experience that feels most like you.
          </p>
        </div>

        {/* MAIN TWO-COLUMN GRID */}
        <div className="products-grid">
          
          {/* LEFT COLUMN: CANVAS DISPLAY & OPTION PILLS */}
          <div className="products-left-column">
            
            <div className="products-canvas-container">
              <div className="products-badge-top-left">
                <Sparkles style={{ width: '14px', height: '14px', color: '#bf7770' }} />
                <span>YOUR NEXT RITUAL</span>
              </div>
              
              <div className="products-badge-top-right">
                ÉLAN / {currentService.num}
              </div>

              <img 
                src={currentOption.image} 
                alt={currentOption.name} 
                className={`products-stage-image ${isTransitioning ? 'is-transitioning' : 'is-loaded'}`}
              />

              <div className="products-stage-gradient" />

              <div className="products-stage-info">
                <div className="products-info-card">
                  <div className="products-info-meta">
                    <span 
                      className="products-color-dot" 
                      style={{ backgroundColor: currentOption.hex }} 
                    />
                    <span className="products-benefit-text">
                      {currentOption.benefit}
                    </span>
                  </div>
                  <h4 className="products-card-title">
                    {currentOption.name}
                  </h4>
                  <p className="products-card-subtitle">
                    {currentService.title} • {currentService.subtitle}
                  </p>
                </div>

                <div className="products-badge-bottom-right">
                  EST. IN SELF-CARE
                </div>
              </div>
            </div>

            {/* DYNAMIC OPTION SELECTOR PILLS & EXPLORE BUTTON */}
            <div className="products-selector-bar">
              <div className="products-selector-header">
                <div className="products-selector-label-wrapper">
                  <Sliders className="products-selector-icon" />
                  <span>{currentService.optionsLabel}</span>
                </div>
                <span className="products-selector-instruction">
                  Click options to view live result
                </span>
              </div>

              <div className="products-pills-container">
                {currentService.options.map((opt) => {
                  const isSelected = currentOption.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt)}
                      className={`products-option-pill ${isSelected ? 'is-selected' : ''}`}
                    >
                      <span
                        className="pill-dot"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <span>{opt.name}</span>
                      {isSelected && (
                        <Check className="pill-check" />
                      )}
                    </button>
                  );
                })}

                {/* EXPLORE IN SERVICES BUTTON */}
                <a href="#services" className="products-explore-service-btn">
                  <span>Explore in Services</span>
                  <span className="explore-btn-arrow">↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ACCORDION MENU */}
          <div className="products-right-column">
            <div className="products-menu-label">
              EXPLORE OUR SERVICES
            </div>

            <div className="products-accordion-list">
              {SERVICES.map((service) => {
                const isActive = activeServiceId === service.id;

                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className={`products-accordion-item ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="products-item-top">
                      <div className="products-item-left">
                        <span className="products-item-num">
                          {service.num}
                        </span>

                        <div>
                          <h3 className="products-item-title">
                            {service.title}
                          </h3>
                          <p className="products-item-subtitle">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="products-item-indicator">
                        {isActive ? (
                          <div className="active-pulse-badge">
                            <span className="active-pulse-dot" />
                          </div>
                        ) : (
                          <ChevronRight className="chevron-icon" />
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <div className="products-item-expanded">
                        <p className="products-item-desc">
                          {service.description}
                        </p>

                        <div className="products-item-footer-info">
                          <span>{service.options.length} Interactive Styles</span>
                          <span className="active-ritual-tag">Active Ritual</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* BANNER CALLOUT */}
            <div className="products-banner">
              <div>
                <span className="banner-eyebrow">Bespoke Rituals</span>
                <h4 className="banner-title">Ready to experience this ritual in person?</h4>
              </div>
              <button className="banner-button">
                Book Now
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}