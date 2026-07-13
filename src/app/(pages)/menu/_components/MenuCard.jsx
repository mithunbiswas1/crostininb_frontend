// src/app/menu/_components/MenuCard.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { H5, P } from "@/components/ui/Typography";
import { FoodModal } from "@/components/shared/FoodModal";

const Card = ({ item, onCardClick }) => (
  <div
    className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex cursor-pointer group"
    onClick={() => onCardClick(item)}
  >
    <div className="relative w-20 md:w-24 lg:w-24 aspect-square">
      <Image src={item.image} alt={item.title} fill className="object-cover" />
    </div>
    <div className="flex-1 p-3 flex items-center justify-between gap-8">
      <div>
        <H5 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
          {item.title}
        </H5>
        <P className="text-gray-400 text-xs mt-1 line-clamp-2">
          {item.description}
        </P>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <span className="text-white font-semibold text-sm">${item.price}</span>
        {item.discount > 0 && (
          <span className="text-gray-500 text-xs line-through">
            ${Math.round(item.price / (1 - item.discount / 100))}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function MenuCard({ item }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Card item={item} onCardClick={handleCardClick} />
      <FoodModal item={selectedItem} onClose={handleCloseModal} />
    </>
  );
}