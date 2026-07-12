"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaSnapchatGhost,
  FaApple,
  FaCcVisa,
  FaCcMastercard,
  FaGooglePay,
  FaPaypal,
} from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { MdLocalShipping, MdOutlineEmail } from "react-icons/md";
import { BiMoney } from "react-icons/bi";

const Footer = () => {
  // STATIC FOOTER DATA
  const footerData = [
    {
      title: "CONSUMER POLICY",
      links: [
        { label: "Return Policy", href: "/" },
        { label: "Terms of Use", href: "/" },
        { label: "Security", href: "/" },
        { label: "Privacy", href: "/" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Blog", href: "/" },
        { label: "Contact", href: "/" },
      ],
    },
    {
      title: "HELP & OTHERS",
      links: [
        { label: "Shipping", href: "/" },
        { label: "Payments", href: "/" },
        { label: "FAQ", href: "/" },
        { label: "Support", href: "/" },
      ],
    },
  ];

  // Helper function to get links by section title
  const getLinksByTitle = (title) => {
    const section = footerData.find((item) => item.title === title);
    return section ? section.links : [];
  };

  // STATIC PAYMENT METHODS
  const paymentMethods = [
    { icon: FaGooglePay, name: "Google Pay", color: "#4285F4" },
    { icon: FaPaypal, name: "PayPal", color: "#003087" },
    { icon: SiPhonepe, name: "PhonePe", color: "#5F259F" },
    { icon: FaCcVisa, name: "Visa", color: "#1A1F71" },
    { icon: FaCcMastercard, name: "Mastercard", color: "#EB001B" },
  ];

  // STATIC SOCIAL / SETTINGS DATA
  const data = {
    footer_logo: "/logo.avif",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    pinterest: "#",
    snapchat: "#",
    apple: "#",
    email: "info@example.com",
  };

  return (
    <footer className="bg-[#0f0f0f] text-gray-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* LOGO */}
        <div>
          <Image
            src={data.footer_logo}
            alt="logo"
            width={140}
            height={40}
            className="mb-6 rounded-md object-contain"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="text-primary font-semibold mb-4 uppercase text-sm">
              Customer Service
            </h3>

            <ul className="text-sm text-gray-300 flex gap-2 lg:flex-col flex-wrap">
              {getLinksByTitle("CONSUMER POLICY").map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-xs text-gray-400 space-y-3">
              <div className="flex items-center gap-2">
                <MdLocalShipping className="text-lg" />
                <span>7 Days Return Policy*</span>
              </div>

              <div className="flex items-center gap-2">
                <BiMoney className="text-lg" />
                <span>Cash On Delivery*</span>
              </div>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-primary font-semibold mb-4 uppercase text-sm">
              Company
            </h3>

            <ul className="text-sm text-gray-300 flex gap-2 lg:flex-col flex-wrap">
              {getLinksByTitle("COMPANY").map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="text-primary text-sm mb-2 uppercase">
                Download The App
              </h4>

              <div className="flex gap-3">
                <Image
                  src="/google-play.webp"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
                <Image
                  src="/app-store.webp"
                  alt="App Store"
                  width={120}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-primary font-semibold mb-4 uppercase text-sm">
              Connect With Us
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
              <Link className="flex items-center gap-2" href={data.facebook}>
                <FaFacebookF /> Facebook
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
              <Link className="flex items-center gap-2" href={data.instagram}>
                <FaInstagram /> Instagram
              </Link>
            </div>

            <div className="flex gap-4 text-lg text-gray-300 mb-10">
              <Link href={data.twitter}>
                <FaTwitter />
              </Link>
              <Link href={data.pinterest}>
                <FaPinterestP />
              </Link>
              <Link href={data.snapchat}>
                <FaSnapchatGhost />
              </Link>
              <Link href={data.apple}>
                <FaApple />
              </Link>
              <Link href={`mailto:${data.email}`}>
                <MdOutlineEmail />
              </Link>
            </div>

            <h4 className="text-primary text-sm mb-3 uppercase">
              100% Secure Payment
            </h4>

            <div className="flex gap-2 flex-wrap">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div key={index} className="group relative">
                    <Icon
                      className="text-4xl text-gray-400 hover:text-primary transition-colors cursor-pointer bg-gray-800 px-2"
                      title={method.name}
                    />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-gray-50 bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {method.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HELP + SUBSCRIBE */}
          <div>
            <h3 className="text-primary font-semibold mb-4 uppercase text-sm">
              Company
            </h3>

            <ul className="text-sm text-gray-300 flex gap-2 lg:flex-col flex-wrap">
              {getLinksByTitle("HELP & OTHERS").map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="text-primary font-semibold uppercase text-sm mt-5 mb-2">
              Keep Up To Date
            </h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter Email Id"
                className="w-full px-3 py-2 text-sm bg-transparent border border-gray-500 outline-none"
              />
              <button className="bg-primary text-black px-4 text-sm font-semibold">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
