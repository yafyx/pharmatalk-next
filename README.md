# PharmaTalk

## 📑 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Fitur Utama](#fitur-utama)
- [Struktur Proyek](#struktur-proyek)
- [Cara Menjalankan Proyek](#cara-menjalankan-proyek)
- [FAQ (Frequently Asked Questions)](#faq)

## 🏥 Tentang Proyek

PharmaTalk adalah platform inovatif yang menghubungkan masyarakat dengan informasi kesehatan dan layanan farmasi. Aplikasi ini dirancang untuk memudahkan akses masyarakat terhadap informasi obat, konsultasi kesehatan, dan lokasi apotek terdekat.

## 💻 Teknologi yang Digunakan

- **Framework**: Next.js 15.1.0 (React 19)
- **Bahasa Pemrograman**: TypeScript
- **Database**: MongoDB
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Autentikasi**: Clerk
- **UI Components**:
  - Radix UI
  - Shadcn UI
- **Rich Text Editor**: TipTap
- **Maps**: Mapbox GL
- **Media Storage**: Cloudinary

## 🌟 Fitur Utama

1. **Artikel Kesehatan**

   - CRUD artikel kesehatan
   - Rich text editor untuk konten
   - Manajemen gambar dengan Cloudinary

2. **Konsultasi Chat**

   - Real-time chat dengan WebSocket
   - Riwayat percakapan
   - Status online/offline

3. **Pencarian Obat**

   - Database obat lengkap
   - Filter dan pencarian
   - Informasi detail obat

4. **Pencarian Apotek**

   - Integrasi Mapbox untuk peta
   - Pencarian berdasarkan lokasi
   - Informasi detail apotek

5. **Dashboard Admin**
   - Manajemen pengguna
   - Analitik dan statistik
   - Moderasi konten

## 📁 Struktur Proyek

```
pharmatalk-next/
├── app/                    # Routing dan halaman utama
│   ├── api/               # API endpoints
│   ├── artikel/          # Fitur artikel
│   ├── chat/             # Fitur chat
│   ├── cari-obat/        # Pencarian obat
│   ├── cari-apotek/      # Pencarian apotek
│   └── dashboard/        # Dashboard admin
├── components/            # Komponen UI yang dapat digunakan kembali
├── lib/                   # Utilitas dan helper functions
├── prisma/               # Schema database dan migrations
└── public/               # Asset statis
```

## 🚀 Cara Menjalankan Proyek

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables (.env)
4. Jalankan database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Jalankan development server:
   ```bash
   npm run dev
   ```

## 📚 Definisi Penting

### Istilah Teknis

1. **API (Application Programming Interface)**

   - Antarmuka yang memungkinkan komunikasi antar software
   - Digunakan untuk pertukaran data antara frontend dan backend
   - Contoh: API artikel untuk CRUD operasi artikel

2. **WebSocket**

   - Protokol komunikasi dua arah (bidirectional)
   - Memungkinkan chat real-time
   - Berbeda dengan HTTP yang satu arah

3. **ORM (Object-Relational Mapping)**

   - Teknik mengkonversi data antara database dan objek dalam kode
   - Prisma adalah ORM yang digunakan dalam proyek ini
   - Memudahkan operasi database tanpa menulis SQL langsung

4. **Middleware**
   - Software yang berjalan "di tengah"
   - Memproses request sebelum mencapai endpoint
   - Contoh: autentikasi, validasi, rate limiting

### Komponen Sistem

1. **Frontend**

   - Bagian yang berinteraksi dengan pengguna
   - Dibangun dengan Next.js dan React
   - Mencakup UI/UX dan interaksi pengguna

2. **Backend**

   - Bagian server dan logika bisnis
   - Menangani database dan API
   - Mengatur autentikasi dan keamanan

3. **Database**

   - Penyimpanan data terstruktur
   - Menggunakan PostgreSQL
   - Diakses melalui Prisma ORM

4. **Authentication System**
   - Sistem keamanan pengguna
   - Menggunakan Clerk
   - Menangani login, register, dan sesi

### Arsitektur Aplikasi

1. **Microservices**

   - Arsitektur terdistribusi
   - Setiap layanan berdiri sendiri
   - Contoh: layanan chat, artikel, obat

2. **API Routes**

   - Endpoint untuk akses data
   - Menggunakan Next.js API routes
   - Terstruktur berdasarkan fitur

3. **State Management**
   - Pengelolaan data aplikasi
   - Menggunakan React hooks
   - Menjaga konsistensi UI

### Keamanan

1. **Rate Limiting**

   - Pembatasan jumlah request
   - Mencegah abuse dan DDoS
   - Implementasi dengan Upstash

2. **Input Validation**

   - Validasi data masukan
   - Menggunakan Zod
   - Mencegah invalid data

3. **CORS (Cross-Origin Resource Sharing)**
   - Kebijakan keamanan browser
   - Mengatur akses antar domain
   - Mencegah unauthorized access

## ❓ FAQ

### 1. Dimana letak CRUD dalam proyek ini?

CRUD (Create, Read, Update, Delete) operations dapat ditemukan di beberapa lokasi:

- **Artikel**: `/app/api/artikel/route.ts` - Endpoint API untuk manajemen artikel
- **User**: `/app/api/user/route.ts` - Manajemen data pengguna
- **Chat**: `/app/api/chat/route.ts` - Pengelolaan pesan chat
- **Obat**: `/app/api/obat/route.ts` - Manajemen data obat

Contoh implementasi CRUD untuk artikel:

```typescript
// /app/api/artikel/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// CREATE
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const artikel = await db.artikel.create({
      data: {
        judul: body.judul,
        konten: body.konten,
        authorId: body.authorId,
      },
    });
    return NextResponse.json(artikel);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating artikel" },
      { status: 500 }
    );
  }
}

// READ
export async function GET() {
  try {
    const artikel = await db.artikel.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(artikel);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching artikel" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const artikel = await db.artikel.update({
      where: { id: body.id },
      data: {
        judul: body.judul,
        konten: body.konten,
      },
    });
    return NextResponse.json(artikel);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating artikel" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await db.artikel.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Artikel deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting artikel" },
      { status: 500 }
    );
  }
}
```

### 2. Bagaimana sistem autentikasi bekerja?

Sistem autentikasi menggunakan Clerk yang terintegrasi di:

- `/app/(auth)` - Halaman login/register
- `middleware.ts` - Middleware untuk proteksi route
- Konfigurasi Clerk ada di `.env`

Contoh implementasi:

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/artikel", "/cari-obat"],
  ignoredRoutes: ["/api/public"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// /app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}

// Contoh penggunaan di komponen protected
import { auth } from "@clerk/nextjs";

export default async function ProtectedPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>Protected Content</div>;
}
```

### 3. Bagaimana penanganan database?

- Menggunakan Prisma ORM
- Schema database ada di `/prisma/schema.prisma`
- Migrations otomatis dengan `prisma db push`
- Koneksi database dikonfigurasi di `.env`

Contoh schema dan penggunaan:

```prisma
// /prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  role      Role      @default(USER)
  articles  Article[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Article {
  id        String   @id @default(cuid())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

// Contoh penggunaan di kode
// /lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
```

### 4. Bagaimana sistem chat real-time bekerja?

- Menggunakan WebSocket (ws package)
- Implementasi di `/app/api/chat/route.ts`
- Frontend handler di `/components/chat`
- Menyimpan history chat di database

Contoh implementasi:

```typescript
// /app/api/chat/route.ts
import { WebSocketServer } from "ws";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    // Simpan pesan ke database
    await db.message.create({
      data: {
        content: data.content,
        senderId: data.senderId,
        receiverId: data.receiverId,
      },
    });

    // Broadcast pesan ke semua client
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(data));
    });
  });
});

// /components/chat/ChatComponent.tsx
import { useEffect, useState } from "react";

export function ChatComponent() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8080");

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    setWs(websocket);

    return () => websocket.close();
  }, []);

  const sendMessage = (content: string) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          content,
          senderId: "current-user-id",
          receiverId: "target-user-id",
        })
      );
    }
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage("Hello!")}>Send Message</button>
    </div>
  );
}
```

### 5. Bagaimana keamanan data dijaga?

- Autentikasi dengan Clerk
- Rate limiting pada API
- Validasi input
- Environment variables untuk credential
- CORS protection
- Middleware security

Contoh implementasi keamanan:

```typescript
// /app/api/middleware.ts
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiting setup
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

// Middleware untuk keamanan
export async function middleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for");
  const { success } = await ratelimit.limit(ip ?? "anonymous");

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // CORS headers
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

// Contoh validasi input
import { z } from "zod";

const ArtikelSchema = z.object({
  judul: z.string().min(5).max(100),
  konten: z.string().min(10),
  authorId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = ArtikelSchema.parse(body);
    // Proses data yang sudah tervalidasi
  } catch (error) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}
```

### 6. Apa rencana pengembangan ke depan?

- Integrasi AI untuk rekomendasi obat
- Sistem appointment dengan dokter
- Mobile app dengan React Native
- Sistem resep digital
