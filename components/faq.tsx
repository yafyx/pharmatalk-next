"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const sectionRef = useRef(null);

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

  const faqItems = [
    {
      question: "Bagaimana cara memulai konsultasi?",
      answer:
        "Anda cukup mendaftar akun, pilih tenaga medis yang tersedia, dan mulai konsultasi secara langsung melalui platform kami. Layanan ini GRATIS untuk semua pengguna.",
    },
    {
      question: "Apakah layanan konsultasi tersedia 24 jam?",
      answer:
        "Ya, layanan konsultasi kami tersedia 24/7 dengan tenaga medis (dokter dan apoteker) yang selalu siap membantu Anda secara gratis.",
    },
    {
      question: "Bagaimana dengan keamanan data medis saya?",
      answer:
        "Semua data medis dienkripsi dan disimpan dengan aman sesuai standar keamanan tertinggi.",
    },
    {
      question: "Berapa biaya untuk berkonsultasi?",
      answer:
        "Konsultasi pada platform kami 100% GRATIS! Tidak ada biaya tersembunyi.",
    },
    {
      question: "Apakah bisa mendapatkan resep obat?",
      answer:
        "Ya, tenaga medis dapat memberikan resep digital secara gratis yang dapat Anda tebus di apotek rekanan kami.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
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
        className="container mx-auto px-4 max-w-3xl relative z-10"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-6 py-2 rounded-full bg-emerald-100/70 backdrop-blur-sm 
            text-emerald-800 text-sm font-medium mb-4 border border-emerald-200/50"
            variants={itemVariants}
          >
            FAQ
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            variants={itemVariants}
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700/90 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Temukan jawaban untuk pertanyaan umum tentang layanan konsultasi
            kesehatan kami
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 md:p-8
          shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
          border border-white/30"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none bg-white/40 backdrop-blur-sm rounded-2xl mb-4 px-6 py-2
                hover:bg-white/50 transition-all duration-300"
              >
                <AccordionTrigger
                  className="text-left text-lg font-medium text-gray-900
                  hover:text-emerald-700 hover:no-underline transition-colors
                  [&[data-state=open]>svg]:rotate-45"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-gray-700 pt-2 pb-4 text-[15px] leading-relaxed
                  data-[state=open]:animate-accordion-down
                  data-[state=closed]:animate-accordion-up"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
};
