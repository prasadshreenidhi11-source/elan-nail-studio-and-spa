import React from "react";
import Services1Hero from "./Services1Hero";
import ServicesMarquee from "./ServicesMarquee";
import ServicesListSection from "./ServicesListSection";

export default function Services1() {
  return (
    <div className="services1-page-wrapper">
      <Services1Hero />
      <ServicesMarquee/>
      <ServicesListSection/>
    </div>
  );
}