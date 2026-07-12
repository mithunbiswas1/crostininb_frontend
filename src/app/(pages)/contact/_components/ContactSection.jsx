// src/app/(pages)/contact/_components/ContactSection.jsx

"use client";

import Input from "@/components/ui/Input";
import { H1, P } from "@/components/ui/Typography";
import { Mail, Map, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-between">
            <div>
              <H1 className="max-w-md">Got an idea for your project?</H1>

              <P className="mt-8 max-w-md text-xl lg:text-2xl leading-relaxed text-gray-700">
                We'd love to learn more about you and what we can design and
                build together.
              </P>
            </div>

            <div className="mt-16 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black">
                  <Mail className="h-5 w-5 text-gray-50" />
                </div>

                <span className="text-xl lg:text-2xl font-semibold">
                  info@logicraftit.com
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black">
                  <Phone className="h-5 w-5 text-gray-50" />
                </div>

                <span className="text-xl lg:text-2xl font-semibold">
                  +1 (555) 123-4567
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black">
                  <Map className="h-5 w-5 text-gray-50" />
                </div>

                <span className="text-xl lg:text-2xl font-semibold">
                  Street 47 W 13th St, New York, NY 10011, USA
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form className="space-y-8">
            <Input
              id="name"
              name="name"
              label="Name*"
              placeholder="Enter your name"
              className="h-16 rounded-2xl border-0 bg-gray-200 px-6 text-lg"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email*"
                placeholder="Enter your email"
                className="h-16 rounded-2xl border-0 bg-gray-200 px-6 text-lg"
              />

              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone"
                placeholder="Enter your phone"
                className="h-16 rounded-2xl border-0 bg-gray-200 px-6 text-lg"
              />
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium text-gray_deep">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full rounded-2xl border-0 bg-gray-200 px-6 py-5 text-base outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="h-20 w-full rounded-full bg-black text-lg font-semibold text-gray-50 transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
