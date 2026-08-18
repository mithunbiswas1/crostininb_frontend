// src/app/(dashboard)/_components/Sidebar.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import {
  FaShoppingBag,
  FaUser,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "sonner";
import { setLogout } from "@/redux/features/Slice/authSlice";
import { useLogoutMutation } from "@/redux/features/profileApi";
import { baseUriBackend } from "@/redux/url/url";

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const navItems = [
    {
      name: "Orders",
      href: "/orders",
      icon: FaShoppingBag,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: FaUser,
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(setLogout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast.error(
        error?.data?.message || "Failed to logout. Please try again.",
      );
      window.location.href = "/";
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.avif"
              alt="Your Company Logo"
              width={200}
              height={80}
              className="w-auto transition-all duration-300 h-12"
              priority
            />
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Your Company Logo"
              width={200}
              height={80}
              className="w-auto transition-all duration-300 h-4"
              priority
            />
          </Link>
        )}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex p-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          {isCollapsed ? (
            <FaChevronRight className="text-gray-400" />
          ) : (
            <FaChevronLeft className="text-gray-400" />
          )}
        </button>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800"
          >
            <FaTimes className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      <div
        className={`flex items-center gap-3 px-4 py-4 border-b border-zinc-800 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-700 flex-shrink-0">
          {user?.image ? (
            <Image
              src={`${baseUriBackend}${user.image}`}
              alt={user?.fullName || "User"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-amber-500 to-orange-500 text-black font-bold text-lg">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-gray-400 capitalize truncate">
              {user?.role || "Customer"}
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-gray-400 hover:text-white hover:bg-zinc-800"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-amber-400" : "text-gray-400"
                    }`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button - Bottom */}
      <div className="border-t border-zinc-800 p-3">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 group text-red-400 hover:text-red-300 hover:bg-red-500/10 ${
            isCollapsed ? "justify-center" : ""
          } ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaSignOutAlt
            className={`w-5 h-5 transition-colors text-red-400 ${
              isCollapsed ? "mx-0" : ""
            }`}
          />
          {!isCollapsed && (
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Logout
            </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={`hidden md:flex flex-col bg-[#0d0d0d] border-r border-zinc-800 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
    </>
  );
};

export default Sidebar;
