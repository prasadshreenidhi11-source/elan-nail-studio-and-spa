import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, ArrowUpRight } from "lucide-react";
import "./Header.css";

// Put your logo at: public/images/logo.png
const LOGO_SRC = "/images/logo.png";
const LOGO_ALT = "Élan Nail Studio & Spa";
const PHONE_HREF = "tel:+919843042996";
const PHONE_TEXT = "+91 98430 42996";

// Add data-scroll-scrub to your scroll scrub section (the pinned section or its tall wrapper)
const SCRUB_SELECTOR = "[data-scroll-scrub], .scroll-scrub, .scrub-section";

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
const [scrubActive, setScrubActive] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

useEffect(() => {
  const handleScrubState = (event) => {
    setScrubActive(Boolean(event.detail?.active));
  };

  window.addEventListener("elan-scrub-state", handleScrubState);

  return () => {
    window.removeEventListener("elan-scrub-state", handleScrubState);
  };
}, []);
  // Keep the header synchronized with the scroll-scrub animation
useEffect(() => {
  let frame = 0;

  const updateScrollState = () => {
    frame = 0;
    setScrolled(window.scrollY > 40);
  };

  const handleScroll = () => {
    if (!frame) {
      frame = requestAnimationFrame(updateScrollState);
    }
  };

  updateScrollState();

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);

  return () => {
    if (frame) cancelAnimationFrame(frame);

    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);

  // Close the menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Close the menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

const headerClass = [
  "site-header",
  scrolled ? "is-scrolled" : "",
  scrubActive && !menuOpen ? "is-hidden" : "",
  menuOpen ? "menu-is-open" : "",
]
  .filter(Boolean)
  .join(" ");

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <Link to="/" className="brand-logo" aria-label="Élan Nail Studio & Spa home" onClick={closeMenu}>
          <img src={LOGO_SRC} alt={LOGO_ALT} className="brand-logo-img" />
        </Link>

        <nav
          id="primary-navigation"
          className={`header-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`nav-link ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
                <span className="nav-link-line" />
              </Link>
            );
          })}

          <a href={PHONE_HREF} className="mobile-call-button" onClick={closeMenu}>
            <Phone size={16} />
            <span>Call the studio</span>
          </a>
        </nav>

        <div className="header-actions">
          <a href={PHONE_HREF} className="header-call" aria-label={`Call Élan Nail Studio & Spa at ${PHONE_TEXT}`}>
            <Phone size={15} strokeWidth={1.8} />
            <span className="call-number">{PHONE_TEXT}</span>
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "toggle-active" : ""}`}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;