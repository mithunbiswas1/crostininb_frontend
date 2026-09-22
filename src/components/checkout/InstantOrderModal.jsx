// src/components/checkout/InstantOrderModal.jsx

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clearCartsList } from "@/redux/features/Slice/CartDrawerSlice";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  Store,
  Truck,
  AlertCircle,
  Tag,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import Input from "@/components/ui/Input";
import { baseUriBackend } from "@/redux/url/url";
import { useCreateOrderMutation } from "@/redux/features/orderApi";
import { useValidateCouponMutation } from "@/redux/features/couponApi";
import LoginModal from "@/components/auth/LoginModal";
import RegistrationModal from "@/components/auth/RegistrationModal";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

const emptyFormData = {
  firstName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  zipCode: "",
  deliveryInstructions: "",
};

// Skips the full checkout page: opened directly from an item's "Instant
// Order" button, gated behind the same login/registration modals, and
// places the order for just the item(s) it was handed.
const InstantOrderModal = ({
  isOpen,
  onClose,
  items = [],
  isCartCheckout = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [authView, setAuthView] = useState("login");
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [formData, setFormData] = useState(emptyFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [validateCoupon, { isLoading: isValidatingCoupon }] =
    useValidateCouponMutation();

  // Locked for the whole isOpen lifetime, covering both the login-gate view
  // and the order form, so switching between them mid-flow never leaves the
  // body scrollable behind the modal.
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setAuthView("login");
      setDeliveryType("pickup");
      setFormData(emptyFormData);
      setFormErrors({});
      setCouponInput("");
      setAppliedCoupon(null);
    }
  }, [isOpen]);

  // Prefill from the logged-in user's profile, same as the full checkout page.
  useEffect(() => {
    if (!isOpen || !user) return;
    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || user.fullName || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
      addressLine1: prev.addressLine1 || user.address || "",
      zipCode: prev.zipCode || user.postal_code || "",
    }));
  }, [isOpen, user]);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0,
  );
  const couponDiscount = appliedCoupon?.calculatedDiscount || 0;
  const totalPrice = Math.max(0, subtotal - couponDiscount);

  // Auto-adjust or remove coupon if subtotal changes
  useEffect(() => {
    if (!isOpen || !appliedCoupon) return;
    if (
      appliedCoupon.minOrderAmount > 0 &&
      subtotal < appliedCoupon.minOrderAmount
    ) {
      toast.warning(
        `Coupon "${appliedCoupon.code}" removed: minimum subtotal of $${appliedCoupon.minOrderAmount} required.`
      );
      setAppliedCoupon(null);
    } else if (appliedCoupon.discountType === "percentage") {
      let newDiscount = (subtotal * appliedCoupon.discountAmount) / 100;
      if (
        appliedCoupon.maxDiscountAmount &&
        newDiscount > appliedCoupon.maxDiscountAmount
      ) {
        newDiscount = appliedCoupon.maxDiscountAmount;
      }
      newDiscount = Math.round(newDiscount * 100) / 100;
      if (newDiscount !== appliedCoupon.calculatedDiscount) {
        setAppliedCoupon((prev) => ({
          ...prev,
          calculatedDiscount: newDiscount,
        }));
      }
    }
  }, [isOpen, subtotal, appliedCoupon]);

  if (!isOpen) return null;

  if (!isLoggedIn) {
    return (
      <>
        <LoginModal
          isOpen={authView === "login"}
          onClose={onClose}
          onSwitchToRegister={() => setAuthView("register")}
        />
        <RegistrationModal
          isOpen={authView === "register"}
          onClose={onClose}
          onSwitchToLogin={() => setAuthView("login")}
        />
      </>
    );
  }

  const handleApplyCoupon = async (e) => {
    e?.preventDefault?.();
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Please enter a coupon code");
      return;
    }
    try {
      const res = await validateCoupon({
        code: cleanCode,
        subtotal: subtotal,
      }).unwrap();

      if (res?.data) {
        setAppliedCoupon(res.data);
        toast.success(res.message || `Coupon "${cleanCode}" applied!`);
        setCouponInput("");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  const isRequiredInfoFilled =
    !!formData.firstName.trim() &&
    !!formData.phone.trim() &&
    (deliveryType !== "delivery" ||
      (!!formData.addressLine1.trim() && !!formData.zipCode.trim()));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (deliveryType === "delivery") {
      if (!formData.addressLine1.trim()) {
        errors.addressLine1 = "Address is required";
      }
      if (!formData.zipCode.trim()) {
        errors.zipCode = "ZIP code is required";
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        errors.zipCode = "Please enter a valid ZIP code";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || items.length === 0) return;

    setIsProcessing(true);

    try {
      const orderData = {
        customer: {
          firstName: formData.firstName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        deliveryAddress: {
          addressLine1:
            deliveryType === "delivery" ? formData.addressLine1.trim() : "",
          addressLine2:
            deliveryType === "delivery" ? formData.addressLine2.trim() : "",
          zipCode: deliveryType === "delivery" ? formData.zipCode.trim() : "",
          deliveryInstructions:
            deliveryType === "delivery"
              ? formData.deliveryInstructions.trim()
              : "",
        },
        deliveryType,
        items: items.map((item) => {
          const unitPrice = Number(item.discountedPrice || item.price) || 0;
          const qty = Number(item.quantity) || 1;

          const allSelection =
            item["Your Selection"] || item.yourSelection || "";
          const addonsData = item["Addons"] || item.addons;
          const allAddons = Array.isArray(addonsData)
            ? addonsData.join(", ")
            : addonsData
              ? String(addonsData)
              : "";

          return {
            productId: item.productId || null,
            product_name: item.name || item.product_name || "",
            total_price: unitPrice * qty,
            quantity: qty,
            all_selection: allSelection,
            all_addons: allAddons,
          };
        }),
        subtotal,
        discountAmount: 0,
        couponCode: appliedCoupon ? appliedCoupon.code : "",
        deliveryFee: 0,
        total: totalPrice,
        paymentMethod: "cash",
        orderType: isCartCheckout ? "cart" : "buy_now",
      };

      await createOrder(orderData).unwrap();

      toast.success("Order placed successfully!");
      setAppliedCoupon(null);
      if (isCartCheckout) {
        dispatch(clearCartsList());
      }
      onClose();
      router.push("/orders");
    } catch (error) {
      console.error("Error placing instant order:", error);
      toast.error(
        error?.data?.message || "Failed to place order. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-white text-xl font-semibold mb-4">Order Process</h2>

        {/* Items summary - same detailed layout as the full checkout page */}
        <div className="space-y-3 mb-4">
          {items.map((item, index) => {
            const hasDiscount =
              item.discountedPrice && item.discountedPrice < item.price;
            const displayPrice = hasDiscount ? item.discountedPrice : item.price;

            const yourSelection = item["Your Selection"] || item.yourSelection;
            const addons = item["Addons"] || item.addons;
            const extra = item["Extra:"] || item["Extra"] || item.extra;

            return (
              <div
                key={item.cartItemId || index}
                className="flex gap-3 bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/80"
              >
                {/* Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-semibold truncate">
                    {item.name}
                  </h4>
                  {item.variationName && (
                    <span className="text-xs text-gray-400 block">
                      {item.variationName}
                    </span>
                  )}
                  {yourSelection && (
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed break-words">
                      {yourSelection}
                    </p>
                  )}
                  {addons && (
                    <p className="text-[10px] text-amber-400/90 mt-0.5 leading-relaxed break-words">
                      Addons: {Array.isArray(addons) ? addons.join(", ") : addons}
                    </p>
                  )}
                  {extra && (
                    <p className="text-[10px] text-amber-400/90 mt-0.5 leading-relaxed break-words">
                      Extra: {Array.isArray(extra) ? extra.join(", ") : extra}
                    </p>
                  )}
                  {hasDiscount && (
                    <span className="text-xs text-green-400 font-medium inline-block mt-0.5">
                      -{Math.round((1 - item.discountedPrice / item.price) * 100)}%
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/50">
                    <span className="text-xs text-gray-400 font-medium">
                      Qty: {item.quantity}
                    </span>
                    <div className="text-right">
                      <span className="text-amber-400 font-bold text-sm">
                        ${(displayPrice * item.quantity).toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] text-gray-500 line-through block">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coupon Box */}
        <div className="mb-4">
          {!appliedCoupon ? (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                <Tag size={13} className="text-amber-400" />
                Have a Promo / Coupon Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyCoupon(e);
                    }
                  }}
                  className="flex-1 bg-zinc-900 border border-zinc-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 uppercase tracking-wider font-mono focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isValidatingCoupon || !couponInput.trim()}
                  className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-sm font-semibold transition-all hover:border-amber-500/50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  {isValidatingCoupon ? (
                    <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check size={13} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-xs text-emerald-400 tracking-wider">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-medium">
                      {appliedCoupon.discountType === "percentage"
                        ? `${appliedCoupon.discountAmount}% OFF`
                        : `$${appliedCoupon.discountAmount} OFF`}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Coupon applied (-${couponDiscount.toFixed(2)})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-gray-400 hover:text-red-400 p-1 rounded-md hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Remove coupon"
              >
                <X size={15} />
              </button>
            </div>
          )}
        </div>


        <div className="border-b border-zinc-800 mb-6 pb-4 space-y-1.5">
          {appliedCoupon && couponDiscount > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-400">
                <span className="flex items-center gap-1">
                  <Tag size={12} />
                  Coupon ({appliedCoupon.code})
                </span>
                <span>-${couponDiscount.toFixed(2)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-lg font-bold pt-1">
            <span className="text-white">Total</span>
            <span className="text-amber-400">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery type toggle */}
        <div className="w-full inline-flex bg-black border border-zinc-800 rounded-xl p-1.5 gap-1.5 mb-4">
          <button
            type="button"
            onClick={() => setDeliveryType("pickup")}
            className={`inline-flex w-1/2 items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${deliveryType === "pickup"
              ? "bg-amber-500 text-black"
              : "text-gray-400 hover:text-white hover:bg-zinc-800"
              }`}
          >
            <Store size={16} />
            Store Pickup
          </button>
          <button
            type="button"
            onClick={() => setDeliveryType("delivery")}
            className={`inline-flex w-1/2 items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${deliveryType === "delivery"
              ? "bg-amber-500 text-black"
              : "text-gray-400 hover:text-white hover:bg-zinc-800"
              }`}
          >
            <Truck size={16} />
            Delivery
          </button>
        </div>

        <div className="space-y-4">
          <Input
            id="instant-firstName"
            name="firstName"
            label="First Name *"
            placeholder="John Doe"
            value={formData.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
            prefix={<User size={16} className="text-gray-400" />}
          />

          <Input
            id="instant-email"
            name="email"
            label="Email Address (optional)"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email}
            prefix={<Mail size={16} className="text-gray-400" />}
          />

          <Input
            id="instant-phone"
            name="phone"
            label="Phone Number *"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleInputChange}
            error={formErrors.phone}
            prefix={<Phone size={16} className="text-gray-400" />}
          />

          {deliveryType === "delivery" && (
            <>
              <Input
                id="instant-addressLine1"
                name="addressLine1"
                label="Address Line *"
                placeholder="123 Main Street"
                value={formData.addressLine1}
                onChange={handleInputChange}
                error={formErrors.addressLine1}
                prefix={<Home size={16} className="text-gray-400" />}
              />
              <Input
                id="instant-zipCode"
                name="zipCode"
                label="ZIP Code *"
                placeholder="10001"
                value={formData.zipCode}
                onChange={handleInputChange}
                error={formErrors.zipCode}
                prefix={<MapPin size={16} className="text-gray-400" />}
              />
            </>
          )}
        </div>

        {!isRequiredInfoFilled && (
          <p className="mt-4 text-center text-sm text-amber-400 flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            Fill Pickup / Delivery Info Before Placing Order
          </p>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !isRequiredInfoFilled}
          className={`w-full font-bold my-10 py-3 px-6 rounded-lg transition-colors duration-200 ${isProcessing || !isRequiredInfoFilled
            ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 text-black"
            }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};

export default InstantOrderModal;
