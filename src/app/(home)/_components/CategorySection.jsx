// src/app/(home)/_components/CategorySection.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H5, H6, P } from "@/components/ui/Typography";
import { baseUriBackend } from "@/redux/url/url";

const firstStaticCategory = {
  id: "static-first",
  name: "Build Your Pizza",
  href: "/build-your-pizza",
  image: "/home/special_menu/pizzas.png",
  isStatic: true,
};

const lastStaticCategory = {
  id: "static-last",
  name: "Extras",
  href: "/extras",
  image: "/home/special_menu/Signature.png",
  isStatic: true,
};

export default function CategorySection({ categories = [] }) {
  const displayCategories = [
    firstStaticCategory,
    ...categories,
    lastStaticCategory,
  ];

  return (
    <section className="py-10 lg:py-20 bg-linear-to-br from-black via-gray-[112] to-[#111]">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-8 lg:mb-12">
          <H2 className="text-gray-50 font-bold">
            Categories
          </H2>

          <P className="mt-3 max-w-2xl mx-auto text-gray-300">
            Explore our delicious menu categories and find your favorite dishes.
          </P>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayCategories.map((category) => {
            const categoryId = category._id || category.id;
            const imageUrl = category.isStatic
              ? category.image
              : category.image && category.image !== "default-category.png"
                ? `${baseUriBackend}${category.image.replace(/^\/+/, "")}`
                : "/home/special_menu/pizzas.png";

            const href = category.href || `/menu/${category.slug}`;

            return (
              <Link
                key={categoryId}
                href={href}
                className="group relative aspect-4/4 overflow-hidden rounded-sm bg-[#111] border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300"
              >
                {/* Background Image */}
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 transition-all" />

                {/* Title - Bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <H6 className="text-gray-50 font-bold leading-tight">
                    {category.name}
                  </H6>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
