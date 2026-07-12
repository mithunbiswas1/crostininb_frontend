// src/components/ui/Button.jsx

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 cursor-pointer font-manrope disabled:pointer-events-none active:scale-95",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "bg-primary hover:bg-primary/90 text-foreground_primary border border-transparent",
        secondary:
          "bg-foreground_primary hover:bg-foreground_primary/85 text-primary hover:text-white font-bold border border-transparent",
        success:
          "bg-success hover:bg-success/90 text-white border border-transparent",
        info: "bg-info hover:bg-info/90 text-white border border-transparent",
        warning:
          "bg-warning hover:bg-warning/90 text-white border border-transparent",
        danger:
          "bg-danger hover:bg-danger/90 text-white border border-transparent",
        ashes:
          "bg-ashes hover:bg-ashes/90 text-black border border-transparent",
        disabled:
          "bg-gray_200 text-border_gray cursor-not-allowed border border-transparent",
        outline_default:
          "bg-transparent text-foreground_primary font-medium border border-foreground_primary/20 hover:bg-foreground_primary hover:text-white",
        outline_primary:
          "bg-transparent text-primary border border-primary hover:bg-primary hover:text-foreground_primary",
        outline_secondary:
          "bg-transparent text-primary border border-primary/20 hover:border-primary",
        outline_success:
          "bg-transparent text-success border border-success hover:bg-success hover:text-white",
        outline_info:
          "bg-transparent text-info border border-info hover:bg-info hover:text-white",
        outline_warning:
          "bg-transparent text-warning border border-warning hover:bg-warning hover:text-white",
        outline_danger:
          "bg-transparent text-danger border border-danger hover:bg-danger hover:text-white",
        outline_disabled:
          "bg-transparent text-gray_500 border border-gray_500 cursor-not-allowed",
        outline_icon:
          "backdrop-blur-xs text-info border border-info! hover:bg-foreground_primary hover:text-white",
      },
      size: {
        default: "px-4 xl:px-5 py-2 xl:py-2.5 text-sm",
        xl: "px-8 py-4 leading-[155%] font-semibold text-lg",
        lg: "px-6 py-3 leading-[150%] font-semibold text-base",
        md: "px-5 py-2.5 leading-[146%] font-bold text-base",
        sm: "px-2 lg:px-4 py-1 lg:py-2 leading-[130%] font-medium text-sm",
        xs: "px-3 py-1 leading-[100%] font-medium text-xs",
      },
      rounded: {
        default: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  rounded = "default",
  asChild = false,
  disabled = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  // Determine if the button should be disabled
  const isDisabled =
    disabled || variant === "disabled" || variant === "outline_disabled";

  // Use disabled variant if disabled prop is true
  const finalVariant = disabled ? "disabled" : variant;

  return (
    <Comp
      data-slot="button"
      data-variant={finalVariant}
      data-size={size}
      data-rounded={rounded}
      disabled={isDisabled}
      className={cn(
        buttonVariants({ variant: finalVariant, size, rounded, className }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
