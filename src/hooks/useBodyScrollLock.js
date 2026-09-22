// src/hooks/useBodyScrollLock.js

"use client";

import { useEffect } from "react";

// Locks background scroll while a modal/drawer is open without jumping to top.
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      if (typeof window !== "undefined") {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isLocked]);
}
