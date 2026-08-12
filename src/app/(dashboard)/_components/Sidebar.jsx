// src/app/(dashboard)/_components/Sidebar.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Navigation items
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: FaShoppingBag,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: FaUser,
    },
  ];

  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Sidebar content
  const SidebarContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-500">Logo</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? (
            <FaChevronRight className="text-gray-600 dark:text-gray-400" />
          ) : (
            <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
          )}
        </button>
        {/* Mobile close button */}
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* User Info */}
      <div
        className={`flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user?.fullName || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
              {user?.role || "Customer"}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
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
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-amber-500"
                        : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom spacing - removed logout button */}
      <div className="h-4" />
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
    </>
  );
};

export default Sidebar;
