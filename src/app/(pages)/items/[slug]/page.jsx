// src/app/items/[slug]/page.jsx

import { notFound } from "next/navigation";
import { getItemBySlug, getItemsByCategorySlug } from "@/lib/getItems";
import ItemDetailClient from "../_components/ItemDetailClient";

export default async function ItemDetailPage({ params }) {
  const { slug } = await params;

  let item;
  let addonItems = [];

  try {
    const data = await getItemBySlug(slug);
    item = data?.data;

    console.log(data, "getItemBySlug");

    // Get category slug from item (support both old and new format)
    let categorySlug = null;

    if (item?.category?.slug) {
      // Old format: single category
      categorySlug = item.category.slug;
    } else if (item?.categories && item.categories.length > 0) {
      // New format: categories array - get first category slug
      categorySlug = item.categories[0]?.slug;
    }

    console.log(categorySlug, "categorySlug");

    // Fetch addon items if category slug exists
    if (categorySlug) {
      try {
        const addonResponse = await getItemsByCategorySlug(categorySlug, {
          limit: 20,
          is_available: true,
          is_active: true,
          is_addon: true,
          sortBy: "name",
          order: "asc",
        });

        console.log(addonResponse, "addonResponsedd");

        // ✅ FIX: Assign the items to addonItems
        addonItems = addonResponse?.data?.items || [];

        // Filter out the current item from addons
        addonItems = addonItems.filter((addon) => addon.id !== item.id);

        console.log(addonItems, "addonItems after filter");
      } catch (error) {
        console.error("Error fetching addon items:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching item:", error);
    notFound();
  }

  if (!item) {
    notFound();
  }

  // ✅ Pass addonItems to the client component
  return <ItemDetailClient item={item} addonItems={addonItems} />;
}
