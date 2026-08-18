// src/app/(pages)/about/_components/ChairmanSection.jsx
import Image from "next/image";
import { H2, P } from "@/components/ui/Typography";
import { baseUriBackend } from "@/redux/url/url";

export default function ChairmanSection({ aboutData }) {
  if (!aboutData) {
    return null;
  }

  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <Image
            src={`${baseUriBackend}${aboutData?.chairman_image}`}
            alt="About Crostinin"
            width={600}
            height={700}
            className="rounded-xl object-cover w-full"
            unoptimized
          />
        </div>

        {/* Content */}
        <div>
          <H2 className="text-white font-bold">
            About <span className="text-primary">Crostinin</span>
          </H2>

          <P className="mt-7 text-gray-300 leading-8">
            {aboutData?.chairman_message}
          </P>
        </div>
      </div>
    </section>
  );
}
