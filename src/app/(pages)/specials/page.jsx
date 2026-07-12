"use client";

import PageBanner from "@/components/shared/PageBanner";
import BreakfastSpecialMenu from "./_components/BreakfastSpecialMenu";

export default function SpecialPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="Our Delicious Menu"
        subtitle="Explore our carefully crafted dishes made with fresh ingredients."
        backgroundImage="/specials/b_specials.png"
      />

      <BreakfastSpecialMenu />
    </main>
  );
}
