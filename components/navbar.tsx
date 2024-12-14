"use client";

import * as React from "react";
import { useUser, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <div className="flex justify-center items-center py-3 bg-black/90 backdrop-blur-sm text-white text-sm gap-3">
            <p className="text-white/60 hidden md:block">
              Temukan obat yang tepat dan solusi terbaik untuk kesehatan Anda
            </p>
            <div className="inline-flex gap-1 items-center">
              <p>Daftar Gratis Sekarang</p>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        )}
      </SignedOut>

      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/logo.png"
              alt="PharmaTalk"
              width={35}
              height={35}
            />
            <span className="font-bold">PharmaTalk</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="font-medium">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          handleClick(e, link.href);
                          setIsOpen(false);
                        }}
                        className="text-lg"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link href="/dashboard" className="text-lg">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="text-lg">
                      Profile
                    </Link>
                    <SignOutButton>
                      <Button variant="destructive" className="w-full mt-4">
                        Log Out
                      </Button>
                    </SignOutButton>
                  </div>
                </SheetContent>
              </Sheet>
            </SignedIn>

            <SignedOut>
              <Link href="/sign-up">
                <Button variant="default">Daftar Gratis</Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </div>
  );
}
