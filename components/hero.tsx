"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import pillsDrugImage from "@/public/assets/pillsdrug.png";
import capsuleImage from "@/public/assets/capsule.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { DotPattern } from "@/components/ui/dot-pattern";

export const Hero = () => {
  const router = useRouter();
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
        name: "Luna",
        role: "Apoteker",
        avatar: "/assets/pharmacist-avatar.jpg",
        isOnline: true,
      },
    },
  ]);

  const headingWords = ["Solusi", "Kesehatan", "Anda"];

  return (
    <section className="min-h-screen pt-40 pb-20 overflow-hidden relative bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative rounded-[2.5rem] bg-white/95 border border-gray-300/50 overflow-hidden backdrop-blur-xl p-8 md:p-12"
        >
          <DotPattern className="absolute inset-0 h-full w-full text-blue-100/50" />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute top-8 left-8 w-48 h-48 md:w-60 md:h-60 z-10 hidden md:block"
          >
            <Image
              src={pillsDrugImage}
              alt="Pills"
              className="w-full h-full object-contain drop-shadow-2xl opacity-90"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-8 right-8 w-48 h-48 md:w-60 md:h-60 z-10 hidden md:block"
          >
            <Image
              src={capsuleImage}
              alt="Pills"
              className="w-full h-full object-contain drop-shadow-2xl opacity-90"
            />
          </motion.div>

          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group border border-gray-300/50 rounded-full bg-white/90 transition-all ease-in hover:bg-white/95"
            >
              <AnimatedShinyText className="inline-flex items-center text-sm font-medium px-6 py-2">
                <span>✨ 100% Apoteker Bersertifikat</span>
              </AnimatedShinyText>
            </motion.div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">
              {headingWords.map((word, index) => (
                <BlurFade key={index} delay={0.2 * (index + 1)} inView>
                  <span
                    className={
                      word === "Anda"
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                        : ""
                    }
                  >
                    {word}
                  </span>
                </BlurFade>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-lg text-gray-900 font-medium sm:text-xl max-w-2xl"
            >
              Dapatkan saran obat & vitamin dari apoteker profesional dalam
              hitungan menit. Aman, terpercaya, dan tersedia 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-10"
            >
              <SignedOut>
                <Button
                  className="bg-gradient-to-b from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 hover:scale-105 transition-all duration-300 shadow-lg"
                  size="lg"
                  onClick={() => router.push("/sign-up")}
                >
                  Konsultasi Gratis
                </Button>
              </SignedOut>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="max-w-xl mx-auto relative"
          >
            <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="p-4 bg-white/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white ring-2 ring-blue-100/50">
                      <AvatarImage src="/assets/pharmacist-avatar.jpg" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                        Lina
                        <Badge className="bg-green-100 text-green-700 border-0">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                          Online
                        </Badge>
                      </h2>
                      <p className="text-sm text-gray-500">Apoteker</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.2 }}
                      className={cn(
                        "flex gap-3",
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      {message.sender === "agent" && (
                        <div className="flex flex-col space-y-2 max-w-[85%]">
                          <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none text-sm text-gray-800 shadow-sm">
                            {message.text}
                            <div className="text-xs text-gray-400 mt-1">
                              {message.time}
                            </div>
                          </div>
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="bg-blue-500 p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-sm text-white">
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
                </AnimatePresence>
              </CardContent>
              <BorderBeam
                size={250}
                duration={12}
                delay={9}
                colorFrom="#3B82F6"
                colorTo="#93C5FD"
                borderWidth={3.5}
              />
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
