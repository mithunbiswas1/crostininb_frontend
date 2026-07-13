import Image from "next/image";
import { H2 } from "@/components/ui/Typography";

const services = [
  {
    id: 1,
    image: "/home/our_features/burger.png",
    title: "Best Burger",
  },
  {
    id: 2,
    image: "/home/our_features/vintages.png",
    title: "Vintage Food",
  },
  {
    id: 3,
    image: "/home/our_features/deliverys.png",
    title: "Fast Delivery",
  },
  {
    id: 4,
    image: "/home/our_features/offer.png",
    title: "Best Offer",
  },
];

export default function OurFeatures() {
  return (
    <section className="bg-[#0b0f10] py-10 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <H2 className="text-gray-50 font-bold"> Why Choose Us</H2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Experience the perfect blend of delicious flavors, premium
            ingredients, and exceptional service that keeps our customers coming
            back.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((item) => (
            <div
              key={item.id}
              className="border border-[#8f7452] h-[280px] flex items-center justify-center group"
            >
              <div className="text-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="mx-auto group-hover:scale-105 duration-300"
                />

                <h3 className="text-white mt-5 text-lg font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
