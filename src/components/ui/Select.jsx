import { forwardRef, useState } from "react";
import { cn } from "@/lib/cn";

const Select = forwardRef(
  (
    /**
     * Select Component
     *
     * @param {Object} props - The props for the component.
     * @param {string} [props.value] - The selected value.
     * @param {function} [props.onChange] - Callback function for value changes.
     * @param {string} [props.label] - Label for the select field.
     * @param {string} [props.id] - ID for the select element.
     * @param {string} [props.name] - Name for the select element.
     * @param {string} [props.placeholder] - Placeholder text for the select.
     * @param {Array} [props.options] - Array of options for the select.
     * @param {Array} [props.suggested] - Array of suggested options {label, value} or string.
     * @param {string} [props.className] - Extra CSS classes.
     * @param {React.ReactNode} [props.suffix] - Optional suffix for the select.
     * @param {string} [props.error] - Error message to display.
     * @param {boolean} [props.disabled] - Disables the select and interactions.
     * @param {Object} [props.props] - Additional props for the select element.
     */
    {
      value,
      onChange = () => {},
      label,
      id,
      name,
      placeholder,
      options = [],
      suggested = [],
      className,
      suffix,
      error,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          {label && (
            <label
              className="block text-sm font-medium text-gray_deep"
              htmlFor={id}
            >
              {label}
            </label>
          )}

          {suggested.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray_light">
                Suggested:
              </span>
              <div className="flex gap-2">
                {suggested.map((item, index) => {
                  const label = typeof item === "string" ? item : item.label;
                  const val = typeof item === "string" ? item : item.value;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => onChange({ target: { name, value: val } })}
                      className="text-xs font-semibold text-info hover:underline cursor-pointer"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <select
            id={id}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            className={cn(
              "py-2 2xl:py-2.5 w-full rounded-md border border-border_gray bg-gray-50 px-4 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer",
              error && "border-red-500 focus:ring-red-500",
              disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {suffix && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none",
                isOpen && "rotate-180",
              )}
            >
              {suffix}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
