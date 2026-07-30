'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { generatePDF, downloadPDF } from '@/lib/export/pdfExport';
import { generateDOCX, downloadDOCX } from '@/lib/export/docxExport';

export const ExportModal: React.FC = () => {
  const { isExportModalOpen, setExportModalOpen, title, content } = useAppStore();
  const [isExporting, setIsExporting] = useState(false);

  if (!isExportModalOpen) return null;

  const handlePDFExport = async () => {
    try {
      setIsExporting(true);
      const pdfBytes = await generatePDF({ title, content });
      downloadPDF(pdfBytes, `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
      setExportModalOpen(false);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDOCXExport = async () => {
    try {
      setIsExporting(true);
      const docxBlob = await generateDOCX({ title, content });
      downloadDOCX(docxBlob, `${title.toLowerCase().replace(/\s+/g, '_')}.docx`);
      setExportModalOpen(false);
    } catch (err) {
      console.error('DOCX export failed:', err);
      alert('Failed to export DOCX');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2 text-gray-900 font-semibold text-lg">
            <Download size={20} className="text-indigo-600" />
            <span>Export Document</span>
          </div>
          <button onClick={() => setExportModalOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-500">Select your preferred export format below.</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handlePDFExport}
            disabled={isExporting}
            className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-gray-800 hover:text-indigo-600 space-y-2 group disabled:opacity-50"
          >
            <FileText size={32} className="text-red-500 group-hover:scale-110 transition-all" />
            <span className="font-medium text-sm">PDF Document</span>
            <span className="text-[11px] text-gray-400">Portable & Printable</span>
          </button>

          <button
            onClick={handleDOCXExport}
            disabled={isExporting}
            className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-gray-800 hover:text-indigo-600 space-y-2 group disabled:opacity-50"
          >
            <FileSpreadsheet size={32} className="text-blue-600 group-hover:scale-110 transition-all" />
            <span className="font-medium text-sm">Word Document</span>
            <span className="text-[11px] text-gray-400">Editable DOCX Format</span>
          </button>
        </div>

        <div className="flex justify-end pt-2 border-t">
          <button
            onClick={() => setExportModalOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
