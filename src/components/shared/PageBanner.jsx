// src/components/shared/PageBanner.jsx

import { H1, H6 } from "@/components/ui/Typography";

export default function PageBanner({ title, subtitle, backgroundImage }) {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 text-center max-w-4xl mt-10 px-4">
        <H1 className="text-white">{title}</H1>

        <H6 className="text-white mt-2">{subtitle}</H6>
      </div>
    </section>
  );
}
