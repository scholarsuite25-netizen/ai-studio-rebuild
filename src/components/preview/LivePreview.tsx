'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useAppStore } from '@/store/useAppStore';
import { UIBackground } from './UIBackground';
import { getFacultyById } from '@/lib/faculties';

export const LivePreview: React.FC = () => {
  const { title, content, showWatermark, activeFacultyId, bindingMargin } = useAppStore();
  const activeFaculty = getFacultyById(activeFacultyId);

  // Sanitize raw HTML string
  const sanitizedContent = useMemo(() => {
    if (typeof window === 'undefined') return content;
    return DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe', 'style', 'img'],
      ADD_ATTR: ['target', 'style', 'src', 'alt', 'class', 'width', 'height', 'align'],
    });
  }, [content]);

  // Binding Margin Gutter Padding (Generous = 1.5in / 85px left offset)
  const marginPaddingClass = useMemo(() => {
    switch (bindingMargin) {
      case 'generous':
        return 'pl-24 pr-12'; // 1.5" Binding Left Margin Clearance
      case 'spine_bound':
        return 'pl-28 pr-10'; // Extra Spine Clearance
      default:
        return 'px-12'; // Standard A4 Margin
    }
  }, [bindingMargin]);

  return (
    <div className="flex-1 bg-gray-200 overflow-y-auto p-4 md:p-8 flex justify-center items-start">
      {/* A4 Sheet Container (210mm x 297mm / ~794px width) */}
      <div className="relative bg-white shadow-2xl rounded-sm w-full max-w-[794px] min-h-[1123px] text-gray-900 font-sans transition-all duration-300">
        
        {/* Letterhead & Centered Watermark Background Layer */}
        {showWatermark && <UIBackground />}

        {/* Document Content Layer */}
        <div className={`relative z-10 py-16 ${marginPaddingClass}`}>
          {/* Main Document Header Title with pr-24 Right Padding so title never overlaps the top-right crest logo */}
          {title && (
            <div className="border-b-2 border-[#002147] pb-4 mb-8 pr-24">
              <h1 className="text-3xl font-extrabold text-[#002147] tracking-tight leading-tight">
                {title}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: activeFaculty.color, color: activeFaculty.textColor }}
                >
                  {activeFaculty.name}
                </span>
                <span className="text-xs text-gray-500">• UI Research Management Office</span>
              </div>
            </div>
          )}

          {/* Render Sanitized HTML Body */}
          <div
            className="prose prose-slate max-w-none prose-headings:text-[#002147] prose-a:text-indigo-600 prose-img:rounded-md leading-relaxed text-sm"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Institutional Footer */}
          <div className="mt-16 pt-6 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 font-medium">
            <div>
              <p className="font-bold text-[#002147]">UNIVERSITY OF IBADAN</p>
              <p>Research Management Office (RMO) • www.ui.edu.ng</p>
            </div>
            <div className="text-right">
              <p>Official Publication • 2025 Edition</p>
              <p className="text-gray-400 text-[10px]">Page 1 of 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
