import PageBanner from "@/components/shared/PageBanner";
import FoodCard from "@/components/shared/FoodCard";
import { getCardItems } from "@/lib/getItems";

export default async function ExtrasPage() {
  const extrasData = await getCardItems({
    limit: 100,
    is_addon: true,
  });

  const extrasItems = extrasData?.data?.items || [];

  return (
    <main className="bg-black">
      <PageBanner
        title="Extras & Add-ons"
        subtitle="Enhance your meal with our delicious extras and add-ons."
        backgroundImage="/menu/menu_banner.jpg"
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-20 py-20">
        {extrasItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {extrasItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No extras available at the moment.</p>
          </div>
        )}
      </section>
    </main>
  );
}
