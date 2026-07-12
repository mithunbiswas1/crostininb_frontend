import { Star } from "lucide-react";
import Image from "next/image";

export default function MenuCard({ item }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#141414] p-5 hover:bg-[#1d1d1d] duration-300">

      {/* Image Wrapper */}
      <div className="relative h-[70px] w-[70px] min-w-[70px] overflow-hidden rounded-full">
        <Image
          src={item.image || "/menu/ocean_delight.jpg"}
          alt={item.title}
          fill
          sizes="70px"
          className="object-cover object-center"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-50">
            {item.title}
          </h3>

          <span className="font-semibold text-amber-400">
            ${item.price}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {item.description}
        </p>

        <div className="mt-3 flex gap-1">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star
              key={i}
              size={15}
              className="fill-orange-500 text-amber-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}