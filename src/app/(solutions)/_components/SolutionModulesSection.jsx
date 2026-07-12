// src/app/(solutions)/_components/SolutionModulesSection.jsx

import { H2, H4, P } from "@/components/ui/Typography";

const modules = [
  {
    title: "Finance & Accounting",
    description:
      "Automate budgeting, invoicing, expense tracking, and financial reporting with precision.",
  },
  {
    title: "Human Resources",
    description:
      "Manage employee data, payroll, attendance, recruitment, and performance in one system.",
  },
  {
    title: "Supply Chain",
    description:
      "Optimize procurement, inventory, warehouse, and logistics workflows seamlessly.",
  },
  {
    title: "Sales & CRM",
    description:
      "Track leads, manage customers, and improve conversion with integrated CRM tools.",
  },
  {
    title: "Inventory Management",
    description:
      "Real-time stock tracking, alerts, and warehouse optimization for better control.",
  },
  {
    title: "Reporting & Analytics",
    description:
      "Advanced dashboards and reports for data-driven decision making.",
  },
];

function ModuleCard({ item }) {
  return (
    <div className="group border border-gray-200 bg-gray-50 p-6 lg:p-8 transition hover:border-gray-300">
      <H4 className="font-bold mb-4">{item.title}</H4>

      <P className="text-gray-600">{item.description}</P>
    </div>
  );
}

export default function SolutionModulesSection() {
  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <H2 className="font-bold mb-6">
            Core ERP Modules Built for Enterprise Efficiency
          </H2>

          <P className="text-gray-600">
            Our ERP platform is designed with modular architecture so you can
            enable only what your business needs — and scale anytime.
          </P>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((item, index) => (
            <ModuleCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
