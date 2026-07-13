// src/app/layout.jsx

import { Manrope } from "next/font/google";

import "./globals.css";
import { nekst } from "@/font/nekst/nekst";

import { Toaster } from "sonner";

import Footer from "@/components/common/Footer/Footer.jsx";
import ReduxProvider from "@/redux/reduxProvider/ReduxProvider";
import Navbar from "@/components/common/Navbar/Navbar.jsx";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Crostini | Authentic Restaurant & Pizza",
    template: "%s | Crostini",
  },

  description:
    "Enjoy authentic Italian cuisine, handcrafted pizzas, fresh pasta, salads, desserts, and more at Crostini NB. Dine in, order online, or book catering for your next event.",

  keywords: [
    "Italian Restaurant",
    "Pizza",
    "Pasta",
    "Italian Food",
    "Restaurant",
    "Catering",
    "Order Online",
    "Dining",
    "Crostini NB",
  ],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${nekst.variable}`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>

        <Toaster />
      </body>
    </html>
  );
}
