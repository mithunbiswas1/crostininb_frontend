// src/app/(home)/_components/TestimonialsSection.jsx
import Image from "next/image";
import { H2, H6, P } from "@/components/ui/Typography";
import { Star, Quote, Utensils } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Food Critic",
    company: "Gourmet Magazine",
    image: "/user.webp",
    message:
      "An unforgettable dining experience! The flavors are perfectly balanced, and the presentation is truly artistic. This is fine dining at its best.",
    rating: 5,
    dish: "Grilled Salmon Delight",
  },
  {
    name: "David Chen",
    role: "Restaurant Owner",
    company: "Asian Fusion",
    image: "/user.webp",
    message:
      "The quality of ingredients and attention to detail in every dish is remarkable. My guests always leave with smiles on their faces.",
    rating: 5,
    dish: "Premium Ribeye Steak",
  },
  {
    name: "Ayesha Rahman",
    role: "Food Blogger",
    company: "TasteTraveller",
    image: "/user.webp",
    message:
      "Every bite tells a story of passion and craftsmanship. The ambiance, service, and food - everything is top-notch!",
    rating: 5,
    dish: "Creamy Alfredo Pasta",
  },
  {
    name: "Michael Johnson",
    role: "Event Planner",
    company: "Celebration Events",
    image: "/user.webp",
    message:
      "We hosted our anniversary dinner here and it was perfect. The staff went above and beyond to make our evening special.",
    rating: 5,
    dish: "Chocolate Lava Cake",
  },
  {
    name: "Emily Thompson",
    role: "Wine Enthusiast",
    company: "Vino Selections",
    image: "/user.webp",
    message:
      "The wine pairing suggestions are impeccable. Each course was elevated by the perfect wine selection. A true culinary journey.",
    rating: 5,
    dish: "Garlic Butter Shrimp",
  },
  {
    name: "James Wilson",
    role: "Executive Chef",
    company: "The Culinary Institute",
    image: "/user.webp",
    message:
      "As a chef, I appreciate the technical precision and creativity in every dish. This restaurant sets a new standard.",
    rating: 5,
    dish: "Mediterranean Mixed Grill",
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="relative w-96 shrink-0 bg-linear-to-br from-[#1a1a1a] to-[#2a2a2a] border border-zinc-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl">
      {/* Quote icon with gradient */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote size={48} className="text-amber-400" />
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Message */}
      <P className="text-gray-300 text-sm leading-relaxed italic">
        “{t.message}”
      </P>

      {/* Dish recommendation */}
      <div className="mt-3 flex items-center gap-2 text-xs text-amber-400/80">
        <Utensils size={14} />
        <span>Featured: {t.dish}</span>
      </div>

      {/* User */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400/30">
          <Image src={t.image} alt={t.name} fill className="object-cover" />
        </div>

        <div>
          <H6 className="font-semibold text-sm text-gray-50">{t.name}</H6>
          <P className="text-xs text-gray-400">
            {t.role} · {t.company}
          </P>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-linear-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20 mb-12 text-center">
        <H2 className="font-bold text-gray-50">
          What Our <span className="text-amber-400 pl-1">Guests</span> Say
        </H2>

        <P className="mt-4 max-w-2xl mx-auto  text-gray-300">
          Real stories from real people who've experienced the magic of our
          restaurant. See why our guests keep coming back for more.
        </P>
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
