"use client";

import { Check, CircleQuestionMark, Pencil, Star, Trash2 } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { VscLockSmall } from "react-icons/vsc";
import { cn } from "@/lib/cn";

// DropdownMenu Component
const DropdownMenu = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("inline-block text-left", className)} {...props}>
    {children}
  </div>
));
DropdownMenu.displayName = "DropdownMenu";

// DropdownMenuContent Component
const DropdownMenuContent = forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-55 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
DropdownMenuContent.displayName = "DropdownMenuContent";

// DropdownMenuItem Component
const DropdownMenuItem = forwardRef(
  ({ className, children, icon, active, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center border-b border-gray-100 px-3 py-2.5 text-[13px] font-medium outline-none transition-all hover:bg-foreground_primary hover:text-primary group active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 first:rounded-t-lg last:rounded-b-lg",
        active && "bg-foreground_primary/90 text-primary",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "mr-2 flex shrink-0 items-center justify-center text-gray_accent group-hover:text-primary transition-colors",
            active && "text-primary",
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 text-left">{children}</span>
      {active && <Check className="ml-2 h-4 w-4 text-info" />}
    </button>
  ),
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// DropdownMenuLabel Component
const DropdownMenuLabel = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray_accent",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

// DropdownMenuSeparator Component
const DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-100", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuHeader = ({ title, className }) => (
  <div className={cn("px-2.5 py-2.5 border-b border-gray-100 mb-1", className)}>
    <h3 className="text-sm font-bold text-foreground_primary leading-tight lowercase first-letter:uppercase">
      {title}
    </h3>
  </div>
);
DropdownMenuHeader.displayName = "DropdownMenuHeader";

// DropdownMenuFooter Component
const DropdownMenuFooter = ({ label, icon, onClick, className }) => (
  <button
    type="button"
    className={cn(
      "mt-1 w-full px-3 py-3 border-t border-gray-100 cursor-pointer transition-colors -mx-1 -mb-1 rounded-b-xl flex items-center justify-start",
      className,
    )}
    onClick={onClick}
  >
    <div className="flex items-center gap-2 text-[13px] font-semibold text-info hover:text-info/90 hover:underline transition-colors">
      {label}
      {icon || <CircleQuestionMark size={14} className="text-gray_accent" />}
    </div>
  </button>
);
DropdownMenuFooter.displayName = "DropdownMenuFooter";

// DropDownItem Component
const DropDownItem = ({
  items = [
    { id: 1, label: "Rename", icon: <Pencil size={14} /> },
    { id: 2, label: "Make it Private", icon: <VscLockSmall size={16} /> },
    { id: 3, label: "Delete", icon: <Trash2 size={14} /> },
  ],
  onClick = () => {},
  className = "",
}) => {
  return (
    <DropdownMenuContent className={cn("max-w-xs", className)}>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => onClick(item.id, item)}
            icon={item.icon}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </div>
    </DropdownMenuContent>
  );
};
DropDownItem.displayName = "DropDownItem";

// DropDown Component
const DropDown = ({
  title,
  sections = [],
  footerLabel,
  footerIcon,
  onFooterClick,
  className,
}) => {
  const [fillStar, setFillStar] = useState(false);
  const handleStarClick = (id) => {
    setFillStar((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <DropdownMenu className={cn("max-w-[300px]", className)}>
      <DropdownMenuContent className="w-full">
        {title && <DropdownMenuHeader title={title} />}

        <div className="py-1">
          {sections.map((section, sIndex) => (
            <React.Fragment key={section.id || sIndex}>
              {sIndex > 0 && <DropdownMenuSeparator />}
              <DropdownMenuLabel className="flex items-center gap-1.5">
                {section.title}
                {section.headerIcon || <CircleQuestionMark size={11} />}
              </DropdownMenuLabel>
              <div className="space-y-2.5 mt-0.5">
                {section.items?.map((item) => (
                  <div
                    className={cn(
                      "flex items-center gap-1.5 bg-white_shade mx-2 p-2 text-[13px] font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50 rounded-md",
                      className,
                    )}
                    key={item.id}
                    onClick={() =>
                      section.onItemClick && section.onItemClick(item)
                    }
                  >
                    <div className="relative flex w-full cursor-pointer select-none items-center justify-between text-black">
                      {item.label}
                    </div>
                    <Star
                      onClick={() => handleStarClick(item.id)}
                      className=""
                      fill={fillStar[item.id] ? "#FFCA6A" : "none"}
                      stroke={fillStar[item.id] ? "#FFCA6A" : "#a3a3a3"}
                      size={16}
                    />
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>

        {footerLabel && (
          <DropdownMenuFooter
            label={footerLabel}
            icon={footerIcon}
            onClick={onFooterClick}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
DropDown.displayName = "DropDown";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuHeader,
  DropdownMenuFooter,
  DropDownItem,
  DropDown,
};
