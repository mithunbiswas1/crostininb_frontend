// src/app/menu/page.js

import PageBanner from "@/components/shared/PageBanner";
import FoodCard from "@/components/shared/FoodCard";
import { H2 } from "@/components/ui/Typography";
import { getItemsByCategorySlug } from "@/lib/getItems";
import { getActiveCategories } from "@/lib/getCategory";

export default async function MenuPage() {
  const categoriesData = await getActiveCategories();
  const categories = categoriesData?.data || [];

  const categoryItemsData = await Promise.all(
    categories.map((category) =>
      getItemsByCategorySlug(category.slug, { limit: 100 }),
    ),
  );

  const categorySections = categories
    .map((category, index) => ({
      category,
      items: categoryItemsData[index]?.data?.items || [],
    }))
    .filter((section) => section.items.length > 0);

  return (
    <main className="bg-black">
      <PageBanner
        title="Our Delicious Menu"
        subtitle="Explore our carefully crafted dishes made with fresh ingredients."
        backgroundImage="/menu/menu_banner.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-20 py-20 space-y-16">
        {categorySections.length > 0 ? (
          categorySections.map(({ category, items }) => (
            <section key={category._id || category.id}>
              <H2 className="text-gray-50 font-bold mb-6">{category.name}</H2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No menu items available at the moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
