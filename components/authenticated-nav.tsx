"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import {
  Home,
  Newspaper,
  Pill,
  Building2,
  MessageSquare,
  HomeIcon,
  NewspaperIcon,
  PillIcon,
  Building2Icon,
  MessageSquareIcon,
  UserCircle2Icon,
  UserCircle2,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const baseLinks = [
  { name: "Beranda", href: "/dashboard", icon: Home, iconFilled: HomeIcon },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
    iconFilled: MessageSquareIcon,
  },
  {
    name: "Artikel",
    href: "/artikel",
    icon: Newspaper,
    iconFilled: NewspaperIcon,
  },
  { name: "Cari Obat", href: "/cari-obat", icon: Pill, iconFilled: PillIcon },
  {
    name: "Cari Apotek",
    href: "/cari-apotek",
    icon: Building2,
    iconFilled: Building2Icon,
  },
];

const adminLink = {
  name: "User",
  href: "/user",
  icon: UserCircle2,
  iconFilled: UserCircle2Icon,
};

export function AuthenticatedNav() {
  const { userId } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (userId) {
        const response = await fetch(`/api/user/role?clerkId=${userId}`);
        const data = await response.json();
        setIsAdmin(data.role === "ADMIN");
      }
    };
    checkAdmin();
  }, [userId]);

  const authenticatedLinks = isAdmin ? [...baseLinks, adminLink] : baseLinks;

  const isActiveLink = (href: string) => {
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <>
      <nav className="mb-4 rounded-2xl border shadow-lg px-2 py-2 bg-white hidden md:block">
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
                  {link.icon &&
                    (isActiveLink(link.href) ? (
                      <link.iconFilled className="h-5 w-5 transition-all duration-200 ease-in-out scale-110" />
                    ) : (
                      <link.icon className="h-5 w-5 transition-all duration-200 ease-in-out" />
                    ))}
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

      <div className="fixed bottom-6 right-6 md:hidden z-[100]">
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              className={`h-14 w-14 rounded-full shadow-lg transition-all duration-200 ${
                isMenuOpen ? "bg-gray-100 scale-105" : ""
              }`}
              size="icon"
              variant="default"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 mb-2 mr-2"
            align="end"
            alignOffset={-60}
            sideOffset={0}
            forceMount
          >
            <DropdownMenuLabel>Menu Navigasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {authenticatedLinks.map((link) => (
              <DropdownMenuItem key={link.name} asChild>
                <Link
                  href={link.href}
                  className={`w-full flex items-center gap-3 ${
                    isActiveLink(link.href) ? "font-medium" : ""
                  }`}
                >
                  {link.icon &&
                    (isActiveLink(link.href) ? (
                      <link.iconFilled className="h-5 w-5" />
                    ) : (
                      <link.icon className="h-5 w-5" />
                    ))}
                  <span>{link.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <div className="px-2 py-2 flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
              <span className="text-sm">Akun</span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
