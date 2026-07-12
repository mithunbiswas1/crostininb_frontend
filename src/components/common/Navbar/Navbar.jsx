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

const navigation1 = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Menu",
    href: "/menu",
  },
  {
    name: "Dining Room",
    href: "/dining-room",
  },
  {
    name: "About",
    href: "/about",
  },
];

const navigation2 = [
  {
    name: "Order Online",
    href: "/order-online",
  },
  {
    name: "Specials",
    href: "/specials",
  },
  {
    name: "Catering",
    href: "/catering",
  },
  {
    name: "Items",
    href: "#",
    subMenu: [
      {
        name: "Photos",
        href: "/photos",
      },
      {
        name: "Dishes",
        href: "/dishes",
      },
      {
        name: "Salads",
        href: "/salads",
      },
      {
        name: "Pizza",
        href: "/pizza",
      },
    ],
    subColumn: 1,
  },
];

// Combine both navigations for mobile menu
const navigation = [...navigation1, ...navigation2];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-gray-50/10 ${
        isScrolled ? "bg-gray-50 shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-1">
        {/* Left Navigation - Desktop */}
        <div className="hidden lg:flex lg:gap-x-3 lg:mr-auto">
          {navigation1.map((item) => (
            <div
              key={item.name}
              className="relative transition-all duration-300"
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={`text-sm font-bold py-4 px-3 hover:text-primary transition-colors duration-300 ${
                    pathname === item.href ? "text-primary" : isScrolled ? "text-black" : "text-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Logo - Center */}
        <div className="flex lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <Link href="/" className="flex items-center gap-2">
            <span className="sr-only">Your Company</span>
            <Image
              src={isScrolled ? "/logo.avif" : "/logo.avif"}
              alt="Your Company Logo"
              width={200}
              height={80}
              className="h-15 w-auto"
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
              className={` ${isScrolled ? "text-black" : "text-gray-50"} h-6 w-6`}
            />
          </button>
        </div>

        {/* Right Navigation - Desktop */}
        <div className="hidden lg:flex lg:gap-x-3 lg:ml-auto">
          {navigation2.map((item) => (
            <div
              key={item.name}
              className="relative transition-all duration-300"
              onMouseEnter={() => item.subMenu && setOpenSubMenu(item.name)}
              onMouseLeave={() => setOpenSubMenu(null)}
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={`text-sm font-bold py-4 px-3 hover:text-primary transition-colors duration-300 flex items-center gap-1 ${
                    pathname === item.href || 
                    (item.subMenu && item.subMenu.some(sub => sub.href === pathname))
                      ? "text-primary" 
                      : isScrolled ? "text-black" : "text-gray-50"
                  }`}
                >
                  {item.name}
                  {item.subMenu && (
                    <span className="ml-1">
                      {openSubMenu === item.name ? (
                        <FaChevronUp className="h-3 w-3" />
                      ) : (
                        <FaChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </Link>
              </div>

              {/* Submenu with updated design */}
              {item.subMenu && openSubMenu === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 pt-2"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl min-w-[220px] overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Decorative top bar */}
                    <div className="h-1 bg-primary"></div>
                    
                    <div className="py-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-6 py-3 text-sm hover:bg-primary/10 transition-colors duration-200 ${
                            pathname === subItem.href 
                              ? "text-primary bg-primary/5" 
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            {subItem.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
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
                src={isScrolled ? "/logo.avif" : "/logo.avif"}
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
              className="rounded-md text-gray-50"
            >
              <span className="sr-only">Close menu</span>
              <FaXmark
                aria-hidden="true"
                className={`h-6 w-6 ${isScrolled ? "text-black" : "text-gray-50"}`}
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
                      : "text-gray-50"
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
                      className="ml-4 bg-primary text-gray-50 p-2 rounded-md"
                    >
                      {openSubMenu === item.name ? (
                        <FaChevronUp
                          className={`h-4 w-4 ${
                            pathname === item.href ||
                            item.subMenu?.some((sub) => sub.href === pathname)
                              ? "text-primary"
                              : "text-gray-50"
                          }`}
                        />
                      ) : (
                        <FaChevronDown
                          className={`h-4 w-4 ${
                            pathname === item.href ||
                            item.subMenu?.some((sub) => sub.href === pathname)
                              ? "text-primary"
                              : "text-gray-50"
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
                        className="block text-md font-light text-gray-50 text-left pl-12"
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
              className="mt-10 flex items-center justify-center gap-2 w-auto min-w-36 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-primary transition-all duration-300"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="text-gray-50 px-4 pt-12 pb-4 space-y-4">
            {/* Contact */}
            <div className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className=" text-gray-50 group-hover:text-primary transition-all duration-300 text-2xl">
                    <FaMapMarkerAlt />
                  </div>
                  <p className="text-gray-50 text-lg">
                    Level 2, 8-12 King Street, Rockdale, NSW 2216
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className=" text-gray-50 group-hover:text-primary transition-all duration-300 text-2xl">
                    <FaEnvelope />
                  </div>
                  <p className="text-primary text-lg">
                    <a href="mailto:contact@logicraftit.com">
                      contact@logicraftit.com
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className=" text-gray-50 group-hover:text-primary transition-all duration-300 text-2xl">
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