import React, { useEffect } from "react";
import AboutHero from "./AboutHero";
import AboutMarquee from "./AboutMarquee";
import AboutStory from "./AboutStory";
import AboutProducts from "./AboutProducts"; // Import products section
import AboutTestimonials from "./AboutTestimonials";
import AboutCTA from "./AboutCTA";
export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="ab">
      <AboutHero />
      <AboutMarquee />
      <AboutStory />
      <AboutProducts /> {/* Added here right after story */}
      <AboutTestimonials/>
      <AboutCTA/>
    </main>
  );
}