"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const checkboxVariants = cva(
  "peer size-5 shrink-0 rounded-md border-2 border-border_gray ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-none shadow-sm hover:border-primary/50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "data-[state=checked]:bg-primary data-[state=checked]:text-foreground_primary",
        success:
          "data-[state=checked]:bg-success data-[state=checked]:text-gray-50",
        info: "data-[state=checked]:bg-info data-[state=checked]:text-gray-50",
        warning:
          "data-[state=checked]:bg-warning data-[state=checked]:text-gray-50",
        danger:
          "data-[state=checked]:bg-danger data-[state=checked]:text-gray-50",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const Checkbox = React.forwardRef(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="size-3.5 stroke-[3.5px] animate-in zoom-in-50 duration-200" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
