// src/app/(pages)/build-your-pizza/page.jsx

import { getAllCrusts } from "@/lib/getCrust";
import { getAllCheeses } from "@/lib/getCheese";
import { getAllSauces } from "@/lib/getSauce";
import { getAllAddons } from "@/lib/getItemAddon";
import { getCardItems } from "@/lib/getItems";
import BuildYourPizzaClient from "./_components/BuildYourPizzaClient";

export async function generateMetadata() {
  return {
    title: "Build Custom Pizza | Crostini",
    description: "Craft your own custom pizza with our fresh dough, homemade sauces, premium cheeses, and delicious toppings.",
  };
}

export default async function BuildYourPizzaPage() {
  // Fetch all customization options and related items in parallel
  const [crustsData, cheesesData, saucesData, addonsData, relatedItemsData] =
    await Promise.all([
      getAllCrusts({ is_active: true }),
      getAllCheeses({ is_active: true }),
      getAllSauces({ is_active: true }),
      getAllAddons({ is_active: true }),
      getCardItems({ limit: 6, is_available: true, is_addon: true }),
    ]);

  const rawRelatedItems =
    relatedItemsData?.data?.items || relatedItemsData?.data || [];

  return (
    <BuildYourPizzaClient
      crustsData={crustsData}
      cheesesData={cheesesData}
      saucesData={saucesData}
      addonsData={addonsData}
      relatedItems={rawRelatedItems}
    />
  );
}
