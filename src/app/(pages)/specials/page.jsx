"use client";

import PageBanner from "@/components/shared/PageBanner";
import BreakfastSpecialMenu from "./_components/BreakfastSpecialMenu";

export default function SpecialPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="Our Special Menu"
        subtitle="Discover our chef's signature dishes crafted with fresh ingredients and unforgettable flavors."
        backgroundImage="/specials/b_specials.png"
      />

      <BreakfastSpecialMenu />
    </main>
  );
}
