import { FacultyPreset } from '@/types';

export const UI_FACULTIES: FacultyPreset[] = [
  { id: 'agriculture', name: 'FACULTY OF AGRICULTURE', color: '#00A651', textColor: '#FFFFFF' },
  { id: 'arts', name: 'FACULTY OF ARTS', color: '#C46210', textColor: '#FFFFFF' },
  { id: 'basic_clinical', name: 'FACULTY OF BASIC CLINICAL SCIENCES', color: '#1F2937', textColor: '#FFFFFF' },
  { id: 'basic_medical', name: 'FACULTY OF BASIC MEDICAL SCIENCES', color: '#00A896', textColor: '#FFFFFF' },
  { id: 'clinical_sciences', name: 'FACULTY OF CLINICAL SCIENCES', color: '#E63946', textColor: '#FFFFFF' },
  { id: 'computing', name: 'FACULTY OF COMPUTING', color: '#4A154B', textColor: '#FFFFFF' },
  { id: 'dentistry', name: 'FACULTY OF DENTISTRY', color: '#6A0572', textColor: '#FFFFFF' },
  { id: 'economics_mgt', name: 'FACULTY OF ECONOMICS AND MANAGEMENT SCIENCES', color: '#1E293B', textColor: '#FFFFFF' },
  { id: 'education', name: 'FACULTY OF EDUCATION', color: '#334155', textColor: '#FFFFFF' },
  { id: 'env_design', name: 'FACULTY OF ENVIRONMENTAL DESIGN AND MANAGEMENT', color: '#8D99AE', textColor: '#FFFFFF' },
  { id: 'iamrat', name: 'IAMRAT', color: '#F77F00', textColor: '#FFFFFF' },
  { id: 'ioe', name: 'INSTITUTE OF EDUCATION', color: '#0284C7', textColor: '#FFFFFF' },
  { id: 'kenneth_dike_library', name: 'KENNETH DIKE LIBRARY', color: '#000000', textColor: '#FFFFFF' },
  { id: 'law', name: 'FACULTY OF LAW', color: '#002147', textColor: '#DAA520' },
  { id: 'multidisciplinary', name: 'FACULTY OF MULTIDISCIPLINARY STUDIES', color: '#00B4D8', textColor: '#FFFFFF' },
  { id: 'nursing', name: 'FACULTY OF NURSING', color: '#FB923C', textColor: '#FFFFFF' },
  { id: 'pharmacy', name: 'FACULTY OF PHARMACY', color: '#4C6EF5', textColor: '#FFFFFF' },
  { id: 'public_health', name: 'FACULTY OF PUBLIC HEALTH', color: '#9D4EDD', textColor: '#FFFFFF' },
  { id: 'renewable_resources', name: 'FACULTY OF RENEWABLE NATURAL RESOURCES', color: '#D97706', textColor: '#FFFFFF' },
  { id: 'science', name: 'FACULTY OF SCIENCE', color: '#EAB308', textColor: '#111827' },
  { id: 'technology', name: 'FACULTY OF TECHNOLOGY', color: '#D4AF37', textColor: '#002147' },
  { id: 'social_sciences', name: 'FACULTY OF THE SOCIAL SCIENCES', color: '#EA580C', textColor: '#FFFFFF' },
  { id: 'vet_med', name: 'FACULTY OF VETERINARY MEDICINE', color: '#800020', textColor: '#FFFFFF' },
  { id: 'uisb', name: 'UISB (SCHOOL OF BUSINESS)', color: '#1E1B4B', textColor: '#FFFFFF' },
];

export function getFacultyById(id: string): FacultyPreset {
  return (
    UI_FACULTIES.find((f) => f.id === id) || {
      id: 'ui_general',
      name: 'RESEARCH MANAGEMENT OFFICE',
      color: '#002147',
      textColor: '#DAA520',
    }
  );
}
