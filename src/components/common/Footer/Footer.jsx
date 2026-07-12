// src/components/layout/Footer.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { SiDouban } from "react-icons/si";

const navigationLinks = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: SiDouban,
    href: "#",
    label: "Dou",
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

export default function Footer() {
  return (
    <footer className="bg-[#2A2D33] text-white">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        {/* Top */}
        <div className="grid lg:grid-cols-[2fr_1fr_1.5fr_1fr] gap-12">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo_white.png"
              alt="Logicraft IT"
              width={320}
              height={100}
              className="h-auto w-full max-w-50"
            />
          </Link>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-5 text-white">Useful Link</h4>
            <ul className="space-y-5 text-gray-300">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-lg hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-white">Address</h4>

            <div className="space-y-5 text-gray-300">
              <p>
                Street 47 W 13th St,
                <br />
                New York, NY 10011, USA
              </p>

              <p className="font-semibold">+1 (555) 123-4567</p>

              <a
                href="mailto:info@logicraftit.com"
                className="text-lg hover:text-gray-300 transition-colors"
              >
                info@logicraftit.com
              </a>
            </div>
          </div>

          {/* Email + Social */}
          <div className="">
            <h4 className="font-bold mb-5 text-white">Social</h4>

            <div className="flex lg:justify-end gap-4 mt-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="w-14 h-14 rounded-full bg-white text-[#2A2D33] flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Icon size={24} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 py-4 flex flex-col lg:flex-row justify-between gap-6 border-t border-white/10">
          <p className="text-white/80">Copyright © 2026 Logicraft IT</p>

          <div className="flex flex-wrap gap-8 lg:gap-12">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
