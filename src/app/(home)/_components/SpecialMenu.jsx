// src/app/(home)/_components/SpecialMenu.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { H2 } from "@/components/ui/Typography";
import { FoodModal } from "@/components/shared/FoodModal";

const specialMenu = [
  {
    id: 1,
    title: "Grilled Salmon Delight",
    category: "Seafood",
    price: "$24.99",
    image: "/home/special_menu/seafood.png",
    description:
      "Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon herb sauce.",
    fullDescription:
      "Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon herb sauce. Salmon with the freshness of garden vegetables.",
  },
  {
    id: 2,
    title: "Creamy Alfredo Pasta",
    category: "Pasta",
    price: "$16.99",
    image: "/home/special_menu/pasta.png",
    description:
      "Rich and creamy Alfredo pasta prepared with parmesan cheese, fresh herbs, and signature sauce.",
    fullDescription:
      "Rich and creamy Alfredo pasta prepared with parmesan cheese, fresh herbs, and our signature sauce. Comfort and elegance to your table.",
  },
  {
    id: 3,
    title: "Premium Ribeye Steak",
    category: "Steak",
    price: "$32.99",
    image: "/home/special_menu/Steak.png",
    description:
      "Juicy ribeye steak served with roasted vegetables and delicious peppercorn sauce.",
    fullDescription:
      "Juicy ribeye steak served with roasted vegetables and delicious peppercorn sauce. A premium cut, delivering an unforgettable dining experience.",
  },
  {
    id: 4,
    title: "Crispy Chicken Supreme",
    category: "Chicken",
    price: "$18.99",
    image: "/home/special_menu/Chicken.png",
    description:
      "Golden crispy chicken served with fries, fresh salad, and house-made dipping sauce.",
    fullDescription:
      "Golden crispy chicken served with fries, fresh salad, and house-made dipping sauce. A perfect balance of crunch and satisfies every craving.",
  },
  {
    id: 5,
    title: "Margherita Pizza",
    category: "Pizza",
    price: "$14.99",
    image: "/home/special_menu/pizzas.png",
    description:
      "Stone-baked pizza topped with mozzarella, basil, and fresh tomato sauce.",
    fullDescription:
      "Stone-baked pizza topped with mozzarella, basil, and fresh tomato sauce. A classic Italian pizza made with authentic and baked to perfection.",
  },
  {
    id: 6,
    title: "Garlic Butter Shrimp",
    category: "Seafood",
    price: "$22.99",
    image: "/home/special_menu/Seafoods.png",
    description:
      "Fresh shrimp cooked with garlic butter, herbs, and a touch of lemon flavor.",
    fullDescription:
      "Fresh shrimp cooked with garlic butter, herbs, and a touch of lemon flavor. A succulent seafood dish that's both elegant and satisfying.",
  },
  {
    id: 7,
    title: "Mediterranean Mixed Grill",
    category: "Signature",
    price: "$28.99",
    image: "/home/special_menu/Signature.png",
    description:
      "A delicious combination of grilled meats, rice, and fresh vegetables with authentic flavors.",
    fullDescription:
      "A delicious combination of grilled meats, rice, and fresh vegetables with authentic Mediterranean flavors. A feast of textures and tastes that celebrates.",
  },
  {
    id: 8,
    title: "Chocolate Lava Cake",
    category: "Dessert",
    price: "$9.99",
    image: "/home/special_menu/Dessert.png",
    description:
      "Warm chocolate lava cake with a rich molten center served with vanilla ice cream.",
    fullDescription:
      "Warm chocolate lava cake with a rich molten center served with vanilla ice cream. The perfect end to your meal, combining gooey chocolate creamy vanilla.",
  },
];

export default function SpecialMenu() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Heading */}
          <div className="text-center mb-12">
            <H2 className="text-gray-50 font-bold">Our Special Menu</H2>

            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Discover our chef's signature creations, crafted with premium
              ingredients and served fresh to deliver an unforgettable dining
              experience.
            </p>
          </div>

          {/* Menu Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {specialMenu.map((item) => (
              <div
                key={item.id}
                className="bg-[#111] border border-zinc-800 p-4 text-center cursor-pointer group hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
                onClick={() => handleCardClick(item)}
              >
                {/* Image */}
                <div className="relative h-44 w-full transition-transform duration-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-gray-50 text-sm font-medium group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-2">
                    <span className="text-amber-400 font-semibold">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FoodModal item={selectedItem} onClose={handleCloseModal} />
    </>
  );
}
