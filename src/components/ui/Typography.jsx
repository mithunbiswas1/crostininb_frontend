// src/components/ui/Typography.jsx

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const typographyVariants = cva("transition-colors", {
  variants: {
    variant: {
      h1: "font-manrope text-[32px] lg:text-[60px] xl:text-[72px] font-extrabold tracking-tight text-heading leading-[100%]",
      h2: "font-manrope text-[24px] lg:text-[28px] xl:text-[50px] font-semibold tracking-tight text-heading leading-[120%]",
      h3: "font-manrope text-[20px] lg:text-[24px] xl:text-[40px] font-semibold text-heading leading-[120%]",
      h4: "font-manrope text-[18px] lg:text-[20px] xl:text-[32px] font-semibold text-heading leading-[120%]",
      h5: "font-manrope text-[16px] lg:text-[18px] xl:text-[24px] font-medium text-heading leading-[120%]",
      h6: "font-manrope text-sm lg:text-lg xl:text-xl font-medium text-heading leading-[160%]",
      p: "font-manrope text-base text-gray_light leading-relaxed",
      default: "",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
      regular: "font-normal",
      light: "font-light",
    },
    color: {
      primary: "text-primary",
      foreground: "text-foreground_primary",
      muted: "text-gray_light",
      gray: "text-gray_deep",
      accent: "text-gray_accent",
      white: "text-gray-50",
      danger: "text-danger",
      success: "text-success",
      info: "text-info",
    },
  },
  defaultVariants: {
    variant: "default",
    // color: "foreground",
  },
});

function Typography({
  className,
  variant,
  weight,
  color,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : variant === "p" ? "p" : variant || "p";

  return (
    <Comp
      className={cn(typographyVariants({ variant, weight, color, className }))}
      {...props}
    />
  );
}

// Helper components for even easier usage if preferred
const H1 = (props) => <Typography variant="h1" {...props} />;
const H2 = (props) => <Typography variant="h2" {...props} />;
const H3 = (props) => <Typography variant="h3" {...props} />;
const H4 = (props) => <Typography variant="h4" {...props} />;
const H5 = (props) => <Typography variant="h5" {...props} />;
const H6 = (props) => <Typography variant="h6" {...props} />;
const P = (props) => <Typography variant="p" {...props} />;

export { Typography, typographyVariants, H1, H2, H3, H4, H5, H6, P };
