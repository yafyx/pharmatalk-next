import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Obat } from "@/types/obat";

interface ObatFormProps {
  initialData?: Obat;
  onSubmit: (data: Partial<Obat>) => void;
}

const ObatForm: React.FC<ObatFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Obat>>(initialData || {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Button type="submit" className="w-full">
        Simpan
      </Button>
    </form>
  );
};

export default ObatForm;
