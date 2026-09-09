// src/app/items/[slug]/page.jsx

import { notFound } from "next/navigation";
import { getItemBySlug, getCardItems } from "@/lib/getItems";
import ItemDetailClient from "../_components/ItemDetailClient";

export default async function ItemDetailPage({ params }) {
  const { slug } = await params;

  let item;
  let addonItems = [];

  console.log(addonItems, "addonItems")

  try {
    const data = await getItemBySlug(slug);
    item = data?.data;

    console.log(data, "getItemBySlug");

    // Extract category ID from item (support array, object, and string formats)
    let categoryId = null;

    if (item?.category?._id || item?.category?.id) {
      categoryId = item.category._id || item.category.id;
    } else if (item?.categories && item.categories.length > 0) {
      const firstCat = item.categories[0];
      categoryId =
        firstCat?._id ||
        firstCat?.id ||
        (typeof firstCat === "string" ? firstCat : null);
    } else if (typeof item?.category === "string") {
      categoryId = item.category;
    }

    console.log(categoryId, "categoryId");

    // Fetch addon items using category ID
    if (categoryId) {
      try {
        const addonResponse = await getCardItems({
          category: categoryId,
          is_addon: true,
          limit: 30,
          is_available: true,
        });

        console.log(addonResponse, "addonResponse");

        // Assign the items to addonItems
        const rawItems =
          addonResponse?.data?.items || addonResponse?.data || [];

        // Filter out current item from addons
        const currentItemId = item._id || item.id;
        addonItems = rawItems.filter(
          (addon) => (addon._id || addon.id) !== currentItemId
        );

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

