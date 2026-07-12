// src/app/(home)/dining-room/_components/FavoriteList.jsx

"use client";

import Image from "next/image";
import { Star, Clock } from "lucide-react";

const menuSections = [
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
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
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
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
    ],
  },
  {
    id: "calamari-chicken",
    title: "Calamari Chicken",
    items: [
      {
        id: 9,
        title: "Chicken Schnitzel",
        price: 24,
        discount: 15,
        image: "/dining-room/1.webp",
        description: "Breaded chicken breast with lemon butter sauce",
      },
      {
        id: 10,
        title: "Chicken Marsala",
        price: 26,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Pan-seared chicken in Marsala wine sauce",
      },
      {
        id: 11,
        title: "Cajun Chicken",
        price: 22,
        discount: 20,
        image: "/dining-room/1.webp",
        description: "Spicy Cajun chicken with rice and vegetables",
      },
      {
        id: 12,
        title: "Chicken Alfredo",
        price: 25,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Creamy Alfredo pasta with grilled chicken",
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [
      {
        id: 13,
        title: "Spaghetti Carbonara",
        price: 20,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Classic Roman pasta with egg and pancetta",
      },
      {
        id: 14,
        title: "Fettuccine Alfredo",
        price: 18,
        discount: 5,
        image: "/dining-room/1.webp",
        description: "Rich and creamy Alfredo with parmesan",
      },
      {
        id: 15,
        title: "Penne Arrabbiata",
        price: 16,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Spicy tomato sauce with garlic and chili",
      },
      {
        id: 16,
        title: "Truffle Pasta",
        price: 28,
        discount: 15,
        image: "/dining-room/1.webp",
        description: "Luxurious pasta with black truffle oil",
      },
    ],
  },
  {
    id: "seafoods",
    title: "Seafoods",
    items: [
      {
        id: 17,
        title: "Grilled Salmon",
        price: 32,
        discount: 20,
        image: "/dining-room/1.webp",
        description: "Fresh Atlantic salmon with herb sauce",
      },
      {
        id: 18,
        title: "Shrimp Scampi",
        price: 28,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Garlic butter shrimp with white wine sauce",
      },
      {
        id: 19,
        title: "Lobster Tail",
        price: 45,
        discount: 25,
        image: "/dining-room/1.webp",
        description: "Butter-poached lobster with lemon butter",
      },
      {
        id: 20,
        title: "Mussels Marinara",
        price: 24,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Fresh mussels in tomato and herb sauce",
      },
    ],
  },
];

export default function FavoriteList() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-400">Menu</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our carefully curated selection of dishes, crafted with love
            and the freshest ingredients
          </p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-16">
          {menuSections.map((section) => (
            <div key={section.id}>
              {/* Section Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-400 text-center whitespace-nowrap">
                  {section.title}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30"></div>
              </div>

              {/* Section Items Grid - 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex"
                  >
                    {/* Image - Left side */}
                    <div className="relative w-32 md:w-40 lg:w-48 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {/* Discount Badge */}
                      {item.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-sm">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Content - Right side */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-sm md:text-base line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm md:text-base">
                            ${item.price}
                          </span>
                          {item.discount > 0 && (
                            <span className="text-gray-500 text-xs line-through">
                              $
                              {Math.round(
                                item.price / (1 - item.discount / 100),
                              )}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock size={12} />
                          <span>10-15 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
