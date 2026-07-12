// src/app/(pages)/about/_components/ChairmanSection.jsx
import Image from "next/image";
import { H2, P } from "@/components/ui/Typography";

export default function ChairmanSection() {
  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <Image
            src="/about/chairmans.jpg"
            alt="About Crostini"
            width={600}
            height={700}
            className="rounded-xl object-cover w-full"
          />
        </div>

        {/* Content */}
        <div>
          <H2 className="text-white font-bold">
            About <span className="text-primary">Crostini</span>
          </H2>

          <P className="mt-7 text-gray-300 leading-8">
            CROSTINI has the finest selection of delectable pizza made from the
            freshest ingredients and traditional baking methods. The rich colors
            and textures are matched with unforgettable flavors that transport
            you to a complete Italian experience. Eastern Meat Farms of Franklin
            Square supplies all the restaurants with fresh homemade Italian
            sausage ground beef, & all other fresh meats. Our friendly servers
            are more than happy to answer any questions about the selection.
          </P>

          <P className="mt-6 text-gray-300 leading-8">
            Crostini's newly decorated dining room is always ready to serve up
            delicious meals. Take out or delivery are both easy options. Feel
            free to call in for a booking, takeout, delivery or order online, we
            have great deals anytime. CROSTINI purchase options are the easiest!
            Just call the delivery number 516-799-6189.
          </P>

          <P className="mt-6 text-gray-300 leading-8">
            Crostini has a long history in the neighborhoods of Massapequa and,
            attracting time and time again repeat customers.
          </P>

          <P className="mt-6 text-gray-300 leading-8">
            Crostini is family owned & operated by Joseph Perrone ( North
            Broadway) & Michael Lodico; his father Richard Lodico & uncle
            Vincent Barbieri are also co-owners of Cafe Formaggio of Carle
            Place.
          </P>

          <P className="mt-6 text-gray-300 leading-8">
            CROSTINI is also available for special occasions, accommodating the
            seating for up to 65 guests!
          </P>

          <P className="mt-6 text-gray-300 leading-8">
            CROSTINI covers all of Massapequa - North & South, East & West with
            the best pizza & Italian food.
          </P>

          <P className="mt-6 text-gray-300 leading-8">
            CROSTINI’S sister location is at 4952 Merrick Road, Massapequa Park
            • 516-797-4747
          </P>
        </div>
      </div>
    </section>
  );
}
