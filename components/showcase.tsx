"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Stethoscope, Pill, MapPin, Newspaper, LucideIcon } from "lucide-react";

import pfizerLogo from "@/public/assets/logo-pfizer.png";
import gskLogo from "@/public/assets/logo-gsk.png";
import bayerLogo from "@/public/assets/logo-bayer.png";
import merckLogo from "@/public/assets/logo-merck.png";
import rocheLogo from "@/public/assets/logo-roche.png";
import novartisLogo from "@/public/assets/logo-novartis.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  action: string;
}

const features: FeatureCard[] = [
  {
    icon: Stethoscope,
    title: "Konsultasi Langsung",
    description:
      "Interaksi langsung bersama ahli apoteker handal untuk menemukan obat terbaik Anda!",
    gradient: "from-blue-500 to-blue-600",
    action: "Mulai Konsultasi",
  },
  {
    icon: Pill,
    title: "Pencarian Obat Terbaik",
    description:
      "Temukan rekomendasi obat terbaik sesuai keluhan dan kebutuhan kesehatan Anda!",
    gradient: "from-teal-500 to-teal-600",
    action: "Cari Obat",
  },
  {
    icon: MapPin,
    title: "Lokasi Apotek Terdekat",
    description:
      "Temukan lokasi apotek terdekat dengan mudah untuk akses cepat ke obat yang Anda butuhkan.",
    gradient: "from-indigo-500 to-indigo-600",
    action: "Cari Apotek",
  },
  {
    icon: Newspaper,
    title: "Topik Kesehatan",
    description:
      "Memastikan Anda selalu terdepan dengan berita dan informasi terkini seputar dunia kesehatan.",
    gradient: "from-sky-500 to-sky-600",
    action: "Baca Artikel",
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
                <motion.div
                  key={`logo-${index}`}
                  whileHover={{ scale: 1.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    alt={`Partner logo ${index + 1}`}
                    className="relative z-10 transition-transform duration-300 grayscale hover:grayscale-0"
                    height={70}
                    src={logo}
                  />
                </motion.div>
              ))}
              {[
                pfizerLogo,
                gskLogo,
                bayerLogo,
                merckLogo,
                rocheLogo,
                novartisLogo,
              ].map((logo, index) => (
                <motion.div
                  key={`logo-duplicate-${index}`}
                  whileHover={{ scale: 1.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    alt={`Partner logo ${index + 1}`}
                    className="relative z-10 transition-transform duration-300 grayscale hover:grayscale-0"
                    height={70}
                    src={logo}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-b from-[#FFFFFF] via-[#E3F2FF] to-[#9EDFFF] py-24 md:py-40 overflow-hidden relative">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div className="max-w-[720px] mx-auto mb-20">
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

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group relative overflow-hidden border-none bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`absolute inset-0 opacity-10 bg-gradient-to-br ${feature.gradient}`}
                  />
                  <CardHeader className="text-center pt-8">
                    <div className="mx-auto mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white inline-flex`}
                      >
                        <feature.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl tracking-tight">
                      {feature.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="text-center px-8">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center pb-8">
                    <Button
                      variant="outline"
                      className={`group-hover:bg-gradient-to-r ${feature.gradient} group-hover:text-white transition-all duration-300`}
                    >
                      {feature.action}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
