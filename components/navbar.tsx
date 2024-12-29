"use client";

import * as React from "react";
import {
  useUser,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Menu,
  Home,
  Newspaper,
  Pill,
  Building2,
  LucideIcon,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isHomePage = pathname === "/";

  const authenticatedLinks = [
    { name: "Beranda", href: "/dashboard", icon: Home },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Artikel", href: "/artikel", icon: Newspaper },
    { name: "Cari Obat", href: "/cari-obat", icon: Pill },
    { name: "Cari Apotek", href: "/cari-apotek", icon: Building2 },
  ];

  const unauthenticatedLinks: {
    name: string;
    href: string;
    icon?: LucideIcon;
  }[] = [
    { name: "Pelayanan", href: "/#pelayanan" },
    { name: "Rekomendasi", href: "/#rekomendasi" },
    { name: "Kontak Kami", href: "/#kontak" },
  ];

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const elementId = href.replace("/#", "");
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = isHomePage
    ? unauthenticatedLinks
    : isLoaded && user
    ? authenticatedLinks
    : unauthenticatedLinks;

  const isActiveLink = (href: string) => {
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <div
      className={`w-full fixed ${
        isLoaded && user ? "bottom-0" : "top-0"
      } z-50 flex justify-center`}
    >
      <SignedOut>
        {isHomePage && (
          <div className="flex justify-center items-center py-4 bg-black/90 backdrop-blur-sm text-white gap-3">
            <p className="text-white/60 hidden md:block text-base">
              Temukan obat yang tepat dan solusi terbaik untuk kesehatan Anda
            </p>
            <div className="inline-flex gap-2 items-center text-base">
              <p>Daftar Gratis Sekarang</p>
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        )}
      </SignedOut>

      <nav
        className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          isLoaded && user
            ? "mb-4 rounded-2xl border shadow-lg px-2 py-2 bg-white"
            : ""
        }`}
      >
        <div className={`flex items-center ${isLoaded && user ? "gap-8" : ""}`}>
          {!isLoaded || !user ? (
            <Link
              href="/"
              className="flex items-center space-x-3 flex-shrink-0 min-w-[160px]"
            >
              <Image
                src="/assets/logo.png"
                alt="PharmaTalk"
                width={45}
                height={45}
                className="w-[40px] h-[40px] md:w-[45px] md:h-[45px]"
              />
              <span className="font-bold text-lg md:text-xl">PharmaTalk</span>
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
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
          )}

          {(!isLoaded || !user) && (
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          )}

          {!isLoaded || !user ? (
            <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 min-w-[160px] justify-end">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10",
                    },
                  }}
                />

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-accent transition-colors duration-200"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="flex flex-col space-y-6 mt-8">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={(e) => {
                            handleClick(e, link.href);
                            setIsOpen(false);
                          }}
                          className="text-xl hover:text-primary transition-colors duration-200 flex items-center space-x-2 group"
                        >
                          <span className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors duration-200" />
                          <span>{link.name}</span>
                        </Link>
                      ))}
                      <Link
                        href="/dashboard"
                        className="text-xl hover:text-primary transition-colors duration-200 flex items-center space-x-2 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors duration-200" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="text-xl hover:text-primary transition-colors duration-200 flex items-center space-x-2 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors duration-200" />
                        <span>Profile</span>
                      </Link>
                      <SignOutButton>
                        <Button
                          variant="destructive"
                          className="w-full mt-4 text-lg hover:bg-destructive/90 transition-colors duration-200"
                        >
                          Log Out
                        </Button>
                      </SignOutButton>
                    </div>
                  </SheetContent>
                </Sheet>
              </SignedIn>

              <SignedOut>
                <Link href="/sign-up">
                  <Button variant="default" size="lg" className="text-base">
                    Daftar Gratis
                  </Button>
                </Link>
              </SignedOut>
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
