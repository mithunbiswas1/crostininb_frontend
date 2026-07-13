import Image from "next/image";
import { BadgeCheck, ChefHat, BookOpen } from "lucide-react";
import { H2 } from "@/components/ui/Typography";

const features = [
  {
    id: 1,
    title: "Authentic Taste",
    description:
      "Enjoy delicious meals crafted with traditional flavors and high-quality ingredients.",
    icon: BadgeCheck,
  },
  {
    id: 2,
    title: "Premium Ingredients",
    description:
      "We carefully select fresh and premium ingredients to create exceptional dishes.",
    icon: ChefHat,
  },
  {
    id: 3,
    title: "Creative Menu",
    description:
      "Our creative menu brings unique flavors and unforgettable dining experiences.",
    icon: BookOpen,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0b0f10] py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <H2 className="text-gray-50 font-bold">
            The Taste of <span className="text-amber-400 pl-1">True Excellence</span>
          </H2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Discover what makes every meal unforgettable—from authentic flavors
            and premium ingredients to creative recipes crafted with passion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="bg-[#111617] border border-zinc-800 p-8 md:p-10">
            <div className="space-y-8">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex gap-5">
                    <div>
                      <Icon
                        size={38}
                        className="text-gray-50"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-gray-50 text-lg font-semibold uppercase">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Images */}
          <div className="relative h-[500px]">
            {/* Main Image */}
            <div className="absolute left-0 top-0 w-[75%] h-[430px]">
              <Image
                src="/home/why_choose_us/images.jpg"
                alt="Restaurant Food"
                fill
                className="object-cover"
              />
            </div>

            {/* Small Image */}
            <div className="absolute right-0 bottom-0 w-[45%] h-[350px] border-8 border-[#0b0f10]">
              <Image
                src="/home/why_choose_us/image_1.png"
                alt="Dessert"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
