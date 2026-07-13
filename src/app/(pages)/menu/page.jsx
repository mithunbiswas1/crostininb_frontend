// src/app/menu/page.js (updated)
import PageBanner from "@/components/shared/PageBanner";
import MenuCard from "./_components/MenuCard";

const menu = [
  {
    id: 1,
    title: "Ocean Delight",
    price: 49,
    discount: 20,
    image: "/menu/ocean_delight.jpg",
    description: "Fresh Atlantic salmon grilled with herbs.",
    fullDescription: "Our signature Ocean Delight features a perfectly grilled Atlantic salmon fillet, seasoned with a delicate herb blend and served with a lemon butter sauce. Accompanied by seasonal vegetables and herb-roasted potatoes.",
    rating: 5,
  },
  {
    id: 2,
    title: "Mexican Tacos",
    price: 30,
    discount: 15,
    image: "/menu/mexican_tacos.jpg",
    description: "Authentic tacos with grilled beef.",
    fullDescription: "Three authentic Mexican tacos filled with marinated grilled beef, topped with fresh pico de gallo, shredded cheese, and served with lime wedges and our house-made salsa verde.",
    rating: 5,
  },
  {
    id: 3,
    title: "Italian Spaghetti",
    price: 27,
    discount: 10,
    image: "/menu/italian_spaghetti.jpg",
    description: "Classic spaghetti carbonara.",
    fullDescription: "Traditional Italian spaghetti carbonara made with guanciale, fresh eggs, Pecorino Romano cheese, and black pepper. A creamy, authentic pasta dish that transports you to Rome.",
    rating: 5,
  },
  {
    id: 4,
    title: "Red Velvet Cupcake",
    price: 8,
    discount: 0,
    image: "/menu/red_velvet_cupcake.jpg",
    description: "Soft cupcake with cream cheese frosting.",
    fullDescription: "Decadent red velvet cupcake with a moist, tender crumb, topped with our signature cream cheese frosting and finished with a sprinkle of red velvet crumbs.",
    rating: 5,
  },
  {
    id: 5,
    title: "Mango Sorbet",
    price: 10,
    discount: 5,
    image: "/menu/mango_sorbet.jpg",
    description: "Refreshing tropical mango dessert.",
    fullDescription: "A refreshing tropical mango sorbet made with ripe Alphonso mangoes. Light, dairy-free, and bursting with natural mango flavor. The perfect palate cleanser or dessert.",
    rating: 5,
  },
  {
    id: 6,
    title: "Chicken Burger",
    price: 18,
    discount: 10,
    image: "/menu/chicken_burger.jpg",
    description: "Grilled chicken burger with fries.",
    fullDescription: "Juicy grilled chicken breast on a toasted brioche bun, topped with fresh lettuce, tomato, red onion, and our special house sauce. Served with crispy golden fries.",
    rating: 5,
  },
  {
    id: 7,
    title: "Cheese Pizza",
    price: 25,
    discount: 0,
    image: "/menu/cheese_pizza.jpg",
    description: "Stone baked mozzarella pizza.",
    fullDescription: "A classic margherita-style pizza with a crispy stone-baked crust, topped with San Marzano tomato sauce, fresh mozzarella, basil leaves, and a drizzle of extra virgin olive oil.",
    rating: 5,
  },
  {
    id: 8,
    title: "Caesar Salad",
    price: 15,
    discount: 5,
    image: "/menu/caesar_salad.jpg",
    description: "Fresh romaine with parmesan cheese.",
    fullDescription: "Crisp romaine lettuce tossed in our homemade Caesar dressing, topped with shaved Parmesan cheese, garlic croutons, and optional anchovy fillets for an authentic touch.",
    rating: 4,
  },
  {
    id: 9,
    title: "Grilled Steak",
    price: 42,
    discount: 20,
    image: "/menu/grilled_steak.jpg",
    description: "Premium grilled beef steak.",
    fullDescription: "A premium USDA Prime steak, grilled to your preference and served with herb butter, roasted garlic, and a side of truffle mashed potatoes and grilled asparagus.",
    rating: 5,
  },
  {
    id: 10,
    title: "Shrimp Pasta",
    price: 28,
    discount: 15,
    image: "/menu/shrimp_pasta.jpg",
    description: "Creamy garlic shrimp pasta.",
    fullDescription: "Linguine pasta tossed in a creamy garlic sauce with succulent shrimp, cherry tomatoes, spinach, and a hint of chili flakes. Finished with fresh parsley and Parmesan cheese.",
    rating: 5,
  },
];

export default function MenuPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="Our Delicious Menu"
        subtitle="Explore our carefully crafted dishes made with fresh ingredients."
        backgroundImage="/menu/menu_banner.jpg"
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-20 py-20">
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