'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getFacultyById } from '@/lib/faculties';
import {
  Download,
  LayoutTemplate,
  FolderOpen,
  Monitor,
  Tablet,
  Smartphone,
  Stamp,
  Sun,
  Moon,
  Save,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    title,
    setTitle,
    viewMode,
    setViewMode,
    setExportModalOpen,
    setDashboardOpen,
    setTemplateModalOpen,
    activeTab,
    setActiveTab,
    showWatermark,
    setShowWatermark,
    theme,
    setTheme,
    saveCurrentDocument,
    content,
    activeFacultyId,
  } = useAppStore();

  const activeFaculty = getFacultyById(activeFacultyId);

  // Word count & reading time metrics
  const cleanText = content.replace(/<[^>]*>/g, ' ').trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
      {/* RMO Institutional Crest & Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5">
          {/* Authentic UI Crest Logo */}
          <div className="w-8 h-10 flex items-center justify-center">
            <img src="/ui_logo.svg" alt="University of Ibadan Crest" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-[#002147] text-sm leading-tight">UI RMO Studio</span>
            <span className="text-[10px] text-gray-500 font-medium">Research Report Builder</span>
          </div>
        </div>

        <span className="text-gray-300 hidden sm:inline">|</span>

        {/* Editable Issue Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-gray-800 font-medium bg-transparent hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 border border-transparent rounded px-2 py-1 transition-all outline-none max-w-xs sm:max-w-sm text-sm"
          placeholder="Issue Title..."
        />

        {/* Active Faculty Color Badge */}
        <div
          className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase shadow-sm border border-gray-200"
          style={{ backgroundColor: activeFaculty.color, color: activeFaculty.textColor }}
          title={`Active Faculty: ${activeFaculty.name}`}
        >
          <span>{activeFaculty.name.replace('FACULTY OF ', '')}</span>
        </div>

        {/* Word count badge */}
        <div className="hidden xl:flex items-center space-x-2 text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>~{readingTime} min read</span>
        </div>
      </div>

      {/* Navigation & Controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Mobile View Switcher Tabs */}
        <div className="flex md:hidden bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'wizard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'editor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Dashboard Modal Trigger */}
        <button
          onClick={() => setDashboardOpen(true)}
          className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition-all"
          title="Open Saved Drafts"
        >
          <FolderOpen size={15} className="text-indigo-600" />
          <span className="hidden md:inline">My Reports</span>
        </button>

        {/* Template Gallery Trigger */}
        <button
          onClick={() => setTemplateModalOpen(true)}
          className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition-all"
          title="RMO Templates"
        >
          <LayoutTemplate size={15} className="text-purple-600" />
          <span className="hidden md:inline">Templates</span>
        </button>

        {/* Watermark Toggle */}
        <button
          onClick={() => setShowWatermark(!showWatermark)}
          className={`p-2 rounded-lg transition-all border ${
            showWatermark
              ? 'bg-amber-50 border-amber-300 text-amber-700'
              : 'bg-gray-100 border-gray-200 text-gray-500 hover:text-gray-800'
          }`}
          title={showWatermark ? 'Watermark Enabled' : 'Enable Watermark'}
        >
          <Stamp size={16} />
        </button>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900 transition-all"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-amber-500" />}
        </button>

        {/* Desktop Viewport Switcher */}
        <div className="hidden xl:flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'desktop' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Monitor size={15} />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'tablet' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Tablet size={15} />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Smartphone size={15} />
          </button>
        </div>

        {/* Quick Save */}
        <button
          onClick={saveCurrentDocument}
          className="flex items-center space-x-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-2 rounded-lg transition-all border border-emerald-200"
          title="Save Issue"
        >
          <Save size={15} />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Export Button */}
        <button
          onClick={() => setExportModalOpen(true)}
          className="flex items-center space-x-1.5 bg-[#002147] hover:bg-[#001833] text-white font-semibold px-3.5 py-2 rounded-lg text-xs transition-all shadow-sm active:scale-95 border border-[#DAA520]"
        >
          <Download size={15} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
