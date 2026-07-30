'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, BookOpen, Sparkles, Building2, Newspaper } from 'lucide-react';

export const TemplateGalleryModal: React.FC = () => {
  const { isTemplateModalOpen, setTemplateModalOpen, setContent, setTitle, setActiveFacultyId } = useAppStore();

  if (!isTemplateModalOpen) return null;

  const handleApplyTemplate = (facultyId: string, titleText: string, htmlContent: string) => {
    setActiveFacultyId(facultyId);
    setTitle(titleText);
    setContent(htmlContent);
    setTemplateModalOpen(false);
  };

  const kdlTemplateHTML = `
    <!-- KDL Official Faculty Banner Divider -->
    <div style="background-color: #000000; color: #ffffff; padding: 20px 24px; margin: 0 0 28px 0; font-weight: bold; font-size: 22px; letter-spacing: 1.5px; border-radius: 4px; border-left: 8px solid #DAA520; text-transform: uppercase; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-right: 2px solid #DAA520;">
      KENNETH DIKE LIBRARY (KDL)
    </div>

    <!-- Librarian Address Section Card -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #000000; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <h3 style="color: #002147; font-size: 18px; margin-top: 0; margin-bottom: 10px; border-bottom: 2px solid #DAA520; padding-bottom: 6px;">
        University Librarian's Address
      </h3>
      <p style="font-size: 14px; line-height: 1.7; color: #334155; margin: 0;">
        Kenneth Dike Library (KDL), the premier university library in Nigeria, continues to expand its digital research repositories, open-access journal databases, and archival preservation systems in support of academic excellence across all faculties.
      </p>
    </div>

    <!-- Key Infrastructure Projects Section -->
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <h3 style="color: #002147; font-size: 17px; margin-top: 0; margin-bottom: 14px;">
        2024/2025 Key Digital Infrastructure Projects
      </h3>

      <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; line-height: 1.8; color: #1e293b;">
        <li style="margin-bottom: 10px;">
          <strong style="color: #002147;">UI Institutional Repository Upgrade:</strong> Over 15,000 digitized theses, dissertations, and research publications indexed for global open access.
        </li>
        <li style="margin-bottom: 10px;">
          <strong style="color: #002147;">Research Information Literacy Workshops:</strong> Over 2,500 postgraduate researchers trained on digital citation management and ethical research publishing.
        </li>
        <li style="margin-bottom: 10px;">
          <strong style="color: #002147;">Rare Archival Preservation Initiative:</strong> Digital preservation of historical manuscripts and African heritage collections.
        </li>
      </ul>
    </div>

    <!-- Active Research Support & E-Resources Grid -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
      <div style="border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; background: #ffffff;">
        <h4 style="color: #000000; font-size: 14px; margin-top: 0; margin-bottom: 6px; border-bottom: 1.5px solid #DAA520; padding-bottom: 4px;">
          E-Resources Subscription
        </h4>
        <p style="font-size: 12.5px; color: #475569; margin: 0; line-height: 1.5;">
          Direct access to ScienceDirect, JSTOR, Scopus, IEEE Xplore, and Web of Science for all UI staff and students.
        </p>
      </div>
      <div style="border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; background: #ffffff;">
        <h4 style="color: #000000; font-size: 14px; margin-top: 0; margin-bottom: 6px; border-bottom: 1.5px solid #DAA520; padding-bottom: 4px;">
          Plagiarism Clearance Services
        </h4>
        <p style="font-size: 12.5px; color: #475569; margin: 0; line-height: 1.5;">
          Turnitin originality verification and manuscript compliance support for all postgraduate theses.
        </p>
      </div>
    </div>
  `;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#002147] to-[#003366] text-white">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-amber-400" size={20} />
            <h2 className="font-bold text-lg">UI RMO Report Templates</h2>
          </div>
          <button
            onClick={() => setTemplateModalOpen(false)}
            className="text-gray-300 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Template Options List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Kenneth Dike Library Template */}
          <div className="border-2 border-gray-900 rounded-xl p-5 bg-stone-50 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-black border border-amber-400"></span>
                <h3 className="font-bold text-gray-900 text-base">Kenneth Dike Library (KDL) Report</h3>
              </div>
              <p className="text-xs text-gray-600">
                Official report layout with Black & Gold banner divider, Librarian address card, and digital repository metrics.
              </p>
            </div>
            <button
              onClick={() => handleApplyTemplate('kdl', 'UI RMO - Kenneth Dike Library Report', kdlTemplateHTML)}
              className="bg-black hover:bg-gray-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all border border-amber-400 whitespace-nowrap"
            >
              Apply KDL Template
            </button>
          </div>

          {/* Agriculture Template */}
          <div className="border border-green-200 rounded-xl p-5 bg-emerald-50/50 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#00A651]"></span>
                <h3 className="font-bold text-gray-900 text-base">Faculty of Agriculture Report</h3>
              </div>
              <p className="text-xs text-gray-600">
                Green faculty theme with Dean foreword, crop science research outputs, and grant awards.
              </p>
            </div>
            <button
              onClick={() =>
                handleApplyTemplate(
                  'agriculture',
                  'UI RMO - Faculty of Agriculture Annual Report',
                  `<div style="background-color: #00A651; color: white; padding: 20px; font-weight: bold; font-size: 22px; border-radius: 4px; border-left: 8px solid #002147; margin-bottom: 24px;">FACULTY OF AGRICULTURE</div><h3>Dean's Annual Address</h3><p>The Faculty of Agriculture continues to lead pioneer research in sustainable food security, bio-fortified crop breeding, and digital precision farming...</p>`
                )
              }
              className="bg-[#00A651] hover:bg-green-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all whitespace-nowrap"
            >
              Apply Agriculture Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
