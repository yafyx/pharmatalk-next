export interface Obat {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    desc?: string | null;
    dosage?: string | null;
    indication?: string | null;
    sideEffects?: string | null;
    warning?: string | null;
    composition?: string | null;
    manufacturer?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ObatResponse {
    success: boolean;
    data: Obat | null;
    message?: string;
}

export interface ObatsResponse {
    success: boolean;
    data: Obat[];
    message?: string;
}
