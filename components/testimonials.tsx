"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

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

const TestimonialCard = ({
  text,
  imageSrc,
  name,
  role,
}: {
  text: string;
  imageSrc: string;
  name: string;
  role: string;
}) => (
  <Card
    className={cn(
      "relative bg-white/90 backdrop-blur-lg border border-gray-100 shadow-lg m-2"
    )}
  >
    <CardContent className="p-6">
      <p className="text-gray-700 relative">{text}</p>
      <div className="flex items-center gap-3 mt-4">
        <Avatar>
          <AvatarImage alt={name} src={imageSrc} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-sm">{name}</span>
          <span className="text-gray-500 text-sm">{role}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-[#e6f5ed] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#e6f5ed,transparent)]" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium tracking-wider">
              Testimoni
            </div>
          </div>

          <h2 className="mt-8 text-gray-900 text-6xl font-bold tracking-tight">
            Apa Kata Pengguna Kami
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Dari konsultasi kesehatan online hingga pencarian apotek terdekat,
            platform kami telah membantu pengguna mendapatkan solusi kesehatan
            dengan mudah dan cepat.
          </p>
        </div>

        <div className="flex justify-center gap-8 mt-16 h-[600px] relative">
          <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-0 h-32 w-full bg-gradient-to-b from-gray-50 to-transparent"></div>
              <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#e6f5ed] to-transparent"></div>
            </div>

            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((item, idx) => (
                <TestimonialCard key={`col1-${idx}`} {...item} />
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              vertical
              className="[--duration:25s] hidden md:block"
            >
              {secondColumn.map((item, idx) => (
                <TestimonialCard key={`col2-${idx}`} {...item} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              vertical
              className="[--duration:22s] hidden lg:block"
            >
              {thirdColumn.map((item, idx) => (
                <TestimonialCard key={`col3-${idx}`} {...item} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};
