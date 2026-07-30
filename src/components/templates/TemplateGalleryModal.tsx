'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, LayoutTemplate, Award, Megaphone, BookOpen, FileSpreadsheet, Library } from 'lucide-react';

interface TemplateOption {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  facultyId?: string;
}

const RMO_TEMPLATES: TemplateOption[] = [
  {
    id: 'kenneth-dike-library',
    title: 'Kenneth Dike Library Report',
    category: 'Library & Archival Services',
    description: 'Specialized section layout for Kenneth Dike Library research archives, digital repository & library milestones.',
    icon: <Library size={24} className="text-black" />,
    facultyId: 'kenneth_dike_library',
    content: `
      <div style="background-color: #000000; color: #ffffff; padding: 24px 16px; margin: 32px 0 24px 0; text-align: center; font-weight: bold; font-size: 22px; letter-spacing: 1.5px; border-radius: 4px; border-left: 8px solid #DAA520; text-transform: uppercase;">
        KENNETH DIKE LIBRARY
      </div>

      <h3>University Librarian's Address</h3>
      <p>Kenneth Dike Library (KDL), the premier university library in Nigeria, continues to expand its digital research repositories, open-access journal databases, and archival preservation systems in support of academic excellence.</p>

      <h3>2024/2025 Key Digital Infrastructure Projects</h3>
      <ul>
        <li><strong>UI Institutional Repository Upgrade:</strong> Over 15,000 digitized theses, dissertations, and research publications indexed for global access.</li>
        <li><strong>Research Information Literacy Workshops:</strong> Over 2,500 postgraduate researchers trained on digital citation management and ethical research publishing.</li>
        <li><strong>Rare Archival Preservation Initiative:</strong> Digital preservation of historical manuscripts and African heritage collections.</li>
      </ul>
    `,
  },
  {
    id: 'monthly-digest',
    title: 'Monthly Research Digest',
    category: 'General Bulletin',
    description: 'Standard monthly newsletter structure for Director note, grants, and department highlights.',
    icon: <BookOpen size={24} className="text-indigo-600" />,
    content: `
      <div style="border-bottom: 3px solid #002147; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #002147; margin: 0;">UNIVERSITY OF IBADAN</h2>
        <h3 style="color: #DAA520; margin: 4px 0 0 0;">RESEARCH MANAGEMENT OFFICE (RMO) NEWSLETTER</h3>
        <p style="color: #666; font-size: 12px;">Monthly Research & Innovation Bulletin</p>
      </div>

      <h3>Director's Desk</h3>
      <p>The Research Management Office remains dedicated to fostering cutting-edge research, facilitating collaborative grants, and driving impactful innovations across all faculties.</p>

      <h3>Key Institutional Milestones</h3>
      <ul>
        <li>Over ₦500 Million in competitive external grants secured this quarter.</li>
        <li>Submissions open for the Annual UI Research & Innovation Fair.</li>
        <li>New IP & Technology Transfer guidelines published.</li>
      </ul>
    `,
  },
  {
    id: 'grant-call',
    title: 'Grant & Funding Call Announcement',
    category: 'Funding & Grants',
    description: 'Promotional layout for TETFUND, international grants, and research funding calls.',
    icon: <Award size={24} className="text-amber-600" />,
    content: `
      <div style="border-left: 4px solid #DAA520; padding-left: 16px; margin-bottom: 24px; background: #fffdf5; p: 12px;">
        <h2 style="color: #002147; margin: 0;">CALL FOR RESEARCH PROPOSALS</h2>
        <h4 style="color: #DAA520; margin: 4px 0;">University of Ibadan RMO Grant Alert</h4>
      </div>

      <h3>Grant Details</h3>
      <p><strong>Funding Body:</strong> International Development Research Centre (IDRC) / TETFUND</p>
      <p><strong>Target Audience:</strong> Senior & Postdoctoral Researchers</p>
      <p><strong>Grant Ceiling:</strong> Up to $100,000 per project team</p>

      <h3>Eligibility & Priority Themes</h3>
      <ul>
        <li>Sustainable Agriculture & Food Security</li>
        <li>Public Health & Renewable Energy Solutions</li>
        <li>Digital Humanities & Educational Technology</li>
      </ul>

      <p><strong>Internal Submission Deadline:</strong> October 30, 2026</p>
    `,
  },
  {
    id: 'faculty-spotlight',
    title: 'Faculty Innovation Spotlight',
    category: 'Research Spotlight',
    description: 'Highlight exceptional researchers, published papers, and breakthrough patents.',
    icon: <FileSpreadsheet size={24} className="text-emerald-600" />,
    content: `
      <div style="border-bottom: 2px solid #002147; padding-bottom: 8px; margin-bottom: 16px;">
        <h2 style="color: #002147;">FACULTY RESEARCH SPOTLIGHT</h2>
        <p style="color: #DAA520; font-weight: bold;">Celebrating Academic Excellence at UI</p>
      </div>

      <h3>Featured Breakthrough</h3>
      <p>We celebrate the remarkable achievement of the interdisciplinary research team led by <strong>Prof. A. O. Adeleke</strong> on groundbreaking biomedical research.</p>

      <blockquote style="border-left: 3px solid #002147; padding-left: 12px; color: #444; font-style: italic;">
        "Our mission is to translate laboratory discoveries into real-world health solutions for Nigeria and Africa."
      </blockquote>

      <h3>Publication Citation</h3>
      <p><em>Journal of African Scientific Innovations (2026), Vol. 18, pp. 104-120.</em></p>
    `,
  },
  {
    id: 'workshop-call',
    title: 'Workshop & Conference Call',
    category: 'Events & Seminars',
    description: 'Event notice for RMO grant-writing workshops and research methodology seminars.',
    icon: <Megaphone size={24} className="text-purple-600" />,
    content: `
      <div style="background-color: #002147; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #DAA520; margin: 0;">UI RMO CAPACITY BUILDING WORKSHOP</h2>
        <p style="margin: 4px 0 0 0;">Mastering Competitive Grant Writing & Project Management</p>
      </div>

      <h3>Event Schedule & Venue</h3>
      <p>📅 <strong>Date:</strong> November 12–14, 2026</p>
      <p>📍 <strong>Venue:</strong> Trenchard Hall, University of Ibadan</p>
      <p>🕒 <strong>Time:</strong> 9:00 AM Daily</p>

      <h3>Key Workshop Modules</h3>
      <ul>
        <li>Structuring Winning Grant Proposals</li>
        <li>Budgeting & Compliance for International Donors</li>
        <li>Ethical Approvals & Intellectual Property Protection</li>
      </ul>
    `,
  },
];

export const TemplateGalleryModal: React.FC = () => {
  const { isTemplateModalOpen, setTemplateModalOpen, setContent, setTitle, setActiveFacultyId } = useAppStore();

  if (!isTemplateModalOpen) return null;

  const handleSelectTemplate = (template: TemplateOption) => {
    setTitle(`UI RMO - ${template.title}`);
    setContent(template.content);
    if (template.facultyId) {
      setActiveFacultyId(template.facultyId);
    }
    setTemplateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2 text-gray-900 font-semibold text-lg">
            <LayoutTemplate size={22} className="text-indigo-600" />
            <span>UI RMO Newsletter & Faculty Templates</span>
          </div>
          <button onClick={() => setTemplateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Select a pre-formatted layout specifically designed for University of Ibadan Research Management Office bulletins and Library reports.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
          {RMO_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className="p-4 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/40 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-all">{tmpl.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600">{tmpl.title}</h4>
                  <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tmpl.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{tmpl.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t pt-3">
          <button
            onClick={() => setTemplateModalOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
