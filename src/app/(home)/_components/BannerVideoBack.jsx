// src/app/(home)/_components/BannerVideoBack.jsx

import Image from "next/image";
import { baseUriBackend } from "@/redux/url/url";

export const BannerVideoBack = ({ banners }) => {
  const bannerData = banners?.data?.banners[0];

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {bannerData?.url ? (
        // Show video if url exists
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        >
          <source src={bannerData.url} type="video/webm" />
        </video>
      ) : bannerData?.banner_image ? (
        // Show image if banner_image exists
        <div className="relative w-full h-full">
          <Image
            src={`${baseUriBackend}${bannerData.banner_image}`}
            alt={bannerData?.first_title || "Banner"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : (
        // Fallback if neither exists
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
    </div>
  );
};
