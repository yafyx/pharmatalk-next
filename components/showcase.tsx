"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Stethoscope,
  Pill,
  MapPin,
  Newspaper,
  Timer,
  Search,
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
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";
import React from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const medicines = [
  {
    name: "Paracetamol",
    description: "Obat penurun demam",
    icon: "💊",
    color: "#00C9A7",
  },
  {
    name: "Amoxicillin",
    description: "Antibiotik",
    icon: "💊",
    color: "#FFB800",
  },
  {
    name: "Vitamin C",
    description: "Suplemen",
    icon: "💊",
    color: "#1E86FF",
  },
  {
    name: "Ibuprofen",
    description: "Anti inflamasi",
    icon: "💊",
    color: "#FF4B4B",
  },
  {
    name: "Omeprazole",
    description: "Obat maag",
    icon: "💊",
    color: "#9747FF",
  },
  {
    name: "Cetirizine",
    description: "Anti alergi",
    icon: "💊",
    color: "#00BA88",
  },
].flatMap((item) => Array(1).fill(item));

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
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
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
          <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lg mb-4">
            <Search className="h-4 w-4 text-teal-500" />
            <span className="text-sm text-muted-foreground">Cari obat...</span>
          </div>
          <div className="h-[240px] overflow-hidden">
            <AnimatedList>
              {medicines.map((medicine, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "relative mx-auto w-full cursor-pointer overflow-hidden rounded-lg p-2 mb-2",
                    "transition-all duration-200 ease-in-out hover:scale-[102%]",
                    "bg-white/90 shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: medicine.color }}
                    >
                      <span className="text-sm">{medicine.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {medicine.name}
                        </span>
                        <span className="text-xs text-teal-600">
                          {medicine.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {medicine.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatedList>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
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
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
      </div>
    ),
  },
];

export const Showcase = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const childAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerAnimation}
        className="py-16 md:py-12 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto">
          <motion.div variants={childAnimation} className="mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Tanya Obat dengan Jaminan Kualitas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dapatkan informasi obat terpercaya dari perusahaan farmasi
              terkemuka dunia dengan standar kualitas internasional
            </p>
          </motion.div>

          <motion.div
            variants={childAnimation}
            className="flex overflow-hidden w-full max-w-6xl mx-auto relative"
          >
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
          </motion.div>
        </div>
      </motion.div>

      <motion.section
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerAnimation}
        className="bg-gradient-to-b from-[#FFFFFF] via-[#E3F2FF] to-[#9EDFFF] py-24 md:py-40 overflow-hidden relative"
      >
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            className="max-w-[720px] mx-auto mb-20"
            variants={childAnimation}
          >
            <motion.div className="flex justify-center" variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-20" />
                <div className="relative px-8 py-3 bg-white/90 backdrop-blur rounded-full shadow-xl">
                  <span className="text-gray-800 font-medium">
                    Solusi Kesehatan Digital Terpercaya
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h2
              className="text-center text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600"
              variants={itemVariants}
            >
              Konsultasi Kesehatan Lebih Mudah & Terpercaya
            </motion.h2>

            <motion.p
              className="text-center text-gray-700 text-xl mt-6"
              variants={itemVariants}
            >
              Hubungkan Anda dengan tenaga medis profesional, temukan informasi
              obat terlengkap, dan dapatkan solusi kesehatan yang tepat dalam
              genggaman Anda.
            </motion.p>
          </motion.div>

          <motion.div variants={childAnimation}>
            <BentoGrid>
              {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};
