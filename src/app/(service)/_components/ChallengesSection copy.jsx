// src/components/services/ChallengesSection.jsx

import { H2, H3, P } from "@/components/ui/Typography";

const challenges = [
  {
    title: "Low User Engagement",
    description:
      "We build engaging mobile applications that increase retention, improve user activity, and help businesses grow their audience.",
  },
  {
    title: "Slow Market Entry",
    description:
      "Our rapid development process helps businesses launch MVPs faster and enter new markets without unnecessary delays.",
  },
  {
    title: "Poor User Experience",
    description:
      "We create intuitive mobile experiences that eliminate friction and improve customer satisfaction across all devices.",
  },
];

export default function ChallengesSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-6">Top Challenges We’ve Solved</H2>

          <P className="text-gray-600">
            Mobile app growth comes with unique challenges, and we're here to
            solve them. From streamlining user experiences to optimizing
            performance and scalability, we tackle the complexities that hold
            your app back.
          </P>
        </div>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-3">
          {challenges.map((item, index) => (
            <div
              key={index}
              className={`
                py-4
                ${index !== 0 ? "md:border-l border-gray-300 px-6" : "pr-6"}
              `}
            >
              <H3 className="font-bold mb-5">{item.title}</H3>

              <P className="text-gray-600">
                {item.description}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
