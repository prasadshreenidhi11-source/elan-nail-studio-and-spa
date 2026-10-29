import React, { useState } from "react";
import "./AboutProducts.css";

// Product Pillars data with unique identifiers and icons
const pillarNodes = [
  {
    id: "suppliers",
    title: "Careful Supplier Selection",
    tagline: "Global Artisanal Excellence",
    description: "Handpicked global artisanal suppliers & cruelty-free ethical laboratories that adhere to rigorous purity standards.",
    icon: "📜",
    stat: "100% Ethical",
    color: "#5c2638",
  },
  {
    id: "ingredients",
    title: "Safe & Pure Ingredients",
    tagline: "Clean Beauty Standard",
    description: "Paraben, phthalate & sulfate-free formulas engineered exclusively for skin health and long-term nail strength.",
    icon: "🌿",
    stat: "Non-Toxic",
    color: "#a77b52",
  },
  {
    id: "shades",
    title: "1,000+ Bespoke Shades",
    tagline: "Infinite Color Palette",
    description: "Over 1,000 luxury lacquers & 600+ signature gel finishes customized for individual skin tones and seasons.",
    icon: "✨",
    stat: "1,600+ Finishes",
    color: "#b67875",
  },
];

export default function AboutProducts() {
  const [activeNode, setActiveNode] = useState(null);
  const [animKey, setAnimKey] = useState(0); // For re-triggering animations
  const [isDrawing, setIsDrawing] = useState(true);

  // Trigger re-animation sequence
  const handleReplayAnimation = () => {
    setIsDrawing(false);
    setActiveNode(null);
    setTimeout(() => {
      setAnimKey((prev) => prev + 1);
      setIsDrawing(true);
    }, 100);
  };

  return (
    <section className="elan-tree-section" id="products-tree">
      {/* Background Floating Leaf Accents */}
      <div className="elan-tree-leaves" aria-hidden="true">
        <span className="tree-leaf leaf-1">🍃</span>
        <span className="tree-leaf leaf-2">🌿</span>
        <span className="tree-leaf leaf-3">🌸</span>
        <span className="tree-leaf leaf-4">✨</span>
      </div>

      <div className="elan-tree-wrap">
        {/* Section Header */}
        <div className="elan-tree-header">
          <span className="elan-tree-subtitle">Architectural Product Hierarchy</span>
          <h2 className="elan-tree-title">
            The ÉLAN Lineage of <em>Pure Luxury</em>
          </h2>
          <p className="elan-tree-desc">
            At the heart of ÉLAN lies an unyielding commitment to uncompromising quality. 
            Trace our formulation tree from our core brand identity down to every artisanal pillar.
          </p>

          <button 
            className="elan-replay-btn" 
            onClick={handleReplayAnimation}
            title="Replay Line Drawing Sequence"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Replay Tree Sequence</span>
          </button>
        </div>

        {/* Dynamic Architectural Tree Diagram Container */}
        <div className={`elan-tree-diagram key-seq-${animKey}`} key={animKey}>
          
          {/* TOP PARENT NODE: ÉLAN Crest / Logo */}
          <div className="elan-parent-node-wrapper">
            <div 
              className={`elan-parent-badge ${activeNode ? "parent-highlighted" : ""}`}
              onMouseEnter={() => setActiveNode(null)}
            >
              <div className="elan-badge-glow" />
              <div className="elan-crest-content">
                <div className="elan-crest-symbol">
                  <svg viewBox="0 0 100 100" className="elan-crest-svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"/>
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <path d="M35 50 Q50 25 65 50 Q50 75 35 50 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="50" cy="50" r="5" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="elan-crest-title">ÉLAN</h3>
                <span className="elan-crest-sub">LUXURY SPA</span>
              </div>
            </div>
          </div>

          {/* SVG MULTI-LINE CONNECTORS (SVG Branching Lines) */}
          <div className="elan-svg-container">
            <svg className="elan-svg-canvas" viewBox="0 0 1000 220" preserveAspectRatio="none">
              <defs>
                {/* Line Gradients */}
                <linearGradient id="lineGradDefault" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5c2638" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a77b52" stopOpacity="0.4" />
                </linearGradient>

                <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5c2638" stopOpacity="1" />
                  <stop offset="50%" stopColor="#b67875" stopOpacity="1" />
                  <stop offset="100%" stopColor="#5c2638" stopOpacity="1" />
                </linearGradient>

                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Main Vertical Trunk */}
              <path
                d="M 500,0 L 500,50"
                className={`svg-trunk-line ${isDrawing ? "draw-line" : ""}`}
                stroke="url(#lineGradDefault)"
                strokeWidth="3"
                fill="none"
              />

              {/* Branch 1: Left Child (Supplier Selection) */}
              <path
                d="M 500,50 C 500,120 180,80 180,220"
                className={`svg-branch-line ${activeNode === "suppliers" ? "active-branch" : ""} ${isDrawing ? "draw-branch-1" : ""}`}
                stroke={activeNode === "suppliers" ? "url(#lineGradActive)" : "url(#lineGradDefault)"}
                strokeWidth={activeNode === "suppliers" ? "3.5" : "2"}
                fill="none"
                filter={activeNode === "suppliers" ? "url(#glowEffect)" : "none"}
              />

              {/* Branch 2: Center Child (Safe Ingredients) */}
              <path
                d="M 500,50 C 500,120 500,120 500,220"
                className={`svg-branch-line ${activeNode === "ingredients" ? "active-branch" : ""} ${isDrawing ? "draw-branch-2" : ""}`}
                stroke={activeNode === "ingredients" ? "url(#lineGradActive)" : "url(#lineGradDefault)"}
                strokeWidth={activeNode === "ingredients" ? "3.5" : "2"}
                fill="none"
                filter={activeNode === "ingredients" ? "url(#glowEffect)" : "none"}
              />

              {/* Branch 3: Right Child (1,000+ Shades) */}
              <path
                d="M 500,50 C 500,120 820,80 820,220"
                className={`svg-branch-line ${activeNode === "shades" ? "active-branch" : ""} ${isDrawing ? "draw-branch-3" : ""}`}
                stroke={activeNode === "shades" ? "url(#lineGradActive)" : "url(#lineGradDefault)"}
                strokeWidth={activeNode === "shades" ? "3.5" : "2"}
                fill="none"
                filter={activeNode === "shades" ? "url(#glowEffect)" : "none"}
              />

              {/* Junction Point Node */}
              <circle cx="500" cy="50" r="5" fill="#5c2638" className="svg-junction-dot" />
            </svg>
          </div>

          {/* BOTTOM CHILDREN NODES (The 3 Product Pillars) */}
          <div className="elan-children-grid">
            {pillarNodes.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`elan-child-card ${activeNode === pillar.id ? "card-active" : ""} child-entrance-${idx + 1}`}
                onMouseEnter={() => setActiveNode(pillar.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => setActiveNode(activeNode === pillar.id ? null : pillar.id)}
              >
                <div className="child-card-border-glow" />
                <div className="child-card-header">
                  <span className="child-card-icon">{pillar.icon}</span>
                  <span className="child-card-stat">{pillar.stat}</span>
                </div>

                <span className="child-card-tagline">{pillar.tagline}</span>
                <h4 className="child-card-title">{pillar.title}</h4>
                <p className="child-card-desc">{pillar.description}</p>

                <div className="child-card-footer">
                  <span className="child-connector-pulse">
                    <span className="pulse-dot" />
                    Connected to ÉLAN Crest
                  </span>
                  <span className="child-arrow">→</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}