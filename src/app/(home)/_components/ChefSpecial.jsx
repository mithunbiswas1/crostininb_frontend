// src/app/(home)/_components/ChefSpecial.jsx

"use client";

import Image from "next/image";
import { H2, H5, P } from "@/components/ui/Typography";

const menuItems = [
  {
    id: 1,
    title: "Crispy Calamari",
    price: 18,
    discount: 20,
    image: "/dining-room/1.webp",
    description: "Lightly fried calamari served with garlic aioli",
  },
  {
    id: 2,
    title: "Bruschetta Trio",
    price: 15,
    discount: 15,
    image: "/dining-room/1.webp",
    description: "Classic Italian appetizer with fresh tomatoes and basil",
  },
  {
    id: 3,
    title: "Stuffed Mushrooms",
    price: 16,
    discount: 10,
    image: "/dining-room/1.webp",
    description: "Mushrooms filled with herbs and cream cheese",
  },
  {
    id: 4,
    title: "Garlic Bread Supreme",
    price: 12,
    discount: 0,
    image: "/dining-room/1.webp",
    description: "Toasted bread with garlic butter and cheese",
  },
  {
    id: 5,
    title: "Caesar Salad",
    price: 14,
    discount: 10,
    image: "/dining-room/1.webp",
    description: "Classic Caesar with grilled chicken and parmesan",
  },
  {
    id: 6,
    title: "Greek Salad",
    price: 13,
    discount: 0,
    image: "/dining-room/1.webp",
    description: "Fresh vegetables with feta cheese and olives",
  },
  {
    id: 7,
    title: "Caprese Salad",
    price: 15,
    discount: 5,
    image: "/dining-room/1.webp",
    description: "Fresh mozzarella with tomatoes and basil",
  },
  {
    id: 8,
    title: "Quinoa Power Bowl",
    price: 17,
    discount: 0,
    image: "/dining-room/1.webp",
    description: "Healthy quinoa with roasted vegetables",
  },
];

const Card = ({ item }) => (
  <div className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex">
    <div className="relative w-20 md:w-24 lg:w-24 aspect-square">
      <Image src={item.image} alt={item.title} fill className="object-cover" />
    </div>
    <div className="flex-1 p-3 flex items-center justify-between gap-8">
      <div>
        <H5 className="text-white font-semibold text-sm line-clamp-1">
          {item.title}
        </H5>
        <P className="text-gray-400 text-xs mt-1 line-clamp-2">
          {item.description}
        </P>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <span className="text-white font-semibold text-sm">${item.price}</span>
        {item.discount > 0 && (
          <span className="text-gray-500 text-xs line-through">
            ${Math.round(item.price / (1 - item.discount / 100))}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function ChefSpecial() {
  return (
    <section className="py-10 lg:py-20 bg-linear-to-br from-[#111] via-gray-[112] to-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="text-center mb-8 lg:mb-12">
          <H2 className="text-gray-50 font-bold">Chef Special</H2>
          <P className="mt-3 max-w-2xl mx-auto text-gray-300">
            Enjoy amazing deals on our signature dishes. Limited time offers
            available for a truly memorable dining experience.
          </P>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4">
            {menuItems.slice(0, 4).map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="w-full h-full rotate-45 overflow-hidden border-2 border-amber-500/50 shadow-xl shadow-amber-500/10">
                <div className="w-full h-full -rotate-45 scale-150">
                  <Image
                    src="/home/chef.webp"
                    alt="Featured dish"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-[-8px] border border-amber-500/20 rotate-45"></div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {menuItems.slice(4, 8).map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
