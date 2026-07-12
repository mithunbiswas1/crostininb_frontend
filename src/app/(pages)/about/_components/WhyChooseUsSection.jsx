import { CheckCircle } from "lucide-react";
import { H2, P } from "@/components/ui/Typography";

const points = [
  "Experienced development team",
  "Agile project delivery",
  "Client-focused communication",
  "Scalable technology solutions",
  "Long-term support and maintenance",
  "High-quality standards",
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <H2 className="text-center mb-10">Why Choose Us</H2>

        <div className="grid sm:grid-cols-2 gap-4">
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-primary" />
              </div>

              <P className="font-medium text-gray-800">{point}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
