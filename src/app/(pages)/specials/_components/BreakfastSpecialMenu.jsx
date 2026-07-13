// src/app/breakfast/_components/BreakfastSpecialMenu.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { H2, H5, P } from "@/components/ui/Typography";
import { FoodModal } from "@/components/shared/FoodModal";

const menuItems = [
  {
    id: 1,
    title: "Crispy Chicken Roll",
    price: 14,
    discount: 10,
    image: "/specials/item1.jpg",
    description: "Fresh vegetables & creamy sauce",
    fullDescription: "A crispy chicken roll filled with fresh crunchy vegetables and drizzled with our signature creamy sauce. Served with a side of tangy dip and crispy fries.",
  },
  {
    id: 2,
    title: "Chicken Sandwich",
    price: 15,
    discount: 5,
    image: "/specials/item2.jpg",
    description: "Grilled chicken with cheese",
    fullDescription: "Grilled chicken breast served on toasted artisan bread with melted cheddar, fresh lettuce, tomato, and our house-made garlic aioli. Served with a pickle spear.",
  },
  {
    id: 3,
    title: "Chicken Burger",
    price: 12,
    discount: 15,
    image: "/specials/item3.jpg",
    description: "Juicy chicken & fresh lettuce",
    fullDescription: "A juicy grilled chicken patty topped with fresh lettuce, ripe tomato, red onion rings, and our special burger sauce on a toasted brioche bun. Served with crispy fries.",
  },
  {
    id: 4,
    title: "Chicken Pizza",
    price: 18,
    discount: 20,
    image: "/specials/item4.jpg",
    description: "Loaded with mozzarella cheese",
    fullDescription: "A hand-tossed pizza topped with grilled chicken, mozzarella cheese, roasted peppers, red onions, and finished with a drizzle of barbecue sauce and fresh basil.",
  },
  {
    id: 5,
    title: "French Fries",
    price: 8,
    discount: 0,
    image: "/specials/item5.jpg",
    description: "Golden crispy fries",
    fullDescription: "Perfectly golden and crispy French fries, double-fried for extra crunch. Seasoned with sea salt and served with your choice of dipping sauce.",
  },
  {
    id: 6,
    title: "Club Sandwich",
    price: 16,
    discount: 10,
    image: "/specials/item6.jpg",
    description: "Double layer grilled sandwich",
    fullDescription: "A classic triple-decker club sandwich with grilled chicken, crispy bacon, lettuce, tomato, and mayonnaise on toasted whole wheat bread. Served with potato chips.",
  },
  {
    id: 7,
    title: "Chicken Pasta",
    price: 17,
    discount: 5,
    image: "/specials/item7.jpg",
    description: "Creamy pasta with grilled chicken",
    fullDescription: "Fettuccine pasta tossed in a rich creamy Alfredo sauce with grilled chicken breast, fresh mushrooms, garlic, and parmesan cheese. Garnished with fresh parsley.",
  },
  {
    id: 8,
    title: "Cheese Omelette",
    price: 10,
    discount: 0,
    image: "/specials/item8.jpg",
    description: "Fluffy eggs with melted cheddar cheese",
    fullDescription: "A fluffy three-egg omelette filled with melted cheddar cheese and fresh chives. Served with toasted sourdough bread and a side of mixed greens.",
  },
  {
    id: 9,
    title: "Avocado Toast",
    price: 13,
    discount: 5,
    image: "/specials/item9.jpg",
    description: "Fresh avocado topped with cherry tomatoes",
    fullDescription: "Artisan sourdough toast topped with creamy mashed avocado, cherry tomatoes, microgreens, and a sprinkle of red pepper flakes. Drizzled with extra virgin olive oil.",
  },
  {
    id: 10,
    title: "Pancake Delight",
    price: 11,
    discount: 0,
    image: "/specials/item10.jpg",
    description: "Soft pancakes served with maple syrup",
    fullDescription: "Three fluffy buttermilk pancakes served with warm maple syrup, a dollop of whipped butter, and your choice of fresh berries or chocolate chips.",
  },
];

const Card = ({ item, onCardClick }) => (
  <div
    className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex cursor-pointer group"
    onClick={() => onCardClick(item)}
  >
    <div className="relative w-20 md:w-24 lg:w-24 aspect-square">
      <Image src={item.image} alt={item.title} fill className="object-cover" />
    </div>
    <div className="flex-1 p-3 flex items-center justify-between gap-8">
      <div>
        <H5 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
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

export default function BreakfastSpecialMenu() {
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
          <div className="text-center mb-12">
            <H2 className="text-gray-50 font-bold">Breakfast Special Menu</H2>
            <P className="mt-4 max-w-2xl mx-auto text-gray-300">
              Start your day with delicious breakfast favorites prepared fresh 
              with rich flavors and premium ingredients.
            </P>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} item={item} onCardClick={handleCardClick} />
            ))}
          </div>
        </div>
      </section>

      <FoodModal item={selectedItem} onClose={handleCloseModal} />
    </>
  );
}