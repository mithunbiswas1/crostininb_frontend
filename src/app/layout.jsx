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
