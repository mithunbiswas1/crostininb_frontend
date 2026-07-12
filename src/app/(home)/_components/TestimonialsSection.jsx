// src/app/(home)/_components/TestimonialsSection.jsx

import Image from "next/image";
import { H2, H6, P } from "@/components/ui/Typography";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Product Manager",
    company: "TechNova",
    image: "/home/testimonials/sarah.png",
    message:
      "The team delivered a highly scalable product with excellent UI/UX. Communication was smooth and deadlines were always met.",
  },
  {
    name: "David Chen",
    role: "Founder",
    company: "Startify",
    image: "/home/testimonials/david.webp",
    message:
      "Outstanding experience. They transformed our idea into a full-featured platform with modern architecture.",
  },
  {
    name: "Ayesha Rahman",
    role: "Marketing Lead",
    company: "Brandly",
    image: "/home/testimonials/ayesha.jfif",
    message:
      "Their digital marketing and web team helped us significantly improve conversions and brand presence.",
  },
  {
    name: "Michael Johnson",
    role: "CTO",
    company: "CloudWorks",
    image: "/home/testimonials/michael.jfif",
    message:
      "Strong technical expertise in backend systems and cloud infrastructure. Very reliable development partner.",
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="relative w-110 shrink-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-sm transition">
      {/* Quote icon */}
      <Quote className="text-primary mb-4" size={28} />

      {/* Message */}
      <P>“{t.message}”</P>

      {/* User */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src={t.image} alt={t.name} fill className="object-cover" />
        </div>

        <div>
          <H6 className="font-semibold text-sm">{t.name}</H6>
          <P>
            {t.role} · {t.company}
          </P>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <H2 className="font-bold text-center">What Our Clients Say</H2>
      </div>

      {/* TOP MARQUEE (left → right) */}
      <div className="relative mb-6">
        <div className="flex gap-6 w-max animate-marquee">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* BOTTOM MARQUEE (right → left) */}
      <div className="relative">
        <div className="flex gap-6 w-max animate-marquee-reverse">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
