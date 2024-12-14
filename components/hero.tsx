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

import pillsDrugImage from "@/public/assets/pillsdrug.png";
import capsuleImage from "@/public/assets/capsule.png";
import { SignedOut } from "@clerk/nextjs";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const floatingPillsVariants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [0, -20, 0],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  },
};

export const Hero = () => {
  const router = useRouter();
  const [messages] = useState([
    {
      id: 1,
      text: "Halo 👋",
      sender: "user",
      time: "21:12",
    },
    {
      id: 2,
      text: "Obat apa yang benar untuk masalah kesehatan saya? Bagaimana dosisnya?",
      sender: "user",
      time: "21:12",
    },
    {
      id: 3,
      text: "Kamu berada di tempat yang tepat! Mari bergabung di Pharmatalk untuk mendapatkan hasil konsultasinya di fitur khusus ini!",
      sender: "agent",
      time: "21:12",
      agent: {
        name: "Lina",
        role: "Apoteker",
        avatar: "😢",
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
      className="pt-20 pb-20 md:pt-5 md:pb-10 overflow-x-clip relative"
      initial="hidden"
      style={{
        background: "linear-gradient(135deg, #7FD1AE, #9EDFFF)",
      }}
    >
      <motion.div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: ["50vw", "-10px"],
              y: Math.random() * 50,
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ x: -10, y: Math.random() * 50 }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 2,
            }}
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
            <Card className="w-[380px] shadow-2xl bg-white/90 backdrop-blur-md md:ml-20 md:mt-14">
              <CardHeader className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-black">Live Chat</h2>
              </CardHeader>
              <CardContent className="p-4 space-y-4 bg-gray-50 min-h-[400px]">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      initial={{
                        opacity: 0,
                        x: message.sender === "user" ? 20 : -20,
                      }}
                      transition={{
                        delay: index * 0.2,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      {message.sender === "agent" && (
                        <div className="flex flex-col space-y-2 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                              <AvatarFallback>
                                {message.agent?.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="font-semibold text-black">
                                {message.agent?.name}
                              </span>
                              <span className="text-gray-600 ml-2">
                                {message.agent?.role}
                              </span>
                            </div>
                          </div>
                          <div className="bg-[#BEDEFF] p-3 rounded-lg text-sm text-black shadow-sm">
                            {message.text}
                            <div className="text-xs text-gray-500 mt-1">
                              {message.time}
                            </div>
                          </div>
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="bg-[#BEDEFF] text-black p-3 rounded-lg text-sm max-w-[80%] shadow-sm">
                          {message.text}
                          <div className="text-xs text-gray-600 mt-1 flex items-center justify-end gap-1">
                            {message.time}
                            <span className="inline-block">✓✓</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

            <motion.div
              animate="animate"
              className="absolute -left-40 top-10 hidden md:block"
              initial="initial"
              style={{ translateY }}
              variants={floatingPillsVariants}
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
              animate="animate"
              className="absolute right-0 top-[524px] hidden lg:block"
              initial="initial"
              style={{
                rotate: 30,
                translateY,
              }}
              variants={floatingPillsVariants}
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
