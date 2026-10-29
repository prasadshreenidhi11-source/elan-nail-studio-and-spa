import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollVideo.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Ensure video starts paused at the first frame
    video.pause();
    video.currentTime = 0;

    const setupScrollTrigger = () => {
      const duration = video.duration;
      if (!duration) return;

      // Adjust scroll length for mobile vs desktop (shorter scrub distance on mobile)
      const isMobile = window.innerWidth <= 768;
      const scrollDistance = isMobile ? "+=2200" : "+=4500";

      // Kill any existing triggers on this element before creating a new one
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill();
      });

      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: scrollDistance,
          pin: true,
          scrub: isMobile ? 0.35 : 0.8, // Snappier scrub on mobile for better responsiveness
          invalidateOnRefresh: true,
        },
      });
    };

    if (video.readyState >= 1) {
      setupScrollTrigger();
    } else {
      video.addEventListener("loadedmetadata", setupScrollTrigger);
    }

    // Handle screen orientation/resize updates cleanly
    window.addEventListener("resize", setupScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", setupScrollTrigger);
      video.removeEventListener("loadedmetadata", setupScrollTrigger);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-video-section">
      <div className="scroll-video-wrapper">
        <video
          ref={videoRef}
          src="/videos/clip.mp4"
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="scrub-video"
        />
      </div>
    </div>
  );
}