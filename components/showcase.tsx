"use client";
import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import {
  FaStethoscope,
  FaPills,
  FaMapMarkerAlt,
  FaNewspaper,
} from "react-icons/fa";

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

export const Showcase = () => {
  return (
    <>
      <div className="py-12 md:py-16 bg-white relative overflow-hidden">
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-blue-50"
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto flex justify-center items-center">
          <div
            className="flex overflow-hidden w-full max-w-5xl"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black, transparent)",
            }}
          >
            <motion.div
              animate={{
                translateX: "-50%",
              }}
              className="flex gap-14 flex-none pr-14"
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
                <Image
                  key={`logo-${index}`}
                  alt={`Partner logo ${index + 1}`}
                  className="logo-ticker-image"
                  height={60}
                  src={logo}
                />
              ))}
              {[
                pfizerLogo,
                gskLogo,
                bayerLogo,
                merckLogo,
                rocheLogo,
                novartisLogo,
              ].map((logo, index) => (
                <Image
                  key={`logo-duplicate-${index}`}
                  alt={`Partner logo ${index + 1}`}
                  className="logo-ticker-image"
                  height={60}
                  src={logo}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-b from-[#FFFFFF] to-[#9EDFFF] py-20 md:py-32 overflow-hidden relative">
        {/* <motion.div
          animate={{ backgroundPosition: "100% 100%" }}
          className="absolute inset-0 opacity-30"
          initial={{ backgroundPosition: "0 0" }}
          style={{
            backgroundImage: "url('/assets/grid-pattern.png')",
            backgroundSize: "cover",
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        /> */}

        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            className="max-w-[640px] mx-auto mb-16"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.div className="flex justify-center" variants={itemVariants}>
              <div className="tag text-gray-800 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
                Kesehatan Anda Prioritas Kami
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {[
              {
                icon: FaStethoscope,
                title: "Konsultasi Langsung Secara Real-time",
                description:
                  "Interaksi langsung bersama ahli apoteker handal untuk menemukan obat terbaik Anda!",
                gradient: "from-[#60A5FA] to-[#3B82F6]",
              },
              {
                icon: FaPills,
                title: "Pencarian Obat Terbaik",
                description:
                  "Temukan rekomendasi obat terbaik sesuai keluhan dan kebutuhan kesehatan Anda!",
                gradient: "from-[#2DD4BF] to-[#0D9488]",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Lokasi Apotek Terdekat",
                description:
                  "Temukan lokasi apotek terdekat dengan mudah untuk akses cepat ke obat yang Anda butuhkan.",
                gradient: "from-[#818CF8] to-[#4F46E5]",
              },
              {
                icon: FaNewspaper,
                title: "Topik Kesehatan Terhangat",
                description:
                  "Memastikan Anda selalu terdepan dengan berita dan informasi terkini seputar dunia kesehatan.",
                gradient: "from-[#38BDF8] to-[#0284C7]",
              },
            ].map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group h-full border-none hover:scale-105 transition-all duration-500">
                  <CardBody
                    className={`text-center p-8 bg-gradient-to-br ${card.gradient} rounded-2xl overflow-hidden relative`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      transition={{ duration: 0.3 }}
                      whileHover={{ opacity: 0.2 }}
                    />
                    <div className="relative z-10">
                      <motion.div
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <card.icon className="w-12 h-12 mx-auto mb-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4 text-white">
                        {card.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
