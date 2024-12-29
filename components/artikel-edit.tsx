"use client";

import { useState } from "react";
import { ArtikelEditor } from "./artikel-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface ArticleEditFormProps {
  article: {
    title: string;
    content: string;
    slug: string;
  };
  onCancel: () => void;
  onSave: () => void;
}

export function ArticleEditForm({
  article,
  onCancel,
  onSave,
}: ArticleEditFormProps) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`/api/artikel/${article.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Article saved successfully");
      onSave();
    } catch (error) {
      toast.error(
        `Failed to save article: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Article title"
        className="text-2xl font-bold"
      />

      <ArtikelEditor content={content} onChange={setContent} />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
