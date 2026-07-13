// src/app/(home)/_components/AtAGlanceSection.jsx

import Image from "next/image";
import { H2, H3, P } from "@/components/ui/Typography";

const certifications = [
  {
    src: "/home/at_a_glance/1.svg",
    alt: "Certification 1",
  },
  {
    src: "/home/at_a_glance/2.svg",
    alt: "Certification 2",
  },
  {
    src: "/home/at_a_glance/3.webp",
    alt: "Certification 3",
  },
  {
    src: "/home/at_a_glance/4.webp",
    alt: "Certification 4",
  },
];

const stats = [
  {
    value: "6 years",
    label: "in the global IT market",
  },
  {
    value: "40+ clients served",
    label: "including 5 from Fortune 500",
  },
  {
    value: "69 projects",
    label: "successfully served",
  },
  {
    value: "10 countries",
    label: "on our global delivery map",
  },
];

function StatCard({ value, label }) {
  return (
    <div className="bg-gray-200 text-black rounded-xl p-4 lg:p-8 flex flex-col justify-center">
      <H3 className="font-bold leading-none mb-3">{value}</H3>
      <P>{label}</P>
    </div>
  );
}

export default function AtAGlanceSection() {
  return (
    <section className="py-15 bg-[#2A2D33] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20">
        <H2 className="text-white font-bold mb-10 lg:mb-16">
          Soft Industry Alliance at a glance
        </H2>

        <div className="grid lg:grid-cols-[3fr_7fr] gap-10 lg:gap-16 items-center">
          {/* Logos */}
          <div className="grid grid-cols-2 gap-6 lg:gap-10">
            {certifications.map((item, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={240}
                  height={120}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-4 lg:space-y-6">
            {/* Row 1 */}
            <div className="grid gap-4 lg:gap-6 md:grid-cols-[3fr_5fr]">
              <StatCard value={stats[0].value} label={stats[0].label} />
              <StatCard value={stats[1].value} label={stats[1].label} />
            </div>

            {/* Row 2 */}
            <div className="grid gap-4 lg:gap-6 md:grid-cols-[3fr_5fr]">
              <StatCard value={stats[2].value} label={stats[2].label} />
              <StatCard value={stats[3].value} label={stats[3].label} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
