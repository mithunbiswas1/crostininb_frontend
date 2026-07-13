// src/app/(home)/dining-room/_components/FavoriteList.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { FoodModal } from "@/components/shared/FoodModal";

const menuSections = [
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      {
        id: 1,
        title: "Crispy Calamari",
        price: 18,
        discount: 20,
        image: "/dining-room/1.webp",
        description: "Lightly fried calamari served with garlic aioli",
        fullDescription: "Our signature crispy calamari is lightly battered and fried to golden perfection. Served with a side of homemade garlic aioli and fresh lemon wedges. A perfect starter for any meal.",
        rating: 4.8,
        prepTime: "10-15 min",
      },
      {
        id: 2,
        title: "Bruschetta Trio",
        price: 15,
        discount: 15,
        image: "/dining-room/1.webp",
        description: "Classic Italian appetizer with fresh tomatoes and basil",
        fullDescription: "A classic Italian appetizer featuring three different bruschetta toppings on toasted artisan bread. Includes traditional tomato-basil, roasted red pepper, and mushroom-garlic varieties.",
        rating: 4.5,
        prepTime: "8-12 min",
      },
      {
        id: 3,
        title: "Stuffed Mushrooms",
        price: 16,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Mushrooms filled with herbs and cream cheese",
        fullDescription: "Large mushroom caps stuffed with a savory mixture of cream cheese, garlic, fresh herbs, and parmesan. Baked until golden and served with a balsamic glaze.",
        rating: 4.7,
        prepTime: "12-15 min",
      },
      {
        id: 4,
        title: "Garlic Bread Supreme",
        price: 12,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Toasted bread with garlic butter and cheese",
        fullDescription: "Artisan bread toasted to perfection with our signature garlic butter blend, topped with mozzarella and parmesan. Served with a side of marinara sauce for dipping.",
        rating: 4.3,
        prepTime: "5-10 min",
      },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      {
        id: 5,
        title: "Caesar Salad",
        price: 14,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Classic Caesar with grilled chicken and parmesan",
        fullDescription: "Crisp romaine lettuce, grilled chicken breast, shaved parmesan, house-made croutons, and our signature Caesar dressing. A classic favorite done right.",
        rating: 4.6,
        prepTime: "8-12 min",
      },
      {
        id: 6,
        title: "Greek Salad",
        price: 13,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Fresh vegetables with feta cheese and olives",
        fullDescription: "Crisp cucumbers, ripe tomatoes, red onions, Kalamata olives, and creamy feta cheese in a lemon-oregano vinaigrette. Served with warm pita bread.",
        rating: 4.4,
        prepTime: "8-10 min",
      },
      {
        id: 7,
        title: "Caprese Salad",
        price: 15,
        discount: 5,
        image: "/dining-room/1.webp",
        description: "Fresh mozzarella with tomatoes and basil",
        fullDescription: "Fresh buffalo mozzarella layered with ripe tomatoes and fresh basil leaves, drizzled with extra virgin olive oil and balsamic glaze. Finished with sea salt and cracked pepper.",
        rating: 4.9,
        prepTime: "5-8 min",
      },
      {
        id: 8,
        title: "Quinoa Power Bowl",
        price: 17,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Healthy quinoa with roasted vegetables",
        fullDescription: "Protein-rich quinoa, roasted seasonal vegetables, avocado slices, and a tahini dressing with pumpkin seeds. A nutritious and satisfying meal.",
        rating: 4.5,
        prepTime: "12-15 min",
      },
    ],
  },
  {
    id: "calamari-chicken",
    title: "Calamari Chicken",
    items: [
      {
        id: 9,
        title: "Chicken Schnitzel",
        price: 24,
        discount: 15,
        image: "/dining-room/1.webp",
        description: "Breaded chicken breast with lemon butter sauce",
        fullDescription: "Tender chicken breast pounded thin, breaded in seasoned panko, and fried to golden perfection. Served with a rich lemon butter sauce and garlic mashed potatoes.",
        rating: 4.7,
        prepTime: "15-20 min",
      },
      {
        id: 10,
        title: "Chicken Marsala",
        price: 26,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Pan-seared chicken in Marsala wine sauce",
        fullDescription: "Pan-seared chicken breast with a rich Marsala wine sauce, featuring mushrooms and shallots. Served with roasted potatoes and seasonal vegetables.",
        rating: 4.8,
        prepTime: "18-22 min",
      },
      {
        id: 11,
        title: "Cajun Chicken",
        price: 22,
        discount: 20,
        image: "/dining-room/1.webp",
        description: "Spicy Cajun chicken with rice and vegetables",
        fullDescription: "Spicy Cajun-seasoned chicken breast, grilled to perfection and served with cilantro-lime rice, black beans, roasted corn, and a fresh salsa.",
        rating: 4.6,
        prepTime: "15-18 min",
      },
      {
        id: 12,
        title: "Chicken Alfredo",
        price: 25,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Creamy Alfredo pasta with grilled chicken",
        fullDescription: "Fettuccine pasta tossed in a rich and creamy Alfredo sauce with grilled chicken breast, fresh garlic, and parmesan cheese. Garnished with fresh parsley.",
        rating: 4.5,
        prepTime: "14-17 min",
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [
      {
        id: 13,
        title: "Spaghetti Carbonara",
        price: 20,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Classic Roman pasta with egg and pancetta",
        fullDescription: "Authentic Roman spaghetti carbonara with crispy pancetta, fresh eggs, Pecorino Romano cheese, and black pepper. Creamy, rich, and full of flavor.",
        rating: 4.9,
        prepTime: "12-15 min",
      },
      {
        id: 14,
        title: "Fettuccine Alfredo",
        price: 18,
        discount: 5,
        image: "/dining-room/1.webp",
        description: "Rich and creamy Alfredo with parmesan",
        fullDescription: "Classic fettuccine Alfredo with a rich, creamy sauce made from butter, cream, and fresh parmesan cheese. Simple yet indulgent.",
        rating: 4.4,
        prepTime: "10-13 min",
      },
      {
        id: 15,
        title: "Penne Arrabbiata",
        price: 16,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Spicy tomato sauce with garlic and chili",
        fullDescription: "Penne pasta in a spicy tomato arrabbiata sauce with garlic, chili flakes, and fresh basil. Finished with a sprinkle of parmesan cheese.",
        rating: 4.3,
        prepTime: "10-12 min",
      },
      {
        id: 16,
        title: "Truffle Pasta",
        price: 28,
        discount: 15,
        image: "/dining-room/1.webp",
        description: "Luxurious pasta with black truffle oil",
        fullDescription: "Tagliatelle pasta tossed in a creamy truffle sauce with black truffle oil, wild mushrooms, and shaved parmesan. A truly luxurious dining experience.",
        rating: 4.9,
        prepTime: "12-15 min",
      },
    ],
  },
  {
    id: "seafoods",
    title: "Seafoods",
    items: [
      {
        id: 17,
        title: "Grilled Salmon",
        price: 32,
        discount: 20,
        image: "/dining-room/1.webp",
        description: "Fresh Atlantic salmon with herb sauce",
        fullDescription: "Fresh Atlantic salmon fillet grilled to perfection with a herb and garlic crust. Served with a lemon dill sauce, roasted asparagus, and wild rice.",
        rating: 4.8,
        prepTime: "18-22 min",
      },
      {
        id: 18,
        title: "Shrimp Scampi",
        price: 28,
        discount: 10,
        image: "/dining-room/1.webp",
        description: "Garlic butter shrimp with white wine sauce",
        fullDescription: "Succulent shrimp sautéed in a garlic butter and white wine sauce with fresh herbs. Served over linguine pasta with a side of garlic bread.",
        rating: 4.7,
        prepTime: "15-18 min",
      },
      {
        id: 19,
        title: "Lobster Tail",
        price: 45,
        discount: 25,
        image: "/dining-room/1.webp",
        description: "Butter-poached lobster with lemon butter",
        fullDescription: "Premium cold-water lobster tail, butter-poached to perfection. Served with drawn lemon butter, roasted potatoes, and seasonal vegetables.",
        rating: 4.9,
        prepTime: "20-25 min",
      },
      {
        id: 20,
        title: "Mussels Marinara",
        price: 24,
        discount: 0,
        image: "/dining-room/1.webp",
        description: "Fresh mussels in tomato and herb sauce",
        fullDescription: "Fresh Prince Edward Island mussels steamed in a fragrant tomato and herb marinara sauce with garlic, white wine, and fresh basil. Served with crusty bread.",
        rating: 4.6,
        prepTime: "12-15 min",
      },
    ],
  },
];

const Card = ({ item, onCardClick }) => (
  <div
    key={item.id}
    className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex cursor-pointer group"
    onClick={() => onCardClick(item)}
  >
    {/* Image - Left side */}
    <div className="relative w-32 md:w-40 lg:w-48 shrink-0">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover"
      />
      {/* Discount Badge */}
      {item.discount > 0 && (
        <div className="absolute top-2 left-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-sm">
          {item.discount}% OFF
        </div>
      )}
    </div>

    {/* Content - Right side */}
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <h4 className="text-white font-semibold text-sm md:text-base line-clamp-1 group-hover:text-amber-400 transition-colors">
          {item.title}
        </h4>
        <p className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-2">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm md:text-base">
            ${item.price}
          </span>
          {item.discount > 0 && (
            <span className="text-gray-500 text-xs line-through">
              $
              {Math.round(
                item.price / (1 - item.discount / 100),
              )}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock size={12} />
          <span>{item.prepTime || "10-15 min"}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function FavoriteList() {
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
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-amber-400">Menu</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our carefully curated selection of dishes, crafted with love
              and the freshest ingredients
            </p>
          </div>

          {/* Menu Sections */}
          <div className="space-y-16">
            {menuSections.map((section) => (
              <div key={section.id}>
                {/* Section Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-amber-400 text-center whitespace-nowrap">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30"></div>
                </div>

                {/* Section Items Grid - 2 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <Card key={item.id} item={item} onCardClick={handleCardClick} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FoodModal item={selectedItem} onClose={handleCloseModal} />
    </>
  );
}