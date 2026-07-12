// src/components/services/ChallengesSection.jsx

import { H2, H3, P } from "@/components/ui/Typography";

export default function ChallengesSection({ challengesData }) {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-6">{challengesData.heading}</H2>

          <P className="text-gray-600">{challengesData.description}</P>
        </div>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-3">
          {challengesData.challenges.map((item, index) => (
            <div
              key={index}
              className={`
                py-4
                ${index !== 0 ? "md:border-l border-gray-300 px-6" : "pr-6"}
              `}
            >
              <H3 className="font-bold mb-5">{item.title}</H3>

              <P className="text-gray-600">{item.description}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
