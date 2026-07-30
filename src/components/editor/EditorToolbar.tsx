'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
  ImageIcon,
  Link as LinkIcon,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor | null;
  onOpenImageModal: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, onOpenImageModal }) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center rounded-t-lg sticky top-0 z-10">
      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('heading', { level: 1 }) ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('heading', { level: 2 }) ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      {/* Basic Marks */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('bold') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('code') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Inline Code"
      >
        <Code size={18} />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('blockquote') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Quote"
      >
        <Quote size={18} />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      {/* Insert Links & Images */}
      <button
        onClick={setLink}
        className={`p-1.5 rounded hover:bg-gray-200 text-gray-700 ${
          editor.isActive('link') ? 'bg-indigo-100 text-indigo-700' : ''
        }`}
        title="Insert Link"
      >
        <LinkIcon size={18} />
      </button>
      <button
        onClick={onOpenImageModal}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
        title="Insert Image"
      >
        <ImageIcon size={18} />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      {/* History */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-40"
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-40"
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};
