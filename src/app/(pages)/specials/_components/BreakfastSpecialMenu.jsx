import Image from "next/image";
import { Leaf } from "lucide-react";

const menuItems = [
  {
    id: 1,
    title: "Crispy Chicken Roll",
    desc: "Fresh vegetables & creamy sauce",
    price: "$14",
    image: "/menu/item1.jpg",
  },
  {
    id: 2,
    title: "Chicken Sandwich",
    desc: "Grilled chicken with cheese",
    price: "$15",
    image: "/menu/item2.jpg",
  },
  {
    id: 3,
    title: "Chicken Burger",
    desc: "Juicy chicken & fresh lettuce",
    price: "$12",
    image: "/menu/item3.jpg",
  },
  {
    id: 4,
    title: "Chicken Pizza",
    desc: "Loaded with mozzarella cheese",
    price: "$18",
    image: "/menu/item4.jpg",
  },
  {
    id: 5,
    title: "French Fries",
    desc: "Golden crispy fries",
    price: "$8",
    image: "/menu/item5.jpg",
  },
  {
    id: 6,
    title: "Club Sandwich",
    desc: "Double layer grilled sandwich",
    price: "$16",
    image: "/menu/item6.jpg",
  },
];

export default function BreakfastSpecialMenu() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-[#111111] px-8 py-16 shadow-2xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Leaf
            className="mx-auto mb-3 text-[#D4AF37]"
            size={22}
            strokeWidth={2}
          />

          <h2 className="font-serif text-4xl font-bold text-white">
            Breakfast Special Menu
          </h2>
        </div>

        {/* Menu */}
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-white/10 pb-5"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>

              <span className="font-serif text-lg font-bold text-[#D4AF37]">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
