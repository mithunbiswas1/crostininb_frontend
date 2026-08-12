// src/app/(pages)/checkout/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  User,
  Phone,
  MapPin,
  Mail,
  Home,
  AlertCircle,
} from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";
import Input from "@/components/ui/Input";
import {
  updateQuantity,
  removeFromCartsList,
  clearCartsList,
  clearBuyNowItem,
} from "@/redux/features/Slice/CartDrawerSlice";
import { useCreateOrderMutation } from "@/redux/features/orderApi";
import { toast } from "sonner";

const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { cartsList, buyNowItem } = useSelector((state) => state.cartDrawer);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBuyNowMode, setIsBuyNowMode] = useState(false);

  // Redux mutation hook
  const [createOrder, { isLoading: isOrderCreating }] =
    useCreateOrderMutation();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    deliveryInstructions: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Check if it's buy now mode
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "buynow" && buyNowItem) {
      setIsBuyNowMode(true);
    }
  }, [searchParams, buyNowItem]);

  // Get items to display (cart items or buy now item)
  const displayItems = isBuyNowMode && buyNowItem ? [buyNowItem] : cartsList;

  // Calculate totals with discount
  const totalQuantity = displayItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const subtotal = displayItems.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0,
  );
  const regularTotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalSavings = regularTotal - subtotal;
  const deliveryFee = 0;
  const totalPrice = subtotal + deliveryFee;

  // Redirect if no items
  useEffect(() => {
    if (displayItems.length === 0) {
      router.push("/");
    }
  }, [displayItems, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.addressLine1.trim()) {
      errors.addressLine1 = "Address is required";
    }
    if (!formData.zipCode.trim()) {
      errors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = "Please enter a valid ZIP code";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateQuantity = (productId, variationName, quantity) => {
    if (isBuyNowMode) return;
    dispatch(updateQuantity({ productId, variationName, quantity }));
  };

  const handleRemove = (productId, variationName) => {
    if (isBuyNowMode) {
      dispatch(clearBuyNowItem());
      router.push("/");
      return;
    }
    dispatch(removeFromCartsList({ productId, variationName }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        customer: {
          firstName: formData.firstName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        deliveryAddress: {
          addressLine1: formData.addressLine1.trim(),
          addressLine2: formData.addressLine2.trim(),
          zipCode: formData.zipCode.trim(),
          deliveryInstructions: formData.deliveryInstructions.trim(),
        },
        items: displayItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          discountedPrice: item.discountedPrice || null,
          variationName: item.variationName || null,
          quantity: item.quantity,
        })),
        subtotal: subtotal,
        discountAmount: totalSavings,
        deliveryFee: deliveryFee,
        total: totalPrice,
        paymentMethod: "cash",
        orderType: isBuyNowMode ? "buy_now" : "cart",
      };

      // Create order using Redux mutation
      const response = await createOrder(orderData).unwrap();

      // Clear cart or buy now item
      if (isBuyNowMode) {
        dispatch(clearBuyNowItem());
      } else {
        dispatch(clearCartsList());
      }

      setIsProcessing(false);

      // Check if new user was created
      const isNewUser = response.data.account?.isNewUser || false;
      const accountInfo = response.data.account;

      // Show success message with account info if new user
      if (isNewUser && accountInfo) {
        toast.success(
          `Order placed successfully! A new account has been created. 
        Login with: ${accountInfo.email || accountInfo.phone} 
        Password: ${accountInfo.password}`,
        );

        // Redirect to order success with account info
        router.push(
          `/order-success?orderNumber=${response.data.order.orderNumber}&isNewUser=true&email=${accountInfo.email}&phone=${accountInfo.phone}`,
        );
      } else {
        toast.success("Order placed successfully!");
        router.push(
          `/order-success?orderNumber=${response.data.order.orderNumber}`,
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        error?.data?.message || "Failed to place order. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (isBuyNowMode) {
      dispatch(clearBuyNowItem());
    }
    router.push("/");
  };

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-black min-h-screen py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Menu</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Delivery Information */}
          <div className="flex-1">
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-amber-400" />
                Delivery Information
              </h2>

              <div className="space-y-4">
                {/* First Name */}
                <Input
                  id="firstName"
                  name="firstName"
                  label="First Name *"
                  placeholder="John Doe"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                  prefix={<User size={16} className="text-gray-400" />}
                />

                {/* Email */}
                <Input
                  id="email"
                  name="email"
                  label="Email Address *"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  prefix={<Mail size={16} className="text-gray-400" />}
                />

                {/* Phone */}
                <Input
                  id="phone"
                  name="phone"
                  label="Phone Number *"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={formErrors.phone}
                  prefix={<Phone size={16} className="text-gray-400" />}
                />

                {/* Address Line 1 */}
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  label="Address Line 1 *"
                  placeholder="123 Main Street"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  error={formErrors.addressLine1}
                  prefix={<Home size={16} className="text-gray-400" />}
                />

                {/* Address Line 2 (Optional) */}
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  label="Address Line 2 (Optional)"
                  placeholder="Apartment, Suite, Building, Floor"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  prefix={<Home size={16} className="text-gray-400" />}
                />

                {/* ZIP Code */}
                <Input
                  id="zipCode"
                  name="zipCode"
                  label="ZIP Code *"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={formErrors.zipCode}
                />

                {/* Delivery Instructions (Optional) */}
                <div>
                  <label
                    htmlFor="deliveryInstructions"
                    className="block text-sm font-medium mb-3 text-gray_deep"
                  >
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="deliveryInstructions"
                    name="deliveryInstructions"
                    placeholder="Gate code, building entrance, special instructions..."
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-border_gray bg-gray-50 text-base focus:outline-none focus:ring-1 focus:ring-primary py-3 px-4 min-h-[80px] resize-y"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-[420px]">
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 sticky top-20">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <span>Order Summary</span>
                {isBuyNowMode && (
                  <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
                    Instant Order
                  </span>
                )}
              </h2>

              {/* Items List - Small */}
              <div className="max-h-[200px] overflow-y-auto space-y-2 mb-4 pr-2">
                {displayItems.map((item, index) => {
                  const hasDiscount =
                    item.discountedPrice && item.discountedPrice < item.price;
                  const displayPrice = hasDiscount
                    ? item.discountedPrice
                    : item.price;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-zinc-900/30 rounded-lg p-2"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.quantity} × ${displayPrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400 font-semibold text-sm">
                          ${(displayPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 border-t border-zinc-800 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">You Saved</span>
                    <span className="text-green-400">
                      -${totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-white">${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="border-t border-zinc-800 pt-3 flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || isOrderCreating}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-200 mt-6 ${
                  isProcessing || isOrderCreating
                    ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-black"
                }`}
              >
                {isProcessing || isOrderCreating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing your order, you agree to our Terms and Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
