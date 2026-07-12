// src/app/(solutions)/_components/SolutionSDashboardSection.jsx

import Image from "next/image";
import { H2, H3, P } from "@/components/ui/Typography";

const dashboards = [
  {
    title: "Finance Dashboard",
    description:
      "Get real-time insights into revenue, expenses, cash flow, and financial performance across your organization.",
    image: "/solutions/erp/finance_dashboard.webp",
  },
  {
    title: "Operations Dashboard",
    description:
      "Monitor daily operations, workflow efficiency, and process performance in a centralized view.",
    image: "/solutions/erp/operations_dashboard2.webp",
  },
  {
    title: "Sales Dashboard",
    description:
      "Track leads, conversions, sales pipeline, and team performance with live analytics.",
    image: "/solutions/erp/sales_dashboard2.webp",
  },
  {
    title: "HR Dashboard",
    description:
      "Manage employee performance, attendance, payroll status, and recruitment analytics in one place.",
    image: "/solutions/erp/hr_dashboard2.webp",
  },
];

function DashboardCard({ item, reverse }) {
  return (
    <div className="grid lg:grid-cols-2 overflow-hidden">
      {/* Image */}
      <div
        className={`relative min-h-[320px] lg:min-h-[420px] ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-center p-8 lg:p-16 bg-gray-100 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <H3 className="font-bold mb-5">{item.title}</H3>

        <P className="text-gray-600 leading-relaxed max-w-xl">
          {item.description}
        </P>
      </div>
    </div>
  );
}

export default function SolutionSDashboardSection() {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <H2 className="font-bold mb-6">
            Powerful ERP Dashboards for Smarter Decisions
          </H2>

          <P className="text-gray-600">
            Our ERP dashboards provide real-time visibility across all core
            business functions, helping you monitor performance, identify
            bottlenecks, and make data-driven decisions instantly.
          </P>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-px bg-gray-200">
          {dashboards.map((item, index) => (
            <DashboardCard key={index} item={item} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
