import React from "react";
import { cn } from "@/lib/cn";

const ThreeDot = ({
  text,
  icon: Icon,
  selected = false, // Changed from variant to a boolean
  iconColor = "text-gray-600", // Allow custom icon colors
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex items-center w-full gap-4 px-5 py-3 transition-colors text-sm font-medium",
        "border-b border-gray-100 last:border-none",
        // Logic for selected state (Black background, yellow text)
        selected
          ? "bg-[#1A1A1A] text-[#E2E623]"
          : "bg-gray-50 text-gray-800 hover:bg-gray-50",
        className,
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn(
            "size-5",
            // If selected, use yellow. Otherwise, use the passed iconColor prop.
            selected ? "text-[#E2E623]" : iconColor,
          )}
        />
      )}
      <span>{text}</span>
    </button>
  );
};

export default ThreeDot;
