export interface FacultyPreset {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  author: string;
  category?: string;
  issueNumber?: string;
  facultyId?: string;
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'light' | 'dark';
export type BindingMarginMode = 'standard' | 'generous' | 'spine_bound';

export interface WizardState {
  currentStep: number;
  prompt: string;
  targetAudience: string;
  tone: string;
  selectedTemplate: string;
  selectedFaculty: string;
  isGenerating: boolean;
  issueNumber: string;
  volumeNumber: string;
}

export interface ExportOptions {
  includeHeader: boolean;
  includeFooter: boolean;
  pageSize: 'A4' | 'LETTER';
  themeColor: string;
  showWatermark: boolean;
  watermarkText: string;
  bindingMargin: BindingMarginMode;
}

export interface AppState {
  // Document state
  currentId: string;
  title: string;
  content: string;
  issueNumber: string;
  activeFacultyId: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIssueNumber: (issue: string) => void;
  setActiveFacultyId: (facultyId: string) => void;

  // Binding Margin Gutter Settings
  bindingMargin: BindingMarginMode;
  setBindingMargin: (margin: BindingMarginMode) => void;

  // Document Management Dashboard
  documents: DocumentItem[];
  saveCurrentDocument: () => void;
  loadDocument: (id: string) => void;
  deleteDocument: (id: string) => void;
  createNewDocument: () => void;

  // Master Block Insertion Helpers
  insertPrincipalOfficersGrid: () => void;
  insertForewordBlock: (badgeTitle: string, officerName: string, titleStr: string, photoUrl: string, text: string) => void;
  insertTableOfContentsBlock: () => void;
  insertFacultyBanner: (facultyId: string) => void;
  insertResearcherProfile: (name: string, dept: string, area: string, email: string, pubs: string) => void;
  insertNewsArticle: (headline: string, bodyText: string, photoUrl: string, caption: string) => void;

  // Watermark Settings
  showWatermark: boolean;
  watermarkText: string;
  setShowWatermark: (show: boolean) => void;
  setWatermarkText: (text: string) => void;

  // Theme Settings
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // UI Modals & Tabs
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: 'editor' | 'preview' | 'wizard';
  setActiveTab: (tab: 'editor' | 'preview' | 'wizard') => void;

  isExportModalOpen: boolean;
  setExportModalOpen: (isOpen: boolean) => void;

  isDashboardOpen: boolean;
  setDashboardOpen: (isOpen: boolean) => void;

  isTemplateModalOpen: boolean;
  setTemplateModalOpen: (isOpen: boolean) => void;

  // Wizard state
  wizard: WizardState;
  updateWizard: (fields: Partial<WizardState>) => void;
  setWizardStep: (step: number) => void;

  // Export state
  exportOptions: ExportOptions;
  updateExportOptions: (options: Partial<ExportOptions>) => void;

  // Image state
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}
