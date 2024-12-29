"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { Bold, Italic, List, ListOrdered, Quote } from "lucide-react";

interface ArtikelEditorProps {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
}

export function ArtikelEditor({
  content,
  onChange,
  editable = true,
}: ArtikelEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable,
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg">
      {editable && (
        <div className="border-b p-2 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-muted" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-muted" : ""}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
