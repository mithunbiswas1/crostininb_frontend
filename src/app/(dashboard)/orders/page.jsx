// src/app/(dashboard)/orders/page.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Package,
  Eye,
  XCircle,
  Clock,
  CheckCircle,
  Truck,
  Calendar,
  DollarSign,
  MapPin,
  User,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import {
  useGetOrdersByUserQuery,
  useCancelOrderMutation,
} from "@/redux/features/orderApi";
import { baseUriBackend } from "@/redux/url/url";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      icon: Clock,
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-500/20 text-blue-500 border-blue-500/30",
      icon: CheckCircle,
    },
    preparing: {
      label: "Preparing",
      className: "bg-purple-500/20 text-purple-500 border-purple-500/30",
      icon: Package,
    },
    out_for_delivery: {
      label: "Out for Delivery",
      className: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
      icon: Truck,
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-500/20 text-green-500 border-green-500/30",
      icon: CheckCircle,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-500/20 text-red-500 border-red-500/30",
      icon: XCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
};

// Order Card Component
const OrderCard = ({ order, onCancel }) => {
  const isCancellable =
    order.status !== "cancelled" && order.status !== "delivered";
  const totalItems = order.items?.length || 0;

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 overflow-hidden hover:border-amber-500/30 transition-all duration-300">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-zinc-800 bg-[#111]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-white">
              Order #{order.orderNumber}
            </span>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {format(new Date(order.createdAt), "dd MMM yyyy, h:mm a")}
          </span>
        </div>
      </div>

      {/* Order Body */}
      <div className="p-4 space-y-4">
        {/* Items Preview */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {order.items?.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="relative w-10 h-10 rounded-full border-2 border-[#1a1a1a] overflow-hidden bg-zinc-800"
              >
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {totalItems > 3 && (
              <div className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] bg-zinc-800 flex items-center justify-center text-xs text-gray-300">
                +{totalItems - 3}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-400">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-white font-semibold">
                ${order.total?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-xs text-gray-500">Customer</p>
              <p className="text-white text-sm truncate">
                {order.customer?.firstName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-xs text-gray-500">Delivery</p>
              <p className="text-white text-sm truncate">
                {order.deliveryAddress?.addressLine1}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-xs text-gray-500">Payment</p>
              <p className="text-white text-sm capitalize">
                {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
          <Link
            href={`/orders/${order.id}`}
            className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition-colors"
          >
            <Eye size={16} />
            View Details
            <ArrowRight size={14} />
          </Link>
          {isCancellable && (
            <button
              onClick={() => onCancel(order.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <XCircle size={14} />
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CustomerOrdersPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // RTK Queries & Mutations
  const { data, isLoading, refetch } = useGetOrdersByUserQuery({ page, limit });
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination || {};
  const { currentPage = 1, totalPages = 1, totalCount = 0 } = pagination;

  // Handle cancel order
  const handleCancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await cancelOrder(orderId).unwrap();
      toast.success("Order cancelled successfully!");
      refetch();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error?.data?.message || "Failed to cancel order.");
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingBag className="w-16 h-16 text-zinc-700 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Orders Yet</h2>
        <p className="text-gray-400 max-w-md">
          You haven't placed any orders yet. Start exploring our menu and place
          your first order!
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
        >
          Browse Menu
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Orders</h1>
          <p className="text-gray-400 text-sm mt-1">
            View and manage all your orders
          </p>
        </div>
        <div className="text-sm text-gray-400">
          Total: <span className="text-white font-medium">{totalCount}</span>{" "}
          orders
        </div>
      </div>

      {/* Orders Grid */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={handleCancelOrder}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
