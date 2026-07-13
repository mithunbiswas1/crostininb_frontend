// src/app/(home)/_components/ServicesSection.jsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { H2, H3, H5, P } from "@/components/ui/Typography";

const services = [
  {
    title: "UI/UX Design",
    category: "Design",
    href: "/ui-ux-design",
    image: "/home/services/ui-ux-design.webp",
    description:
      "Clean, modern, and user-focused interface and experience design — Pixel Perfect",
  },
  {
    title: "Software Development",
    category: "Build",
    href: "/software-development",
    image: "/home/services/software_development.png",
    description:
      "Scalable and secure software solutions tailored to your business needs.",
  },
  {
    title: "Web Development",
    category: "Create",
    href: "/web-development",
    image: "/home/services/web-development.jpg",
    description:
      "Modern, responsive websites and web applications using latest technologies.",
  },
  {
    title: "E-commerce Solutions",
    category: "Sell",
    href: "/ecommerce-solutions",
    image: "/home/services/e-commerce-solutions.png",
    description:
      "Complete e-commerce solution with payments and product management.",
  },
  {
    title: "Mobile App Development",
    category: "App",
    href: "/app-development",
    image: "/home/services/mobile-app-development.png",
    description:
      "Native and cross-platform mobile applications for Android and iOS — High Performance",
  },
  {
    title: "SEO Optimization",
    category: "Grow",
    href: "/seo",
    image: "/home/services/seo-optimization.webp",
    description:
      "Improve search rankings and increase organic traffic with proven SEO strategies.",
  },
  {
    title: "Digital Marketing",
    category: "Market",
    href: "/digital-marketing",
    image: "/home/services/digital-marketing.webp",
    description:
      "Performance-driven marketing campaigns to grow your brand and conversions.",
  },
  {
    title: "AI & Automation Solutions",
    category: "Innovate",
    href: "/ai-automation",
    image: "/home/services/ai-automation-solutions.png",
    description:
      "AI-powered tools and automation systems to improve efficiency and productivity.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20">
        <H2 className="font-bold mb-8">
          From Idea to Scale — We Add Value at Every Stage
        </H2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative aspect-4/6 overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-101"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 group-hover:bg-linear-to-t group-hover:from-black/80 group-hover:to-transparent transition-all" />

              {/* Content */}
              <div className="absolute inset-0 p-2 lg:p-4 flex flex-col text-gray-50">
                <H5 className="text-gray-50 font-semibold">
                  {service.category}
                </H5>

                <div className="mt-auto">
                  <H3 className="font-bold text-gray-50 mb-4">
                    {service.title}
                  </H3>

                  <P className="hidden lg:block text-gray-50/90 opacity-0 group-hover:opacity-100 transition duration-300">
                    {service.description}
                  </P>

                  <div className="flex justify-end mt-8">
                    <ArrowRight
                      size={36}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
