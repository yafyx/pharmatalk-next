"use client";

import { useState } from "react";
import { ArtikelEditor } from "./artikel-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ArtikelForm() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    image: "",
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
    const info = results?.info;
    if (typeof info !== "string" && info && "secure_url" in info) {
      setFormState((prev) => ({
        ...prev,
        image: info.secure_url,
      }));
      toast.success("Image uploaded successfully");
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/artikel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Failed to create article");

      const article = await res.json();
      toast.success("Article created successfully");
      router.push(`/artikel/${article.slug}`);
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to create article");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-lg font-medium">Judul Artikel</Label>
          <Input
            value={formState.title}
            onChange={handleTitleChange}
            placeholder="Masukkan judul artikel yang menarik"
            className="text-2xl font-medium h-14"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-lg font-medium">Gambar Artikel</Label>
          <RadioGroup
            defaultValue="url"
            value={imageType}
            onValueChange={(value) => setImageType(value as "url" | "upload")}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center space-x-2 bg-white rounded-lg border p-3 transition-colors hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="url" id="url" />
              <Label htmlFor="url" className="cursor-pointer">
                Gambar URL
              </Label>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg border p-3 transition-colors hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload" className="cursor-pointer">
                Upload Gambar
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4">
            {imageType === "url" ? (
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formState.image}
                onChange={handleImageUrlChange}
                className="h-12"
              />
            ) : (
              <CldUploadWidget
                uploadPreset="pharmatalk"
                options={{
                  maxFiles: 1,
                  resourceType: "image",
                  styles: {
                    frame: { background: "transparent" },
                  },
                }}
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => (
                  <Button
                    type="button"
                    onClick={() => open()}
                    variant="outline"
                    className="w-full h-12 border-dashed"
                  >
                    Klik untuk Upload Gambar
                  </Button>
                )}
              </CldUploadWidget>
            )}
          </div>

          {formState.image && (
            <div className="mt-4 rounded-lg overflow-hidden border bg-gray-50 p-2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={formState.image}
                  fill
                  alt="Preview"
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-lg font-medium">Konten Artikel</Label>
          <div className="border rounded-lg overflow-hidden">
            <ArtikelEditor
              content={formState.content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/artikel")}
          className="w-32"
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSaving} className="w-32">
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Menyimpan</span>
            </div>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </form>
  );
}
