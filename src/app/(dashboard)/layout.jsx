// src/app/(dashboard)/layout.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import Sidebar from "./_components/Sidebar";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#111] overflow-hidden">
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between px-4 h-16 bg-[#111] border-b border-zinc-800">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-zinc-800"
          >
            <FaBars className="w-5 h-5 text-gray-400" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-400">Logo</span>
          </Link>
          <div className="w-10" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#111]">
          {children}
        </main>
      </div>
    </div>
  );
}
