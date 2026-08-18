// src/app/(dashboard)/orders/[id]/page.jsx
"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ArrowLeft,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ShoppingBag,
  Home,
} from "lucide-react";

import {
  useGetOrderByIdQuery,
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
const StatusBadge = ({ status, size = "md" }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    },
    preparing: {
      label: "Preparing",
      className: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      className: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-500/20 text-green-500 border-green-500/30",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-500/20 text-red-500 border-red-500/30",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const sizeClass = size === "lg" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClass} ${config.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "pending"
            ? "bg-yellow-500"
            : status === "confirmed"
              ? "bg-blue-500"
              : status === "preparing"
                ? "bg-purple-500"
                : status === "out_for_delivery"
                  ? "bg-indigo-500"
                  : status === "delivered"
                    ? "bg-green-500"
                    : "bg-red-500"
        }`}
      />
      {config.label}
    </span>
  );
};

// Order Timeline
const OrderTimeline = ({ status }) => {
  const steps = [
    { key: "pending", label: "Order Placed", icon: Clock },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "preparing", label: "Preparing", icon: Package },
    { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const currentIndex = steps.findIndex((step) => step.key === status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 text-red-500">
          <XCircle size={24} />
          <span className="font-semibold">Order Cancelled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-700" />
      {steps.map((step, index) => {
        const isActive = index <= currentIndex;
        const Icon = step.icon;

        return (
          <div
            key={step.key}
            className="relative flex items-start gap-4 pb-6 last:pb-0"
          >
            <div
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                isActive
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-700 text-gray-500"
              }`}
            >
              <Icon size={16} />
            </div>
            <div>
              <p
                className={`font-medium ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
              {isActive && index === currentIndex && (
                <span className="text-xs text-amber-500">Current Status</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function OrderDetailPage({ params }) {
  const { id } = use(params);
  const [isCancelling, setIsCancelling] = useState(false);

  const { data, isLoading, refetch } = useGetOrderByIdQuery(id);
  const [cancelOrder] = useCancelOrderMutation();

  const order = data?.data;

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      setIsCancelling(true);
      await cancelOrder(id).unwrap();
      toast.success("Order cancelled successfully!");
      refetch();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error?.data?.message || "Failed to cancel order.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-400">Order not found</h2>
        <Link
          href="/dashboard/orders"
          className="mt-4 inline-block text-amber-500 hover:text-amber-400"
        >
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const isCancellable =
    order.status !== "cancelled" && order.status !== "delivered";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-bold text-white">
            Order #{order.orderNumber}
          </h1>
          <StatusBadge status={order.status} size="lg" />
        </div>
        {isCancellable && (
          <button
            onClick={handleCancelOrder}
            disabled={isCancelling}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            <XCircle size={16} />
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <ShoppingBag size={20} className="text-amber-500" />
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items?.map((item, index) => {
                const hasDiscount =
                  item.discountedPrice && item.discountedPrice < item.price;
                const displayPrice = hasDiscount
                  ? item.discountedPrice
                  : item.price;

                return (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-zinc-800 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          {item.variationName && (
                            <p className="text-sm text-gray-400">
                              Variation: {item.variationName}
                            </p>
                          )}
                          <p className="text-sm text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-amber-500">
                            ${(displayPrice * item.quantity).toFixed(2)}
                          </p>
                          {hasDiscount && (
                            <p className="text-xs text-gray-500 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">
                    ${order.subtotal?.toFixed(2) || "0.00"}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Discount</span>
                    <span className="text-green-500">
                      -${order.discountAmount?.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-white">
                    ${order.deliveryFee?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-800">
                  <span className="text-white">Total</span>
                  <span className="text-amber-500">
                    ${order.total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Home size={20} className="text-amber-500" />
              Delivery Address
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                {order.deliveryAddress?.addressLine1}
                {order.deliveryAddress?.addressLine2 && (
                  <>, {order.deliveryAddress.addressLine2}</>
                )}
              </p>
              <p className="text-gray-400">
                ZIP: {order.deliveryAddress?.zipCode}
              </p>
              {order.deliveryAddress?.deliveryInstructions && (
                <p className="text-gray-400">
                  <span className="text-gray-500">Instructions:</span>{" "}
                  {order.deliveryAddress.deliveryInstructions}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-amber-500" />
              Order Status
            </h2>
            <OrderTimeline status={order.status} />
          </div>

          {/* Order Details */}
          <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Package size={20} className="text-amber-500" />
              Order Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Type</span>
                <span className="text-white capitalize">
                  {order.orderType?.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white capitalize">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Status</span>
                <span
                  className={`capitalize ${
                    order.paymentStatus === "paid"
                      ? "text-green-500"
                      : order.paymentStatus === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Order Date</span>
                <span className="text-white">
                  {format(new Date(order.createdAt), "dd MMM yyyy, h:mm a")}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User size={20} className="text-amber-500" />
              Customer
            </h2>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-gray-300">
                <User size={14} className="text-gray-500" />
                {order.customer?.firstName}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <Mail size={14} className="text-gray-500" />
                {order.customer?.email}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <Phone size={14} className="text-gray-500" />
                {order.customer?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
