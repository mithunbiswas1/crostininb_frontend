// src/app/(pages)/order-success/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, User, Mail, Phone, Lock } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const isNewUser = searchParams.get("isNewUser") === "true";
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  const [showCredentials, setShowCredentials] = useState(isNewUser);

  useEffect(() => {
    if (!orderNumber) {
      router.push("/");
    }
  }, [orderNumber, router]);

  if (!orderNumber) {
    return null;
  }

  return (
    <section className="bg-black min-h-screen py-20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <div className="bg-[#111] border border-zinc-800 rounded-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-400 mb-2">
            Thank you for your order. We'll notify you when it's ready.
          </p>

          <div className="bg-zinc-900/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400">Order Number</p>
            <p className="text-lg font-semibold text-amber-400">
              {orderNumber}
            </p>
          </div>

          {/* Account Credentials - Show if new user */}
          {isNewUser && showCredentials && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-amber-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <User size={16} />
                Account Created!
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                A new account has been created for you. Use these credentials to
                login:
              </p>
              <div className="space-y-2 text-sm">
                {email && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={14} className="text-gray-400" />
                    <span>
                      Email: <span className="text-white">{email}</span>
                    </span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={14} className="text-gray-400" />
                    <span>
                      Phone: <span className="text-white">{phone}</span>
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-300">
                  <Lock size={14} className="text-gray-400" />
                  <span>
                    Password:{" "}
                    <span className="text-white font-mono">12345678</span>
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Please change your password after logging in for security.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            {isNewUser && (
              <Link
                href="/login"
                className="block text-amber-400 hover:text-amber-300 text-sm transition-colors"
              >
                Login to your account
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
