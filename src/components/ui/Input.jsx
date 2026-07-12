import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const Input = forwardRef(
  (
    {
      value,
      onChange = () => {},
      label,
      id,
      name,
      placeholder,
      type = "text",
      className,
      prefix,
      suffix,
      error,
      disabled = false,
      ...props
    },
    ref,
  ) => (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-3 text-gray_deep"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        {/* LEFT ICON */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          suppressHydrationWarning={true}
          className={cn(
            "w-full rounded-md border border-border_gray bg-gray-50 text-base focus:outline-none focus:ring-1 focus:ring-primary py-3 px-4",
            prefix ? "pl-10" : "",
            suffix ? "pr-10" : "",
            error && "border-red-500 focus:ring-red-500",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          {...props}
        />

        {/* RIGHT ICON */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  ),
);

Input.displayName = "Input";
export default Input;
