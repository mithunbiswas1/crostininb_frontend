// src/components/SpecialMenu.jsx

import FoodCard from "@/components/shared/FoodCard";
import { H2 } from "@/components/ui/Typography";

export default async function SpecialMenu({ items = [] }) {
  return (
    <section className="py-10 lg:py-20 bg-linear-to-br from-[#111] via-gray-[112] to-black">
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
          {items.length > 0 ? (
            items.map((item) => <FoodCard key={item.id} item={item} />)
          ) : (
            <div className="col-span-2 lg:col-span-4 text-center py-12">
              <p className="text-gray-400">No items available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
