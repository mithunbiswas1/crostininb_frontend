import React from "react";

const FeatureItem = ({ icon, title, description }) => {
  return (
    /* Main Container: width 568px, gap 24px */
    <div className="flex flex-col gap-6 w-full max-w-142 min-h-62.75 opacity-100 rotate-0">
      {/* Icon Container: 72x72px, 16px padding, 12px radius, 1px border */}
      <div className="w-18 h-18 p-4 bg-[#F1F1F1] border border-gray-200 rounded-xl flex items-center justify-center gap-2.5 opacity-100 rotate-0">
        <div className="flex items-center justify-center w-full h-full">
          {icon}
        </div>
      </div>

      {/* Text Content Area: gap 24px */}
      <div className="flex flex-col gap-6 w-full">
        {/* Title Style: 24px, Medium (500), 120% line-height */}
        <h4 className="text-[24px] font-medium leading-[120%] tracking-[0px] text-[#111] flex items-center">
          {title}
        </h4>

        {/* Description: width 568px, height 251px (max constraints) */}
        <p className="text-[#666] text-[16px] leading-relaxed opacity-100">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;
