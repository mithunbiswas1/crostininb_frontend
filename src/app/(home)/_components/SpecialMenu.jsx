import Image from "next/image";
import { H2 } from "@/components/ui/Typography";

const specialMenu = [
  {
    id: 1,
    title: "Grilled Salmon Delight",
    category: "Seafood",
    price: "$24.99",
    image: "/home/special_menu/seafood.png",
    description:
      "Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon herb sauce.",
  },
  {
    id: 2,
    title: "Creamy Alfredo Pasta",
    category: "Pasta",
    price: "$16.99",
    image: "/home/special_menu/Pasta.png",
    description:
      "Rich and creamy Alfredo pasta prepared with parmesan cheese, fresh herbs, and signature sauce.",
  },
  {
    id: 3,
    title: "Premium Ribeye Steak",
    category: "Steak",
    price: "$32.99",
    image: "/home/special_menu/Steak.png",
    description:
      "Juicy ribeye steak served with roasted vegetables and delicious peppercorn sauce.",
  },
  {
    id: 4,
    title: "Crispy Chicken Supreme",
    category: "Chicken",
    price: "$18.99",
    image: "/home/special_menu/Chicken.png",
    description:
      "Golden crispy chicken served with fries, fresh salad, and house-made dipping sauce.",
  },
  {
    id: 5,
    title: "Margherita Pizza",
    category: "Pizza",
    price: "$14.99",
    image: "/home/special_menu/pizzas.png",
    description:
      "Stone-baked pizza topped with mozzarella, basil, and fresh tomato sauce.",
  },
  {
    id: 6,
    title: "Garlic Butter Shrimp",
    category: "Seafood",
    price: "$22.99",
    image: "/home/special_menu/Seafoods.png",
    description:
      "Fresh shrimp cooked with garlic butter, herbs, and a touch of lemon flavor.",
  },
  {
    id: 7,
    title: "Mediterranean Mixed Grill",
    category: "Signature",
    price: "$28.99",
    image: "/home/special_menu/Signature.png",
    description:
      "A delicious combination of grilled meats, rice, and fresh vegetables with authentic flavors.",
  },
  {
    id: 8,
    title: "Chocolate Lava Cake",
    category: "Dessert",
    price: "$9.99",
    image: "/home/special_menu/Dessert.png",
    description:
      "Warm chocolate lava cake with a rich molten center served with vanilla ice cream.",
  },
];

export default function SpecialMenu() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <H2 className="text-gray-50 font-bold">Our Special Menu</H2>

          <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
            Discover our chef's signature creations, crafted with premium
            ingredients and served fresh to deliver an unforgettable dining
            experience.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialMenu.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] border border-zinc-800 p-4 text-center"
            >
              {/* Image */}
              <div className="relative h-44 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-gray-50 text-sm font-medium">
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
  );
}
