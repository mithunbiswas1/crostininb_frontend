// src/app/menu/page.js

import PageBanner from "@/components/shared/PageBanner";
import FoodCard from "@/components/shared/FoodCard";
import { getCardItems } from "@/lib/getItems";

export default async function MenuPage() {
  const menuData = await getCardItems({
    limit: 100,
    sections: "6a780ff6d2e5dfda5ce639ae",
  });

  const menuItems = menuData?.data?.items || [];

  return (
    <main className="bg-black">
      <PageBanner
        title="Our Delicious Menu"
        subtitle="Explore our carefully crafted dishes made with fresh ingredients."
        backgroundImage="/menu/menu_banner.jpg"
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-20 py-20">
        {menuItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No menu items available at the moment.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
