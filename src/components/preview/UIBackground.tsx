'use client';

import React from 'react';

export const UIBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Top-Left Corner Accent Stripes (Navy & Gold - Strictly bounded to corner) */}
      <div className="absolute top-0 left-0 w-32 h-32 z-0">
        <svg className="w-full h-full" viewBox="0 0 150 150" fill="none">
          <polygon points="0,0 50,0 0,50" fill="#002147" /> {/* Deep Navy */}
          <polygon points="50,0 62,0 0,62 0,50" fill="#DAA520" /> {/* Gold */}
        </svg>
      </div>

      {/* Top-Right Official UI Crest Logo Badge (EXACT Crisp Uploaded Logo Image) */}
      <div className="absolute top-5 right-6 w-20 h-24 flex items-center justify-center z-20">
        <img
          src="/ui_logo.png"
          alt="University of Ibadan Crest Logo"
          className="w-full h-full drop-shadow-md object-contain"
        />
      </div>

      {/* Centered Official High-Res UI Crest Logo Watermark (NO BOX, NO TEXT, Pure Sharp Logo Image at 12% Opacity) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/ui_logo.png"
          alt="UI Official Watermark Logo"
          className="w-[450px] max-w-[80%] h-auto max-h-[580px] object-contain opacity-[0.12] filter contrast-125"
        />
      </div>

      {/* Bottom-Right Corner Accent Lines (Navy & Gold) */}
      <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
        <svg className="w-full h-full" viewBox="0 0 150 150" fill="none">
          <polygon points="150,150 100,150 150,100" fill="#002147" />
          <polygon points="100,150 88,150 150,88 150,100" fill="#DAA520" />
        </svg>
      </div>
    </div>
  );
};
