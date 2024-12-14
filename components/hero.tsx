"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import pillsDrugImage from "@/public/assets/pillsdrug.png";
import capsuleImage from "@/public/assets/capsule.png";
import { SignedOut } from "@clerk/nextjs";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const floatingPillsVariants = {
  initial: { y: 0, rotate: 0, scale: 1 },
  animate: {
    y: [0, -20, 0],
    rotate: [-5, 5, -5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    },
  },
};

const backgroundParticleVariants = {
  animate: (i: number) => ({
    x: ["50vw", "-10px"],
    y: [Math.random() * 50, Math.random() * 100],
    rotate: [0, 360],
    scale: [1, Math.random() * (1.5 - 0.5) + 0.5],
    transition: {
      duration: 5 + Math.random() * 5,
      repeat: Infinity,
      delay: i * 0.8,
      ease: "easeInOut",
    },
  }),
};

const typingAnimation = {
  animate: (i: number) => ({
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      delay: i * 0.15,
      ease: "easeInOut",
    },
  }),
};

export const Hero = () => {
  const router = useRouter();
  const [isTyping] = useState(true);
  const [messages] = useState([
    {
      id: 1,
      text: "Halo, saya butuh konsultasi 👋",
      sender: "user",
      time: "21:12",
      status: "read",
    },
    {
      id: 2,
      text: "Saya mengalami sakit kepala dan demam sejak kemarin. Obat apa yang aman?",
      sender: "user",
      time: "21:12",
      status: "read",
    },
    {
      id: 3,
      text: "Selamat malam! Saya akan membantu Anda. Bisa jelaskan lebih detail gejalanya?",
      sender: "agent",
      time: "21:13",
      agent: {
        name: "Dr. Lina",
        role: "Apoteker Spesialis",
        avatar: "/assets/pharmacist-avatar.jpg",
        isOnline: true,
      },
    },
  ]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <motion.section
      ref={heroRef}
      animate="visible"
      className="pt-20 pb-20 md:pt-5 md:pb-10 overflow-x-clip relative bg-gradient-to-br from-[#7FD1AE] via-[#9EDFFF] to-[#E2F4FF]"
      initial="hidden"
    >
      <motion.div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={backgroundParticleVariants}
            animate="animate"
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ x: -10, y: Math.random() * 50 }}
          />
        ))}
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 pb-14 mt-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.div
              className="inline-flex rounded-full border border-[#163300] text-[#163300] px-6 py-2 text-sm font-semibold backdrop-blur-sm bg-white/30"
              transition={{ duration: 0.6 }}
              variants={fadeUpVariants}
            >
              100% Obat Asli
            </motion.div>

            <motion.h1
              className="mt-8 bg-gradient-to-br from-black via-[#163300] to-[#2A5A3C] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeUpVariants}
            >
              PharmaTalk
            </motion.h1>

            <motion.p
              animate={{ opacity: 1 }}
              className="mt-6 text-lg text-[#010D3E] sm:text-xl"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Temukan obat yang tepat dan solusi terbaik untuk kesehatan Anda
              dengan konsultasi melalui live chat kami.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-4"
              transition={{ duration: 0.6, delay: 0.6 }}
              variants={fadeUpVariants}
            >
              <SignedOut>
                <Button
                  className="bg-black text-white hover:scale-105 transition-transform"
                  color="primary"
                  size="lg"
                  onClick={() => router.push("/sign-up")}
                >
                  Daftar Gratis
                </Button>
              </SignedOut>
            </motion.div>
          </div>

          <div className="relative h-[400px] md:h-[648px]">
            <motion.div
              animate="animate"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-0 top-10 lg:left-40"
              initial="initial"
              variants={floatingPillsVariants}
            />
            <Card className="w-[380px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-white/95 backdrop-blur-md md:ml-20 md:mt-14 rounded-2xl border-0">
              <CardHeader className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src="/assets/pharmacist-avatar.jpg" />
                      <AvatarFallback>DL</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-black flex items-center gap-2">
                        Dr. Lina
                        <Badge variant="secondary" className="h-5">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                          Online
                        </Badge>
                      </h2>
                      <p className="text-sm text-gray-500">
                        Apoteker Spesialis
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-[400px]">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.3 }}
                      className={cn(
                        "flex gap-3",
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      {message.sender === "agent" && (
                        <div className="flex flex-col space-y-2 max-w-[85%]">
                          <div className="bg-white p-4 rounded-2xl rounded-tl-none text-sm text-black shadow-md border border-gray-100">
                            {message.text}
                            <div className="text-xs text-gray-400 mt-1">
                              {message.time}
                            </div>
                          </div>
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="bg-[#2563EB] p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-md text-white">
                          {message.text}
                          <div className="text-xs text-blue-100 mt-1 flex items-center justify-end gap-1">
                            {message.time}
                            {message.status === "read" && (
                              <span className="text-blue-100">✓✓</span>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div className="flex gap-2 px-4 py-2 w-16 bg-gray-100 rounded-full ml-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={typingAnimation}
                          animate="animate"
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-3, 3, -3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute -left-40 top-10 hidden md:block"
              style={{ translateY }}
            >
              <Image
                alt="Pills image"
                height={250}
                loading="lazy"
                quality={75}
                src={pillsDrugImage}
                width={250}
              />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [30, 40, 30],
                scale: [1, 0.95, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute right-0 top-[524px] hidden lg:block"
              style={{
                rotate: 30,
                translateY,
              }}
            >
              <Image
                alt="Capsule image"
                height={220}
                loading="lazy"
                quality={75}
                src={capsuleImage}
                width={220}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
