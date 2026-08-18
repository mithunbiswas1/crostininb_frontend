// src/app/(home)/_components/TestimonialsSection.jsx
import Image from "next/image";
import { H2, H6, P } from "@/components/ui/Typography";
import { Star, Quote, Utensils } from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";

function TestimonialCard({ testimonial }) {
  return (
    <div className="relative w-96 shrink-0 bg-linear-to-br from-[#1a1a1a] to-[#2a2a2a] border border-zinc-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      {/* Quote icon with gradient */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote size={48} className="text-amber-400" />
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < (testimonial.rating || 5)
                ? "fill-amber-400 text-amber-400"
                : "text-zinc-600"
            }
          />
        ))}
      </div>

      {/* Message */}
      <P className="text-gray-300 text-sm leading-relaxed italic line-clamp-4">
        “{testimonial.message || "No testimonial message provided"}”
      </P>

      {/* User */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400/30">
          <Image
            src={`${baseUriBackend}${testimonial.image}`}
            alt={testimonial.name || "Guest"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div>
          <H6 className="font-semibold text-sm text-gray-50">
            {testimonial.name || "Anonymous Guest"}
          </H6>
          <P className="text-xs text-gray-400">
            {testimonial.position || "Guest"}
            {testimonial.company && ` · ${testimonial.company}`}
          </P>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ testimonials = [] }) {
  // If no testimonials, don't render the section
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-20 bg-linear-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 mb-12 text-center">
        <H2 className="font-bold text-gray-50">
          What Our <span className="text-amber-400 pl-1">Guests</span> Say
        </H2>

        <P className="mt-4 max-w-2xl mx-auto text-gray-300">
          Real stories from real people who've experienced the magic of our
          restaurant. See why our guests keep coming back for more.
        </P>
      </div>

      {/* TOP MARQUEE (left → right) */}
      <div className="relative mb-6">
        <div className="flex gap-6 w-max animate-marquee">
          {duplicatedTestimonials.map((t, i) => (
            <TestimonialCard key={`top-${t.id || i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* BOTTOM MARQUEE (right → left) */}
      <div className="relative">
        <div className="flex gap-6 w-max animate-marquee-reverse">
          {duplicatedTestimonials.map((t, i) => (
            <TestimonialCard key={`bottom-${t.id || i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
