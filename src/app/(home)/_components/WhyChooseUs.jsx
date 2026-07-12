import Image from "next/image";
import { BadgeCheck, ChefHat, BookOpen } from "lucide-react";

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
    <section className="bg-[#0b0f10] py-20">
      <div className="max-w-7xl mx-auto px-4">
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
