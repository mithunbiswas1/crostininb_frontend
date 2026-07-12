import Image from "next/image";

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
    <section className="bg-[#141518] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#b89b6d] uppercase tracking-[4px] text-sm">
            We Provide Best Service
          </p>

          <div className="flex justify-center items-center gap-3 my-3">
            <span className="w-10 h-px bg-[#b89b6d]" />
            <span className="w-2 h-2 rounded-full bg-[#b89b6d]" />
            <span className="w-10 h-px bg-[#b89b6d]" />
          </div>

          <h2 className="text-white text-4xl font-bold uppercase">
            Why Choose Us
          </h2>
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
