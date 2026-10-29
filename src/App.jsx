import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import ScrollVideo from "./components/ScrollVideo";
import SelfCare from "./components/SelfCare";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import ProductsShowcase from "./components/ProductsShowcase";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";

// Separate pages
import About from "./components/About";
import ServicesPage from "./components/Services1";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";

// Intro Preloader Component
import IntroPreloader from "./components/IntroPreloader";

import "./App.css";

function Home() {
  return (
    <>
      <ScrollVideo />
      <SelfCare />
      <Services />
      <WhyChooseUs />
      <ProductsShowcase />
      <Testimonials />
      <CTA />
    </>
  );
}

function AppContent() {
  const [showPreloader, setShowPreloader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <>
      {showPreloader && (
        <IntroPreloader onComplete={() => setShowPreloader(false)} />
      )}

      <CustomCursor />

<Header />

<div className={`elan-home-reveal ${showPreloader ? "is-hidden" : "is-visible"}`}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>

  <Footer />
</div>

    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;