// src/app/(home)/_components/CompanyLogoSection.jsx

import Image from "next/image";

const logos = [
  {
    name: "bachelors enterprise",
    src: "/home/company_icons/bachelorsenterprise.webp",
  },
  { name: "drchrabin", src: "/home/company_icons/drchrabin.png" },
  { name: "hakkani", src: "/home/company_icons/hakkani.png" },
  {
    name: "industrial police",
    src: "/home/company_icons/industrial-police.png",
  },
  { name: "police", src: "/home/company_icons/police.png" },
  { name: "nwpgcl", src: "/home/company_icons/nwpgcl.png" },
  { name: "ilfsl", src: "/home/company_icons/ilfsl.png" },
];

export default function CompanyLogoSection() {
  return (
    <section className="bg-white py-6 overflow-hidden relative">
      <div className="flex w-max animate-marquee ">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="shrink-0 mx-6 lg:mx-10 flex items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={180}
              height={60}
              className="h-12 lg:h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
