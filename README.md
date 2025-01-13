# PharmaTalk

> Platform inovatif yang menghubungkan masyarakat dengan informasi kesehatan dan layanan farmasi.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## 🛠 Tech Stack

- **Frontend:** Next.js 15.1.0, React 19, Tailwind CSS
- **Backend:** TypeScript, MongoDB, Prisma ORM
- **Auth:** Clerk
- **UI:** Radix UI, Shadcn UI
- **Features:** TipTap (Rich Text), Mapbox GL, Cloudinary

## 🌟 Core Features

- 📝 **Artikel Kesehatan** - CRUD & Rich Text Editor
- 💬 **Konsultasi Chat** - Real-time WebSocket
- 💊 **Pencarian Obat** - Database & Filtering
- 🏥 **Pencarian Apotek** - Mapbox Integration
- 📊 **Dashboard Admin** - Analytics & Management

## 📁 Project Structure

```
pharmatalk-next/
├── app/                 # Routes & Pages
├── components/          # Reusable UI
├── lib/                 # Utils & Helpers
├── prisma/             # DB Schema
└── public/             # Static Assets
```

## 🔒 Security Features

- Rate Limiting (Upstash)
- Input Validation (Zod)
- CORS Protection
- Clerk Authentication

## 📚 API Documentation

```typescript
// Example API endpoints
GET / api / articles; // List articles
POST / api / chat; // Send message
PUT / api / medicines; // Update medicine
DELETE / api / users; // Delete user
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -am 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing`)
5. Open Pull Request
