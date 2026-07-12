"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
  };

  const handleResend = () => {
    console.log("Resend OTP clicked");
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto my-20 p-6 bg-white shadow border border-gray-200 rounded-sm">
        <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your mobile number
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="OTP"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter 6-digit OTP"
            error={error}
            type="text"
            maxLength={6}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition"
          >
            Verify OTP →
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>
            Didn't receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-primary underline"
            >
              Resend
            </button>
          </span>
          <Link href="/sign-in" className="text-primary underline cursor-pointer">
            Change Number
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
