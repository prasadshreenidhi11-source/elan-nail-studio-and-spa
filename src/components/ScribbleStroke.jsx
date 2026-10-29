import React from 'react';
import './ScribbleStroke.css';

export default function ScribbleStroke() {
  return (
    <div className="scribble-container">
      <svg 
        className="scribble-svg" 
        viewBox="0 0 500 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          className="scribble-path"
          d="M10 50C80 10 120 90 200 50C280 10 320 90 400 50C440 30 470 40 490 50" 
          stroke="#bf7770" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}