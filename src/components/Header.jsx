import { useEffect, useState } from "react";
import "./Header.css";

const navigation = [
{ label: "Home", href: "#home" },
{ label: "About", href: "#about" },
{ label: "Services", href: "#services" },
{ label: "Pricing", href: "#pricing" },
{ label: "Contact", href: "#contact" },
];

function Header() {
const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 30);
};


handleScroll();

window.addEventListener("scroll", handleScroll, { passive: true });

return () => window.removeEventListener("scroll", handleScroll);


}, []);

useEffect(() => {
document.body.classList.toggle("menu-open", menuOpen);


return () => document.body.classList.remove("menu-open");


}, [menuOpen]);

const closeMenu = () => setMenuOpen(false);

return (
<header
className={`site-header ${scrolled ? "is-scrolled" : ""} ${
        menuOpen ? "menu-is-open" : ""
      }`}
> <div className="header-inner"> <a
       href="#home"
       className="brand-logo"
       aria-label="Elan Nail Spa home"
       onClick={closeMenu}
     > <span className="brand-name">élan</span> <span className="brand-subtitle">NAIL STUDIO & SPA</span> </a>


    <nav
      className={`header-nav ${menuOpen ? "nav-open" : ""}`}
      id="primary-navigation"
      aria-label="Main navigation"
    >
      <div className="mobile-nav-brand">
        <span className="mobile-brand-name">élan</span>
        <span>NAIL STUDIO & SPA</span>
      </div>

      {navigation.map((item, index) => (
        <a
          href={item.href}
          className="nav-link"
          style={{ "--nav-index": index }}
          key={item.label}
          onClick={closeMenu}
        >
          <span className="nav-link-text">{item.label}</span>
          <span className="nav-link-line" />
        </a>
      ))}

      <a
        href="tel:9843042996"
        className="mobile-call-button"
        onClick={closeMenu}
      >
        <span>Call the studio</span>
        <span>↗</span>
      </a>

      <span className="mobile-nav-caption">
        A little time, just for you.
      </span>
    </nav>

    <div className="header-actions">
      <a href="tel:9843042996" className="header-call">
        <span className="call-icon" aria-hidden="true">
          ↗
        </span>

        <span className="call-copy">
          <span className="call-label">BOOK YOUR VISIT</span>
          <span className="call-number">98430 42996</span>
        </span>
      </a>

      <button
        type="button"
        className={`menu-toggle ${menuOpen ? "toggle-active" : ""}`}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((previous) => !previous)}
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
