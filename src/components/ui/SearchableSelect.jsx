"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

const SearchableSelect = ({
  value,
  onChange = () => {},
  label,
  id,
  name,
  placeholder = "Search or select...",
  options = [],
  error,
  disabled = false,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Find selected option
  const selectedOption = options.find(
    (opt) => opt.value === value || opt.method_name === value,
  );

  // Filter options based on search
  const filteredOptions = options.filter((option) => {
    const searchText = option.method_name?.toLowerCase() || "";
    return searchText.includes(searchTerm.toLowerCase());
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        break;
      default:
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (option) => {
    onChange({
      target: {
        name: name,
        value: option.method_name || option.value,
      },
    });
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // If input is cleared with backspace, also clear the selected value
    if (newValue === "") {
      onChange({
        target: {
          name: name,
          value: "",
        },
      });
    }
  };

  const handleInputClick = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-3 text-gray_deep"
        >
          {label}
        </label>
      )}

      <div className="relative w-full" ref={wrapperRef}>
        {/* Input field */}
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="text"
            value={searchTerm || selectedOption?.method_name || value || ""}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedOption ? selectedOption.method_name : placeholder
            }
            disabled={disabled}
            className={cn(
              "w-full rounded-md border border-border_gray bg-gray-50 text-base focus:outline-none focus:ring-1 focus:ring-primary py-3 px-4 pr-10",
              error && "border-red-500 focus:ring-red-500",
              disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
            autoComplete="off"
            {...props}
          />

          {/* Dropdown arrow */}
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-gray-50 border border-border_gray rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              <ul ref={listRef} className="py-1">
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.id || option.value}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "px-4 py-2 cursor-pointer text-sm hover:bg-gray-100",
                      (option.method_name === value ||
                        option.value === value) &&
                        "bg-primary/10 text-primary font-medium",
                      highlightedIndex === index && "bg-gray-100",
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option.method_name || option.label}</span>
                      {option.cost !== undefined && (
                        <span className="text-xs text-gray-500">
                          +${option.cost}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SearchableSelect;
