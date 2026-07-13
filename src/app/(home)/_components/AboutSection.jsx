import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const images = [
  "/home/about/a_cart1.jpg",
  "/home/about/cheese_pull _pasta.jpg",
  "/home/about/roasted_chicken.jpg",
];

export default function AboutSection() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#b89b6d] uppercase tracking-[6px] text-base mb-5 flex items-center gap-3">
              <span className="w-16 h-[1px] bg-[#b89b6d]"></span>
              About Us
            </p>

            <H2 className="text-gray-50 font-bold leading-tight uppercase">
              We Always Provide
              <br />
              Quality Fast Foods
              <br />
              For You
            </H2>

            <p className="text-gray-300 mt-7 leading-8 max-w-md">
              A hamburger is a type of sandwich made from a patty of ground
              beef, served within a split bread roll. It's a popular fast-food
              item and a culinary icon.
            </p>

            <Button
              size="lg"
              variant="outline"
              className="mt-10 border-2 border-amber-400/40 text-gray-50 hover:bg-gray-50/10 text-base font-semibold rounded-xl backdrop-blur-sm transition-all"
            >
              Discover More {" "} +
            </Button>
          </div>

          {/* Right Images */}
          <div className="border border-[#8f7452] p-5">
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative md:h-[380px] h-[200px] border border-[#8f7452] overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`food-${index}`}
                    fill
                    className="object-cover hover:scale-105 duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
