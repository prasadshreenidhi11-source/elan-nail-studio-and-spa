import { useEffect } from "react";

import Header from "./components/Header";
import SelfCare from "./components/SelfCare";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import ProductsShowcase from "./components/ProductsShowcase";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  useEffect(() => {
    window.history.replaceState(
      { elanStage: "website" },
      "",
      window.location.href
    );
  }, []);

  return (
    <>
      {/* Smooth Dot and Ring luxury cursor */}
      <CustomCursor />
     
      <div className="elan-home-reveal is-visible">
        <Header />
        <SelfCare />
        <Services />
        <WhyChooseUs />
        <ProductsShowcase />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default App;