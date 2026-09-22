// src/components/shared/SearchModal.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { getCardItems } from "@/lib/getItems";
import { baseUriBackend } from "@/redux/url/url";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

// Same small horizontal card design as the "Chef Special" home section.
const ResultCard = ({ item, onClick }) => (
  <Link
    href={`/items/${item.slug}`}
    onClick={onClick}
    className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 flex cursor-pointer group"
  >
    <div className="relative w-16 aspect-square flex-shrink-0">
      <Image
        src={`${baseUriBackend}${item.image}`}
        alt={item.name}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
    <div className="flex-1 p-3 flex items-center">
      <h4 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
        {item.name}
      </h4>
    </div>
  </Link>
);

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await getCardItems({ search: trimmed, limit: 12 });
        setResults(data?.data?.items || []);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-20 md:pt-28">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[75vh] overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for pizza, pasta, appetizers..."
            className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
              <Loader2 size={16} className="animate-spin" />
              Searching...
            </div>
          )}

          {!isLoading && query.trim() && results.length === 0 && (
            <p className="text-center text-gray-400 py-10 text-sm">
              No items found for "{query.trim()}".
            </p>
          )}

          {!isLoading && !query.trim() && (
            <p className="text-center text-gray-500 py-10 text-sm">
              Start typing to search the menu.
            </p>
          )}

          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((item) => (
                <ResultCard key={item.id} item={item} onClick={onClose} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
