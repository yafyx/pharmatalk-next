"use client";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";

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

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #7FD1AE 100%)",
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
        className="container mx-auto px-4 max-w-4xl relative z-10"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="section-heading text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            variants={itemVariants}
          >
            Daftar Gratis Sekarang
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Dapatkan konsultasi kesehatan dari dokter terpercaya kapanpun dan
            dimanapun Anda berada secara mudah dan aman.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          variants={itemVariants}
        >
          <SignedOut>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="px-8 h-14 text-lg font-semibold rounded-2xl
                bg-black hover:bg-gray-900 text-white
                shadow-[0_0_0_3px_rgba(0,0,0,0.1)] 
                hover:shadow-[0_0_0_3px_rgba(0,0,0,0.2)]
                transition-all duration-300"
                onClick={() => router.push("/sign-up")}
              >
                Daftar Gratis
              </Button>
            </motion.div>
          </SignedOut>
        </motion.div>
      </motion.div>
    </section>
  );
};
