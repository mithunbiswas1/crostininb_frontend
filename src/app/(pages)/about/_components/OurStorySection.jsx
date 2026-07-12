import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OurStorySection() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/about/our-story.jpg"
              alt="Our Story"
              width={700}
              height={800}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 rounded-2xl bg-primary px-6 py-4 text-white shadow-xl">
              <h3 className="text-3xl font-bold">15+</h3>
              <p className="text-sm">Years of Experience</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Our Story
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              Bringing Authentic Italian Flavors to Every Table
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-400">
              At Crostini, we believe that every meal should be a memorable
              experience. Our passion for authentic Italian cuisine inspires us
              to prepare handcrafted pizzas, fresh pasta, and signature dishes
              using only premium ingredients and traditional recipes.
            </p>

            <p className="mt-5 text-base leading-8 text-gray-400">
              From our welcoming atmosphere to our carefully prepared meals,
              everything we do is centered around quality, freshness, and
              exceptional hospitality. Whether you're joining us for a family
              dinner, a casual lunch, or a special celebration, we are committed
              to making every visit unforgettable.
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-semibold text-white">
                  Fresh Ingredients
                </h4>
                <p className="mt-2 text-sm text-gray-400">
                  Carefully selected premium ingredients every day.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-semibold text-white">
                  Handmade Recipes
                </h4>
                <p className="mt-2 text-sm text-gray-400">
                  Traditional Italian recipes crafted with passion.
                </p>
              </div>
            </div>

            {/* Button */}
            <Link
              href="/menu"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Explore Our Menu
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
