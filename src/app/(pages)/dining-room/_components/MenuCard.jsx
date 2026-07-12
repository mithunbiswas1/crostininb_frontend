import { Star } from "lucide-react";
import Image from "next/image";

export default function MenuCard({ item }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#141414] p-5 hover:bg-[#1d1d1d] duration-300">
      <Image
        src={item.image || "/menu/ocean_delight.jpg"}
        alt={item.title}
        width={70}
        height={70}
        className="rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-50">{item.title}</h3>

          <span className="text-amber-400 font-semibold">${item.price}</span>
        </div>

        <p className="text-sm leading-6 text-zinc-400 mt-2">
          {item.description}
        </p>

        <div className="flex gap-1 mt-3">
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
