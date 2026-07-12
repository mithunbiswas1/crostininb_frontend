import Image from "next/image";
import { H2 } from "@/components/ui/Typography";
import { P } from "@/components/ui/Typography";


const menuItems = [
  {
    id: 1,
    title: "Crispy Chicken Roll",
    desc: "Fresh vegetables & creamy sauce",
    price: "$14",
    image: "/specials/item1.jpg",
  },
  {
    id: 2,
    title: "Chicken Sandwich",
    desc: "Grilled chicken with cheese",
    price: "$15",
    image: "/specials/item2.jpg",
  },
  {
    id: 3,
    title: "Chicken Burger",
    desc: "Juicy chicken & fresh lettuce",
    price: "$12",
    image: "/specials/item3.jpg",
  },
  {
    id: 4,
    title: "Chicken Pizza",
    desc: "Loaded with mozzarella cheese",
    price: "$18",
    image: "/specials/item4.jpg",
  },
  {
    id: 5,
    title: "French Fries",
    desc: "Golden crispy fries",
    price: "$8",
    image: "/specials/item5.jpg",
  },
  {
    id: 6,
    title: "Club Sandwich",
    desc: "Double layer grilled sandwich",
    price: "$16",
    image: "/specials/item6.jpg",
  },
  {
    id: 7,
    title: "Chicken Pasta",
    desc: "Creamy pasta with grilled chicken",
    price: "$17",
    image: "/specials/item7.jpg",
  },
  {
    id: 8,
    title: "Cheese Omelette",
    desc: "Fluffy eggs with melted cheddar cheese",
    price: "$10",
    image: "/specials/item8.jpg",
  },
  {
    id: 9,
    title: "Avocado Toast",
    desc: "Fresh avocado topped with cherry tomatoes",
    price: "$13",
    image: "/specials/item9.jpg",
  },
  {
    id: 10,
    title: "Pancake Delight",
    desc: "Soft pancakes served with maple syrup",
    price: "$11",
    image: "/specials/item10.jpg",
  },
];

export default function BreakfastSpecialMenu() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="">
           {/* Heading */}
                  <div className="text-center mb-12">
                    <H2 className="text-gray-50 font-bold"> Breakfast Special Menu</H2>
          
                    <P className="mt-4 max-w-2xl mx-auto text-gray-300">
                      Start your day with delicious breakfast favorites prepared fresh with rich flavors and premium ingredients.
                    </P>
                  </div>

          {/* Menu List */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-black/10 pb-5 hover:border-amber-400 duration-300"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-bold text-gray-50">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <span className="text-lg font-semibold text-amber-400">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
