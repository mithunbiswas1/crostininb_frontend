// src/app/(home)/page.jsx

import Banner from "./_components/Banner";
import { BannerVideoBack } from "./_components/BannerVideoBack";
import FlatDiscount from "./_components/FlatDiscount";
import SpecialMenu from "./_components/SpecialMenu";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import AboutSection from "./_components/AboutSection";
import OurFeatures from "./_components/OurFeatures";
import ChefSpecial from "./_components/ChefSpecial";

import { getCardItems } from "@/lib/getItems";
import { getHomeBannerList } from "@/lib/getHomeBannerApi";
import { getHomeCompanyList } from "@/lib/getHomeCompanyApi";
import { getTestimonialList } from "@/lib/getTestimonialApi";

export async function generateMetadata() {}

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [
    banners,
    flatDiscountData,
    specialMenuData,
    chefSpecialData,
    companies,
    testimonialsData,
  ] = await Promise.all([
    getHomeBannerList(),
    getCardItems({ limit: 3, sections: "6a780fd4d2e5dfda5ce63991" }),
    getCardItems({ limit: 8, sections: "6a76b8e413fb4c5b2edaf4b2" }),
    getCardItems({ limit: 8, sections: "6a7c162075f50850dfe38c32" }),
    getHomeCompanyList(),
    getTestimonialList(),
  ]);

  // Extract testimonials from response
  const testimonials = testimonialsData?.data?.testimonials || [];

  // Extract items from response
  const flatDiscountItems = flatDiscountData?.data?.items || [];
  const specialMenuItems = specialMenuData?.data?.items || [];
  const chefSpecialItems = chefSpecialData?.data?.items || [];

  return (
    <main className="">
      <section className="relative w-full min-h-[70vh] lg:min-h-screen overflow-hidden">
        <BannerVideoBack banners={banners} />
        <Banner banners={banners} />
      </section>

      {flatDiscountItems.length > 0 && (
        <FlatDiscount items={flatDiscountItems} />
      )}
      {chefSpecialItems.length > 0 && <ChefSpecial items={chefSpecialItems} />}
      {specialMenuItems.length > 0 && <SpecialMenu items={specialMenuItems} />}

      <WhyChooseUs />
      <AboutSection />
      <OurFeatures />

      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
