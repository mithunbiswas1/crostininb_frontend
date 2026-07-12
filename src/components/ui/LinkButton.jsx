import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "./Button";
import { cn } from "@/lib/cn";

function LinkButton({
  href,
  className,
  variant = "default",
  size = "default",
  rounded = "default",
  asChild = false,
  disabled = false,
  ...props
}) {
  const Comp = asChild ? Slot : Link;

  // Determine disabled state
  const isDisabled =
    disabled || variant === "disabled" || variant === "outline_disabled";

  // Use disabled variant if disabled
  const finalVariant = disabled ? "disabled" : variant;

  // Prevent navigation when disabled
  if (isDisabled) {
    return (
      <span
        data-slot="link-button"
        data-variant={finalVariant}
        data-size={size}
        data-rounded={rounded}
        className={cn(
          buttonVariants({ variant: finalVariant, size, rounded }),
          "pointer-events-none",
          className,
        )}
      >
        {props.children}
      </span>
    );
  }

  return (
    <Comp
      href={href}
      data-slot="link-button"
      data-variant={finalVariant}
      data-size={size}
      data-rounded={rounded}
      className={cn(
        buttonVariants({ variant: finalVariant, size, rounded }),
        className,
      )}
      {...props}
    />
  );
}

export { LinkButton };
