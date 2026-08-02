import Image from "next/image";
import Link from "next/link";
import { H2 } from "@/components/ui/Typography";
import { getListItems } from "@/lib/getItems";
import { baseUriBackend } from "@/redux/url/url";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

export default async function SpecialMenu() {
  // Fetch items from API
  const data = await getListItems({
    limit: 8,
    order: "desc",
    page: 1,
    is_active: true,
    is_available: true,
  });

  const items = data?.data?.items || [];

  return (
    <section className="bg-black py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <H2 className="text-gray-50 font-bold">Our Special Menu</H2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Discover our chef's signature creations, crafted with premium
            ingredients and served fresh to deliver an unforgettable dining
            experience.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Link
                key={item.id}
                href={`/items/${item.slug}`}
                className="bg-[#111] border border-zinc-800 p-4 text-center group hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 block"
              >
                {/* Image */}
                <div className="relative h-44 w-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-gray-50 text-sm font-medium group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <div className="mt-2">
                    <span className="text-amber-400 font-semibold">
                      ${item.price}
                    </span>
                    {item.offer_price && (
                      <span className="ml-2 text-xs text-gray-400 line-through">
                        ${item.offer_price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 lg:col-span-4 text-center py-12">
              <p className="text-gray-400">No items available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
