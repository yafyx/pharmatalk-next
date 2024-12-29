"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const unauthenticatedLinks = [
  { name: "Pelayanan", href: "/#pelayanan" },
  { name: "Rekomendasi", href: "/#rekomendasi" },
  { name: "Kontak Kami", href: "/#kontak" },
];

export function UnauthenticatedNav() {
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

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/assets/logo.png"
                alt="PharmaTalk"
                width={45}
                height={45}
                className="w-[40px] h-[40px] md:w-[45px] md:h-[45px]"
              />
              <span className="font-bold text-lg md:text-xl">PharmaTalk</span>
            </Link>

            <div className="hidden md:flex items-center justify-center gap-8">
              {unauthenticatedLinks.map((link) => (
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

            <div className="flex items-center gap-4 md:gap-6">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10",
                    },
                  }}
                />
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
        </div>
      </nav>
    </>
  );
}
