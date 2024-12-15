export interface Artikel {
    id: string;
    title: string;
    content: string;
    category: string;
    slug: string;
    image?: string | null;
    author: {
        id: string;
        name: string;
        image?: string | null;
    };
    createdAt: string;
    updatedAt: string;
}
