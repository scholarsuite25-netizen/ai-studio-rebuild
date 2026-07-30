'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, FolderOpen, Plus, Trash2, Copy, FileText, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const DocumentManagerModal: React.FC = () => {
  const {
    isDashboardOpen,
    setDashboardOpen,
    documents,
    loadDocument,
    deleteDocument,
    createNewDocument,
    currentId,
    saveCurrentDocument,
  } = useAppStore();

  if (!isDashboardOpen) return null;

  const handleCreateNew = () => {
    saveCurrentDocument();
    createNewDocument();
  };

  const handleDuplicate = (docId: string) => {
    const targetDoc = documents.find((d) => d.id === docId);
    if (targetDoc) {
      const { setContent, setTitle, setIssueNumber } = useAppStore.getState();
      setTitle(`${targetDoc.title} (Copy)`);
      setContent(targetDoc.content);
      setIssueNumber(targetDoc.issueNumber || '');
      setDashboardOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2 text-gray-900 font-semibold text-lg">
            <FolderOpen size={22} className="text-indigo-600" />
            <span>My Newsletters & Drafts</span>
          </div>
          <button onClick={() => setDashboardOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Manage and switch between saved University of Ibadan RMO newsletters.</p>
          <button
            onClick={handleCreateNew}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>New Issue Draft</span>
          </button>
        </div>

        {/* Documents Grid */}
        {documents.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-xl bg-gray-50 text-gray-400 space-y-2">
            <FileText size={40} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No saved newsletter drafts yet</p>
            <p className="text-xs text-gray-400">Click "New Issue Draft" above or your active work will auto-save here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
            {documents.map((doc) => {
              const isActive = doc.id === currentId;
              return (
                <div
                  key={doc.id}
                  className={`p-4 border rounded-xl transition-all space-y-3 relative group ${
                    isActive ? 'border-indigo-600 bg-indigo-50/30 shadow-sm' : 'border-gray-200 hover:border-indigo-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-indigo-700 uppercase bg-indigo-100 px-2 py-0.5 rounded-full">
                        {doc.issueNumber || 'RMO Bulletin'}
                      </span>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{doc.title}</h4>
                    </div>

                    {isActive && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Calendar size={13} />
                    <span>Last modified: {formatDate(doc.updatedAt)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => loadDocument(doc.id)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
                    >
                      Open Draft →
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDuplicate(doc.id)}
                        title="Duplicate"
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        title="Delete"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end border-t pt-3">
          <button
            onClick={() => setDashboardOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
