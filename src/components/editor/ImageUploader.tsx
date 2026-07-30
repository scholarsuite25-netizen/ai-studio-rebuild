'use client';

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, RectangleHorizontal, RectangleVertical, Square, Image } from 'lucide-react';

interface ImageUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (url: string, alt?: string, orientation?: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ isOpen, onClose, onInsertImage }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [orientation, setOrientation] = useState<'original' | 'portrait' | 'landscape' | 'square'>('original');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onInsertImage(e.target.result as string, file.name, orientation);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUrlInsert = () => {
    if (imageUrl.trim()) {
      onInsertImage(imageUrl.trim(), altText.trim() || 'Uploaded image', orientation);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2 text-gray-900 font-semibold">
            <ImageIcon size={20} className="text-indigo-600" />
            <span>Insert Image</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Orientation Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Image Aspect & Orientation
          </label>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setOrientation('original')}
              className={`p-2 border rounded-lg flex flex-col items-center justify-center space-y-1 transition-all ${
                orientation === 'original'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Image size={16} />
              <span className="text-[10px]">Natural</span>
            </button>
            <button
              type="button"
              onClick={() => setOrientation('portrait')}
              className={`p-2 border rounded-lg flex flex-col items-center justify-center space-y-1 transition-all ${
                orientation === 'portrait'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <RectangleVertical size={16} />
              <span className="text-[10px]">Portrait</span>
            </button>
            <button
              type="button"
              onClick={() => setOrientation('landscape')}
              className={`p-2 border rounded-lg flex flex-col items-center justify-center space-y-1 transition-all ${
                orientation === 'landscape'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <RectangleHorizontal size={16} />
              <span className="text-[10px]">Landscape</span>
            </button>
            <button
              type="button"
              onClick={() => setOrientation('square')}
              className={`p-2 border rounded-lg flex flex-col items-center justify-center space-y-1 transition-all ${
                orientation === 'square'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Square size={16} />
              <span className="text-[10px]">Square</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
          }`}
        >
          <Upload className="mx-auto text-gray-400 mb-1" size={28} />
          <p className="text-xs font-medium text-gray-700">Drag & drop your image file here</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
          <label
            htmlFor="file-upload"
            className="mt-2 inline-block bg-white text-gray-700 text-xs font-medium border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50 shadow-sm cursor-pointer"
          >
            Browse File
          </label>
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Caption / Alt Text (optional)</label>
            <input
              type="text"
              placeholder="Image description"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUrlInsert}
            disabled={!imageUrl.trim()}
            className="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all disabled:opacity-50"
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};
