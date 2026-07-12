// src/components/layout/Footer.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTripadvisor } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { Clock, Phone, MapPin, Mail, ChefHat, Utensils } from "lucide-react";
import { H2, P } from "@/components/ui/Typography";

const navigationLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Private Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: FaTripadvisor,
    href: "https://tripadvisor.com",
    label: "TripAdvisor",
    color: "hover:text-green-600",
  },
  {
    icon: SiGooglemaps,
    href: "#",
    label: "Google Maps",
    color: "hover:text-red-500",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Cookie Policy",
    href: "/cookie-policy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
];

const openingHours = [
  { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
  { day: "Friday - Saturday", hours: "11:00 AM - 11:30 PM" },
  { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a1410] to-[#0d0a08] text-gray-50 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Top */}
        <div className="grid lg:grid-cols-[2fr_1fr_1.5fr_1.2fr] gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.avif"
              alt="Your Company Logo"
              width={200}
              height={40}
              className="h-20 w-auto"
              priority
            />

            <P className="text-gray-400 text-sm leading-relaxed max-w-sm mt-4">
              Where culinary artistry meets warm hospitality. Every dish tells a
              story of passion, quality, and unforgettable flavors.
            </P>

            <div className="flex gap-4 mt-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className={`w-10 h-10 rounded-full bg-gray-50/5 border border-gray-50/10 flex items-center justify-center text-gray-400 hover:bg-gray-50/10 hover:border-amber-400/50 transition-all duration-300 ${item.color}`}
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-5 text-amber-400 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-400">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-amber-400 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold mb-5 text-amber-400 text-sm uppercase tracking-wider">
              Opening Hours
            </h4>
            <div className="space-y-3">
              {openingHours.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-50 text-sm font-medium">
                    {item.day}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Clock size={14} className="text-amber-400" />
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-amber-400 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-gray-400 text-sm">
                  47 W 13th St,
                  <br />
                  New York, NY 10011, USA
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber-400 shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 text-sm hover:text-amber-400 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-amber-400 shrink-0" />
                <a
                  href="mailto:info@gourmethaven.com"
                  className="text-gray-400 text-sm hover:text-amber-400 transition-colors"
                >
                  info@gourmethaven.com
                </a>
              </div>

              {/* Reservation CTA */}
              <Link
                href="/reservations"
                className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-gray-50 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <P className="mt-12 pt-6 border-t text-center">
          Copyright © 2026 GourmetHaven. All rights reserved.
        </P>
      </div>
    </footer>
  );
}
