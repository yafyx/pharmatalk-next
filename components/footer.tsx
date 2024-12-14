"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/logo.png";
import SocialX from "@/public/assets/social-x.svg";
import SocialInsta from "@/public/assets/social-insta.svg";
import SocialLinkedin from "@/public/assets/social-linkedin.svg";
import SocialYoutube from "@/public/assets/social-youtube.svg";

export const Footer = () => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const elementId = href.replace("/#", "");
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const footerLinks = [
    { label: "Tentang Kami", href: "/#kontak" },
    { label: "Konsultasi Utama", href: "/#pelayanan" },
    { label: "Layanan", href: "/#pelayanan" },
    { label: "Testimoni", href: "/#rekomendasi" },
  ];

  return (
    <footer className="bg-black text-[#BCBCBC] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center">
          <div className="inline-flex relative w-40 h-12">
            <Image
              fill
              priority
              alt="logo"
              className="relative object-contain"
              src={logo}
            />
          </div>
          <p className="mt-4 text-xl font-bold">Pharmatalk</p>

          <nav className="flex flex-col text-center md:flex-row md:justify-center gap-8 mt-12">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                aria-label={link.label}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-medium"
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-8 mt-12">
            {[
              {
                icon: SocialX,
                name: "X (Twitter)",
                link: "https://twitter.com",
              },
              {
                icon: SocialInsta,
                name: "Instagram",
                link: "https://instagram.com",
              },
              {
                icon: SocialLinkedin,
                name: "LinkedIn",
                link: "https://linkedin.com",
              },
              {
                icon: SocialYoutube,
                name: "YouTube",
                link: "https://youtube.com",
              },
            ].map((social) => (
              <Link
                key={social.name}
                aria-label={social.name}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                href={social.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt={social.name}
                  className="w-6 h-6 invert"
                  height={24}
                  src={social.icon}
                  width={24}
                />
              </Link>
            ))}
          </div>

          <p className="mt-12 text-sm text-[#BCBCBC]">
            &copy; {new Date().getFullYear()} PharmaTalk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
