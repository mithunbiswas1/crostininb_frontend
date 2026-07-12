// src/app/(home)/page.jsx
import Banner from "./_components/Banner";
import { BannerVideoBack } from "./_components/BannerVideoBack";
import SpecialMenu from "./_components/SpecialMenu";
import WhyChooseUs from "./_components/WhyChooseUs";

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

      <SpecialMenu />
      <WhyChooseUs />

      {/* <AtAGlanceSection /> */}
      {/* <TestimonialsSection /> */}
    </main>
  );
}
