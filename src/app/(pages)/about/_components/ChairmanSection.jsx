// src/app/(pages)/about/_components/ChairmanSection.jsx

import Image from "next/image";
import { H2, H4, H5, H6, P } from "@/components/ui/Typography";

export default function ChairmanSection() {
  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/about/chairman.jpg"
            alt="Chairman"
            width={600}
            height={700}
            className="rounded-xl"
          />
        </div>

        <div>
          <H2>Message From Our Chairman</H2>

          <P className="mt-6">
            Since our inception, our goal has been simple: create impactful
            digital solutions that empower businesses worldwide.
          </P>

          <P className="mt-4">
            We believe technology should solve real problems, create
            opportunities, and drive meaningful growth.
          </P>

          <H4 className="mt-8">John Doe</H4>
          <H6>Chairman & Founder</H6>
        </div>
      </div>
    </section>
  );
}
