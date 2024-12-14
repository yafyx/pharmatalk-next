"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

import avatar1 from "@/public/assets/testimonial/avatar-1.png";
import avatar2 from "@/public/assets/testimonial/avatar-2.png";
import avatar3 from "@/public/assets/testimonial/avatar-3.png";
import avatar4 from "@/public/assets/testimonial/avatar-4.png";
import avatar5 from "@/public/assets/testimonial/avatar-5.png";
import avatar6 from "@/public/assets/testimonial/avatar-6.png";
import avatar7 from "@/public/assets/testimonial/avatar-7.png";
import avatar8 from "@/public/assets/testimonial/avatar-8.png";
import avatar9 from "@/public/assets/testimonial/avatar-9.png";

const testimonials = [
  {
    text: "Layanan konsultasi ini sangat profesional! Saya bisa menanyakan obat tanpa harus keluar rumah. Mereka memberikan rekomendasi obat dengan jelas dan membantu menemukan apotek terdekat.",
    imageSrc: avatar1.src,
    name: "Bambang Suryawan",
    role: "Apoteker",
  },
  {
    text: "Aplikasi ini mempermudah masyarakat dalam mencari solusi kesehatan. Melalui fitur konsultasi online, pengguna dapat berinteraksi langsung dengan ahli, tanpa harus mengunjungi klinik atau apotek secara langsung.",
    imageSrc: avatar2.src,
    name: "Dewi Kusuma",
    role: "Apoteker",
  },
  {
    text: "Admin yang sangat responsif. Apotek yang direkomendasikan juga dekat dan lengkap. Benar-benar solusi praktis saat butuh obat dengan cepat.",
    imageSrc: avatar3.src,
    name: "Rini Wahyuni",
    role: "Apoteker",
  },
  {
    text: "Platform ini sangat membantu masyarakat dalam mendapatkan informasi obat yang tepat. Dengan adanya fitur live chat, pengguna bisa langsung berkonsultasi tanpa perlu datang ke apotek.",
    imageSrc: avatar4.src,
    name: "Agus Santoso",
    role: "Pengguna",
  },
  {
    text: "Saya terkesan dengan kecepatan respon dari tim konsultasi. Mereka memberikan saran yang jelas dan membantu saya memahami penggunaan obat dengan baik.",
    imageSrc: avatar5.src,
    name: "Sri Handayani",
    role: "Apoteker",
  },
  {
    text: "Fitur pencarian apotek terdekat sangat membantu, ditambah dengan informasi ketersediaan obat yang real-time. Sangat menghemat waktu dan tenaga.",
    imageSrc: avatar6.src,
    name: "Budi Pratama",
    role: "Pengguna",
  },
  {
    text: "Interface aplikasi yang user-friendly membuat konsultasi kesehatan menjadi lebih mudah. Sistem antrian online juga sangat teratur.",
    imageSrc: avatar7.src,
    name: "Rina Wijaya",
    role: "Apoteker",
  },
  {
    text: "Layanan chat 24 jam sangat membantu, terutama untuk kondisi darurat di malam hari. Apoteker yang bertugas selalu memberikan respon cepat dan solusi yang tepat.",
    imageSrc: avatar8.src,
    name: "Ahmad Hidayat",
    role: "Pengguna",
  },
  {
    text: "Sebagai pengguna rutin, saya sangat puas dengan layanan konsultasi online ini. Riwayat konsultasi yang tersimpan juga memudahkan untuk rujukan di masa depan.",
    imageSrc: avatar9.src,
    name: "Maya Susanti",
    role: "Apoteker",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInUpTransition = {
  duration: 0.6,
};

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={`${props.className} relative`}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        className="flex flex-col gap-6 pb-6"
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, imageSrc, name, role }, idx) => (
                <motion.div
                  key={`${name}-${role}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <Card className="relative bg-white/90 backdrop-blur-lg border border-gray-100 shadow-lg">
                    <CardContent className="p-6">
                      <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200" />
                      <p className="text-gray-700 relative">{text}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <Avatar>
                          <AvatarImage alt={name} src={imageSrc} />
                          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 text-sm">
                            {name}
                          </span>
                          <span className="text-gray-500 text-sm">{role}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#f5f5f5,transparent)]" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div
          ref={ref}
          animate={controls}
          className="text-center"
          initial="hidden"
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <motion.div
            className="flex justify-center"
            transition={fadeInUpTransition}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium tracking-wider">
              Testimoni
            </div>
          </motion.div>

          <motion.h2
            className="mt-8 text-gray-900 text-6xl font-bold tracking-tight"
            transition={fadeInUpTransition}
            variants={fadeInUp}
          >
            Apa Kata Pengguna Kami
          </motion.h2>

          <motion.p
            className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
            transition={fadeInUpTransition}
            variants={fadeInUp}
          >
            Dari konsultasi kesehatan online hingga pencarian apotek terdekat,
            platform kami telah membantu pengguna mendapatkan solusi kesehatan
            dengan mudah dan cepat.
          </motion.p>
        </motion.div>

        <div className="flex justify-center p-4 gap-8 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[800px] overflow-hidden">
          <TestimonialsColumn duration={15} testimonials={firstColumn} />
          <TestimonialsColumn
            className="hidden md:block"
            duration={19}
            testimonials={secondColumn}
          />
          <TestimonialsColumn
            className="hidden lg:block"
            duration={17}
            testimonials={thirdColumn}
          />
        </div>
      </div>
    </section>
  );
};
