// src/app/menu/page.js

import PageBanner from "@/components/shared/PageBanner";
import FoodCard from "@/components/shared/FoodCard";
import { getCardItems } from "@/lib/getItems";

export default async function SpecialPage() {
  const menuData = await getCardItems({
    limit: 100,
    sections: "6a76b8e413fb4c5b2edaf4b2",
  });

  const menuItems = menuData?.data?.items || [];

  return (
    <main className="bg-black">
      <PageBanner
        title="Our Special Menu"
        subtitle="Discover our chef's signature dishes crafted with fresh ingredients and unforgettable flavors."
        backgroundImage="/specials/b_specials.png"
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
