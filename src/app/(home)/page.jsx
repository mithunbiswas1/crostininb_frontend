// src/app/(home)/page.jsx

import Banner from "./_components/Banner";
import { BannerVideoBack } from "./_components/BannerVideoBack";
import FlatDiscount from "./_components/FlatDiscount";
import SpecialMenu from "./_components/SpecialMenu";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import AboutSection from "./_components/AboutSection";
import OurFeatures from "./_components/OurFeatures";

const bannerContent = {
  subtitle: "Text Us",

  cta: {
    text: "Get in touch",
    icon: "PhoneIcon",
    link: "/contact",
  },
};

export async function generateMetadata() {}

export default async function Home() {
  return (
    <main className="">
      <section className="relative w-full min-h-[70vh] lg:min-h-screen overflow-hidden">
        <BannerVideoBack />
        <Banner bannerContent={bannerContent} />
      </section>

      <FlatDiscount />
      <SpecialMenu />
      <WhyChooseUs />
      <AboutSection />
      <OurFeatures />
      <TestimonialsSection />
    </main>
  );
}
