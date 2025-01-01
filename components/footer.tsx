"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/logo.png";
import SocialX from "@/public/assets/social-x.svg";
import SocialInsta from "@/public/assets/social-insta.svg";
import SocialLinkedin from "@/public/assets/social-linkedin.svg";
import SocialYoutube from "@/public/assets/social-youtube.svg";

export const Footer = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return null;
  }

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
    <footer className="sticky z-0 bottom-0 left-0 w-full h-80 bg-black text-[#BCBCBC]">
      <div className="relative overflow-hidden w-full h-full flex justify-end px-12 items-start py-12">
        <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg">
          <ul>
            {footerLinks.slice(0, 2).map((link) => (
              <li key={link.label}>
                <Link
                  className="hover:text-white transition-colors duration-200"
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {footerLinks.slice(2).map((link) => (
              <li key={link.label}>
                <Link
                  className="hover:text-white transition-colors duration-200"
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-8 left-12 flex flex-col items-start">
          <div className="inline-flex relative w-32 h-10">
            <Image
              fill
              priority
              alt="logo"
              className="relative object-contain"
              src={logo}
            />
          </div>
          <div className="flex gap-6 mt-4">
            {[
              { icon: SocialX, name: "X", link: "https://twitter.com" },
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
                href={social.link}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={20}
                  height={20}
                  className="invert"
                />
              </Link>
            ))}
          </div>
        </div>

        <h2 className="absolute bottom-0 right-0 translate-y-1/3 text-[80px] sm:text-[192px] font-bold text-[#1a1a1a]">
          PharmaTalk
        </h2>
      </div>
    </footer>
  );
};
