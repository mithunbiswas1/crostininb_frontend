import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Textarea Component
 *
 * @param {Object} props - The props for the component.
 * @param {string} [props.label] - Label for the textarea.
 * @param {string} [props.id] - ID for the textarea.
 * @param {string} [props.error] - Error message to display.
 * @param {string} [props.className] - Extra CSS classes for the textarea.
 * @param {boolean} [props.disabled] - Disables the textarea.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Ref for the textarea element.
 */
const Textarea = React.forwardRef(
  ({ className, label, id, error, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium mb-3 text-gray_deep"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            "flex w-full rounded-md border border-border_gray bg-gray-50 px-4 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
