import React from "react";

/**
 * Factory function to create SVG icon components
 * Eliminates boilerplate when creating multiple icons
 * 
 * @param {string} iconName - Display name for the icon component
 * @param {string} pathData - SVG path d attribute
 * @param {object} options - Configuration options
 * @returns {React.ForwardRefComponent} Icon component
 * 
 * Usage:
 * import { createSvgIcon } from '@/icons/createSvgIcon';
 * 
 * export const CheckCircle = createSvgIcon(
 *   'CheckCircle',
 *   'M0 11.75C0 5.26065...',
 *   { viewBox: '0 0 24 24' }
 * );
 */
export const createSvgIcon = (iconName, pathData, options = {}) => {
  const {
    viewBox = "0 0 24 24",
    defaultSize = 24,
    fillRule = "evenodd",
    clipRule = "evenodd",
  } = options;

  const Component = React.forwardRef(
    (
      {
        size = defaultSize,
        color = "currentColor",
        className = "",
        style = {},
        title = `${iconName.toLowerCase()}-icon`,
        pathProps = {},
        ...svgProps
      },
      ref
    ) => {
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title}
          className={className}
          style={style}
          {...svgProps}
        >
          {title && <title>{title}</title>}
          <path
            fillRule={fillRule}
            clipRule={clipRule}
            d={pathData}
            fill={color}
            {...pathProps}
          />
        </svg>
      );
    }
  );

  Component.displayName = `${iconName}Icon`;
  return Component;
};
