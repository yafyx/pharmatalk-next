import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Obat } from "@/types/obat";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";

interface ObatFormProps {
  initialData?: Obat;
  onSubmit: (data: Partial<Obat>) => void;
}

const ObatForm: React.FC<ObatFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Obat>>(initialData || {});
  const [imageType, setImageType] = useState<"url" | "upload">("url");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.value,
    }));
  };

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    const info = results?.info;
    if (typeof info !== "string" && info && "secure_url" in info) {
      setFormData((prev) => ({
        ...prev,
        image: info.secure_url,
      }));
      toast.success("Image uploaded successfully");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Obat</Label>
        <Input
          id="name"
          name="name"
          placeholder="Nama obat"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Input
          id="category"
          name="category"
          placeholder="Kategori obat"
          value={formData.category || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Harga</Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Harga obat"
          value={formData.price || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manufacturer">Produsen</Label>
        <Input
          id="manufacturer"
          name="manufacturer"
          placeholder="Nama produsen"
          value={formData.manufacturer || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc">Deskripsi</Label>
        <Textarea
          id="desc"
          name="desc"
          placeholder="Deskripsi obat"
          value={formData.desc || ""}
          onChange={handleChange}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dosage">Dosis</Label>
        <Textarea
          id="dosage"
          name="dosage"
          placeholder="Dosis obat"
          value={formData.dosage || ""}
          onChange={handleChange}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="indication">Indikasi</Label>
        <Textarea
          id="indication"
          name="indication"
          placeholder="Indikasi obat"
          value={formData.indication || ""}
          onChange={handleChange}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sideEffects">Efek Samping</Label>
        <Textarea
          id="sideEffects"
          name="sideEffects"
          placeholder="Efek samping obat"
          value={formData.sideEffects || ""}
          onChange={handleChange}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="warning">Peringatan</Label>
        <Textarea
          id="warning"
          name="warning"
          placeholder="Peringatan penggunaan obat"
          value={formData.warning || ""}
          onChange={handleChange}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="composition">Komposisi</Label>
        <Textarea
          id="composition"
          name="composition"
          placeholder="Komposisi obat"
          value={formData.composition || ""}
          onChange={handleChange}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>Gambar Obat</Label>
        <RadioGroup
          defaultValue="url"
          value={imageType}
          onValueChange={(value) => setImageType(value as "url" | "upload")}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center space-x-2 bg-white rounded-lg border p-3">
            <RadioGroupItem value="url" id="url" />
            <Label htmlFor="url">Gambar URL</Label>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-lg border p-3">
            <RadioGroupItem value="upload" id="upload" />
            <Label htmlFor="upload">Upload Gambar</Label>
          </div>
        </RadioGroup>

        <div className="mt-4">
          {imageType === "url" ? (
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
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
            >
              {({ open }) => (
                <Button
                  type="button"
                  onClick={() => open()}
                  variant="outline"
                  className="w-full"
                >
                  Upload Gambar
                </Button>
              )}
            </CldUploadWidget>
          )}
        </div>

        {formData.image && (
          <div className="mt-4 rounded-lg overflow-hidden border bg-gray-50 p-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={formData.image}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">
        Simpan
      </Button>
    </form>
  );
};

export default ObatForm;
