import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/home/about/a_cart1.jpg",
  "/home/about/cheese_pull _pasta.jpg",
  "/home/about/roasted_chicken.jpg",
];

export default function AboutSection() {
  return (
    <section className="bg-black py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>

             <H2 className="text-gray-50 font-bold">
            About Us
          </H2>

            <p className="text-gray-300 mt-4 leading-8 max-w-xl">
                 We are passionate about serving delicious fast food made with premium ingredients, authentic recipes, and exceptional care. Every meal is freshly prepared to deliver rich flavors, quick service, and an unforgettable dining experience that keeps you coming back for more.
            </p>

            <p className="text-gray-300 mt-7 leading-8 max-w-xl">
              A hamburger is a type of sandwich made from a patty of ground
              beef, served within a split bread roll. It's a popular fast-food
              item and a culinary icon.
            </p>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="mt-10 border-2 border-amber-400/40 text-gray-50 hover:bg-gray-50/10 text-base font-semibold rounded-xl backdrop-blur-sm transition-all"
              >
                Discover More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
