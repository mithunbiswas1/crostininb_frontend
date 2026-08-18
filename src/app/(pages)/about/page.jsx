// src/app/(pages)/about/page.jsx
import PageBanner from "@/components/shared/PageBanner";
import ChairmanSection from "./_components/ChairmanSection";
import MissionVisionSection from "./_components/MissionVisionSection";
import { getAbout } from "@/lib/getAboutApi";
import { baseUriBackend } from "@/redux/url/url";

export default async function AboutPage() {
  const aboutData = await getAbout();
  const about = aboutData?.data || null;

  return (
    <main className="bg-black">
      <PageBanner
        title={about?.title}
        subtitle={about?.short_description}
        backgroundImage={
          about?.banner_image ? `${baseUriBackend}${about.banner_image}` : ""
        }
      />

      <ChairmanSection aboutData={about} />

      {/* <MissionVisionSection aboutData={about} /> */}
    </main>
  );
}
