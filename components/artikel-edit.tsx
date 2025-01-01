"use client";

import { useState } from "react";
import { ArtikelEditor } from "./artikel-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Image from "next/image";

interface ArticleEditFormProps {
  article: {
    title: string;
    content: string;
    slug: string;
    image?: string | null;
  };
  onCancel: () => void;
  onSave: () => void;
}

import { CloudinaryUploadWidgetResults } from "next-cloudinary";

export function ArticleEditForm({
  article,
  onCancel,
  onSave,
}: ArticleEditFormProps) {
  const [formState, setFormState] = useState({
    title: article.title,
    content: article.content,
    image: article.image || "",
  });
  const [imageType, setImageType] = useState<"url" | "upload">("url");
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

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      image: e.target.value,
    }));
  };

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    const uploadInfo = results.info;
    if (
      uploadInfo &&
      typeof uploadInfo !== "string" &&
      "secure_url" in uploadInfo
    ) {
      setFormState((prev) => ({
        ...prev,
        image: uploadInfo.secure_url,
      }));
      toast.success("Image uploaded successfully");
    }
  };

  const handleUploadError = () => {
    toast.error("Failed to upload image");
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
      <div className="space-y-2">
        <Label>Gambar Artikel</Label>
        <RadioGroup
          defaultValue="url"
          value={imageType}
          onValueChange={(value) => setImageType(value as "url" | "upload")}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="url" id="url" />
            <Label htmlFor="url">Gambar URL</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upload" id="upload" />
            <Label htmlFor="upload">Upload Gambar</Label>
          </div>
        </RadioGroup>

        {imageType === "url" ? (
          <Input
            type="url"
            placeholder="Enter image URL"
            value={formState.image}
            onChange={handleImageUrlChange}
          />
        ) : (
          <CldUploadWidget
            uploadPreset="pharmatalk"
            options={{
              maxFiles: 1,
              resourceType: "image",
            }}
            onSuccess={handleUploadSuccess}
            onError={handleUploadError}
          >
            {({ open }) => (
              <div className="space-y-2">
                <Button type="button" onClick={() => open()}>
                  Upload Gambar
                </Button>
              </div>
            )}
          </CldUploadWidget>
        )}

        {formState.image && (
          <div className="mt-2">
            {imageType === "url" ? (
              <Image
                src={formState.image}
                width={300}
                height={192}
                alt="Gambar Artikel"
                className="rounded-md object-contain"
              />
            ) : (
              <>
                <CldImage
                  src={formState.image.split("/").pop()?.split(".")[0] || ""} // Extract just the public ID
                  width={300}
                  height={192}
                  alt="Gambar Artikel"
                  className="rounded-md object-contain"
                />
              </>
            )}
          </div>
        )}
      </div>
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
