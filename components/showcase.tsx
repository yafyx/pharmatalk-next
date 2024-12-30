"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Stethoscope,
  Pill,
  MapPin,
  Newspaper,
  Timer,
  Search,
  Clock,
  Cross,
} from "lucide-react";

import pfizerLogo from "@/public/assets/logo-pfizer.png";
import gskLogo from "@/public/assets/logo-gsk.png";
import bayerLogo from "@/public/assets/logo-bayer.png";
import merckLogo from "@/public/assets/logo-merck.png";
import rocheLogo from "@/public/assets/logo-roche.png";
import novartisLogo from "@/public/assets/logo-novartis.png";
import { BentoGrid, BentoCard } from "./ui/bento-grid";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    Icon: Stethoscope,
    name: "Konsultasi Langsung",
    description: "Konsultasi online dengan apoteker profesional 24/7",
    href: "#",
    cta: "Mulai Konsultasi",
    className: "col-span-3 lg:col-span-2 min-h-[320px]",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-600/20" />
        <div className="absolute right-4 md:right-8 top-4 md:top-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-lg">
            <Timer className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">
              Rata-rata respon 5 menit
            </span>
          </div>
          <div className="flex items-center gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Avatar key={i} className="border-2 border-white shadow-md">
                <AvatarImage src={`https://i.pravatar.cc/40?img=${i + 20}`} />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
            ))}
            <Badge variant="secondary">+24 Apoteker Online</Badge>
          </div>
        </div>
        <div className="absolute left-4 md:left-6 right-4 md:right-6 bottom-20 md:bottom-16 space-y-2 md:space-y-4">
          {[
            "Selamat datang! Ada yang bisa saya bantu?",
            "Saya ingin konsultasi tentang obat alergi",
            "Baik, saya akan bantu jelaskan pilihan obat yang sesuai",
          ].map((message, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`flex ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 md:px-4 py-2 shadow-sm ${
                  i % 2 === 0
                    ? "bg-white text-gray-800"
                    : "bg-blue-500 text-white"
                }`}
              >
                <p className="text-xs md:text-sm">{message}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      </div>
    ),
  },
  {
    Icon: Pill,
    name: "Pencarian Obat Pintar",
    description: "AI-powered medicine finder untuk kebutuhan Anda",
    href: "#",
    cta: "Cari Obat",
    className: "col-span-3 lg:col-span-1 min-h-[320px]",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-transparent to-teal-600/20" />
        <div className="absolute left-6 right-6 top-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lg">
              <Search className="h-4 w-4 text-teal-500" />
              <span className="text-sm text-muted-foreground">
                Cari obat...
              </span>
            </div>
            {["Paracetamol", "Amoxicillin", "Vitamin C"].map((term, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2"
              >
                <Clock className="h-3 w-3 text-teal-500" />
                <span className="text-xs">{term}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      </div>
    ),
  },
  {
    Icon: MapPin,
    name: "Apotek Terdekat",
    description: "Temukan apotek 24 jam di sekitar Anda",
    href: "#",
    cta: "Cari Apotek",
    className: "col-span-3 lg:col-span-1 min-h-[320px]",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 via-transparent to-indigo-600/20" />
        <div className="absolute inset-x-6 top-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="mb-3 flex items-center justify-between rounded-lg bg-white/90 p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Cross className="h-4 w-4 text-indigo-500" />
                <div className="text-xs">
                  <p className="font-medium">
                    Apotek {["Sehat", "Prima", "24 Jam"][i]}
                  </p>
                  <p className="text-muted-foreground">{0.5 + i * 0.3} km</p>
                </div>
              </div>
              <Progress value={100 - i * 20} className="w-16" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      </div>
    ),
  },
  {
    Icon: Newspaper,
    name: "Artikel Kesehatan",
    description: "Update terkini dunia kesehatan & farmasi",
    href: "#",
    cta: "Baca Artikel",
    className: "col-span-3 lg:col-span-2 min-h-[320px]",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-transparent to-sky-600/20" />
        <ScrollArea className="absolute inset-6 pb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="mb-4 flex items-start gap-4 rounded-lg bg-white/90 p-4 shadow-sm hover:bg-white/95 transition-colors"
            >
              <div className="min-w-[40px] h-10 rounded-md bg-sky-100 flex items-center justify-center">
                {
                  [
                    <Newspaper className="h-5 w-5 text-sky-600" key="news" />,
                    <Timer className="h-5 w-5 text-sky-600" key="timer" />,
                    <Pill className="h-5 w-5 text-sky-600" key="pill" />,
                    <Stethoscope
                      className="h-5 w-5 text-sky-600"
                      key="steth"
                    />,
                  ][i]
                }
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-medium text-gray-900">
                  {
                    [
                      "Inovasi Terbaru dalam Dunia Farmasi",
                      "Tips Menjaga Kesehatan di Musim Hujan",
                      "Panduan Lengkap Vitamin & Suplemen",
                      "Mengenal Antibiotik & Penggunaannya",
                    ][i]
                  }
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {
                    [
                      "Temukan perkembangan terbaru dalam industri farmasi dan dampaknya bagi kesehatan.",
                      "Jaga diri dan keluarga tetap sehat dengan tips praktis ini.",
                      "Pahami manfaat dan cara penggunaan suplemen yang tepat.",
                      "Informasi penting seputar penggunaan antibiotik yang benar.",
                    ][i]
                  }
                </p>
              </div>
            </motion.div>
          ))}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none" />
      </div>
    ),
  },
];

export const Showcase = () => {
  return (
    <>
      <div className="py-16 md:py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex overflow-hidden w-full max-w-6xl mx-auto relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />

            <motion.div
              animate={{
                translateX: "-50%",
              }}
              className="flex gap-20 flex-none pr-20"
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {[
                pfizerLogo,
                gskLogo,
                bayerLogo,
                merckLogo,
                rocheLogo,
                novartisLogo,
              ].map((logo, index) => (
                <div key={`logo-${index}`} className="relative">
                  <Image
                    alt={`Partner logo ${index + 1}`}
                    className="relative z-10 grayscale"
                    height={70}
                    src={logo}
                  />
                </div>
              ))}
              {[
                pfizerLogo,
                gskLogo,
                bayerLogo,
                merckLogo,
                rocheLogo,
                novartisLogo,
              ].map((logo, index) => (
                <div key={`logo-duplicate-${index}`} className="relative">
                  <Image
                    alt={`Partner logo ${index + 1}`}
                    className="relative z-10 grayscale"
                    height={70}
                    src={logo}
                  />
                </div>
              ))}
            </motion.div>

            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-b from-[#FFFFFF] via-[#E3F2FF] to-[#9EDFFF] py-24 md:py-40 overflow-hidden relative">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            className="max-w-[720px] mx-auto mb-20"
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex justify-center" variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-20" />
                <div className="relative px-8 py-3 bg-white/90 backdrop-blur rounded-full shadow-xl">
                  <span className="text-gray-800 font-medium">
                    Kesehatan Anda Prioritas Kami
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h2
              className="text-center text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600"
              variants={itemVariants}
            >
              Solusi Kesehatan Terpercaya
            </motion.h2>

            <motion.p
              className="text-center text-gray-700 text-xl mt-6"
              variants={itemVariants}
            >
              Dapatkan layanan konsultasi kesehatan dan informasi obat
              terlengkap untuk memenuhi kebutuhan kesehatan Anda dengan mudah
              dan cepat.
            </motion.p>
          </motion.div>

          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>
    </>
  );
};
