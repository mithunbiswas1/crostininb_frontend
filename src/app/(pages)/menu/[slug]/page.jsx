// app/menu/[slug]/page.jsx

import { getItemsByCategorySlug } from "@/lib/getItems";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await getItemsByCategorySlug(slug, { limit: 1 });
    const category = response?.data?.category;

    if (!category) {
      return {
        title: "Category Not Found",
        description: "The requested category could not be found",
      };
    }

    return {
      title: `${category.name} - Menu`,
      description: `Browse our ${category.name} menu items`,
    };
  } catch (error) {
    return {
      title: "Menu",
      description: "Browse our menu items",
    };
  }
}

export default async function MenuSlugPage({ params }) {
  const { slug } = await params;

  // Get query parameters from the URL
  const searchParams = await new URLSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";

  try {
    const response = await getItemsByCategorySlug(slug, {
      limit: 12,
      page: parseInt(page),
      search: search,
      is_available: true,
      is_active: true,
      sortBy: "name",
      order: "asc",
    });

    const { category, items, pagination } = response.data;

    if (!category) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Category Header */}
        <div className="relative h-[200px] md:h-[300px] bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              {items?.length || 0} items available
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <form action={`/menu/${slug}`} method="GET" className="relative">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search items..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-1.5 px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Items Grid */}
          {items && items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.slug}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48 w-full bg-gray-200">
                      {item.image ? (
                        <Image
                          src={`/${item.image}`}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      {item.is_veg !== undefined && (
                        <div className="absolute top-2 left-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                              item.is_veg
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item.is_veg ? "Veg" : "Non-Veg"}
                          </span>
                        </div>
                      )}
                      {!item.is_available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg bg-red-500 px-4 py-2 rounded">
                            Unavailable
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      {item.short_description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.short_description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          {item.min_price > 0 && (
                            <span className="text-lg font-bold text-orange-600">
                              ₹{item.min_price}
                              {item.max_price > item.min_price && (
                                <span className="text-sm text-gray-500 font-normal">
                                  {" "}
                                  - ₹{item.max_price}
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        {item.is_spicy && (
                          <span className="text-red-500 text-sm font-medium">
                            🌶️ Spicy
                          </span>
                        )}
                      </div>
                      {item.preparation_time && (
                        <div className="mt-2 text-xs text-gray-500">
                          ⏱️ {item.preparation_time} min
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Link
                    href={`/menu/${slug}?page=${pagination.currentPage - 1}${
                      search ? `&search=${search}` : ""
                    }`}
                    className={`px-4 py-2 border rounded-lg ${
                      pagination.hasPrev
                        ? "hover:bg-gray-100 text-gray-700"
                        : "opacity-50 cursor-not-allowed text-gray-400"
                    }`}
                    aria-disabled={!pagination.hasPrev}
                  >
                    Previous
                  </Link>
                  <span className="px-4 py-2 text-gray-700">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <Link
                    href={`/menu/${slug}?page=${pagination.currentPage + 1}${
                      search ? `&search=${search}` : ""
                    }`}
                    className={`px-4 py-2 border rounded-lg ${
                      pagination.hasNext
                        ? "hover:bg-gray-100 text-gray-700"
                        : "opacity-50 cursor-not-allowed text-gray-400"
                    }`}
                    aria-disabled={!pagination.hasNext}
                  >
                    Next
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No items found
              </h3>
              <p className="text-gray-500">
                {search
                  ? `No items match your search "${search}"`
                  : "No items available in this category"}
              </p>
              {search && (
                <Link
                  href={`/menu/${slug}`}
                  className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Clear Search
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching category items:", error);
    notFound();
  }
}
