'use client';

import React from 'react';

export const UIBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Top-Left Corner Accent Lines (Navy & Gold) */}
      <div className="absolute top-0 left-0 w-44 h-44 z-10">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <polygon points="0,0 70,0 0,70" fill="#002147" /> {/* Deep Navy */}
          <polygon points="70,0 85,0 0,85 0,70" fill="#DAA520" /> {/* Gold */}
          
          {/* Thin double corner border frame */}
          <line x1="20" y1="50" x2="100" y2="50" stroke="#002147" strokeWidth="1" />
          <line x1="20" y1="55" x2="110" y2="55" stroke="#002147" strokeWidth="0.75" />
          <line x1="50" y1="20" x2="50" y2="100" stroke="#002147" strokeWidth="1" />
          <line x1="55" y1="20" x2="55" y2="110" stroke="#002147" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Top-Right Official UI Crest Logo Badge (Pushed right with z-20) */}
      <div className="absolute top-5 right-6 w-16 h-20 flex flex-col items-center z-20">
        <img src="/ui_logo.png" alt="University of Ibadan Crest Logo" className="w-full h-full drop-shadow-md object-contain" />
      </div>

      {/* Centered Official High-Res UI Crest Logo Watermark (Visible & Crisp at 14% Opacity) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/ui_logo.png"
          alt="UI Official Watermark Logo"
          className="w-[420px] max-w-[80%] h-auto max-h-[550px] object-contain opacity-[0.14] filter contrast-125"
        />
      </div>

      {/* Bottom-Right Corner Accent Lines (Navy & Gold) */}
      <div className="absolute bottom-0 right-0 w-44 h-44 z-10">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <polygon points="200,200 130,200 200,130" fill="#002147" />
          <polygon points="130,200 115,200 200,115 200,130" fill="#DAA520" />
          
          {/* Thin double corner border frame */}
          <line x1="100" y1="150" x2="180" y2="150" stroke="#002147" strokeWidth="1" />
          <line x1="90" y1="145" x2="180" y2="145" stroke="#002147" strokeWidth="0.75" />
          <line x1="150" y1="100" x2="150" y2="180" stroke="#002147" strokeWidth="1" />
          <line x1="145" y1="90" x2="145" y2="180" stroke="#002147" strokeWidth="0.75" />
        </svg>
      </div>
    </div>
  );
};
