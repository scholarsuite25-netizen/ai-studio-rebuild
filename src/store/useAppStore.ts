import { create } from 'zustand';
import { AppState, ViewMode, WizardState, ExportOptions, DocumentItem, ThemeMode, BindingMarginMode } from '@/types';
import { getFacultyById } from '@/lib/faculties';

const INITIAL_RMO_CONTENT = `
<div style="border-bottom: 3px solid #002147; padding-bottom: 12px; margin-bottom: 24px;">
  <h2 style="color: #002147; margin: 0; font-size: 24px;">UNIVERSITY OF IBADAN</h2>
  <h3 style="color: #DAA520; margin: 4px 0 0 0; font-weight: 600; font-size: 16px;">RESEARCH MANAGEMENT OFFICE (RMO) NEWSLETTER</h3>
  <p style="color: #666; font-size: 12px; margin-top: 4px;">Vol. 5 | Issue 1 | 2025 Annual Research Report</p>
</div>

<h3>Director's Opening Address</h3>
<p>Welcome to the 2025 edition of the University of Ibadan Annual Research Report. The Research Management Office remains dedicated to fostering cutting-edge research, facilitating collaborative grants, and driving impactful innovations across all faculties.</p>
`;

const STORAGE_KEY = 'rmo_newsletter_documents';

const getInitialDocuments = (): DocumentItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  // Document state
  currentId: 'doc_init',
  title: 'UI 2025 Annual Research Report',
  content: INITIAL_RMO_CONTENT,
  issueNumber: 'Vol. 5 Issue 1 (2025)',
  activeFacultyId: 'agriculture',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setIssueNumber: (issueNumber) => set({ issueNumber }),
  setActiveFacultyId: (activeFacultyId) => set({ activeFacultyId }),

  // Binding Margin Gutter Settings
  bindingMargin: 'generous',
  setBindingMargin: (bindingMargin: BindingMarginMode) => set({ bindingMargin }),

  // Document Management Dashboard
  documents: getInitialDocuments(),
  saveCurrentDocument: () => {
    const { currentId, title, content, issueNumber, activeFacultyId, documents } = get();
    const updatedDoc: DocumentItem = {
      id: currentId,
      title,
      content,
      issueNumber,
      facultyId: activeFacultyId,
      updatedAt: Date.now(),
      author: 'UI Research Management Office',
    };

    const existingIndex = documents.findIndex((d) => d.id === currentId);
    let newDocs: DocumentItem[];

    if (existingIndex >= 0) {
      newDocs = [...documents];
      newDocs[existingIndex] = updatedDoc;
    } else {
      newDocs = [updatedDoc, ...documents];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDocs));
    }

    set({ documents: newDocs });
  },

  loadDocument: (id: string) => {
    const { documents } = get();
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      set({
        currentId: doc.id,
        title: doc.title,
        content: doc.content,
        issueNumber: doc.issueNumber || '',
        activeFacultyId: doc.facultyId || 'agriculture',
        isDashboardOpen: false,
      });
    }
  },

  deleteDocument: (id: string) => {
    const { documents } = get();
    const filtered = documents.filter((d) => d.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    set({ documents: filtered });
  },

  createNewDocument: () => {
    const newId = `doc_${Date.now()}`;
    set({
      currentId: newId,
      title: 'UI 2025 Research Report - Draft',
      content: INITIAL_RMO_CONTENT,
      issueNumber: 'Vol. 5 Issue 1 (2025)',
      activeFacultyId: 'agriculture',
      isDashboardOpen: false,
    });
  },

  // Master Block Insertion Helpers
  insertPrincipalOfficersGrid: () => {
    const officersHTML = `
      <div style="margin: 32px 0; text-align: center;">
        <div style="background-color: #002147; color: white; padding: 8px 16px; font-weight: bold; font-size: 16px; letter-spacing: 1px; margin-bottom: 24px; border-bottom: 3px solid #DAA520;">
          THE PRINCIPAL OFFICERS OF THE UNIVERSITY
        </div>
        
        <!-- VC Center Block -->
        <div style="max-width: 280px; margin: 0 auto 24px auto; text-align: center; border: 3px solid #DAA520; padding: 12px; background: #ffffff; border-radius: 4px;">
          <div style="width: 140px; height: 175px; background: #e5e7eb; margin: 0 auto 8px auto; border: 2px solid #002147; display: flex; align-items: center; justify-content: center; color: #666; font-size: 11px;">[VC Portrait]</div>
          <h4 style="color: #002147; margin: 4px 0 2px 0; font-size: 14px;">Professor K. O. Adebowale, mni, fspsp, FAS</h4>
          <p style="color: #E63946; font-weight: bold; font-size: 12px; margin: 0; font-style: italic;">Vice-Chancellor</p>
        </div>

        <!-- DVCs & Officers Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
          <div style="border: 2px solid #DAA520; padding: 10px; background: #ffffff; border-radius: 4px;">
            <div style="width: 100px; height: 125px; background: #e5e7eb; margin: 0 auto 6px auto; border: 1px solid #002147; font-size: 10px; display: flex; align-items: center; justify-content: center;">[Photo]</div>
            <h5 style="color: #002147; margin: 2px 0; font-size: 12px;">Professor Peter O. Olapegba</h5>
            <p style="color: #E63946; font-size: 10.5px; font-weight: bold; margin: 0;">Deputy Vice-Chancellor (Administration)</p>
          </div>
          <div style="border: 2px solid #DAA520; padding: 10px; background: #ffffff; border-radius: 4px;">
            <div style="width: 100px; height: 125px; background: #e5e7eb; margin: 0 auto 6px auto; border: 1px solid #002147; font-size: 10px; display: flex; align-items: center; justify-content: center;">[Photo]</div>
            <h5 style="color: #002147; margin: 2px 0; font-size: 12px;">Professor Aderonke M. Baiyeroju</h5>
            <p style="color: #E63946; font-size: 10.5px; font-weight: bold; margin: 0;">Deputy Vice-Chancellor (Academic)</p>
          </div>
          <div style="border: 2px solid #DAA520; padding: 10px; background: #ffffff; border-radius: 4px;">
            <div style="width: 100px; height: 125px; background: #e5e7eb; margin: 0 auto 6px auto; border: 1px solid #002147; font-size: 10px; display: flex; align-items: center; justify-content: center;">[Photo]</div>
            <h5 style="color: #002147; margin: 2px 0; font-size: 12px;">Professor Oluyemisi A. Bamgbose, SAN</h5>
            <p style="color: #E63946; font-size: 10.5px; font-weight: bold; margin: 0;">Deputy Vice-Chancellor (RISP)</p>
          </div>
        </div>
      </div>
    `;
    set((state) => ({ content: state.content + officersHTML }));
  },

  insertForewordBlock: (badgeTitle: string, officerName: string, titleStr: string, photoUrl: string, text: string) => {
    const forewordHTML = `
      <div style="margin: 32px 0;">
        <div style="background-color: #002147; color: white; display: inline-block; padding: 6px 20px; border-radius: 20px; font-weight: bold; font-size: 16px; letter-spacing: 1px; margin-bottom: 20px;">
          ${badgeTitle.toUpperCase()}
        </div>

        <div style="clear: both; overflow: hidden; margin-bottom: 16px;">
          ${photoUrl ? `<img src="${photoUrl}" alt="${officerName}" style="float: left; width: 140px; height: 175px; border: 3px solid #DAA520; object-fit: cover; margin: 0 20px 12px 0; border-radius: 4px;" />` : ''}
          <div style="font-size: 13.5px; line-height: 1.6; color: #222;">
            ${text}
          </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 8px; margin-top: 16px;">
          <p style="font-weight: bold; color: #002147; margin: 0;">${officerName}</p>
          <p style="color: #666; font-size: 12px; margin: 2px 0 0 0;">${titleStr}</p>
        </div>
      </div>
    `;
    set((state) => ({ content: state.content + forewordHTML }));
  },

  insertTableOfContentsBlock: () => {
    const tocHTML = `
      <div style="margin: 32px 0;">
        <h2 style="color: #002147; border-bottom: 3px solid #DAA520; padding-bottom: 8px;">TABLE OF CONTENTS</h2>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #00A651; color: white; font-weight: bold; margin-bottom: 6px; border-radius: 4px;">
          <span>FACULTY OF AGRICULTURE</span>
          <span>Page 29</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #C46210; color: white; font-weight: bold; margin-bottom: 6px; border-radius: 4px;">
          <span>FACULTY OF ARTS</span>
          <span>Page 41</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #00A896; color: white; font-weight: bold; margin-bottom: 6px; border-radius: 4px;">
          <span>FACULTY OF BASIC MEDICAL SCIENCES</span>
          <span>Page 66</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #EAB308; color: #111827; font-weight: bold; margin-bottom: 6px; border-radius: 4px;">
          <span>FACULTY OF SCIENCE</span>
          <span>Page 291</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #D4AF37; color: #002147; font-weight: bold; margin-bottom: 6px; border-radius: 4px;">
          <span>FACULTY OF TECHNOLOGY</span>
          <span>Page 328</span>
        </div>
      </div>
    `;
    set((state) => ({ content: state.content + tocHTML }));
  },

  insertFacultyBanner: (facultyId: string) => {
    const faculty = getFacultyById(facultyId);
    const bannerHTML = `
      <div style="background-color: ${faculty.color}; color: ${faculty.textColor}; padding: 24px 16px; margin: 36px 0 24px 0; text-align: center; font-weight: bold; font-size: 22px; letter-spacing: 1.5px; border-radius: 4px; border-left: 8px solid #002147; text-transform: uppercase; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        ${faculty.name}
      </div>
    `;
    set((state) => ({
      content: state.content + bannerHTML,
      activeFacultyId: facultyId,
    }));
  },

  insertResearcherProfile: (name: string, dept: string, area: string, email: string, pubs: string) => {
    const { activeFacultyId } = get();
    const faculty = getFacultyById(activeFacultyId);

    const profileHTML = `
      <div style="border-top: 2px solid ${faculty.color}; padding-top: 16px; margin: 24px 0;">
        <h3 style="color: ${faculty.color}; margin-bottom: 2px;">${name}</h3>
        <p style="color: #002147; font-weight: bold; font-size: 12px; margin: 0 0 8px 0;">${dept.toUpperCase()}</p>
        <p style="font-size: 13px; margin: 2px 0;"><strong>Research Area:</strong> ${area}</p>
        <p style="font-size: 13px; margin: 2px 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #002147;">${email}</a></p>
        
        <p style="font-size: 13px; font-weight: bold; color: #333; margin-bottom: 4px;">Recent Publications & Grants (2025):</p>
        <div style="font-size: 12.5px; color: #444; background: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 3px solid ${faculty.color};">
          ${pubs || 'No 2025 publications listed.'}
        </div>
      </div>
    `;
    set((state) => ({ content: state.content + profileHTML }));
  },

  insertNewsArticle: (headline: string, bodyText: string, photoUrl: string, caption: string) => {
    const articleHTML = `
      <div style="margin: 28px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #ffffff;">
        <div style="background-color: #002147; color: #ffffff; padding: 8px 16px; font-weight: bold; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase;">
          NEWS & INNOVATION
        </div>
        <div style="padding: 16px;">
          <h3 style="color: #002147; margin-top: 0;">${headline}</h3>
          ${photoUrl ? `
            <div style="float: right; margin: 0 0 12px 16px; max-width: 240px; text-align: center;">
              <img src="${photoUrl}" alt="${headline}" style="max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #ccc; object-fit: contain;" />
              ${caption ? `<p style="font-size: 11px; color: #666; margin-top: 4px; font-style: italic;">${caption}</p>` : ''}
            </div>
          ` : ''}
          <div style="font-size: 13.5px; line-height: 1.6; color: #333;">
            ${bodyText}
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
    `;
    set((state) => ({ content: state.content + articleHTML }));
  },

  // Watermark Settings
  showWatermark: true,
  watermarkText: 'UI RMO OFFICIAL',
  setShowWatermark: (showWatermark) => set({ showWatermark }),
  setWatermarkText: (watermarkText) => set({ watermarkText }),

  // Theme Settings
  theme: 'light',
  setTheme: (theme: ThemeMode) => set({ theme }),

  // UI Modals & Tabs
  viewMode: 'desktop',
  setViewMode: (viewMode: ViewMode) => set({ viewMode }),
  activeTab: 'editor',
  setActiveTab: (activeTab) => set({ activeTab }),

  isExportModalOpen: false,
  setExportModalOpen: (isExportModalOpen) => set({ isExportModalOpen }),

  isDashboardOpen: false,
  setDashboardOpen: (isDashboardOpen) => set({ isDashboardOpen }),

  isTemplateModalOpen: false,
  setTemplateModalOpen: (isTemplateModalOpen) => set({ isTemplateModalOpen }),

  // Wizard state
  wizard: {
    currentStep: 1,
    prompt: '',
    targetAudience: 'University Researchers & Faculty',
    tone: 'Academic & Formal',
    selectedTemplate: 'Monthly Research Digest',
    selectedFaculty: 'agriculture',
    isGenerating: false,
    issueNumber: 'Vol. 5 Issue 1 (2025)',
    volumeNumber: 'Vol. 5',
  },
  updateWizard: (fields: Partial<WizardState>) =>
    set((state) => ({
      wizard: { ...state.wizard, ...fields },
    })),
  setWizardStep: (step: number) =>
    set((state) => ({
      wizard: { ...state.wizard, currentStep: step },
    })),

  // Export state
  exportOptions: {
    includeHeader: true,
    includeFooter: true,
    pageSize: 'A4',
    themeColor: '#002147',
    showWatermark: true,
    watermarkText: 'UI RMO OFFICIAL',
    bindingMargin: 'generous',
  },
  updateExportOptions: (options: Partial<ExportOptions>) =>
    set((state) => ({
      exportOptions: { ...state.exportOptions, ...options },
    })),

  // Image state
  selectedImage: null,
  setSelectedImage: (selectedImage) => set({ selectedImage }),
}));
