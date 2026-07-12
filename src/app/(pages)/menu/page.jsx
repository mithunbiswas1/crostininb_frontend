import PageBanner from "@/components/shared/PageBanner";
import MenuCard from "./_components/MenuCard";

const menu = [
  {
    id: 1,
    title: "Ocean Delight",
    description: "Fresh Atlantic salmon grilled with herbs.",
    price: 49,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 2,
    title: "Mexican Tacos",
    description: "Authentic tacos with grilled beef.",
    price: 30,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 3,
    title: "Italian Spaghetti",
    description: "Classic spaghetti carbonara.",
    price: 27,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 4,
    title: "Red Velvet Cupcake",
    description: "Soft cupcake with cream cheese frosting.",
    price: 8,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 5,
    title: "Mango Sorbet",
    description: "Refreshing tropical mango dessert.",
    price: 10,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 6,
    title: "Chicken Burger",
    description: "Grilled chicken burger with fries.",
    price: 18,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 7,
    title: "Cheese Pizza",
    description: "Stone baked mozzarella pizza.",
    price: 25,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 8,
    title: "Caesar Salad",
    description: "Fresh romaine with parmesan cheese.",
    price: 15,
    rating: 4,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 9,
    title: "Grilled Steak",
    description: "Premium grilled beef steak.",
    price: 42,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 10,
    title: "Shrimp Pasta",
    description: "Creamy garlic shrimp pasta.",
    price: 28,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 11,
    title: "BBQ Wings",
    description: "Crispy BBQ chicken wings.",
    price: 16,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 12,
    title: "French Fries",
    description: "Golden crispy potato fries.",
    price: 9,
    rating: 4,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 13,
    title: "Fish & Chips",
    description: "Crispy fried fish with fries.",
    price: 21,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 14,
    title: "Beef Sandwich",
    description: "Roasted beef sandwich.",
    price: 17,
    rating: 4,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 15,
    title: "Chicken Alfredo",
    description: "Creamy chicken alfredo pasta.",
    price: 29,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 16,
    title: "Chocolate Cake",
    description: "Rich chocolate dessert.",
    price: 12,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 17,
    title: "Margarita Pizza",
    description: "Fresh basil & mozzarella pizza.",
    price: 24,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 18,
    title: "Chicken Wrap",
    description: "Healthy grilled chicken wrap.",
    price: 15,
    rating: 4,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 19,
    title: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream.",
    price: 8,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
  {
    id: 20,
    title: "Fresh Juice",
    description: "Orange & mixed fruit juice.",
    price: 7,
    rating: 5,
    image: "/menu/ocean_delight.jpg",
  },
];

export default function MenuPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="Our Delicious Menu"
        subtitle="Explore our carefully crafted dishes made with fresh ingredients."
        backgroundImage="/about/banner.jpg"
      />

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 uppercase tracking-[5px]">Food Menu</p>

          <h2 className="text-5xl font-bold text-gray-50 mt-3">
            Our Special Menu
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
