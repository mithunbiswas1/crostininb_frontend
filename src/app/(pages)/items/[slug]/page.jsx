// src/app/items/[slug]/page.jsx

import { notFound } from "next/navigation";
import { getItemBySlug } from "@/lib/getItems";
import ItemDetailClient from "../_components/ItemDetailClient";

export default async function ItemDetailPage({ params }) {
  const { slug } = await params;

  let item;
  try {
    const data = await getItemBySlug(slug);
    item = data?.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    notFound();
  }

  if (!item) {
    notFound();
  }

  return <ItemDetailClient item={item} />;
}
