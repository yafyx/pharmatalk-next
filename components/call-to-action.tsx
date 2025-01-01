"use client";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";
import { Clock, Shield, UserCheck } from "lucide-react";
import { FAQ } from "@/components/faq";

export const CallToAction = () => {
  const router = useRouter();
  const sectionRef = useRef(null);

  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Layanan 24/7",
      description: "Konsultasi kapanpun Anda butuhkan",
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Tenaga Medis Terpercaya",
      description: "Tim tenaga medis professional berpengalaman",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privasi Terjamin",
      description: "Data medis Anda terenkripsi & aman",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #e6f5ed 0%, #7FD1AE 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          className="absolute w-[500px] h-[500px] rounded-full bg-[#8BE3BF]/20 blur-3xl"
          style={{ left: "0%", top: "20%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          className="absolute w-[400px] h-[400px] rounded-full bg-[#7FD1AE]/20 blur-3xl"
          style={{ right: "10%", top: "10%" }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 max-w-7xl relative z-10"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-4"
              variants={itemVariants}
            >
              Mulai Perjalanan Sehat Anda
            </motion.span>
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight"
              variants={itemVariants}
            >
              Konsultasi Kesehatan{" "}
              <span className="text-emerald-600">Kapanpun</span> Anda Butuhkan
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Dapatkan akses ke tenaga medis terpercaya 24/7, konsultasi
              kesehatan yang aman, dan panduan kesehatan personal untuk Anda dan
              keluarga.
            </motion.p>

            <SignedOut>
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="px-8 h-14 text-lg font-semibold rounded-2xl
                    bg-emerald-600 hover:bg-emerald-700 text-white
                    shadow-lg hover:shadow-emerald-500/30
                    transition-all duration-300"
                    onClick={() => router.push("/sign-up")}
                  >
                    Daftar Sekarang
                  </Button>
                </motion.div>
                <p className="text-sm text-gray-600 mt-2 sm:mt-4">
                  ✓ Gratis Pendaftaran
                  <br />
                  ✓ Konsultasi Langsung
                  <br />✓ Tenaga Medis Berpengalaman
                </p>
              </motion.div>
            </SignedOut>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-32">
          <FAQ />
        </motion.div>
      </motion.div>
    </section>
  );
};
