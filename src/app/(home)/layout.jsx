// src/app/(home)/layout.jsx

import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";

export default function PagesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
