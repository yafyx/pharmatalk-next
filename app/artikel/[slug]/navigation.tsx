"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticleNavigation({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/artikel">
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </Button>
        </Link>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </nav>
  );
}
