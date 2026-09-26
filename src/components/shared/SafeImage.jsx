// src/components/shared/SafeImage.jsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SafeImage({
  src,
  alt = "",
  fill = true,
  className = "object-cover",
  fallbackClassName = "",
  unoptimized = true,
  priority = false,
  onError,
  ...props
}) {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full bg-gray-400 ${fallbackClassName || className || ""}`}
        aria-label={alt || "Image not available"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Image"}
      fill={fill}
      className={className}
      unoptimized={unoptimized}
      priority={priority}
      onError={(e) => {
        setHasError(true);
        if (onError) onError(e);
      }}
      {...props}
    />
  );
}
