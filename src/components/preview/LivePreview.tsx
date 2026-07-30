'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useAppStore } from '@/store/useAppStore';
import { Eye, ShieldCheck, Stamp, BookOpen } from 'lucide-react';
import { UIBackground } from './UIBackground';

export const LivePreview: React.FC = () => {
  const { content, title, viewMode, showWatermark, theme, bindingMargin } = useAppStore();

  const sanitizedContent = useMemo(() => {
    if (typeof window === 'undefined') return content;
    return DOMPurify.sanitize(content);
  }, [content]);

  // Dynamic Viewport Width container matching viewMode state
  const containerWidthClass = {
    desktop: 'w-full max-w-4xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  }[viewMode];

  // Binding Margin Gutter Padding
  const bindingPaddingClass = {
    standard: 'pl-8 md:pl-10 pr-8',
    generous: 'pl-16 md:pl-24 pr-8 border-l-8 border-l-[#002147]/20',
    spine_bound: 'pl-20 md:pl-28 pr-6 border-l-8 border-l-[#DAA520]',
  }[bindingMargin];

  return (
    <div
      className={`flex flex-col h-full rounded-lg border overflow-hidden shadow-sm transition-colors ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-200 text-gray-900'
      }`}
    >
      {/* Top Bar */}
      <div
        className={`px-4 py-2 flex items-center justify-between border-b text-xs font-medium ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-600'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Eye size={14} className="text-indigo-500" />
          <span>UI 2025 Master Preview</span>
        </div>

        <div className="flex items-center space-x-3">
          {bindingMargin !== 'standard' && (
            <div className="flex items-center space-x-1 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-semibold text-[11px] border border-indigo-200">
              <BookOpen size={12} />
              <span>Binding Clearance Active</span>
            </div>
          )}

          {showWatermark && (
            <div className="flex items-center space-x-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold text-[11px] border border-amber-200">
              <Stamp size={12} />
              <span>UI Letterhead Active</span>
            </div>
          )}

          <div className="flex items-center space-x-1 text-emerald-600">
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">DOMPurify Active</span>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className={`flex-1 overflow-y-auto p-4 flex justify-center items-start relative ${
          theme === 'dark' ? 'bg-gray-950' : 'bg-gray-200/70'
        }`}
      >
        <div
          className={`relative min-h-[650px] shadow-2xl rounded-lg py-10 md:py-12 transition-all duration-300 ${containerWidthClass} ${bindingPaddingClass} ${
            theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
          }`}
        >
          {/* UI Official Letterhead Watermark Overlay */}
          {showWatermark && <UIBackground />}

          <div className="relative z-10 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-800 tracking-tight">
              {title}
            </h1>
            <div
              className={`prose max-w-none leading-relaxed ${
                theme === 'dark' ? 'prose-invert text-gray-200' : 'prose-indigo text-gray-800'
              }`}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
