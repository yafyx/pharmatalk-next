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
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isHomePage = pathname === "/";

  const authenticatedLinks = [
    { name: "Beranda", href: "/dashboard" },
    { name: "Artikel", href: "/artikel" },
    { name: "Cari Obat", href: "/cari-obat" },
    { name: "Cari Apotek", href: "/cari-apotek" },
  ];

  const unauthenticatedLinks = [
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

  return (
    <div className="w-full fixed top-0 z-50">
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

      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 flex h-16 md:h-20 items-center justify-between max-w-7xl">
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
        </div>
      </nav>
    </div>
  );
}
