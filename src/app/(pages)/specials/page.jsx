"use client";

import PageBanner from "@/components/shared/PageBanner";

export default function SpecialPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="Our Delicious Menu"
        subtitle="Explore our carefully crafted dishes made with fresh ingredients."
        backgroundImage="/specials/b_specials.png"
      />

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 uppercase tracking-[5px]">specials</p>

          <h2 className="text-5xl font-bold text-gray-50 mt-3">Our Special</h2>
        </div>
      </section>
    </main>
  );
}
