'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { SidebarWizard } from '../wizard/SidebarWizard';
import { TiptapEditor } from '../editor/TiptapEditor';
import { LivePreview } from '../preview/LivePreview';
import { Header } from './Header';
import { ExportModal } from '../export/ExportModal';
import { DocumentManagerModal } from '../dashboard/DocumentManagerModal';
import { TemplateGalleryModal } from '../templates/TemplateGalleryModal';

export const AppContainer: React.FC = () => {
  const { activeTab, theme } = useAppStore();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <Header />

      {/* Main Grid View */}
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1800px] w-full mx-auto overflow-hidden">
        {/* Sidebar Wizard Column */}
        <div
          className={`md:col-span-3 h-[calc(100vh-6rem)] ${
            activeTab === 'wizard' ? 'block' : 'hidden md:block'
          }`}
        >
          <SidebarWizard />
        </div>

        {/* Tiptap Editor Column */}
        <div
          className={`md:col-span-5 h-[calc(100vh-6rem)] ${
            activeTab === 'editor' ? 'block' : 'hidden md:block'
          }`}
        >
          <TiptapEditor />
        </div>

        {/* Live Preview Column */}
        <div
          className={`md:col-span-4 h-[calc(100vh-6rem)] ${
            activeTab === 'preview' ? 'block' : 'hidden md:block'
          }`}
        >
          <LivePreview />
        </div>
      </main>

      {/* Modals */}
      <ExportModal />
      <DocumentManagerModal />
      <TemplateGalleryModal />
    </div>
  );
};
