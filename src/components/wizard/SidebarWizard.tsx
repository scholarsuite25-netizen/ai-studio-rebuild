'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { UI_FACULTIES } from '@/lib/faculties';
import {
  Sparkles,
  Layers,
  UserCheck,
  Building,
  User,
  Newspaper,
  PlusCircle,
  Wand2,
  CheckCircle2,
  BookOpen,
  ListOrdered,
} from 'lucide-react';
import { BindingMarginMode } from '@/types';

export const SidebarWizard: React.FC = () => {
  const {
    wizard,
    updateWizard,
    setWizardStep,
    insertFacultyBanner,
    insertResearcherProfile,
    insertNewsArticle,
    insertPrincipalOfficersGrid,
    insertForewordBlock,
    insertTableOfContentsBlock,
    activeFacultyId,
    setActiveFacultyId,
    bindingMargin,
    setBindingMargin,
  } = useAppStore();

  const [activeSubTab, setActiveSubTab] = useState<'wizard' | 'blocks'>('blocks');

  // Form states for block insertion
  const [forewordBadge, setForewordBadge] = useState('FOREWORD');
  const [officerName, setOfficerName] = useState('Professor K. O. Adebowale, mni, fspsp, FAS');
  const [officerTitle, setOfficerTitle] = useState('Vice-Chancellor');
  const [officerStatement, setOfficerStatement] = useState(
    'I am delighted to write the foreword for the 2025 University of Ibadan research report. The University of Ibadan is a world-class institution known for its academic excellence...'
  );
  const [officerPhoto, setOfficerPhoto] = useState('');

  const [researcherName, setResearcherName] = useState('Prof. A. S. Jegede');
  const [researcherDept, setResearcherDept] = useState('Department of Sociology');
  const [researcherArea, setResearcherArea] = useState('Medical Sociology & Bioethics');
  const [researcherEmail, setResearcherEmail] = useState('sayjegede@gmail.com');
  const [researcherPubs, setResearcherPubs] = useState(
    'Jegede, A. S. et al. (2025). Key considerations: Post-trauma impacts in conflict-affected communities in northern Nigeria. Social Science in Humanitarian Action (SSHAP).'
  );

  const [newsHeadline, setNewsHeadline] = useState('UI Researchers Develop Infant Formula with Locally Sourced Materials');
  const [newsBody, setNewsBody] = useState(
    'Researchers in the Department of Agricultural Extension and Food Technology at the University of Ibadan have produced Nutri-Active infant formula through TETFund grant support...'
  );
  const [newsPhoto, setNewsPhoto] = useState('');
  const [newsCaption, setNewsCaption] = useState('Prof. M. K. Yahaya and research team at the public presentation');

  return (
    <aside className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-[#002147] to-indigo-900 text-white flex items-center justify-between border-b border-[#DAA520]">
        <div className="flex items-center space-x-2 font-semibold">
          <Sparkles size={18} className="text-[#DAA520]" />
          <span>UI 2025 Master Builder</span>
        </div>
        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
          2025 Edition
        </span>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('blocks')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'blocks'
              ? 'border-indigo-600 text-indigo-600 bg-white shadow-sm'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Layers size={14} />
          <span>6 Layout Blocks</span>
        </button>
        <button
          onClick={() => setActiveSubTab('wizard')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'wizard'
              ? 'border-indigo-600 text-indigo-600 bg-white shadow-sm'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Wand2 size={14} />
          <span>Draft Wizard</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {/* 1. Binding Margin Gutter Switcher */}
        <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-indigo-900 font-bold text-[11px]">
            <div className="flex items-center space-x-1">
              <BookOpen size={13} />
              <span>Binding Left Margin (Gutter)</span>
            </div>
            <span className="text-[10px] bg-indigo-200 px-1.5 py-0.5 rounded font-semibold uppercase">
              {bindingMargin}
            </span>
          </div>
          <p className="text-[10.5px] text-indigo-700 leading-tight">
            Leaves 1.5" left margin clearance so physical binding never swallows text.
          </p>
          <div className="flex gap-1 pt-1">
            {(['standard', 'generous', 'spine_bound'] as BindingMarginMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setBindingMargin(mode)}
                className={`flex-1 py-1 text-[10px] font-semibold rounded capitalize transition-all ${
                  bindingMargin === mode
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {mode.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Faculty Theme Selector */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[10px]">
            Active Faculty & Official Color (23 UI Presets)
          </label>
          <select
            value={activeFacultyId}
            onChange={(e) => setActiveFacultyId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-800 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {UI_FACULTIES.map((fac) => (
              <option key={fac.id} value={fac.id}>
                {fac.name}
              </option>
            ))}
          </select>
        </div>

        {activeSubTab === 'blocks' ? (
          <div className="space-y-3.5 pt-1 animate-in fade-in">
            {/* Block 1: Principal Officers Page */}
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-gray-900">
                <UserCheck size={14} className="text-indigo-600" />
                <span>1. Principal Officers Page (Page 4 Style)</span>
              </div>
              <p className="text-[10.5px] text-gray-500">
                Inserts official 3x2 grid of VC, DVCs, Registrar, Bursar, and Librarian portraits.
              </p>
              <button
                onClick={insertPrincipalOfficersGrid}
                className="w-full flex items-center justify-center space-x-1 bg-[#002147] hover:bg-indigo-900 text-white font-medium py-1.5 px-3 rounded text-xs transition-all shadow-sm"
              >
                <PlusCircle size={14} />
                <span>Insert Officers Grid</span>
              </button>
            </div>

            {/* Block 2: Executive Foreword / Preface */}
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-gray-900">
                <UserCheck size={14} className="text-amber-600" />
                <span>2. Executive Foreword / Preface (Page 5-6 Style)</span>
              </div>
              <select
                value={forewordBadge}
                onChange={(e) => setForewordBadge(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              >
                <option value="FOREWORD">FOREWORD (Vice-Chancellor)</option>
                <option value="PREFACE">PREFACE (Director RMO)</option>
              </select>
              <input
                type="text"
                placeholder="Officer Name"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="Title / Office"
                value={officerTitle}
                onChange={(e) => setOfficerTitle(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <textarea
                rows={2}
                placeholder="Foreword / Statement..."
                value={officerStatement}
                onChange={(e) => setOfficerStatement(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none resize-none"
              />
              <input
                type="url"
                placeholder="Photo URL (optional)"
                value={officerPhoto}
                onChange={(e) => setOfficerPhoto(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <button
                onClick={() =>
                  insertForewordBlock(forewordBadge, officerName, officerTitle, officerPhoto, officerStatement)
                }
                className="w-full flex items-center justify-center space-x-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-all shadow-sm"
              >
                <PlusCircle size={14} />
                <span>Insert Foreword Block</span>
              </button>
            </div>

            {/* Block 3: Faculty Divider Banner */}
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-gray-900">
                <Layers size={14} className="text-[#00A651]" />
                <span>3. Faculty Banner Divider Page</span>
              </div>
              <p className="text-[10.5px] text-gray-500">
                Inserts full-width slanted trapezoid divider banner using active faculty's official color.
              </p>
              <button
                onClick={() => insertFacultyBanner(activeFacultyId)}
                className="w-full flex items-center justify-center space-x-1 bg-[#00A651] hover:bg-emerald-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-all shadow-sm"
              >
                <PlusCircle size={14} />
                <span>Insert Faculty Banner</span>
              </button>
            </div>

            {/* Block 4: Table of Contents Block */}
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-gray-900">
                <ListOrdered size={14} className="text-blue-600" />
                <span>4. Table of Contents (Page 7-10 Style)</span>
              </div>
              <button
                onClick={insertTableOfContentsBlock}
                className="w-full flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-all shadow-sm"
              >
                <PlusCircle size={14} />
                <span>Insert Table of Contents</span>
              </button>
            </div>

            {/* Block 5: Researcher Profile Block */}
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-gray-900">
                <User size={14} className="text-emerald-600" />
                <span>5. Researcher Profile & Citations</span>
              </div>
              <input
                type="text"
                placeholder="Researcher Name"
                value={researcherName}
                onChange={(e) => setResearcherName(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="Department"
                value={researcherDept}
                onChange={(e) => setResearcherDept(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="Research Area"
                value={researcherArea}
                onChange={(e) => setResearcherArea(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={researcherEmail}
                onChange={(e) => setResearcherEmail(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <textarea
                rows={2}
                placeholder="2025 Publications, Grants & PhD Supervision..."
                value={researcherPubs}
                onChange={(e) => setResearcherPubs(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none resize-none"
              />
              <button
                onClick={() =>
                  insertResearcherProfile(
                    researcherName,
                    researcherDept,
                    researcherArea,
                    researcherEmail,
                    researcherPubs
                  )
                }
                className="w-full flex items-center justify-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-all shadow-sm"
              >
                <PlusCircle size={14} />
                <span>Insert Researcher Profile</span>
              </button>
            </div>

            {/* Block 6: RMO News & Innovation Article */}
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex items-center space-x-1.5 font-semibold text-gray-900">
                <Newspaper size={14} className="text-purple-600" />
                <span>6. RMO News & Innovation Article</span>
              </div>
              <input
                type="text"
                placeholder="Article Headline"
                value={newsHeadline}
                onChange={(e) => setNewsHeadline(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <textarea
                rows={3}
                placeholder="Article Body..."
                value={newsBody}
                onChange={(e) => setNewsBody(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none resize-none"
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={newsPhoto}
                onChange={(e) => setNewsPhoto(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="Image Caption"
                value={newsCaption}
                onChange={(e) => setNewsCaption(e.target.value)}
                className="w-full border rounded p-1.5 text-xs outline-none"
              />
              <button
                onClick={() => insertNewsArticle(newsHeadline, newsBody, newsPhoto, newsCaption)}
                className="w-full flex items-center justify-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-all shadow-sm"
              >
                <PlusCircle size={14} />
                <span>Insert News Article</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-1 animate-in fade-in">
            <div className="flex border-b pb-2 text-[11px] font-semibold text-gray-500">
              <button
                onClick={() => setWizardStep(1)}
                className={`flex-1 py-1 text-center ${
                  wizard.currentStep === 1 ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
                }`}
              >
                1. Report Info
              </button>
              <button
                onClick={() => setWizardStep(2)}
                className={`flex-1 py-1 text-center ${
                  wizard.currentStep === 2 ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
                }`}
              >
                2. Theme
              </button>
              <button
                onClick={() => setWizardStep(3)}
                className={`flex-1 py-1 text-center ${
                  wizard.currentStep === 3 ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
                }`}
              >
                3. Compile
              </button>
            </div>

            {wizard.currentStep === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Issue & Volume Tag</label>
                  <input
                    type="text"
                    value={wizard.issueNumber}
                    onChange={(e) => updateWizard({ issueNumber: e.target.value })}
                    className="w-full border rounded p-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Report Summary Topic</label>
                  <textarea
                    rows={4}
                    value={wizard.prompt}
                    onChange={(e) => updateWizard({ prompt: e.target.value })}
                    placeholder="Describe report highlights..."
                    className="w-full border rounded p-2 text-xs outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {wizard.currentStep === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={wizard.targetAudience}
                    onChange={(e) => updateWizard({ targetAudience: e.target.value })}
                    className="w-full border rounded p-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Editorial Tone</label>
                  <select
                    value={wizard.tone}
                    onChange={(e) => updateWizard({ tone: e.target.value })}
                    className="w-full border rounded p-2 text-xs outline-none"
                  >
                    <option value="Academic & Formal">Academic & Formal</option>
                    <option value="Executive Bulletin">Executive Bulletin</option>
                    <option value="Public Press Release">Public Press Release</option>
                  </select>
                </div>
              </div>
            )}

            {wizard.currentStep === 3 && (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                <h4 className="font-bold text-gray-900 text-sm">Ready to Compile</h4>
                <p className="text-gray-500 text-[11px]">
                  Clicking compile will draft the full UI 2025 Research Report structure for your active faculty.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
