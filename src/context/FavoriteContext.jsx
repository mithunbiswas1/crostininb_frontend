"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  const updateFavoriteCount = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteCount(favorites.length);
  };

  useEffect(() => {
    updateFavoriteCount();

    // Listen for storage events (when localStorage changes in another tab)
    window.addEventListener("storage", updateFavoriteCount);

    // Custom event for same-tab updates
    window.addEventListener("favoritesUpdated", updateFavoriteCount);

    return () => {
      window.removeEventListener("storage", updateFavoriteCount);
      window.removeEventListener("favoritesUpdated", updateFavoriteCount);
    };
  }, []);

  return (
    <FavoriteContext.Provider value={{ favoriteCount, updateFavoriteCount }}>
      {children}
    </FavoriteContext.Provider>
  );
};
