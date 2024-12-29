"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Home, Newspaper, Pill, Building2, MessageSquare } from "lucide-react";

const authenticatedLinks = [
  { name: "Beranda", href: "/dashboard", icon: Home },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Artikel", href: "/artikel", icon: Newspaper },
  { name: "Cari Obat", href: "/cari-obat", icon: Pill },
  { name: "Cari Apotek", href: "/cari-apotek", icon: Building2 },
];

export function AuthenticatedNav() {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <nav className="mb-4 rounded-2xl border shadow-lg px-2 py-2 bg-white">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {authenticatedLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ease-in-out ${
                  isActiveLink(link.href)
                    ? "text-foreground bg-gray-100 scale-105"
                    : "text-gray-500 hover:text-foreground hover:bg-gray-50"
                }`}
              >
                {link.icon && (
                  <link.icon
                    className={`h-5 w-5 transition-all duration-200 ease-in-out ${
                      isActiveLink(link.href) ? "scale-110" : ""
                    }`}
                  />
                )}
                <span
                  className={`text-xs transition-all duration-200 ease-in-out ${
                    isActiveLink(link.href) ? "font-medium" : ""
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="pl-2 border-l flex flex-col items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
            <span className="text-xs text-gray-500 mt-1">Akun</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
