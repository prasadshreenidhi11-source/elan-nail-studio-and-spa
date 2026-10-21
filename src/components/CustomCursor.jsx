import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Quick setters for butter-smooth movement using GSAP
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    
    const setFollowerX = gsap.quickSetter(follower, "x", "px");
    const setFollowerY = gsap.quickSetter(follower, "y", "px");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Instant snap for the center dot
      setCursorX(mouseX);
      setCursorY(mouseY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth lag loop for the outer ring
    let animationFrameId;
    const render = () => {
      followerX += (mouseX - followerX) * 0.15; // 0.15 controls the lag speed
      followerY += (mouseY - followerY) * 0.15;
      
      setFollowerX(followerX);
      setFollowerY(followerY);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Hover effect for interactive elements (links, buttons, inputs, cards)
    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, input, select, textarea, .elan-booking-card")) {
        follower.classList.add("is-hovered");
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, input, select, textarea, .elan-booking-card")) {
        follower.classList.remove("is-hovered");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="elan-cursor-wrapper" aria-hidden="true">
      <div ref={cursorRef} className="elan-cursor-dot" />
      <div ref={followerRef} className="elan-cursor-ring" />
    </div>
  );
}