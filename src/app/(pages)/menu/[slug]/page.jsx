// src/app/menu/[slug]/page.jsx

import { getItemsByCategorySlug } from "@/lib/getItems";
import FoodCard from "@/components/shared/FoodCard";
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

  try {
    const response = await getItemsByCategorySlug(slug, {
      limit: 12,
      page: parseInt(page),
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
      <div className="min-h-screen bg-black">
        {/* Category Header */}
        <div className="relative h-[200px] md:h-[300px] bg-gradient-to-r from-amber-500 to-orange-600">
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
          {/* Items Grid */}
          {items && items.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Link
                    href={`/menu/${slug}?page=${pagination.currentPage - 1}`}
                    className={`px-4 py-2 border rounded-lg ${
                      pagination.hasPrev
                        ? "hover:bg-zinc-800 text-gray-300 border-zinc-700"
                        : "opacity-50 cursor-not-allowed text-gray-600 border-zinc-800"
                    }`}
                    aria-disabled={!pagination.hasPrev}
                  >
                    Previous
                  </Link>
                  <span className="px-4 py-2 text-gray-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <Link
                    href={`/menu/${slug}?page=${pagination.currentPage + 1}`}
                    className={`px-4 py-2 border rounded-lg ${
                      pagination.hasNext
                        ? "hover:bg-zinc-800 text-gray-300 border-zinc-700"
                        : "opacity-50 cursor-not-allowed text-gray-600 border-zinc-800"
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
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No items found
              </h3>
              <p className="text-gray-500">
                No items available in this category
              </p>
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
