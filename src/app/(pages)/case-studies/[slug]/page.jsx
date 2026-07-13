// src/app/(pages)/case-studies/[slug]/page.jsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { H1, H2, H3, P } from "@/components/ui/Typography";

// This would typically come from a CMS or database
const caseStudies = {
  goobr: {
    title: "Social Networking Platform for Pet Owners",
    client: "Goobr",
    category: "Mobile App",
    duration: "6 months",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    image: "/case-studies/case-studies-banner.webp",
    images: [
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
    ],
    overview:
      "Goobr is a revolutionary social networking platform designed exclusively for pet owners. The platform enables users to connect with other pet lovers, share content, organize events, and build communities around their shared love for pets.",
    challenge:
      "The client approached us with a vision to create a dedicated social platform for pet owners. The main challenges included building a scalable real-time messaging system, implementing robust content sharing features, creating an engaging user experience, and ensuring data privacy and security.",
    solution:
      "We developed a feature-rich mobile application using React Native for cross-platform compatibility. The backend was built with Node.js and MongoDB for scalability. Key features implemented include real-time chat, photo and video sharing, event creation and management, community forums, and a personalized feed algorithm.",
    results: [
      "150% increase in user engagement within first 3 months",
      "Over 100,000 downloads across iOS and Android",
      "4.8 star rating on both app stores",
      "40% month-over-month active user growth",
      "Successfully processed 1M+ messages daily",
      "Featured in 'Best New Apps' category",
    ],
    testimonial: {
      quote:
        "The team delivered an exceptional product that exceeded our expectations. Their technical expertise and dedication to quality were evident throughout the development process.",
      author: "Sarah Johnson",
      position: "CEO, Goobr",
    },
  },
  "tulsa-airport": {
    title: "Airport Passenger Experience Platform",
    client: "Tulsa Airport",
    category: "Mobile App",
    duration: "8 months",
    technologies: ["Flutter", "Firebase", "AWS", "Google Maps API"],
    image: "/case-studies/case-studies-banner.webp",
    images: [
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
    ],
    overview:
      "A comprehensive mobile application that enhances the passenger experience at Tulsa Airport by providing real-time flight information, indoor navigation, parking management, and access to airport services.",
    challenge:
      "Tulsa Airport needed a solution to reduce passenger confusion, improve communication, and streamline access to airport services. Key challenges included integrating with existing flight information systems, implementing accurate indoor navigation, and creating a user-friendly interface.",
    solution:
      "We built a Flutter-based application with real-time flight tracking, turn-by-turn indoor navigation using beacon technology, integrated parking payment system, and a centralized information hub for airport services and amenities.",
    results: [
      "60% reduction in passenger information desk inquiries",
      "45% increase in parking revenue through prepaid bookings",
      "30,000+ active monthly users",
      "85% improvement in passenger satisfaction scores",
      "Successful navigation for 2M+ annual passengers",
    ],
    testimonial: {
      quote:
        "This app has transformed how our passengers experience the airport. The indoor navigation feature alone has saved countless travelers from missing their flights.",
      author: "Michael Thompson",
      position: "Director of Operations, Tulsa Airport",
    },
  },
  "ecommerce-platform": {
    title: "Enterprise E-commerce Solution",
    client: "Fashion Retailer",
    category: "Web Development",
    duration: "10 months",
    technologies: ["Next.js", "Shopify", "Stripe", "PostgreSQL"],
    image: "/case-studies/case-studies-banner.webp",
    images: [
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
    ],
    overview:
      "A headless e-commerce platform built for a major fashion retailer, offering seamless shopping experiences across all devices with advanced inventory management and real-time analytics.",
    challenge:
      "The client was struggling with an outdated platform that couldn't handle peak traffic, had slow load times, and lacked modern e-commerce features. They needed a scalable solution that could grow with their business.",
    solution:
      "We implemented a headless architecture using Next.js for the frontend and Shopify Plus for backend commerce capabilities. The solution includes real-time inventory sync, personalized recommendations, advanced search, and a comprehensive analytics dashboard.",
    results: [
      "200% increase in online sales year-over-year",
      "50% improvement in page load times",
      "30% reduction in cart abandonment rate",
      "Successfully handles 50,000+ concurrent users",
      "40% increase in mobile conversion rates",
    ],
    testimonial: {
      quote:
        "Our online sales have more than doubled since launching the new platform. The team's expertise in e-commerce development is unmatched.",
      author: "David Chen",
      position: "E-commerce Director",
    },
  },
  "healthcare-portal": {
    title: "Healthcare Patient Portal",
    client: "MediCare Plus",
    category: "Web Development",
    duration: "12 months",
    technologies: ["React", "Node.js", "PostgreSQL", "Twilio"],
    image: "/case-studies/case-studies-banner.webp",
    images: [
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
    ],
    overview:
      "A HIPAA-compliant patient portal that streamlines healthcare delivery through online appointment scheduling, telemedicine, prescription management, and secure messaging.",
    challenge:
      "MediCare Plus needed a secure digital platform to reduce administrative burden, improve patient engagement, and enable virtual care capabilities while maintaining strict HIPAA compliance.",
    solution:
      "We developed a comprehensive patient portal with end-to-end encryption, video consultation integration, automated appointment reminders, prescription refill requests, and secure patient-provider messaging.",
    results: [
      "75% reduction in no-show appointments",
      "90% patient satisfaction rating",
      "40% increase in patient portal adoption",
      "Streamlined operations for 50+ healthcare providers",
      "5,000+ telemedicine consultations conducted monthly",
    ],
    testimonial: {
      quote:
        "The telemedicine feature has been a game-changer for our practice. Patients love the convenience, and our providers can deliver care more efficiently.",
      author: "Dr. Emily Rodriguez",
      position: "Medical Director, MediCare Plus",
    },
  },
  "analytics-dashboard": {
    title: "AI-Powered Analytics Dashboard",
    client: "DataTech Solutions",
    category: "Software Development",
    duration: "7 months",
    technologies: ["Python", "OpenAI", "Redis", "D3.js"],
    image: "/case-studies/case-studies-banner.webp",
    images: [
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
    ],
    overview:
      "An intelligent business analytics platform that leverages AI to provide predictive insights, real-time data visualization, and automated reporting for data-driven decision making.",
    challenge:
      "DataTech needed to help their clients transform raw data into actionable insights. The challenge was building an intuitive platform that could handle large datasets, provide real-time analytics, and generate accurate predictions.",
    solution:
      "We created a dashboard that integrates with multiple data sources, uses OpenAI for natural language queries, provides interactive visualizations with D3.js, and generates automated insights using machine learning models.",
    results: [
      "3x faster business decision making",
      "85% accuracy in sales predictions",
      "40% reduction in data analysis time",
      "1,000+ active business users",
      "Real-time insights from 10+ data sources",
    ],
    testimonial: {
      quote:
        "The AI-powered insights have revolutionized how our clients make business decisions. The platform's accuracy and speed are remarkable.",
      author: "James Wilson",
      position: "CTO, DataTech Solutions",
    },
  },
  "event-platform": {
    title: "Event Discovery & Community Marketplace",
    client: "EventHub",
    category: "Mobile App",
    duration: "9 months",
    technologies: ["Flutter", "NestJS", "MongoDB", "Stripe"],
    image: "/case-studies/case-studies-banner.webp",
    images: [
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
      "/case-studies/case-studies-banner.webp",
    ],
    overview:
      "A comprehensive event discovery platform that connects event organizers with attendees, featuring ticketing, community building, and social features.",
    challenge:
      "EventHub needed a scalable platform that could handle thousands of concurrent users, process ticket payments securely, and provide social features for community engagement.",
    solution:
      "We built a Flutter-based mobile app with a NestJS backend. Features include personalized event recommendations, secure ticket purchasing, interactive maps, social networking, and real-time updates.",
    results: [
      "500+ events hosted monthly",
      "100,000+ tickets sold in first year",
      "4.9 star rating on app stores",
      "60% month-over-month user growth",
      "Successfully processed $2M+ in ticket sales",
    ],
    testimonial: {
      quote:
        "EventHub has become the go-to platform for event discovery in our city. The team delivered a polished, scalable solution that exceeded our expectations.",
      author: "Lisa Martinez",
      position: "Founder, EventHub",
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug: slug,
  }));
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-20 lg:px-20 py-20">
          <div className="mb-4">
            <span className="bg-primary text-gray-50 px-4 py-2 rounded-full text-sm font-semibold">
              {study.category}
            </span>
          </div>
          <H1 className="text-gray-50 mb-6">{study.title}</H1>
          <div className="flex flex-wrap gap-6 text-gray-50">
            <div>
              <span className="text-gray-300">Client:</span>
              <p className="font-semibold">{study.client}</p>
            </div>
            <div>
              <span className="text-gray-300">Duration:</span>
              <p className="font-semibold">{study.duration}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <H2 className="mb-6">Project Overview</H2>
              <P className="text-gray-600 leading-relaxed mb-8">
                {study.overview}
              </P>

              <H3 className="text-2xl font-bold mb-4">The Challenge</H3>
              <P className="text-gray-600 leading-relaxed mb-8">
                {study.challenge}
              </P>

              <H3 className="text-2xl font-bold mb-4">Our Solution</H3>
              <P className="text-gray-600 leading-relaxed">{study.solution}</P>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <H3 className="font-bold mb-4">Technologies</H3>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-50 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <H3 className="font-bold mb-4">Project Details</H3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Client</span>
                    <p className="font-semibold">{study.client}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Category</span>
                    <p className="font-semibold">{study.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Duration</span>
                    <p className="font-semibold">{study.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      {study.images && study.images.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20">
            <H2 className="text-center mb-12">Project Gallery</H2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {study.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={image}
                    alt={`${study.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {study.testimonial && (
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-6xl text-primary mb-6">"</div>
            <P className="text-xl text-gray-700 italic mb-8">
              {study.testimonial.quote}
            </P>
            <div>
              <p className="font-bold text-lg">{study.testimonial.author}</p>
              <p className="text-gray-600">{study.testimonial.position}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <H2 className="mb-6">Ready to Start Your Project?</H2>
          <P className="text-gray-600 mb-8">
            Let's discuss how we can help you achieve similar success for your
            business.
          </P>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-gray-50 rounded-xl hover:opacity-90 transition"
            >
              Contact Us
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-gray-50 transition"
            >
              View More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
