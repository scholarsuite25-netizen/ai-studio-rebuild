'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import { useAppStore } from '@/store/useAppStore';
import { EditorToolbar } from './EditorToolbar';
import { ImageUploader } from './ImageUploader';

export const TiptapEditor: React.FC = () => {
  const { content, setContent } = useAppStore();
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline cursor-pointer',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-indigo max-w-none min-h-[400px] p-6 focus:outline-none bg-white font-sans text-gray-800 leading-relaxed',
      },
    },
  });

  // Sync external content changes into Tiptap (e.g. from AI wizard)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const handleInsertImage = (url: string, alt?: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url, alt }).run();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <EditorToolbar editor={editor} onOpenImageModal={() => setImageModalOpen(true)} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
      <ImageUploader
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onInsertImage={handleInsertImage}
      />
    </div>
  );
};
