// src/components/common/Navbar/Navbar.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HiBars3 } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Menu",
    href: "/menu",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "#",
    subMenu: [
      {
        name: "App Development",
        href: "/app-development",
      },
      { name: "Web Development", href: "/web-development" },
      { name: "UI/UX Design", href: "/ui-ux-design" },
      {
        name: "Software Development",
        href: "/software-development",
      },
      { name: "E-commerce Solutions", href: "/ecommerce-solutions" },
      { name: "AI & Automation", href: "/ai-automation" },
      { name: "Search Engine Optimization", href: "/seo" },
      { name: "Digital Marketing", href: "/digital-marketing" },
    ],
    subColumn: 2,
  },
  // {
  //   name: "Solutions",
  //   href: "#",
  //   subMenu: [
  //     {
  //       name: "Enterprise Resource Planning (ERP)",
  //       href: "/enterprise-resource-planning",
  //     },
  //     {
  //       name: "Human Resource Management System (HRMS)",
  //       href: "/human-resource-management",
  //     },
  //     {
  //       name: "Customer Relationship Management (CRM)",
  //       href: "/customer-relationship-management",
  //     },
  //     {
  //       name: "Inventory Management System (IMS)",
  //       href: "/inventory-management-system",
  //     },
  //     { name: "SaaS Product Development", href: "/saas-development" },
  //     { name: "API Integration Services", href: "/api-integration" },
  //   ],
  //   subColumn: 2,
  // },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Package",
    href: "/package",
  },
  {
    name: "Case Studies",
    href: "/case-studies",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Static data
  const staticData = {
    phone: "0480308226",
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Toggle submenu in mobile menu
  const toggleSubMenu = (menuName) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-white/20 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-1">
        {/* Logo */}
        <div className="flex ">
          <Link href="/" className="flex items-center gap-2">
            <span className="sr-only">Your Company</span>
            <Image
              src={isScrolled ? "/logo_black.png" : "/logo_white.png"}
              alt="Your Company Logo"
              width={200}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-mr-2.5 inline-flex items-center justify-center rounded-md p-3 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3
              aria-hidden="true"
              className={` ${isScrolled ? "text-black" : "text-white"} h-6 w-6`}
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-3">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative transition-all duration-300 group-hover:translate-y-full"
              onMouseEnter={() => item.subMenu && setOpenSubMenu(item.name)}
              onMouseLeave={() => setOpenSubMenu(null)}
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={`text-sm font-bold  py-4 px-3 ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Submenu toggle arrow */}
                {item.subMenu && (
                  <>
                    {openSubMenu === item.name ? (
                      <FaChevronUp
                        className={`h-3 w-3 ${
                          isScrolled ? "text-black" : "text-white"
                        }`}
                      />
                    ) : (
                      <FaChevronDown
                        className={`h-3 w-3 ${
                          isScrolled ? "text-black" : "text-white"
                        }`}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Submenu for Services with animation */}
              {item.subMenu && openSubMenu === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="pt-1 absolute left-0 right-0 w-screen"
                >
                  <div
                    className={` lg:-ml-45 bg-black text-white p-4 rounded-md shadow-md grid ${
                      item.subColumn === 2
                        ? "grid-cols-2 max-w-lg"
                        : "grid-cols-3 max-w-screen-md"
                    } ${
                      isScrolled
                        ? "border-t-8 border-t-gray-300 border-l border-r border-b border-gray-500"
                        : "border-t-8 border-t-gray-300 border-l border-r border-b border-gray-500"
                    } gap-x-4 gap-y-2`}
                  >
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block text-sm hover:bg-primary/90 hover:text-gray-200 rounded-md px-4 py-2"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Contact */}
        <div className="hidden lg:flex lg:justify-end">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-auto min-w-36 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary transition-all duration-300"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed pb-20 inset-0 z-40 backdrop-blur bg-black/80 overflow-y-auto">
          <div
            className={`flex justify-between px-4 py-2.5 items-center ${isScrolled ? "bg-gray-100" : "bg-black/50"} backdrop-blur-xl sticky top-0 z-30 border-b border-gray-300`}
          >
            <Link href="#" className="-m-1.5 p-1.5">
              <Image
                src={isScrolled ? "/logo_black.png" : "/logo_white.png"}
                alt="Your Company Logo"
                width={200}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md text-white"
            >
              <span className="sr-only">Close menu</span>
              <FaXmark
                aria-hidden="true"
                className={`h-6 w-6 ${isScrolled ? "text-black" : "text-white"}`}
              />
            </button>
          </div>

          {/* Main menu container with scroll */}
          <div className="mt-6 space-y-4 text-center overflow-y-auto max-h-[80vh] px-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <div
                  className={`flex items-center justify-between overflow-y-auto ${
                    pathname === item.href ||
                    item.subMenu?.some((sub) => sub.href === pathname)
                      ? "border-b-2 border-primary text-primary"
                      : "text-white"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg font-light"
                  >
                    {item.name}
                  </Link>

                  {/* Button to toggle submenu */}
                  {item.subMenu && (
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="ml-4 bg-primary text-white p-2 rounded-md"
                    >
                      {openSubMenu === item.name ? (
                        <FaChevronUp
                          className={`h-4 w-4 ${
                            pathname === item.href ||
                            item.subMenu?.some((sub) => sub.href === pathname)
                              ? "text-primary"
                              : "text-white"
                          }`}
                        />
                      ) : (
                        <FaChevronDown
                          className={`h-4 w-4 ${
                            pathname === item.href ||
                            item.subMenu?.some((sub) => sub.href === pathname)
                              ? "text-primary"
                              : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu - Only display if open */}
                {item.subMenu && openSubMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 space-y-3 max-h-[300px]"
                  >
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-md font-light text-white text-left pl-12"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Only Mobile Contact Link */}
            <Link
              href="/contact"
              className="mt-10 flex items-center justify-center gap-2 w-auto min-w-36 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary transition-all duration-300"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="text-white px-4 pt-12 pb-4 space-y-4">
            {/* Contact */}
            <div className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className=" text-white group-hover:text-primary transition-all duration-300 text-2xl">
                    <FaMapMarkerAlt />
                  </div>
                  <p className="text-white text-lg">
                    Level 2, 8-12 King Street, Rockdale, NSW 2216
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className=" text-white group-hover:text-primary transition-all duration-300 text-2xl">
                    <FaEnvelope />
                  </div>
                  <p className="text-primary text-lg">
                    <a href="mailto:contact@logicraftit.com">
                      contact@logicraftit.com
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className=" text-white group-hover:text-primary transition-all duration-300 text-2xl">
                    <FaPhone />
                  </div>
                  <p className="text-primary text-lg">
                    <a href="tel:+0285307148">+1 234 567 890</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
