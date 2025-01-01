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
  const [formState, setFormState] = useState({
    title: article.title,
    content: article.content,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleContentChange = (newContent: string) => {
    setFormState((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`/api/artikel/${article.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
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
        value={formState.title}
        onChange={handleTitleChange}
        placeholder="Article title"
        className="text-2xl font-bold"
      />

      <ArtikelEditor
        content={formState.content}
        onChange={handleContentChange}
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
